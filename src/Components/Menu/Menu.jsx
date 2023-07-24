import React from 'react';
import styles from './Menu.module.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Switch from './Switch';
import { GameContext } from '../../Context/GameContext';

const Menu = () => {
  const { changeGameSettings } = React.useContext(GameContext);

  const [playerOneMark, setPlayerOneMark] = React.useState('cross');

  function handleClick(target) {
    const opponent = target.getAttribute('id');
    const settings = {
      playerOneMark,
      opponent,
    };
    changeGameSettings(settings.playerOneMark, settings.opponent);
  }

  return (
    <section className={styles.menu + ' scaleUp container'}>
      <Logo />
      <div className={styles.choseMark}>
        <h2 className="title">Sinal do player 1</h2>
        <Switch radio={playerOneMark} setRadio={setPlayerOneMark} />
        <p>Lembre-se: X começa</p>
      </div>
      <div className={styles.buttons}>
        <Button buttonAction={handleClick} id={'pc'} color="accent2">
          Novo jogo (vs PC)
        </Button>
        <Button buttonAction={handleClick} id={'p2'} color="accent1">
          Novo jogo (vs Player)
        </Button>
      </div>
    </section>
  );
};

export default Menu;
