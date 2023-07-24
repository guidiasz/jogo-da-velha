import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameState } from './src/Context/GameContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameState>
      <App />
    </GameState>
  </React.StrictMode>,
);
