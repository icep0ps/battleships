import Player from './Player';
import DisplayController from './Display';

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
    const board = Game.controllers.display.render.setupboard();
    Game.events.highlight(board);
    Game.events.placeShip(board);
  }

  static start() {
    document.getElementById('setup')?.remove();
    Game.controllers.display.render.gameboards();
    Game.players.player.board.ships.forEach((ship) => {
      Game.controllers.display.render.ship(ship.coordinates);
    });
  }

  static events = {
    highlight(board: HTMLDivElement) {
      board.querySelectorAll('.grid').forEach((grid) => {
        if (grid instanceof HTMLDivElement) {
          grid.addEventListener(
            'mouseenter',
            Game.controllers.display.highlight.add
          );

          grid.addEventListener(
            'mouseleave',
            Game.controllers.display.highlight.remove
          );
        }
      });
    },

    placeShip(board: HTMLDivElement) {
      const player = Game.players.player;

      board.querySelectorAll('.grid').forEach((grid) => {
        if (grid instanceof HTMLDivElement)
          grid.addEventListener('click', () => {
            if (Game.players.player.board.allShipsArePlaced()) {
              Game.start();
              return;
            }
            const coordiantes: string[] = [];
            DisplayController.getShipGrids(
              grid,
              player.board.ships[player.board.placedships]
            ).forEach((grid) => {
              const coordinate = grid.dataset.coordinates;
              if (coordinate) coordiantes.push(coordinate);
            });
            player.board.placeShip(coordiantes);
            Game.controllers.display.render.ship(coordiantes);
          });
      });
    },
  };
}

export default Game;
