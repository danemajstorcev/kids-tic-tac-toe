import type { Player, Score } from '../types';
import styles from './ScoreSheet.module.css';

interface Props {
  playerX: Player;
  playerO: Player;
  score: Score;
  compact?: boolean;
}

export default function ScoreSheet({ playerX, playerO, score, compact }: Props) {
  return (
    <div className={`${styles.scoreSheet} ${compact ? styles.compact : ''}`}>
      <div className={`${styles.scoreCard} ${styles.xCard}`}>
        <span className={styles.mark}>✕</span>
        <span className={styles.name}>{playerX.name}</span>
        <span className={styles.score}>{score.X}</span>
      </div>

      <div className={styles.drawCard}>
        <span className={styles.drawIcon}>🤝</span>
        <span className={styles.drawLabel}>Draws</span>
        <span className={styles.drawScore}>{score.draws}</span>
      </div>

      <div className={`${styles.scoreCard} ${styles.oCard}`}>
        <span className={styles.mark}>○</span>
        <span className={styles.name}>{playerO.name}</span>
        <span className={styles.score}>{score.O}</span>
      </div>
    </div>
  );
}
