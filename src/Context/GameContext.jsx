import React from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';
import getPcMove from './pcMove.js';

export const GameContext = React.createContext();

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const oppositeMarkMap = {
  cross: 'circle',
  circle: 'cross',
};

const ACTIONS = {
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
  SET_WINNER: 'SET_WINNER',
  SET_GAME_SETTINGS: 'SET_GAME_SETTINGS',
  SET_TURN: 'SET_TURN',
  SET_MOVE_HISTORY: 'SET_MOVE_HISTORY',
};

const initialState = {
  winner: null,
  gameSettings: null,
  turn: 'cross', //cross ||circle
  moveHistory: Array(9).fill(''), //''||cross||circle
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INITIAL_STATE:
      return { ...initialState };
    case ACTIONS.SET_WINNER:
      return { ...state, winner: action.payload };
    case ACTIONS.SET_GAME_SETTINGS:
      return { ...initialState, gameSettings: action.payload };
    case ACTIONS.SET_TURN:
      return { ...state, turn: action.payload };
    case ACTIONS.SET_MOVE_HISTORY:
      return { ...state, moveHistory: action.payload };
    default:
      return state;
  }
};

export const GameState = ({ children }) => {
  const { incrementKey, resetKeys } = useLocalStorage();
  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const { winner, gameSettings, turn, moveHistory } = state;

  function refreshStates() {
    dispatch({ type: ACTIONS.SET_INITIAL_STATE });
    changeGameSettings(gameSettings.playerOneMark, gameSettings.opponent);
  }

  function refreshAll() {
    refreshStates();
    dispatch({ type: ACTIONS.SET_GAME_SETTINGS, payload: null });
    resetKeys();
  }

  // {
  //   playerOneMark: '', //cross || circle
  //   opponent: '', //pc || p2
  //   opponentMark: '', //cross || circle
  // }
  function changeGameSettings(playerOneMark, opponent) {
    const opponentMark = oppositeMarkMap[playerOneMark];
    const settings = { playerOneMark, opponent, opponentMark };
    dispatch({ type: ACTIONS.SET_GAME_SETTINGS, payload: settings });
    if (opponent === 'pc' && opponentMark === 'cross') {
      pcMove(Array(9).fill(''), settings);
    }
  }

  // {
  //   name: '',//pc||p1||p2||none
  //   mark: '',//cross||circle||none
  //   combo: [],//e.g:[1,2,3]. Empty arr means draw
  // }
  function changeWinner(name, mark, combo) {
    dispatch({ type: ACTIONS.SET_WINNER, payload: { name, mark, combo } });
  }

  function pcMove(oldMoveHistory, gameSettings) {
    if (gameSettings.opponent !== 'pc') return;
    const newMoveHistory = getPcMove(oldMoveHistory, gameSettings);
    const newTurn = gameSettings.playerOneMark;
    dispatch({ type: ACTIONS.SET_TURN, payload: newTurn });
    dispatch({ type: ACTIONS.SET_MOVE_HISTORY, payload: newMoveHistory });
    checkGameResult(newMoveHistory);
  }

  function move(index) {
    const newMoveHistory = [...moveHistory];
    newMoveHistory[index] = turn;
    dispatch({ type: ACTIONS.SET_MOVE_HISTORY, payload: newMoveHistory });

    const newTurn = oppositeMarkMap[turn];
    dispatch({ type: ACTIONS.SET_TURN, payload: newTurn });

    const gameOver = checkGameResult(newMoveHistory);
    if (!gameOver) {
      pcMove(newMoveHistory, gameSettings);
    }
  }

  function checkVictory(combo, newMoveHistory) {
    const marks = ['cross', 'circle'];
    let winnerMark = '';

    const hasWinner = marks.some((mark) => {
      const victory = combo.every((cellIndex) => newMoveHistory[cellIndex] === mark);
      if (!victory) return false;

      winnerMark = mark;
      const name = gameSettings.playerOneMark === mark ? 'p1' : gameSettings.opponent;
      changeWinner(name, mark, combo);
      return victory;
    });
    return { hasWinner, winnerMark };
  }

  function checkDraw(newMoveHistory) {
    if (newMoveHistory.includes('')) return false;
    changeWinner('none', 'none', []);
    incrementKey('ties');
    return true;
  }

  function checkGameResult(newMoveHistory) {
    const gameOver = winningCombinations.some((combo) => {
      const result = checkVictory(combo, newMoveHistory);
      if (result.hasWinner) {
        incrementKey(result.winnerMark);
        return true;
      }
      return false;
    });

    if (!gameOver) {
      return checkDraw(newMoveHistory);
    }

    return gameOver;
  }

  return (
    <GameContext.Provider
      value={{
        gameSettings,
        changeGameSettings,
        moveHistory,
        move,
        turn,
        winner,
        refreshAll,
        refreshStates,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
