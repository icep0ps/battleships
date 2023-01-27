import { gameboard } from './gameboard-factory';
import { MAX_BOARD_LENGTH } from '../board-setup';

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

  const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
  const randomize = () => {
    while (SHIP_LENGTHS.length !== 0) {
      console.log(SHIP_LENGTHS);
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      isValidComputerPlacement(coordinate1, coordinate2);
    }
  };

  const isCollidingWithOtherShip = (coordinate1, coordinate2) => {
    const finalInvalidCoordinates = [];

    const allShipLocations = board.shipCoordinates.map((ship) => ship.location);
    for (let locations of allShipLocations) {
      locations.map((location) => {
        finalInvalidCoordinates.push(location.substring(0, 3));
      });
    }

    return finalInvalidCoordinates.includes(`${coordinate1},${coordinate2}`);
  };

  const isValidComputerPlacement = (coordinate1, coordinate2) => {
    const position = true;
    let TOTAL_SPACE_OCCUPIED = 0;
    if (SHIP_LENGTHS.length > 0) {
      const currentShipLength = SHIP_LENGTHS.shift();
      let coordinateY = coordinate1;
      let coordinateX = coordinate2;

      const SHIP_IS_NOT_COLLIDIING = function () {
        if (position) {
          TOTAL_SPACE_OCCUPIED = coordinateY + currentShipLength;
        } else {
          TOTAL_SPACE_OCCUPIED = coordinateX + currentShipLength;
        }
        (TOTAL_SPACE_OCCUPIED <= MAX_BOARD_LENGTH) &
          console.log(TOTAL_SPACE_OCCUPIED);
        return (
          TOTAL_SPACE_OCCUPIED <= MAX_BOARD_LENGTH &&
          !isCollidingWithOtherShip(coordinate1, coordinate2)
        );
      };
      let ship_is_colliding = !SHIP_IS_NOT_COLLIDIING();
      while (ship_is_colliding) {
        coordinateY = Math.floor(Math.random() * 10);
        coordinateX = Math.floor(Math.random() * 10);
        ship_is_colliding = !SHIP_IS_NOT_COLLIDIING;
        console.log('-------genarating new coordinates------');
      }
      console.log(coordinateY, coordinateX, currentShipLength);
      board.placeShip(coordinateY, coordinateX, currentShipLength);
    }
  };

  return { board, attack, genarateAttackCoordinates, randomize, name };
};

export { player, computer };
