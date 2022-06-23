import { player } from './players-factory';
import { gameboard } from './gameboard-factory';

const renderBoards = (() => {
  const boards = document.querySelectorAll('.player');
  const render = (board) => {
    for (let x = 0; x < 100; x++) {
      const coordinate = document.createElement('div');
      coordinate.setAttribute('data-coordinate', x);
      board.appendChild(coordinate);
    }
  };

  Array.from(boards).forEach((board) => render(board));
})();

export { renderBoards };
