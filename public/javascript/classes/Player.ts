import { Playertype } from '../../../types';
import Board from './Board';
import Game from './Game';

class Player {
  public board: Board;
  private __type__: Playertype;
  private coordinatesUsed: number[];

  constructor(type: Playertype) {
    this.__type__ = type;
    this.board = new Board();
    this.coordinatesUsed = [];
  }

  get type() {
    return this.__type__;
  }
  
  
  
}
export default Player;
