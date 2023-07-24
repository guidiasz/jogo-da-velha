function getRandomPos(emptySpaces) {
  return { move: emptySpaces[Math.floor(Math.random() * emptySpaces.length)] };
}

function getEmptySpaces(arr) {
  return arr
    .map((cell, index) => {
      if (cell === '') return index;
    })
    .filter((cell) => cell);
}

function isWinner(board, player) {
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

  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === player),
  );
}
function minimax(board, depth, isMaximizingPlayer, playerMark, pcMark) {
  if (isWinner(board, pcMark)) {
    return { score: 10 - depth };
  }
  if (isWinner(board, playerMark)) {
    return { score: depth - 10 };
  }
  if (!board.includes('')) {
    return { score: 0 };
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = pcMark;
        let { score } = minimax(board, depth + 1, false, playerMark, pcMark);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return { score: bestScore, move };
  } else {
    let bestScore = Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = playerMark;
        let { score } = minimax(board, depth + 1, true, playerMark, pcMark);
        board[i] = '';
        if (score < bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return { score: bestScore, move };
  }
}

function getPcMove(moveHistory, gameSettings) {
  const emptySpaces = getEmptySpaces(moveHistory);
  let result;
  if (emptySpaces.length >= 8 || Math.random() < 0.1) {
    result = getRandomPos(emptySpaces);
  } else {
    result = minimax(
      [...moveHistory],
      0,
      true,
      gameSettings.playerOneMark,
      gameSettings.opponentMark,
    );
  }

  const newMoveHistory = [...moveHistory];
  newMoveHistory[result.move] = gameSettings.opponentMark;
  return newMoveHistory;
}

export default getPcMove;
