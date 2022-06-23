import { gameboard } from './gameboard-factory';

const player = (name) => {
  const playerName = name;
  const turn = true;
  const board = gameboard;
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);
  return { playerName, turn, board, attack };
};

const computer = {
  turn: false,
  board: gameboard,
  genarateCoordinates: () => {
    let arr = [];
    while (arr.length < 2) {
      let r = Math.floor(Math.random() * 10) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    verify(arr);
  },
  coordinatesUsed: [],
  verify: (arr) => {
    if (coordinatesUsed.includes(arr)) {
      genarateCoordinates();
    } else {
      coordinatesUsed.push(arr);
      return arr;
    }
  },
  attack: (coordinates, enemyBoard) => enemyBoard.receiveAttack(coordinates),
};

export { player, computer };
