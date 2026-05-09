import { useState, useCallback } from 'react';
import type { Player, Score, Phase, Mark } from './types';
import { createEmptyBoard, checkWinner } from './utils/gameLogic';
import { playPlaceMark, playWin, playDraw } from './utils/sounds';
import PlayerSetup from './components/PlayerSetup';
import Board from './components/Board';
import WinnerModal from './components/WinnerModal';

export default function App() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [playerX, setPlayerX] = useState<Player>({ name: 'Player 1', mark: 'X' });
  const [playerO, setPlayerO] = useState<Player>({ name: 'Player 2', mark: 'O' });
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentTurn, setCurrentTurn] = useState<Mark>('X');
  const [winner, setWinner] = useState<Mark | 'draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [showModal, setShowModal] = useState(false);

  const handleStart = useCallback(({ playerX: px, playerO: po }: { playerX: Player; playerO: Player }) => {
    setPlayerX(px);
    setPlayerO(po);
    setBoard(createEmptyBoard());
    setCurrentTurn('X');
    setWinner(null);
    setWinningLine(null);
    setScore({ X: 0, O: 0, draws: 0 });
    setShowModal(false);
    setPhase('playing');
  }, []);

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || winner) return;

    const next = [...board];
    next[index] = currentTurn;

    const { winner: w, line } = checkWinner(next);

    setBoard(next);
    playPlaceMark();

    if (w) {
      setWinner(w);
      setWinningLine(line);
      setScore((s) => {
        if (w === 'draw') return { ...s, draws: s.draws + 1 };
        return { ...s, [w]: s[w] + 1 };
      });
      setTimeout(() => {
        if (w === 'draw') playDraw();
        else playWin();
      }, 150);
      setTimeout(() => setShowModal(true), 600);
    } else {
      setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
    }
  }, [board, currentTurn, winner]);

  const handlePlayAgain = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentTurn('X');
    setWinner(null);
    setWinningLine(null);
    setShowModal(false);
  }, []);

  const handleNewGame = useCallback(() => {
    setPhase('setup');
    setShowModal(false);
    setWinner(null);
    setWinningLine(null);
  }, []);

  const currentPlayer = currentTurn === 'X' ? playerX : playerO;

  return (
    <>
      {phase === 'setup' && (
        <PlayerSetup onStart={handleStart} />
      )}

      {phase === 'playing' && (
        <Board
          board={board}
          currentPlayer={currentPlayer}
          playerX={playerX}
          playerO={playerO}
          score={score}
          winningLine={winningLine}
          gameOver={!!winner}
          onCellClick={handleCellClick}
          onQuit={handleNewGame}
        />
      )}

      {showModal && winner && (
        <WinnerModal
          winner={winner}
          playerX={playerX}
          playerO={playerO}
          score={score}
          onPlayAgain={handlePlayAgain}
          onNewGame={handleNewGame}
        />
      )}
    </>
  );
}
