import Ship from './Ship';
import Board from './Board';
import Game from './Game';

export default class DisplayController {
  render = {
    ships() {},
    gameboard() {},
    setupboard() {
      const setupboard = DisplayController.create.board(
        'setup',
        Game.players.player.board
      );
      DisplayController.add.event.highlight(setupboard);
      DisplayController.add.event.place(setupboard);
    },
  };

  static add = {
    event: {
      highlight(board: HTMLDivElement) {
        const player = Game.players.player;

        const grids = board.querySelectorAll('.grid');
        const HIGHLIGHT_CLASSNAME = 'highlight';

        grids.forEach((grid) => {
          if (grid instanceof HTMLDivElement) {
            grid.addEventListener('mouseenter', (event) => {
              const grid = event.currentTarget as HTMLDivElement;

              DisplayController.getShipGrids(
                grid,
                player.board.ships[0]
              ).forEach((grid) => grid.classList.add(HIGHLIGHT_CLASSNAME));
            });

            grid.addEventListener('mouseleave', () => {
              DisplayController.getShipGrids(
                grid,
                player.board.ships[0]
              ).forEach((grid) => grid.classList.remove(HIGHLIGHT_CLASSNAME));
            });
          }
        });
      },

      place(board: HTMLDivElement) {
        const grids = board.querySelectorAll('.grid');
        const player = Game.players.player;

        grids.forEach((grid) => {
          if (grid instanceof HTMLDivElement)
            grid.addEventListener('click', () => {
              DisplayController.getShipGrids(
                grid,
                player.board.ships[0]
              ).forEach((grid) => {
                const coordinates = grid.dataset.coordinates;
                if (coordinates) {
                  player.board.ships[0].coordinates = coordinates;
                  return grid.classList.add('ship');
                }
                throw new Error('Could not get coordinates');
              });
            });
        });
      },
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
