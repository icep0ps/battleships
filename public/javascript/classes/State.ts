import { isDeepStrictEqual } from 'util';
import { GameStatus } from '../../../types';
import Computer from './Enemy';
import Player from './Player';

type status = 'status';
type current = 'current';

type keys = status | current;

class State {
  status: GameStatus;

  current: {
    player: Player;
    enemey: Player;
  };
  constructor() {
    this.status = 'PLAYERS-SETUP';
    this.current = {
      enemey: new Computer(),
      player: new Player('PLAYER'),
    };
  }

  setState<T extends keys>(
    property: T,
    value: T extends 'status' ? GameStatus : { player: Player; enemy: Player }
  ): void {
    this[property] = value as any;
  }
}
export default State;
