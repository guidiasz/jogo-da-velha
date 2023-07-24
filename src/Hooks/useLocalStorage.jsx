import React from 'react';
const useLocalStorage = () => {
  const setLocalStorage = React.useCallback(() => {
    if (!localStorage.getItem('cross')) {
      localStorage.setItem('cross', 0);
    }
    if (!localStorage.getItem('circle')) {
      localStorage.setItem('circle', 0);
    }
    if (!localStorage.getItem('ties')) {
      localStorage.setItem('ties', 0);
    }
    resetKeys();
  }, []);

  function incrementKey(key) {
    const lastValue = parseInt(localStorage.getItem(key));
    localStorage.setItem(key, lastValue + 1);
  }
  function getKey(key) {
    return localStorage.getItem(key);
  }

  function resetKeys() {
    localStorage.setItem('cross', 0);
    localStorage.setItem('circle', 0);
    localStorage.setItem('ties', 0);
  }
  return { setLocalStorage, resetKeys, getKey, incrementKey };
};

export default useLocalStorage;
