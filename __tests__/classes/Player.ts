import Player from '../../public/javascript/classes/Player';

describe('Player Class', () => {
  test('type to be defined', () => {
    const player = new Player('PLAYER');
    expect(player.type).toBeDefined();
  });

  test('return typeof value', () => {
    const player = new Player('PLAYER');
    expect(player.type).toBe('PLAYER');
  });

  test('player is added to game when created', () => {});
});
