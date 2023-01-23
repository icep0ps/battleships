import { gameboard } from './gameboard-factory';

const player = (username) => {
  const name = username;
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

const computer = (username) => {
  const name = username;
  const board = gameboard();
  const coordinatesUsed = [];

  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const genarateAttackCoordinates = () => {
    let coordinates = '';
    while (coordinates.length < 2) {
      let coordinate = Math.floor(Math.random() * 10);
      coordinates += coordinate;
    }
    return verifyCoordinates(coordinates);
  };

  const verifyCoordinates = (coordinates) => {
    if (coordinatesUsed.includes(coordinates)) {
      return genarateAttackCoordinates();
    } else {
      coordinatesUsed.push(coordinates);
      return `${coordinates[0]},${coordinates[1]}`;
    }
  };

  const randomize = () => {
    const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      board.placeShip(coordinate1, coordinate2, SHIP_LENGTHS.pop());
    }
  };
  return { board, attack, genarateAttackCoordinates, randomize, name };
};

export { player, computer };
