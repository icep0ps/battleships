import Ship from './Ship';
import Board from './Board';
import Game from './Game';

export default class DisplayController {
  render = {
    ship(coordiantes: string[]) {
      coordiantes.forEach((coordiante) => {
        const grid = document.querySelector(
          `[data-coordinates="${coordiante[0]},${coordiante[2]}"]`
        );
        if (grid) grid.classList.add('ship');
      });
    },
    gameboards() {
      const playerboard = DisplayController.create.board(
        'player',
        Game.players.player.board
      );
      const enemyboard = DisplayController.create.board(
        'enemy',
        Game.players.enemy.board
      );
    },
    setupboard() {
      const setupboard = DisplayController.create.board(
        'setup',
        Game.players.player.board
      );

      return setupboard;
    },
  };

  highlight = {
    add(event: MouseEvent) {
      if (Game.players.player.board.allShipsArePlaced()) return;

      const grid = event.currentTarget as HTMLDivElement;
      DisplayController.getShipGrids(
        grid,
        Game.players.player.board.ships[Game.players.player.board.placedships]
      ).forEach((grid) => grid.classList.add('highlight'));
    },

    remove(event: MouseEvent) {
      if (Game.players.player.board.allShipsArePlaced()) return;

      const grid = event.currentTarget as HTMLDivElement;

      DisplayController.getShipGrids(
        grid,
        Game.players.player.board.ships[Game.players.player.board.placedships]
      ).forEach((grid) => grid.classList.remove('highlight'));
    },
  };

  static create = {
    board(id: string, Board: Board) {
      const board = document.createElement('div');
      board.classList.add('board');
      board.setAttribute('id', id);

      const main = document.getElementsByTagName('main')[0];
      main.appendChild(board);

      for (let x = 0; x < Board.size; x++) {
        for (let y = 0; y < Board.size; y++) {
          const grid = DisplayController.create.grids(
            x.toString() + ',' + y.toString()
          );
          if (board) board.appendChild(grid);
        }
      }

      return board;
    },
    grids(coordinates: string) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.dataset.coordinates = coordinates;
      return grid;
    },
  };

  static getShipGrids(grid: HTMLDivElement, ship: Ship) {
    const coordinates = grid.dataset.coordinates as string;
    const grids = [];
    for (let i = 0; i < ship.size; i++) {
      const xaxis = coordinates[0];
      const yaxis = Number(coordinates[2]);

      const grid = document.querySelector(
        `[data-coordinates="${xaxis},${yaxis + i}"]`
      );
      if (grid) grids.push(grid);
    }

    return grids as HTMLDivElement[];
  }
}
