import { Playertype } from '../../../types';
import Board from './Board';
import Game from './Game';

class Player {
  public board: Board;
  private __type__: Playertype;
  private coordinates: string[];

  constructor(type: Playertype) {
    this.__type__ = type;
    this.board = new Board();
    this.coordinates = [];
  }

  get type() {
    return this.__type__;
  }

  public placeShips() {
    this.board.ships.forEach((ship) => {
      const coordiantes = this.generateShipCoordinates();
      this.board.placeShip(coordiantes);
    });
  }

  generateShipCoordinates() {
    const boardSize = this.board.size - 1;
    const shipSize = this.board.ships[this.board.placedships].size;
    const shipCoordinates = [];

    const max = boardSize - shipSize;
    let xaxis = Math.floor(Math.random() * boardSize);
    let yaxis = Math.floor(Math.random() * max);
    let intialCoordiantes = `${xaxis},${yaxis}`;
    let adjecentCoordinates = `${xaxis + 1},${yaxis + 1}`;

    while (
      this.coordinates.includes(intialCoordiantes) ||
      this.coordinates.includes(adjecentCoordinates)
    ) {
      xaxis = Math.floor(Math.random() * boardSize);
      yaxis = Math.floor(Math.random() * max);
      intialCoordiantes = `${xaxis},${yaxis}`;
      adjecentCoordinates = `${xaxis + 1},${yaxis + 1}`;
    }

    for (let i = 0; i < shipSize; i++) {
      const coordiante = `${xaxis},${yaxis + i}`;
      shipCoordinates.push(coordiante);
      this.coordinates.push(coordiante);
    }
    return shipCoordinates;
  }
}
export default Player;
