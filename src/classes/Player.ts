import Board from './Board';
import { Playertype } from '../../types';
import getCoordinatesSurroundingGrids from '../utils/getCoordinatesSurroundingGrids';

class Player {
  public board: Board;
  private __type__: Playertype;

  constructor(type: Playertype) {
    this.__type__ = type;
    this.board = new Board();
  }

  get type() {
    return this.__type__;
  }

  placeShips() {
    this.board.ships.forEach((ship) => {
      const coordinates = this.generateShipCoordinates(ship.size);
      this.board.placeShip(coordinates);
    });
  }

  generateShipCoordinates(shipSize: number) {
    const shipCoordinates = [];

    // Adjust filtering to select appropriate starting coordinates
    const coordinates = this.board.coordinates.filter(
      (coordinate, index, array) => {
        const [positionX, positionY] = coordinate.split(',').map(Number);
        return (
          positionY <= this.board.size - shipSize &&
          this.coordinateSupportsShipSize(coordinate, shipSize)
        );
      }
    );

    // Ensure there are valid coordinates available
    if (coordinates.length === 0) {
      window.alert('No valid coordinates available for placing the ship.');
      console.error(
        'No valid coordinates available for placing the ship.',
        this.board.ships[this.board.indexOfUnplacedShip]
      );
      return [];
    }

    // Select a random starting coordinate
    const coordinate =
      coordinates[Math.floor(Math.random() * coordinates.length)];

    // Generate coordinates for the current ship
    for (let i = 0; i < shipSize; i++) {
      const [positionX, positionY] = coordinate.split(',').map(Number);
      const currentPositionY = positionY + i;

      const shipCoordinate = `${positionX},${currentPositionY}`;
      shipCoordinates.push(shipCoordinate);
    }

    // Get surrounding coordinates for the entire ship
    const coordinatePlusItsSurroundingGrids = [
      ...new Set(
        shipCoordinates.flatMap((coord) => [
          coord,
          ...getCoordinatesSurroundingGrids(coord),
        ])
      ),
    ];

    // Filter out the ship's coordinates and their surroundings
    const coordinatesThatExcludeShipCoordinatesAndTheirSurrounding =
      this.board.coordinates.filter(
        (boardCoordinate) =>
          !coordinatePlusItsSurroundingGrids.includes(boardCoordinate)
      );

    this.board.coordinates =
      coordinatesThatExcludeShipCoordinatesAndTheirSurrounding;

    return shipCoordinates;
  }

  private coordinateSupportsShipSize = (
    coordinate: string,
    shipSize: number
  ) => {
    if (!coordinate) return false;
    const nextShipCoordinates = [];

    for (let i = 0; i < shipSize; i++) {
      const [positionX, positionY] = coordinate.split(',').map(Number);
      const nextPositionY = positionY + i;
      nextShipCoordinates.push(`${positionX},${nextPositionY}`);
    }

    return nextShipCoordinates.every((coord) =>
      this.board.coordinates.includes(coord)
    );
  };
}
export default Player;
