import React, { useCallback } from 'react';
import Header from './Header/Header';
import Board from './Board/Board';
import Score from './Score/Score';
import FinishedGame from './Modals/FinishedGame';
import RestartGame from './Modals/RestartGame';
import styles from './Game.module.css';
import { GameContext } from '../../Context/GameContext';

const Game = () => {
  const context = React.useContext(GameContext);
  const { winner } = context;
  const [restartModal, setRestartModal] = React.useState(false);
  return (
    <>
      <section className={styles.game + ' scaleUp container'}>
        <Header setModal={setRestartModal} />
        <Board />
        <Score />
      </section>
      {winner ? <FinishedGame /> : null}
      {restartModal && <RestartGame setModal={setRestartModal} />}
    </>
  );
};

export default Game;
