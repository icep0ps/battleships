import Board from './Board';

class Player {
  public name: string;
  protected board: Board;
  private coordinatesUsed: number[];

  constructor(name: string) {
    this.name = name;
    this.coordinatesUsed = [];
    this.board = new Board();
  }

  placeShip(coordinates: number[]) {
    this.board.shipLocations = coordinates;
  }

  attack(coordinates: number[], board: Board) {
    return board.recieveAttack(coordinates);
  }
}
