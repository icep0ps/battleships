import { ship as BattleShip } from './ships-factory';

const gameboard = () => {
  const shipCoordinates = [];

  const placeShip = (coordinates) => {
    const carrier = BattleShip(3);
    const shipDetails = {
      ship: carrier,
      location: coordinates,
    };
    shipCoordinates.push(shipDetails);
  };
  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      if (
        coordinate.location[0] == coordinates[0] &&
        coordinate.location[1] == coordinates[1]
      ) {
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
    return shipCoordinates.every((shipDetail) => {
      shipDetail.ship.isSink() == true;
    });
  };

  return { shipCoordinates, placeShip, receiveAttack };
};

export { gameboard };
