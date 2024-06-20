import State from './State';
import Display from './Display';

class Events {
  private state: State;
  private displayController: Display;

  constructor(state: State, displayController: Display) {
    this.state = state;
    this.displayController = displayController;
  }

  attack = async (event: MouseEvent): Promise<void> => {
    if (this.isGameOver() || this.isEnemyTurn()) return;

    const grid = event.currentTarget as HTMLTableCellElement;
    const coordinate = this.getCoordinate(grid);
    if (!coordinate) return;

    const enemyShip = this.state.players.enemy.board.recieveAttack(coordinate);

    this.displayController.attack('enemy', coordinate, enemyShip);
    grid.style.pointerEvents = 'none';

    if (enemyShip?.isDestroyed()) {
      const board = this.displayController.getPlayerBoard('enemy');
      this.displayController.markDestroyedShipsCoordinates(
        board,
        enemyShip.coordinates.map((coordinate) => coordinate.value)
      );
    }

    if (this.isEnemyDefeated()) {
      this.endGame('You win');
      return;
    }

    if (enemyShip) return;

    this.switchCurrentPlayer();
    await this.enemyTurn();
  };

  placeShip = (event: MouseEvent): void => {
    const grid = event.currentTarget as HTMLTableCellElement;
    const coordinates = this.getCoordinatesForShipPlacement(grid);
    if (!coordinates.length) return;

    const playerBoard = this.state.players.player.board;
    playerBoard.placeShip(coordinates);
    this.displayController.ship('player', coordinates);
  };

  switchCurrentPlayer(): void {
    const { player, enemy } = this.state.players;
    const currentPlayerType = this.state.current.player.type;

    this.state.setState('current', {
      player: currentPlayerType === 'PLAYER' ? enemy : player,
      enemy: currentPlayerType === 'PLAYER' ? player : enemy,
    });
  }

  addHighlight = (event: MouseEvent): void => {
    if (this.allShipsPlaced()) return;

    const grid = event.currentTarget as HTMLTableCellElement;
    const grids = this.getGridsForHighlighting(grid);

    if (this.displayController.isValidPlacement(grids)) {
      grids.forEach((grid) => grid.classList.add('highlight'));
    }
  };

  removeHighlight = (event: MouseEvent): void => {
    if (this.allShipsPlaced()) return;

    const grid = event.currentTarget as HTMLTableCellElement;
    const grids = this.getGridsForHighlighting(grid);

    grids.forEach((grid) => grid.classList.remove('highlight'));
  };

  private async enemyTurn(): Promise<void> {
    let enemyAttackResult;

    do {
      enemyAttackResult = await this.executeEnemyAttack();
    } while (enemyAttackResult);
  }

  private async executeEnemyAttack(): Promise<boolean | null> {
    const ENEMY_ATTACK_DELAY_TIME = 900;
    return new Promise((resolve) => {
      setTimeout(() => {
        const enemyCoordinates =
          this.state.players.enemy.genarateRandomCoordinates();
        const playersShip =
          this.state.players.player.board.recieveAttack(enemyCoordinates);

        this.displayController.attack('player', enemyCoordinates, playersShip);

        if (playersShip?.isDestroyed()) {
          const board = this.displayController.getPlayerBoard('player');
          this.displayController.markDestroyedShipsCoordinates(
            board,
            playersShip.coordinates.map((coordinate) => coordinate.value)
          );
        }

        if (playersShip === null) {
          this.switchCurrentPlayer();
        }

        if (this.state.players.player.board.allShipsAreDestroyed()) {
          this.endGame('You lose');
          resolve(null);
        } else {
          resolve(!!playersShip);
        }
      }, ENEMY_ATTACK_DELAY_TIME);
    });
  }

  private endGame(message: string): void {
    this.state.setState('status', 'GAME-OVER');
    this.displayController.showGameoverDialog(message);
  }

  private isGameOver(): boolean {
    return this.state.status === 'GAME-OVER';
  }

  private isEnemyTurn(): boolean {
    return this.state.current.player.type === 'ENEMY';
  }

  private isEnemyDefeated(): boolean {
    return this.state.players.enemy.board.allShipsAreDestroyed();
  }

  private allShipsPlaced(): boolean {
    return this.state.players.player.board.allShipsArePlaced();
  }

  private getCoordinate(grid: HTMLTableCellElement): string | null {
    return grid.dataset.coordinates || null;
  }

  private getCoordinatesForShipPlacement(grid: HTMLTableCellElement): string[] {
    const playerBoard = this.state.players.player.board;
    return this.displayController
      .getShipGrids(grid, playerBoard.ships[playerBoard.indexOfUnplacedShip])
      .map((grid) => grid.dataset.coordinates || '');
  }

  private getGridsForHighlighting(
    grid: HTMLTableCellElement
  ): HTMLTableCellElement[] {
    const player = this.state.players.player;
    return this.displayController.getShipGrids(
      grid,
      player.board.ships[player.board.indexOfUnplacedShip]
    );
  }
}

export default Events;
