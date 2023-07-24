import React from 'react';
import Modal from '/src/Components/Modal';
import { GameContext } from '../../../Context/GameContext';

const RestartGame = ({ setModal }) => {
  const { refreshAll } = React.useContext(GameContext);

  function closeModal() {
    setModal(false);
  }
  return (
    <Modal
      btnAction1={closeModal}
      btnText1="Não, volte"
      btnAction2={refreshAll}
      btnText2="Sim, reinicie"
    >
      Reiniciar Jogo?
    </Modal>
  );
};

export default RestartGame;
