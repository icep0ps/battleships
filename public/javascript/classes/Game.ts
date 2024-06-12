import Player from './Player';
import Computer from './Enemy';
import DisplayController from './Display';

class Game {
  static players: {
    player: Player;
    enemy: Computer;
  } = {
    enemy: new Computer(),
    player: new Player('PLAYER'),
  };

  static state = {
    currentPlayer: Game.players.player,
    isGameOver: false,
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
      Game.controllers.display.render.ship(
        'player',
        ship.coordinates.map((coordiante) => coordiante.value)
      );
    });

    Game.players.enemy.placeShips();
    Game.events.attack();

    Game.players.enemy.board.ships.forEach((ship) => {
      Game.controllers.display.render.ship(
        'enemy',
        ship.coordinates.map((coordiante) => coordiante.value)
      );
    });
  }

  static switchTurns() {}

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
            Game.controllers.display.render.ship('setup', coordiantes);
          });
      });
    },
    attack() {
      const board = document.getElementById('enemy');
      if (!board) return;

      board.querySelectorAll('.grid').forEach((grid) => {
        if (grid instanceof HTMLDivElement)
          grid.addEventListener('click', (event) => {
            const coordiante = grid.dataset.coordinates as string;
            const attackStatus =
              Game.players.enemy.board.recieveAttack(coordiante);
            Game.controllers.display.render.attack(
              'enemy',
              coordiante,
              attackStatus
            );
            if (Game.players.enemy.board.allShipsAreDestroyed())
              Game.state.isGameOver = true;
          });
      });
    },
  };
}

export default Game;
