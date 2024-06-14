import Ship from './Ship';
import Game from './Game';

export default class Display {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  ship(boardid: string, coordiantes: string[]) {
    coordiantes.forEach((coordiante) => {
      const board = document.getElementById(boardid);

      if (!board) return;

      const grid = board.querySelector(
        `[data-coordinates="${coordiante[0]},${coordiante[2]}"]`
      );
      if (grid) grid.classList.add('ship');
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

  attack(enemy: string, coordiante: string, isHit: boolean) {
    const board = document.getElementById(enemy);
    if (!board) return;

    const grid = board.querySelector(
      `[data-coordinates="${coordiante[0]},${coordiante[2]}"]`
    );

    if (isHit) grid?.setAttribute('class', 'hit');
    else grid?.setAttribute('class', 'miss');
  }

  isValidPlacement(grids: HTMLDivElement[]) {
    const board = this.game.state.players.player.board;
    return grids.length === board.ships[board.placedships].size;
  }

  createBoard = (id: string, size: number, boardTitle: string) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J'];

    const main = document.getElementsByTagName('section')[0];

    const wrapper = this.createElement('div', { className: 'wrapper' }, main);

    const player = this.createElement('h1', null, wrapper);
    player.innerText = boardTitle;

    const board = this.createElement(
      'div',
      { className: 'board', id },
      wrapper
    );

    if (id === 'enemy') {
      const options = this.createElement('div', { id: 'options' }, board);

      const startBtn = this.createElement('button', null, options);
      startBtn.innerText = 'Play';
      startBtn.addEventListener('click', () => this.game.start(board));
    }

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const grid = this.game.controllers.display.createGrids(
          x.toString() + ',' + y.toString()
        );
        if (board) board.appendChild(grid);
      }
    }

    return board;
  };

  createGrids(coordinates: string) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.dataset.coordinates = coordinates;
    return grid;
  }

  getShipGrids(grid: HTMLDivElement, ship: Ship) {
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
