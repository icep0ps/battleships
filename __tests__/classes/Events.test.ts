import Game from '../../src/classes/Game';

let game = new Game();

beforeEach(() => {
  game = new Game();
});

describe('switchCurrentPlayer works correctly', () => {
  test('should return player as current player', () => {
    game.controllers.events.switchCurrentPlayer();
    game.controllers.events.switchCurrentPlayer();

    const currentPlayer = game.state.current.player.type;

    expect(currentPlayer).toEqual(game.state.players.player.type);
  });

  test('should return enemy as current player', () => {
    game.controllers.events.switchCurrentPlayer();

    const currentPlayer = game.state.current.player.type;

    expect(currentPlayer).toEqual(game.state.players.enemy.type);
  });
});
