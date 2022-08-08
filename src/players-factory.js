import { gameboard } from './gameboard-factory';

const player = (arg) => {
  const name = arg;
  const board = gameboard();
  const attack = (coordinates, enemyBoard) => {
    return enemyBoard.receiveAttack(coordinates);
  };

  const randomize = () => {
    for (let i = 5; i > 0; i--) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      if (i == 3) {
        for (let x = 0; x < 2; x++) {
          board.placeShip(coordinate1, coordinate2, 3);
        }
      } else {
        board.placeShip(coordinate1, coordinate2, i);
      }
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
      return genarateCoordinates();
    } else {
      coordinatesUsed.push(arr);
      console.log(`${arr[0]},${arr[1]}`);
      return arr[0] + ',' + arr[1];
    }
  };
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const randomize = () => {
    const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      board.placeShip(coordinate1, coordinate2, SHIP_LENGTHS.pop());
    }
  };
  return { board, attack, genarateCoordinates, randomize, name };
};

export { player, computer };
