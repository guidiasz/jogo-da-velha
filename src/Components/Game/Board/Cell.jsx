import React from 'react';
import styles from './Cell.module.css';
import { ReactComponent as Cross } from '/src/Assets/x.svg';
import { ReactComponent as Circle } from '/src/Assets/o.svg';
import { GameContext } from '../../../Context/GameContext';

const Cell = ({ cellMark, id, highlight }) => {
  const { move, turn } = React.useContext(GameContext);

  function handleClick({ currentTarget }) {
    currentTarget.blur();
    if (cellMark !== '') return;
    currentTarget.classList.add(styles.disabled);
    move(id);
  }

  function getMarkIcon() {
    if (cellMark === '') {
      return turn === 'cross' ? <Cross /> : <Circle />;
    }
    if (cellMark === 'cross') {
      return <Cross />;
    }
    return <Circle />;
  }

  const attributes = {
    id,
    onClick: handleClick,
    'aria-label': 'empty',
    className: styles.cell + ` ${highlight ? styles.highlight : ''}`,
  };
  if (cellMark !== '') {
    attributes['aria-label'] = cellMark;
    attributes.className += ` ${styles.disabled}`;
    attributes.tabIndex = -1;
  }

  return <button {...attributes}>{getMarkIcon()}</button>;
};

export default Cell;
