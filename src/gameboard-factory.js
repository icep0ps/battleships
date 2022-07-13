import { mouseEvents } from './board-setup';
import { ship as BattleShip } from './ships-factory';

const gameboard = () => {
  const missedAttacks = [];
  const shipCoordinates = [];

  const placeShip = (COORDINATE_ONE, COORDINATE_TWO, SHIP_LENGTH) => {
    const shipDetails = {
      ship: BattleShip(SHIP_LENGTH),
      location: [],
    };
    for (
      let currentPosition = 0;
      currentPosition < SHIP_LENGTH;
      currentPosition++
    ) {
      let firstCoordinate = COORDINATE_ONE;
      let secondCoordinate = COORDINATE_TWO;
      console.log('clicked');
      mouseEvents.getisHorizontal()
        ? (firstCoordinate += currentPosition)
        : (secondCoordinate += currentPosition);

      const shipPosotion = currentPosition;
      shipDetails.location.push(
        `${firstCoordinate},${secondCoordinate},${shipPosotion}`
      );
    }
    shipCoordinates.push(shipDetails);
  };

  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      coordinate.location.forEach((location) => {
        location.substring(0, 3) == coordinates
          ? coordinate.ship.hit(location.substring(4))
          : missedAttacks.push(coordinates);
      });
      return coordinate.location.some(
        (coordinate) => coordinate.substring(0, 3) == coordinates
      );
    });
  };

  const allShipsSunk = () => {
    return shipCoordinates.every((ship) => ship.ship.isSink());
  };

  return {
    shipCoordinates,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

export { gameboard };
