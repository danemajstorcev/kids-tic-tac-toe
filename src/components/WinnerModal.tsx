import type { Mark, Player, Score } from '../types';
import ScoreSheet from './ScoreSheet';
import styles from './WinnerModal.module.css';

interface Props {
  winner: Mark | 'draw';
  playerX: Player;
  playerO: Player;
  score: Score;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const CONFETTI_EMOJIS = ['⭐', '🎉', '✨', '🌟', '🎊', '💫', '🎈', '🏆'];

export default function WinnerModal({ winner, playerX, playerO, score, onPlayAgain, onNewGame }: Props) {
  const isDraw = winner === 'draw';
  const winnerPlayer = isDraw ? null : (winner === 'X' ? playerX : playerO);

  const confetti = Array.from({ length: 12 }, (_, i) => ({
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
    delay: i * 0.12,
    left: 5 + (i * 8) % 90,
  }));

  return (
    <div className={styles.overlay}>
      {!isDraw && confetti.map((c, i) => (
        <span
          key={i}
          className={styles.confetti}
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            fontSize: `${1 + (i % 3) * 0.4}rem`,
          }}
        >
          {c.emoji}
        </span>
      ))}

      <div className={styles.modal}>
        <div className={styles.resultBlock}>
          {isDraw ? (
            <>
              <div className={styles.resultEmoji}>🤝</div>
              <h2 className={styles.resultTitle}>It's a Draw!</h2>
              <p className={styles.resultSub}>What a battle! Nobody wins this round.</p>
            </>
          ) : (
            <>
              <div className={styles.resultEmoji}>🏆</div>
              <h2 className={`${styles.resultTitle} ${winner === 'X' ? styles.xWin : styles.oWin}`}>
                {winnerPlayer!.name} Wins!
              </h2>
              <p className={styles.resultSub}>
                Playing as{' '}
                <span className={winner === 'X' ? styles.xMark : styles.oMark}>
                  {winner === 'X' ? '✕' : '○'}
                </span>
              </p>
            </>
          )}
        </div>

        <div className={styles.scoreSection}>
          <h3 className={styles.scoreTitle}>Scoreboard</h3>
          <ScoreSheet playerX={playerX} playerO={playerO} score={score} />
        </div>

        <div className={styles.actions}>
          <button className={styles.playAgainBtn} onClick={onPlayAgain}>
            🔄 Play Again
          </button>
          <button className={styles.newGameBtn} onClick={onNewGame}>
            👥 New Players
          </button>
        </div>
      </div>
    </div>
  );
}
