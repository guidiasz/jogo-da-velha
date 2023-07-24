import React from 'react';
import Modal from '.';

const RestartGame = ({ setModal, refreshAll }) => {
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
