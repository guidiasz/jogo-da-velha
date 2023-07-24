import React from 'react';
import styles from './Switch.module.css';
import { ReactComponent as Circle } from '../../Assets/o.svg';
import { ReactComponent as Cross } from '../../Assets/x.svg';

const Switch = ({ radio, setRadio }) => {
  function handleChange({ currentTarget }) {
    setRadio(currentTarget.value);
  }
  return (
    <form className={styles.switch}>
      <label aria-label="Cruz">
        <input type="radio" value="cross" checked={radio === 'cross'} onChange={handleChange} />
        <Cross className={styles.icon} />
      </label>
      <label aria-label="Círculo">
        <input type="radio" value="circle" checked={radio === 'circle'} onChange={handleChange} />
        <Circle className={styles.icon} />
      </label>
    </form>
  );
};

export default Switch;
