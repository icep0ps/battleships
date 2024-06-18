import Board from './Board';
import { Playertype } from '../../../types';

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
      const coordiantes = this.generateShipCoordinates(ship.size);
      this.board.placeShip(coordiantes);
    });
  }

  generateShipCoordinates(shipSize: number) {
    const shipCoordinates = [];

    // Adjust filtering to select appropriate starting coordinates
    const coordiantes = this.board.coordinates.filter(
      (coordiante, index, array) => {
        const [positionX, positionY] = coordiante.split(',').map(Number);
        return (
          positionY <= this.board.size - shipSize &&
          this.coordianteSupportsShipSize(coordiante, shipSize)
        );
      }
    );

    // Ensure there are valid coordinates available
    if (coordiantes.length === 0) {
      console.error(
        'No valid coordinates available for placing the ship.',
        this.board.ships[this.board.indexOfUnplacedShip]
      );
      return [];
    }

    // Select a random starting coordinate
    const coordiante =
      coordiantes[Math.floor(Math.random() * coordiantes.length)];

    // Generate coordinates for the current ship
    for (let i = 0; i < shipSize; i++) {
      const [positionX, positionY] = coordiante.split(',').map(Number);
      const currentPositionY = positionY + i;

      const shipCoordinate = `${positionX},${currentPositionY}`;
      shipCoordinates.push(shipCoordinate);
    }

    // Get surrounding coordinates for the entire ship
    const coordiantePlusItsSurroundingGrids = [
      ...new Set(
        shipCoordinates.flatMap((coord) => [
          coord,
          ...this.getCoordinatesSurroundingGrids(coord),
        ])
      ),
    ];

    // Filter out the ship's coordinates and their surroundings
    const coordinatesThatExcludeShipCoordinatesAndTheirSurrounding =
      this.board.coordinates.filter(
        (boardCoordiante) =>
          !coordiantePlusItsSurroundingGrids.includes(boardCoordiante)
      );

    this.board.coordinates =
      coordinatesThatExcludeShipCoordinatesAndTheirSurrounding;

    return shipCoordinates;
  }

  getCoordinatesSurroundingGrids(coordiante: string) {
    const [positionX, positionY] = coordiante.split(',').map(Number);

    const top = `${positionX},${positionY - 1}`;
    const bottom = `${positionX},${positionY + 1}`;
    const left = `${positionX - 1},${positionY}`;
    const right = `${positionX + 1},${positionY}`;
    const topleft = `${positionX - 1},${positionY - 1}`;
    const topright = `${positionX + 1},${positionY - 1}`;
    const bottomleft = `${positionX - 1},${positionY + 1}`;
    const bottomright = `${positionX + 1},${positionY + 1}`;

    return [
      top,
      bottom,
      left,
      right,
      topleft,
      topright,
      bottomleft,
      bottomright,
    ];
  }

  private coordianteSupportsShipSize = (
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
