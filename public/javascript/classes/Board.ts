import Coordiante from './Coordinate';
import Ship from './Ship';
export default class Board {
  public size: number;
  private _ships: Ship[];
  public placedships: number;

  constructor(size: number = 8) {
    this.size = size;
    this.placedships = 0;
    this._ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3)];
  }

  get ships() {
    return this._ships;
  }

  allShipsArePlaced() {
    return this.placedships === this._ships.length;
  }

  placeShip(coordinates: string[]) {
    if (this.placedships === this._ships.length) {
      throw new Error('All ships have been placed');
    }

    this._ships[this.placedships].coordinates = coordinates.map(
      (coordinate) => new Coordiante(coordinate)
    );

    this.placedships++;
  }

  recieveAttack(coordinates: string) {
    let coordianteIsHit: boolean = false;

    this._ships.forEach((ship) => {
      const coordiante = ship.coordinates.filter(
        (coordinate) => coordinate.value === coordinates
      )[0];

      if (coordiante) {
        coordiante.hit = true;
        coordianteIsHit = true;
      }
    });

    return coordianteIsHit;
  }

  allShipsAreDestroyed() {
    return this._ships.every((ship) => ship.destroyed());
  }
}
