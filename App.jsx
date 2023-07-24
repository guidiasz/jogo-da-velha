import React from 'react';
import './reset.css';
import './App.css';
import Menu from '/src/Components/Menu/Menu';
import Game from '/src/Components/Game/Game';

import useLocalStorage from '/src/Hooks/useLocalStorage';
import { GameContext } from '/src/Context/GameContext';

const App = () => {
  const { gameSettings } = React.useContext(GameContext);
  const { setLocalStorage } = useLocalStorage();

  React.useEffect(() => {
    setLocalStorage();
  }, [setLocalStorage]);

  return <main className="App">{gameSettings ? <Game /> : <Menu />}</main>;
};

export default App;
