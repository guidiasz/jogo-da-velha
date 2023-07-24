import React from 'react';
import Logo from '/src/Components/Logo/Logo';
import styles from './Header.module.css';
import { ReactComponent as Cross } from '/src/Assets/x.svg';
import { ReactComponent as Circle } from '/src/Assets/o.svg';
import { ReactComponent as Restart } from '/src/Assets/restart.svg';
import Button from '/src/Components/Button/Button';
import { GameContext } from '../../../Context/GameContext';

const Header = ({ setModal }) => {
  const { turn } = React.useContext(GameContext);

  function handleClick() {
    setModal(true);
  }
  return (
    <>
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <div className={styles.turn}>
          <p>Vez de</p>
          {turn === 'cross' ? <Cross /> : <Circle />}
        </div>
        <Button
          className={styles.button}
          buttonAction={handleClick}
          title={'Reiniciar'}
          color="neutralLight"
        >
          <Restart />
        </Button>
      </header>
    </>
  );
};

export default Header;
