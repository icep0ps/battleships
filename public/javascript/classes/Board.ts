export default class Board {
  private _shipLocations: number[][];

  constructor() {
    this._shipLocations = [];
  }

  set shipLocations(coordinates: number[]) {
    this._shipLocations.push(coordinates);
  }

  recieveAttack(coordinates: number[]) {}
}
