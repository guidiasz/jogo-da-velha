import React from 'react';
import styles from './Score.module.css';
import useLocalStorage from '/src/Hooks/useLocalStorage';
import { GameContext } from '../../../Context/GameContext';

const Score = () => {
  const context = React.useContext(GameContext);
  const { gameSettings } = context;

  const labels = {
    [gameSettings.playerOneMark]: gameSettings.opponent === 'pc' ? 'Você' : 'P1',
    [gameSettings.opponentMark]: gameSettings.opponent,
  };

  const { getKey } = useLocalStorage();
  return (
    <section className={styles.score}>
      <div className={styles.cross + ' ' + styles.card}>
        <h3 className={styles.title}>X ({labels['cross']})</h3>
        <span>{getKey('cross')}</span>
      </div>
      <div className={styles.ties + ' ' + styles.card}>
        <h3 className={styles.title}>Empates</h3>
        <span>{getKey('ties')}</span>
      </div>
      <div className={styles.circle + ' ' + styles.card}>
        <h3 className={styles.title}>O ({labels['circle']})</h3>
        <span>{getKey('circle')}</span>
      </div>
    </section>
  );
};

export default Score;
