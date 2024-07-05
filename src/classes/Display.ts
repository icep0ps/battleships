import Ship from './Ship';
import Game from './Game';
import getCoordinatesSurroundingGrids from '../utils/getCoordinatesSurroundingGrids';

export default class Display {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  ship(boardid: string, coordinates: string[]) {
    coordinates.forEach((coordinate) => {
      const board = document.getElementById(boardid);

      if (!board) return;

      const grid = board.querySelector(
        `[data-coordinates="${coordinate[0]},${coordinate[2]}"]`
      );
      if (grid) {
        grid.classList.add('ship');
      }
    });
  }

  showGameoverDialog(message: string) {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();

    const paragraph = document.querySelector('dialog p');
    if (paragraph) paragraph.textContent = message;

    document.querySelector('dialog button')?.addEventListener('click', () => {
      window.location.reload();
      dialog?.close();
    });
  }

  gameboards = () => {
    const playerboard = this.game.controllers.display.createBoard(
      'player',
      this.game.state.players.player.board.size,
      'Your board'
    );
    const enemyboard = this.game.controllers.display.createBoard(
      'enemy',
      this.game.state.players.enemy.board.size,
      'Enemy board'
    );

    return { player: playerboard, enemy: enemyboard };
  };

  attack(enemy: string, coordinate: string, shipHit: Ship | null) {
    const board = document.getElementById(enemy);
    if (!board) return;

    const grid = board.querySelector(
      `[data-coordinates="${coordinate[0]},${coordinate[2]}"]`
    );

    if (grid) {
      if (shipHit) {
        grid.setAttribute('class', 'hit');
        grid.textContent = '✖';
      } else {
        grid.setAttribute('class', 'miss');
        grid.textContent = '•';
      }
      grid.classList.remove('grid');
    }
  }

  isValidPlacement(grids: HTMLTableCellElement[]) {
    const board = this.game.state.players.player.board;
    return grids.length === board.ships[board.indexOfUnplacedShip].size;
  }

  markDestroyedShipsCoordinates(board: HTMLElement, coordinates: string[]) {
    coordinates.forEach((coordinate) => {
      getCoordinatesSurroundingGrids(coordinate).forEach((coordinate) => {
        const boardCoordinate = board.querySelector<HTMLTableCellElement>(
          `[data-coordinates="${coordinate[0]},${coordinate[2]}"]`
        );

        if (boardCoordinate) {
          boardCoordinate.style.pointerEvents = 'none';
          if (boardCoordinate.classList.contains('hit')) return;
          boardCoordinate.classList.add('surrounding-destroyed');
          boardCoordinate.innerText = '•';
        }
      });
    });
  }

  getPlayerBoard(boardid: string) {
    const board = document.getElementById(boardid);
    if (!board) throw new Error('Could not find board with ID: ' + boardid);
    return board;
  }

  createBoard = (id: string, size: number, boardTitle: string) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J'];

    const main = document.getElementsByTagName('section')[0];

    const wrapper = this.createElement('table', { className: 'wrapper' }, main);

    const player = this.createElement('h1', null, wrapper);
    player.innerText = boardTitle;

    const board = this.createElement(
      'tbody',
      { className: 'board', id },
      wrapper
    );

    if (id === 'enemy') {
      const options = this.createElement('div', { id: 'options' }, board);

      const startBtn = this.createElement('button', null, options);
      startBtn.innerText = 'Play';
      startBtn.addEventListener('click', () => this.game.start(board));
    }

    //change this so that it uses the grids in the board class to create dom grids
    for (let x = 0; x < size; x++) {
      const row = document.createElement('tr');
      for (let y = 0; y < size; y++) {
        const grid = this.game.controllers.display.createGrids(
          x.toString() + ',' + y.toString()
        );
        row.appendChild(grid);
      }
      board.append(row);
    }

    return board;
  };

  createGrids(coordinates: string) {
    const grid = document.createElement('td');
    grid.dataset.coordinates = coordinates;
    return grid;
  }

  getShipGrids(grid: HTMLTableCellElement, ship: Ship) {
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

    return grids as HTMLTableCellElement[];
  }

  createElement(
    tagName: keyof HTMLElementTagNameMap,
    options: {
      className?: string;
      id?: string;
    } | null,
    parent?: HTMLElement
  ) {
    const element = document.createElement(tagName);
    if (options) {
      if (options.id) element.setAttribute('id', options.id);
      if (options.className) element.classList.add(options.className);
    }

    if (parent) parent.appendChild(element);
    return element;
  }
}
