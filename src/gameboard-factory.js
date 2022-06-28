import { ship as BattleShip } from './ships-factory';

const gameboard = () => {
  const shipCoordinates = [];

  const placeShip = (coordinates1, coordinates2, length) => {
    const carrier = BattleShip(length);
    const shipDetails = {
      ship: carrier,
      location: [`${coordinates1},${coordinates2}`],
    };
    shipCoordinates.push(shipDetails);
  };
  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      if (coordinate.location == coordinates) {
        coordinate.ship.hit(1);
        return true;
      } else {
        missed.push(coordinates);
        return false;
      }
    });
  };

  const missed = [];

  const allShipsSunk = () => {
    return shipCoordinates.every((x) => x.ship.isSink());
  };

  return { shipCoordinates, placeShip, receiveAttack, allShipsSunk };
};

export { gameboard };
