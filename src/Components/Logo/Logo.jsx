import React from 'react';
import styles from './Logo.module.css';
import OSvg from '/src/Assets/o.svg';
import XSvg from '/src/Assets/x.svg';

const Logo = () => {
  return (
    <div className={styles.logo} aria-label="logo">
      <img src={XSvg} alt="X" />
      <img src={OSvg} alt="O" />
    </div>
  );
};

export default Logo;
