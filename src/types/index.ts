export type Mark = 'X' | 'O';
export type CellValue = Mark | null;
export type Board = CellValue[];

export interface Player {
  name: string;
  mark: Mark;
}

export interface GameState {
  board: Board;
  currentTurn: Mark;
  winner: Mark | 'draw' | null;
  winningLine: number[] | null;
}

export interface Score {
  X: number;
  O: number;
  draws: number;
}

export type Phase = 'setup' | 'playing' | 'result';
