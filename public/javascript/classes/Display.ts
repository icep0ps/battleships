export default class DisplayController {
  createGameboard() {
    const BOARD_SIZE = 64;
    const boardhtml = document.querySelector('.board');
    console.log(boardhtml);
    for (let i = 0; i < BOARD_SIZE; i++) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      boardhtml?.appendChild(grid);
    }
  }
}
