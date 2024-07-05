import Player from '../../src/classes/Player';

let player = new Player('PLAYER');

beforeEach(() => {
  player = new Player('PLAYER');
});

describe('class methods', () => {
  test('placeShips method places all board ships', () => {
    player.placeShips();

    expect(
      player.board.ships.every((ship) => ship.coordinates.length === ship.size)
    ).toBe(true);
  });

  describe('generateCoordinates', () => {
    test('to return array', () => {
      expect(player.generateShipCoordinates(5)).toBeInstanceOf(Array);
    });

    test('to return array of strings', () => {
      expect(
        player
          .generateShipCoordinates(5)
          .every((coordinate) => typeof coordinate === 'string')
      ).toBe(true);
    });

    test('to not return empty array', () => {
      expect(player.generateShipCoordinates(5).length).toBeGreaterThan(0);
    });

    test('returns coordinates that are equal to the ship lenght', () => {
      const SHIP_SIZE = 5;
      expect(player.generateShipCoordinates(SHIP_SIZE).length).toEqual(
        SHIP_SIZE
      );
    });
  });
});
