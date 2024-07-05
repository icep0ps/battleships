import State from './State';
import Display from './Display';
import Events from './Events';

class Game {
  state: State;

  controllers: {
    events: Events;
    display: Display;
  };

  constructor() {
    this.state = new State();
    const displayController = new Display(this);

    this.controllers = {
      // display before state
      display: displayController,
      events: new Events(this.state, displayController),
    };
  }

  initialize() {
    const { player: board } = this.controllers.display.gameboards();
    this.state.players.player.placeShips();

    this.state.players.player.board.ships.forEach((ship) => {
      this.controllers.display.ship(
        'player',
        ship.coordinates.map((coordinate) => coordinate.value)
      );
    });

    // add event listeners
    this.addEventListenersToGrids(
      board,
      'mouseenter',
      this.controllers.events.addHighlight
    );

    this.addEventListenersToGrids(
      board,
      'mouseleave',
      this.controllers.events.removeHighlight
    );

    this.addEventListenersToGrids(
      board,
      'click',
      this.controllers.events.placeShip.bind(this.controllers.display),
      {
        once: true,
      }
    );
  }

  start(enemybaord: HTMLElement) {
    document.getElementById('options')?.remove();

    // add event listeners

    this.state.players.player.board.ships.forEach((ship) => {
      this.controllers.display.ship(
        'player',
        ship.coordinates.map((coordinate) => coordinate.value)
      );
    });

    this.addEventListenersToGrids(
      enemybaord,
      'click',
      this.controllers.events.attack,
      { capture: true }
    );

    // computer generate ships
    this.state.players.enemy.placeShips();
  }

  addEventListenersToGrids(
    board: HTMLElement,
    event: keyof HTMLElementEventMap,
    callback: any,
    options?: boolean | AddEventListenerOptions | undefined
  ) {
    board.querySelectorAll('td').forEach((grid) => {
      if (grid instanceof HTMLTableCellElement)
        grid.addEventListener(event, callback, options);
    });
  }
}

export default Game;
