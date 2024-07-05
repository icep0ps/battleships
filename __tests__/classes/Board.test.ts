import Board from '../../src/classes/Board';
import Player from '../../src/classes/Player';

let board = new Board();

beforeEach(() => {
  board = new Board();
});

describe('Should create grids on creation', () => {
  test('grids are all created depending on board size', () => {
    expect(board.coordinates.length).toBe(board.size * board.size);
  });

  test('coordinates are in the correct format', () => {
    expect(
      board.coordinates.every((coordinate) => coordinate.match(/[0-9],[0-9]/))
    ).toBe(true);
  });
});

describe('Ships can be added or retrieved', () => {
  test('ships placed counter increaments when ship is placed', () => {
    const player = new Player('PLAYER');

    player.board.placeShip(player.generateShipCoordinates(4));
    player.board.placeShip(player.generateShipCoordinates(3));
    player.board.placeShip(player.generateShipCoordinates(2));

    expect(player.board.indexOfUnplacedShip).toBe(3);
  });

  test('ships placement throws error when all ships are placed', () => {
    const player = new Player('PLAYER');

    player.board.ships.forEach((ship) =>
      player.board.placeShip(player.generateShipCoordinates(ship.size))
    );

    expect(() =>
      player.board.placeShip(player.generateShipCoordinates(5))
    ).toThrow();
  });

  describe('allShipsPlaced function returns', () => {
    test('true when all ships have been placed', () => {
      const player = new Player('PLAYER');

      player.board.ships.forEach((ship) =>
        player.board.placeShip(player.generateShipCoordinates(ship.size))
      );

      expect(player.board.allShipsArePlaced()).toBe(true);
    });

    test('false no ships have been placed', () => {
      const player = new Player('PLAYER');
      expect(player.board.allShipsArePlaced()).toBe(false);
    });
  });
});
