import { gameboard } from './gameboard-factory';

const player = (arg) => {
  const name = arg;
  const board = gameboard();
  const attack = (coordinates, enemyBoard) => {
    return enemyBoard.receiveAttack(coordinates);
  };

  const randomize = () => {
    for (let i = 0; i < 5; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      let shipLength = Math.floor(Math.random() * 5);
      board.placeShip(coordinate1, coordinate2, 3);
    }
  };

  return { board, attack, randomize, name };
};

const computer = (user) => {
  const board = gameboard();
  const name = user;
  const genarateCoordinates = () => {
    let arr = '';
    while (arr.length < 2) {
      let r = Math.floor(Math.random() * 10);
      arr += r;
    }
    return verify(arr);
  };
  const coordinatesUsed = [];
  const verify = (arr) => {
    if (coordinatesUsed.includes(arr)) {
      genarateCoordinates();
    } else {
      coordinatesUsed.push(arr);

      return `${arr[0]},${arr[1]}`;
    }
  };
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const randomize = () => {
    for (let i = 0; i < 5; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      let shipLength = Math.floor(Math.random() * 5);
      board.placeShip(coordinate1, coordinate2, 1);
    }
  };
  return { board, attack, genarateCoordinates, randomize, name };
};

export { player, computer };
