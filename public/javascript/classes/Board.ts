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

    this._ships[this.placedships].coordinates = coordinates;
    this.placedships++;
  }

  recieveAttack(coordinates: number[]) {}
}
