import Player from './Player';
import Computer from './Enemy';
import DisplayController from './Display';
import { GameStatus } from '../../../types';
import State from './State';
class Game {
  static players: {
    player: Player;
    enemy: Computer;
  } = {
    enemy: new Computer(),
    player: new Player('PLAYER'),
  };

  static state = new State();

  static initialize() {
    console.log('Starting game...');
    const board = DisplayController.render.setupboard();

    // add event lisiteners

    Game.addEventListenersToGrids(
      board,
      'mouseenter',
      DisplayController.highlight.add
    );

    Game.addEventListenersToGrids(
      board,
      'mouseleave',
      DisplayController.highlight.remove
    );

    Game.addEventListenersToGrids(board, 'click', Game.events.placeShip);
  }

  static start() {
    document.getElementById('setup')?.remove();
    const { enemy } = DisplayController.render.gameboards();

    // add event lisiteners

    Game.players.player.board.ships.forEach((ship) => {
      DisplayController.render.ship(
        'player',
        ship.coordinates.map((coordiante) => coordiante.value)
      );
    });

    Game.addEventListenersToGrids(enemy, 'click', Game.events.attack);

    Game.players.enemy.placeShips();
  }

  static switchTurns() {
    const players = Game.state;
    if (players.current.player.type === 'PLAYER')
      Game.state.setState('current', {
        player: players.current.enemey,
        enemy: players.current.player,
      });

    if (players.current.player.type === 'ENEMY')
      Game.state.setState('current', {
        player: players.current.player,
        enemy: players.current.enemey,
      });
  }

  static events = {
    placeShip(event: MouseEvent) {
      const playerBoard = Game.players.player.board;

      const grid = event.currentTarget as HTMLDivElement;

      if (Game.players.player.board.allShipsArePlaced()) {
        Game.start();
        return;
      }
      const coordiantes: string[] = [];
      DisplayController.getShipGrids(
        grid,
        playerBoard.ships[playerBoard.placedships]
      ).forEach((grid) => {
        const coordinate = grid.dataset.coordinates;
        if (coordinate) coordiantes.push(coordinate);
      });
      playerBoard.placeShip(coordiantes);
      DisplayController.render.ship('setup', coordiantes);
    },

    attack(event: MouseEvent) {
      const grid = event.currentTarget as HTMLDivElement;
      const coordiante = grid.dataset.coordinates as string;
      const attackStatus = Game.players.enemy.board.recieveAttack(coordiante);
      DisplayController.render.attack('enemy', coordiante, attackStatus);

      if (Game.players.enemy.board.allShipsAreDestroyed()) {
        Game.state.setState('status', 'GAME-OVER');
        return;
      }

      const enemycoordiantes = Game.players.enemy.genarateRandomCoordinates();
      const result = Game.players.player.board.recieveAttack(enemycoordiantes);
      DisplayController.render.attack('player', enemycoordiantes, result);
    },
  };

  static addEventListenersToGrids(
    board: HTMLDivElement,
    event: keyof HTMLElementEventMap,
    callback: any
  ) {
    board.querySelectorAll('.grid').forEach((grid) => {
      if (grid instanceof HTMLDivElement)
        grid.addEventListener(event, callback);
    });
  }
}

export default Game;
