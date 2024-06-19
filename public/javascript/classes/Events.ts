import State from './State';
import Display from './Display';

class Events {
  private state: State;
  private DisplayController: Display;

  constructor(state: State, displayController: Display) {
    this.state = state;
    this.DisplayController = displayController;
  }

  attack = async (event: MouseEvent) => {
    if (this.state.status === 'GAME-OVER') return;
    if (this.state.current.player.type === 'ENEMY') return;

    const grid = event.currentTarget as HTMLDivElement;
    const coordiante = grid.dataset.coordinates as string;
    const attackResult =
      this.state.players.enemy.board.recieveAttack(coordiante);

    this.DisplayController.attack('enemy', coordiante, attackResult);
    grid.style.pointerEvents = 'none';

    if (this.state.players.enemy.board.allShipsAreDestroyed()) {
      this.state.setState('status', 'GAME-OVER');
      this.DisplayController.showGameoverDialog('You win');
      return;
    }

    if (attackResult) return;

    this.switchCurrentPlayer();

    let enemyAttactResult;

    do {
      enemyAttactResult = await new Promise((resolve) => {
        setTimeout(() => {
          const enemyCoordinates =
            this.state.players.enemy.genarateRandomCoordinates();
          const result =
            this.state.players.player.board.recieveAttack(enemyCoordinates);

          this.DisplayController.attack('player', enemyCoordinates, result);

          if (result === false) {
            this.switchCurrentPlayer();
          }

          if (this.state.players.player.board.allShipsAreDestroyed()) {
            this.state.setState('status', 'GAME-OVER');
            this.DisplayController.showGameoverDialog('You lose');
            resolve(null); // Exit the loop
          } else {
            resolve(result);
          }
        }, 900);
      });
    } while (enemyAttactResult);
  };

  placeShip = (event: MouseEvent) => {
    const coordiantes: string[] = [];
    const playerBoard = this.state.players.player.board;
    const grid = event.currentTarget as HTMLDivElement;

    this.DisplayController.getShipGrids(
      grid,
      playerBoard.ships[playerBoard.indexOfUnplacedShip]
    ).forEach((grid) => {
      const coordinate = grid.dataset.coordinates;
      if (coordinate) coordiantes.push(coordinate);
    });

    playerBoard.placeShip(coordiantes);
    this.DisplayController.ship('player', coordiantes);
  };

  switchCurrentPlayer() {
    if (this.state.current.player.type === 'PLAYER')
      return this.state.setState('current', {
        player: this.state.players.enemy,
        enemy: this.state.players.player,
      });

    if (this.state.current.player.type === 'ENEMY')
      return this.state.setState('current', {
        player: this.state.players.player,
        enemy: this.state.players.enemy,
      });
  }

  addHighlight = (event: MouseEvent) => {
    const player = this.state.players.player;

    if (player.board.allShipsArePlaced()) return;

    const grid = event.currentTarget as HTMLDivElement;
    const grids = this.DisplayController.getShipGrids(
      grid,
      player.board.ships[player.board.indexOfUnplacedShip]
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
      player.board.ships[player.board.indexOfUnplacedShip]
    );

    grids.forEach((grid) => grid.classList.remove('highlight'));
  };
}

export default Events;
