import type { CellValue } from '../types';
import styles from './Cell.module.css';

interface Props {
  value: CellValue;
  index: number;
  isWinning: boolean;
  onClick: (index: number) => void;
  disabled: boolean;
}

export default function Cell({ value, index, isWinning, onClick, disabled }: Props) {
  return (
    <button
      className={`
        ${styles.cell}
        ${value === 'X' ? styles.x : ''}
        ${value === 'O' ? styles.o : ''}
        ${isWinning ? styles.winning : ''}
        ${!value && !disabled ? styles.hoverable : ''}
      `}
      onClick={() => onClick(index)}
      disabled={disabled || !!value}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
    >
      {value && (
        <span className={styles.mark}>
          {value === 'X' ? '✕' : '○'}
        </span>
      )}
    </button>
  );
}
