import { ship as BattleShip } from './ships-factory';
import { mouseEvents } from './board-setup';

const gameboard = () => {
  const shipCoordinates = [];

  const placeShip = (coordinates1, coordinates2, length) => {
    const carrier = BattleShip(length);
    const shipDetails = {
      ship: carrier,
      location: [],
    };
    for (let i = 0; i < length; i++) {
      let first = coordinates1;
      let sec = coordinates2;
      mouseEvents.horizontal ? (first += i) : (sec += i);
      const posotion = i;
      shipDetails.location.push(`${first},${sec},${posotion}`);
    }
    shipCoordinates.push(shipDetails);
  };
  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      coordinate.location.forEach((coord) => {
        coord.substring(0, 3) == coordinates
          ? coordinate.ship.hit(coord.substring(4))
          : missed.push(coordinates);
      });
      return coordinate.location.some(
        (coord) => coord.substring(0, 3) == coordinates
      );
    });
  };

  const missed = [];

  const allShipsSunk = () => {
    return shipCoordinates.every((x) => x.ship.isSink());
  };

  return { shipCoordinates, placeShip, receiveAttack, allShipsSunk };
};

export { gameboard };
