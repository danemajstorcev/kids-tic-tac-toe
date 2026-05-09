import type { Board as BoardType, Player } from '../types';
import Cell from './Cell';
import ScoreSheet from './ScoreSheet';
import type { Score } from '../types';
import styles from './Board.module.css';

interface Props {
  board: BoardType;
  currentPlayer: Player;
  playerX: Player;
  playerO: Player;
  score: Score;
  winningLine: number[] | null;
  gameOver: boolean;
  onCellClick: (index: number) => void;
  onQuit: () => void;
}

export default function Board({
  board,
  currentPlayer,
  playerX,
  playerO,
  score,
  winningLine,
  gameOver,
  onCellClick,
  onQuit,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tic Tac Toe</h1>
        <button className={styles.quitBtn} onClick={onQuit} title="Back to setup">
          ✕
        </button>
      </div>

      <ScoreSheet playerX={playerX} playerO={playerO} score={score} compact />

      <div className={styles.turnIndicator}>
        {!gameOver && (
          <>
            <span className={currentPlayer.mark === 'X' ? styles.xBadge : styles.oBadge}>
              {currentPlayer.mark === 'X' ? '✕' : '○'}
            </span>
            <span className={styles.turnName}>{currentPlayer.name}'s turn</span>
          </>
        )}
      </div>

      <div className={styles.grid}>
        {board.map((cell, i) => (
          <Cell
            key={i}
            index={i}
            value={cell}
            isWinning={winningLine?.includes(i) ?? false}
            onClick={onCellClick}
            disabled={gameOver}
          />
        ))}
      </div>
    </div>
  );
}
