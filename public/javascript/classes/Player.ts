import { Playertype } from '../../../types';
import Board from './Board';
import Game from './Game';

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

  occupiedCoordinates() {
    const coordiantes = this.board.ships.map((ship) =>
      ship.coordinates.map((coordinate) => coordinate.value)
    );

    const allShipsCoordinates = coordiantes.reduce((prev, current) =>
      prev.concat(current)
    );

    return allShipsCoordinates
      .map((coordiante) => [
        coordiante,
        ...this.getCoordinatesSurroundingGrids(coordiante),
      ])
      .reduce((prev, current) => prev.concat(current), []);
  }

  public placeShips() {
    this.board.ships.forEach((ship) => {
      const coordiantes = this.generateShipCoordinates();
      this.board.placeShip(coordiantes);
    });
  }

  generateShipCoordinates() {
    const shipCoordinates = [];
    const shipSize = this.board.ships[this.board.placedships].size;

    // Adjust filtering to select appropriate starting coordinates
    const coordiantes = this.board.coordinates.filter(
      (coordiante, index, array) => {
        const [positionX, positionY] = coordiante.split(',').map(Number);
        return (
          positionY <= this.board.size - shipSize &&
          this.coordianteSupportsShipSize(coordiante)
        );
      }
    );

    // Ensure there are valid coordinates available
    if (coordiantes.length === 0) {
      console.error(
        'No valid coordinates available for placing the ship.',
        this.board.ships[this.board.placedships]
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

  private coordianteSupportsShipSize = (coordinate: string) => {
    if (!coordinate) return false;
    const nextShipCoordinates = [];
    const shipsSize = this.board.ships[this.board.placedships].size;

    for (let i = 0; i < shipsSize; i++) {
      const [positionX, positionY] = coordinate.split(',').map(Number);
      const nextPositionY = positionY + i;
      nextShipCoordinates.push(`${positionX},${nextPositionY}`);
    }

    return nextShipCoordinates.every((coord) =>
      this.board.coordinates.includes(coord)
    );
  };

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
}
export default Player;
