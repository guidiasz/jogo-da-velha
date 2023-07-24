import React from 'react';
import Cell from './Cell';
import styles from './Board.module.css';
import { GameContext } from '../../../Context/GameContext';

const Board = () => {
  const { moveHistory, winner } = React.useContext(GameContext);

  return (
    <section className={styles.board}>
      {moveHistory.map((mark, index) => (
        <Cell
          key={index}
          id={index}
          cellMark={mark}
          highlight={winner && winner.combo.includes(index) ? true : false}
        ></Cell>
      ))}
    </section>
  );
};

export default Board;
