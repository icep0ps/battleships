import Coordinate from './Coordinate';
import Ship from './Ship';
export default class Board {
  public size: number;
  private __ships__: Ship[];
  private __coordinates__: string[];

  constructor(size: number = 10) {
    this.size = size;
    this.__coordinates__ = this.generateCoordinates();
    this.__ships__ = [
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(1),
    ];
  }

  get ships() {
    return this.__ships__;
  }

  get coordinates() {
    return this.__coordinates__;
  }

  set coordinates(coordinates: string[]) {
    this.__coordinates__ = coordinates;
  }

  set ships(ships: Ship[]) {
    this.__ships__ = ships;
  }

  get indexOfUnplacedShip() {
    return this.__ships__.findIndex((ship) => ship.coordinates.length === 0);
  }

  allShipsArePlaced() {
    return this.__ships__.every(
      (ship) => ship.coordinates.length === ship.size
    );
  }

  placeShip(coordinates: string[]) {
    if (this.indexOfUnplacedShip === undefined)
      throw new Error('Failed to place ship: All board ships have been placed');

    this.__ships__[this.indexOfUnplacedShip].coordinates = coordinates.map(
      (coordinate) => new Coordinate(coordinate)
    );
  }

  recieveAttack(coordinates: string): null | Ship {
    let shipHit = null;

    this.__ships__.forEach((ship) => {
      const coordinate = ship.coordinates.filter(
        (coordinate) => coordinate.value === coordinates
      )[0];

      if (coordinate) {
        coordinate.hit = true;
        shipHit = ship;
      }
    });

    return shipHit;
  }

  allShipsAreDestroyed() {
    return this.__ships__.every((ship) => ship.isDestroyed());
  }

  generateCoordinates() {
    const coordinates: string[] = [];
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        coordinates.push(x.toString() + ',' + y.toString());
      }
    }

    return coordinates;
  }
}
