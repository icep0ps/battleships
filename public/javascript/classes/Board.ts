import Ship from './Ship';

export default class Board {
  public size: number;
  private _ships: Ship[];
  public placeables: Ship[];

  constructor(size: number = 8) {
    this.size = size;
    this._ships = [];
    this.placeables = [new Ship(5), new Ship(4), new Ship(3), new Ship(3)];
  }

  set ships(ship: Ship | Ship[]) {
    if (ship instanceof Ship) this._ships.push(ship);
    else this._ships.concat(ship);
  }

  placeShip() {
  
  
  
  }

  recieveAttack(coordinates: number[]) {}
}
