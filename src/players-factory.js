import { gameboard } from './gameboard-factory';

const player = (arg) => {
  const name = arg;
  const board = gameboard();
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const randomize = () => {
    for (let i = 0; i < 5; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      let shipLength = Math.floor(Math.random() * 5);
      console.log(coordinate1, coordinate2);
      board.placeShip(coordinate1, coordinate2, 3);
    }
  };

  return { board, attack, randomize, name };
};

const computer = {
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
