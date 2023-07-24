import React from 'react';
import styles from './Button.module.css';

const Button = ({ color, children, title, id, buttonAction }) => {
  const attributes = {
    className: `${styles.button} ${styles[color]}`,
  };
  if (title) {
    attributes.title = title;
    attributes.className += ' ' + styles.iconButton;
  }
  if (id) {
    attributes.id = id;
  }

  function handleClick({ currentTarget }) {
    currentTarget.blur();
    buttonAction(currentTarget);
  }

  return (
    <button onClick={handleClick} {...attributes}>
      {children}
    </button>
  );
};

export default Button;
