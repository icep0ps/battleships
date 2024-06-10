import Ship from './Ship';
import Game from './Game';
import { Playertype } from '../../../types';
export default class Board {
  public size: number;
  private _ships: Ship[];

  constructor(size: number = 8) {
    this.size = size;
    this._ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3)];
  }

  get ships() {
    return this._ships;
  }

  placeShip(ship: Ship, coordinates: string) {
    ship.coordinates = coordinates;
  }

  recieveAttack(coordinates: number[]) {}
}
