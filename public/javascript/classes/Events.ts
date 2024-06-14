import Display from './Display';
import Game from './Game';
import State from './State';

class Events {
  private state: State;
  private DisplayController: Display;

  constructor(state: State, displayController: Display) {
    this.state = state;
    this.DisplayController = displayController;
  }

  attack = (event: MouseEvent) => {
    if (this.state.status === 'GAME-OVER') return;

    const grid = event.currentTarget as HTMLDivElement;
    const coordiante = grid.dataset.coordinates as string;
    const attackStatus =
      this.state.players.enemy.board.recieveAttack(coordiante);

    this.DisplayController.attack('enemy', coordiante, attackStatus);

    if (this.state.players.enemy.board.allShipsAreDestroyed()) {
      this.state.setState('status', 'GAME-OVER');
      this.DisplayController.showGameoverDialog('You win');
      return;
    }

    setTimeout(() => {
      const enemycoordiantes =
        this.state.players.enemy.genarateRandomCoordinates();
      const result =
        this.state.players.player.board.recieveAttack(enemycoordiantes);

      this.DisplayController.attack('player', enemycoordiantes, result);

      if (this.state.players.player.board.allShipsAreDestroyed()) {
        this.state.setState('status', 'GAME-OVER');
        this.DisplayController.showGameoverDialog('You lose');
        return;
      }
    });
  };

  placeShip = (event: MouseEvent) => {
    const coordiantes: string[] = [];
    const playerBoard = this.state.players.player.board;
    const grid = event.currentTarget as HTMLDivElement;

    this.DisplayController.getShipGrids(
      grid,
      playerBoard.ships[playerBoard.placedships]
    ).forEach((grid) => {
      const coordinate = grid.dataset.coordinates;
      if (coordinate) coordiantes.push(coordinate);
    });

    playerBoard.placeShip(coordiantes);
    this.DisplayController.ship('player', coordiantes);
  };

  addHighlight = (event: MouseEvent) => {
    const player = this.state.players.player;

    if (player.board.allShipsArePlaced()) return;

    const grid = event.currentTarget as HTMLDivElement;
    const grids = this.DisplayController.getShipGrids(
      grid,
      player.board.ships[player.board.placedships]
    );

    if (this.DisplayController.isValidPlacement(grids))
      grids.forEach((grid) => grid.classList.add('highlight'));
  };

  removeHighlight = (event: MouseEvent) => {
    const player = this.state.players.player;

    if (player.board.allShipsArePlaced()) return;

    const grid = event.currentTarget as HTMLDivElement;
    const grids = this.DisplayController.getShipGrids(
      grid,
      player.board.ships[player.board.placedships]
    );

    grids.forEach((grid) => grid.classList.remove('highlight'));
  };
}

export default Events;
