import { gameboard } from '../src/gameboard-factory.js';

test('Receive Attack Hit 1', () => {
  const board = gameboard();
  board.placeShip(2, 3);
  expect(board.receiveAttack(2, 3)).toBeTruthy();
});

test('Receive Attack Hit 2', () => {
  const board = gameboard();
  board.placeShip(4, 2);
  expect(board.receiveAttack(4, 2)).toBeTruthy();
});
