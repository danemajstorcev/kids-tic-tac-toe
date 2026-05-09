import { useState } from 'react';
import type { Mark, Player } from '../types';
import styles from './PlayerSetup.module.css';

interface Props {
  onStart: (players: { playerX: Player; playerO: Player }) => void;
}

export default function PlayerSetup({ onStart }: Props) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [player1Mark, setPlayer1Mark] = useState<Mark>('X');
  const [error, setError] = useState('');

  const player2Mark: Mark = player1Mark === 'X' ? 'O' : 'X';

  function handleStart() {
    const n1 = name1.trim();
    const n2 = name2.trim();

    if (!n1 || !n2) {
      setError('Both players need a name! 🙈');
      return;
    }
    if (n1.toLowerCase() === n2.toLowerCase()) {
      setError('Players need different names! 🤔');
      return;
    }

    setError('');

    const playerX: Player = player1Mark === 'X'
      ? { name: n1, mark: 'X' }
      : { name: n2, mark: 'X' };

    const playerO: Player = player1Mark === 'O'
      ? { name: n1, mark: 'O' }
      : { name: n2, mark: 'O' };

    onStart({ playerX, playerO });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.titleBlock}>
          <span className={styles.emoji}>🎮</span>
          <h1 className={styles.title}>Tic Tac Toe</h1>
          <p className={styles.subtitle}>Who's playing today?</p>
        </div>

        <div className={styles.players}>
          <div className={styles.playerBox}>
            <label className={styles.label}>Player 1</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter name..."
              maxLength={16}
              value={name1}
              onChange={(e) => { setName1(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <div className={styles.markPicker}>
              <span className={styles.markLabel}>Plays as:</span>
              <div className={styles.markButtons}>
                <button
                  className={`${styles.markBtn} ${styles.markX} ${player1Mark === 'X' ? styles.active : ''}`}
                  onClick={() => setPlayer1Mark('X')}
                >
                  ✕
                </button>
                <button
                  className={`${styles.markBtn} ${styles.markO} ${player1Mark === 'O' ? styles.active : ''}`}
                  onClick={() => setPlayer1Mark('O')}
                >
                  ○
                </button>
              </div>
            </div>
          </div>

          <div className={styles.vs}>VS</div>

          <div className={styles.playerBox}>
            <label className={styles.label}>Player 2</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter name..."
              maxLength={16}
              value={name2}
              onChange={(e) => { setName2(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <div className={styles.markPicker}>
              <span className={styles.markLabel}>Plays as:</span>
              <div className={styles.markAssigned}>
                <span className={player2Mark === 'X' ? styles.assignedX : styles.assignedO}>
                  {player2Mark === 'X' ? '✕' : '○'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className={styles.error} style={{ animation: 'shake 0.4s ease' }}>
            {error}
          </p>
        )}

        <button className={styles.startBtn} onClick={handleStart}>
          Let's Play! 🚀
        </button>
      </div>
    </div>
  );
}
