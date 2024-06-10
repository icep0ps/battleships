import Player from './Player';
import DisplayController from './Display';
import { GameEvent, GameStatus, Playertype } from '../../../types';

class Game {
  static players: {
    player: Player;
    enemy: Player;
  } = {
    enemy: new Player('ENEMY'),
    player: new Player('PLAYER'),
  };

  static controllers = {
    display: new DisplayController(),
  };

  static initialize() {
    Game.controllers.display.render.setupboard();
  }

  static notify({ event, player }: { event: GameEvent; player: Playertype }) {
    switch (event) {
      case 'BOARD_CREATION':
        if (player === 'PLAYER') {
          const player = Game.players.player;
          if (player) Game.controllers.display.render.setupboard();
          else throw Error('Could not find player');
        }

        break;
    }
  }
}

export default Game;
