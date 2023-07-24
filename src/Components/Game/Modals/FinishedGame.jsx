import React from 'react';
import styles from './FinishedGame.module.css';
import { ReactComponent as Circle } from '/src/Assets/o.svg';
import { ReactComponent as Cross } from '/src/Assets/x.svg';
import Modal from '/src/Components/Modal';
import { GameContext } from '../../../Context/GameContext';

const FinishedGame = () => {
  const context = React.useContext(GameContext);
  const { refreshAll, refreshStates, winner, gameSettings } = context;
  const modalProps = {
    btnText1: 'Sair',
    btnAction1: refreshAll,
    btnText2: '+1 Round',
    btnAction2: refreshStates,
  };

  if (winner.name === 'none') {
    return <Modal {...modalProps}>Round empatado</Modal>;
  }

  if (gameSettings.opponent === 'pc') {
    modalProps.secondaryMessage = winner.name === 'p1' ? 'Você venceu!' : 'Vish, você perdeu...';
  } else {
    modalProps.secondaryMessage = winner.name === 'p1' ? 'Jogador 1 venceu' : 'Jogador 2 venceu';
  }

  return (
    <Modal {...modalProps}>
      <div className={styles.winner} title={winner.mark === 'cross' ? 'cruz' : 'círculo'}>
        {winner.mark === 'cross' ? <Cross /> : <Circle />}
        <h3 className={styles[winner.mark]}>ganhou o round</h3>
      </div>
    </Modal>
  );
};

export default FinishedGame;
