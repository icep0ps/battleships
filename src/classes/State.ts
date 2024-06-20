import Player from './Player';
import Computer from './Enemy';
import { GameStatus } from '../../types';

type status = 'status';
type current = 'current';
type keys = status | current;

class State {
  status: GameStatus;

  current: {
    player: Player;
    enemy: Computer;
  };

  players: {
    player: Player;
    enemy: Computer;
  };

  constructor() {
    this.status = 'PLAYERS-SETUP';
    this.current = {
      enemy: new Computer(),
      player: new Player('PLAYER'),
    };

    this.players = {
      enemy: new Computer(),
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
