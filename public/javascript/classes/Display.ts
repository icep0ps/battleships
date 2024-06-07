import Board from './Board';
import { v4 as uuidv4 } from 'uuid';
import Ship from './Ship';

type boards = Map<
  string,
  {
    dom: HTMLDivElement;
    class: Board;
  }
>;

export default class DisplayController {
  private boards: boards;

  constructor() {
    this.boards = new Map();
  }

  renderGameboard(Board: Board) {
    const id = uuidv4();

    const board = document.createElement('div');
    board.classList.add('board');
    board.setAttribute('id', id);

    const main = document.getElementsByTagName('main')[0];
    main.appendChild(board);

    for (let x = 0; x < Board.size; x++) {
      for (let y = 0; y < Board.size; y++) {
        const grid = this.createGrid(x.toString() + ',' + y.toString());
        if (board) board.appendChild(grid);
      }
    }

    this.boards.set(id, {
      dom: board,
      class: Board,
    });

    return board;
  }

  createGrid(coordinates: string) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.dataset.coordinates = coordinates;
    return grid;
  }

  addShipHightlightEvent(board: HTMLDivElement) {
    const grids = board.querySelectorAll('.grid');

    grids.forEach((grid) => {
      if (grid instanceof HTMLDivElement) {
        grid.addEventListener('mouseenter', this.highlight.bind(this));
        grid.addEventListener('mouseleave', this.highlight.bind(this));
      }
    });
  }

  highlight(event: MouseEvent) {
    const HIGHLIGHT_CLASSNAME = 'highlight';

    const grid = event.currentTarget as HTMLDivElement;
    const board = grid.parentElement as HTMLDivElement;
    const boardid = board.getAttribute('id');

    if (boardid) {
      const coordinates = grid.dataset.coordinates as string;
      const ship = this.boards.get(boardid)?.class.placeables[0] as Ship;

      for (let i = 0; i < ship.size; i++) {
        const xaxis = coordinates[0];
        const yaxis = coordinates[2];

        const grid = board.querySelector(
          `[data-coordinates="${xaxis},${(Number(yaxis) + i).toString()}"]`
        ) as Element;

        grid.classList.contains(HIGHLIGHT_CLASSNAME)
          ? grid.classList.remove(HIGHLIGHT_CLASSNAME)
          : grid.classList.add(HIGHLIGHT_CLASSNAME);
      }
    } else throw new Error('Could not find board id');
  }

  renderShip(coordinates: Ship['coordinates']) {
    coordinates.forEach((coordinate) => {
      document
        .querySelector(`[data-coordinates="${coordinate[0]},${coordinate[3]}"]`)
        ?.classList.add('ship');
    });
  }
}
