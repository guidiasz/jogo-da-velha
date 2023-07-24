import React from 'react';
import styles from './Modal.module.css';
import Button from '/src/Components/Button/Button';

const Modal = ({
  secondaryMessage,
  children: mainMessage,
  btnText1,
  btnAction1,
  btnAction2,
  btnText2,
}) => {
  return (
    <section className={styles.modal}>
      <div className={styles.box + ' scaleUp'}>
        {secondaryMessage && <p>{secondaryMessage}</p>}
        <div className={styles.mainMessage}>{mainMessage}</div>
        <div className={styles.buttons}>
          <Button buttonAction={btnAction1} color={'neutralLight'}>
            {btnText1}
          </Button>
          <Button buttonAction={btnAction2} color={'accent2'}>
            {btnText2}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
