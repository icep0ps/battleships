import { player, computer } from './players-factory';

const gameFlowControllers = (() => {
  const playerOne = player('jeff');
  const AI = computer('ai');

  let allPlayers = [];
  let currentPlayer = playerOne;
  let currentEnemy = AI;
  allPlayers.push(playerOne);

  const gameOver = () => {
    currentEnemy.board.allShipsSunk() ? (endgame = true) : false;
  };

  const switchTurns = () => {
    if (currentPlayer == playerOne) {
      currentPlayer = AI;
      currentEnemy = playerOne;
      return;
    }

    if (currentPlayer == AI) {
      currentPlayer = playerOne;
      currentEnemy = AI;
      return;
    }
  };

  return {
    gameOver,
    switchTurns,
    currentPlayer,
    currentEnemy,
    allPlayers,
    playerOne,
  };
})();

const PlayersAttacks = (() => {
  const AI_ATTACK_DELAY = 200;
  const IF_CURRENT_PLAYER_ATTACKED = (coordianate) => {
    return gameFlowControllers.currentPlayer.attack(
      coordianate,
      gameFlowControllers.currentEnemy.board
    );
  };

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    IF_CURRENT_PLAYER_ATTACKED(coordianate)
      ? e.target.setAttribute('class', 'hit')
      : e.target.setAttribute('class', 'miss');
  };

  const enemyAttack = () => {
    const coordianates = AI.genarateCoordinates();
    const enemy = document.querySelector('#jeff');
    const coordianate = enemy.querySelector(
      `[data-coordinate="${coordianates}"]`
    );

    IF_CURRENT_PLAYER_ATTACKED(coordianates)
      ? coordianate.setAttribute('class', 'hit')
      : coordianate.setAttribute('class', 'miss');

    gameFlowControllers.switchTurns();
  };

  function attack(e) {
    playerAttack(e);
    gameFlowControllers.switchTurns();
    setTimeout(enemyAttack, AI_ATTACK_DELAY);
  }

  return { attack };
})();

const renderBoards = (() => {
  const addMarksToValidCoordiantes = (locations, Boardcoordinates) => {
    locations.forEach((location) => {
      for (const coordinate of Boardcoordinates) {
        const currentCoordinate = coordinate.getAttribute('data-coordinate');
        currentCoordinate == location.substring(0, 3)
          ? coordinate.setAttribute('class', 'mark')
          : false;
      }
    });
  };

  function UpdateAllPlayersBoards() {
    gameFlowControllers.allPlayers.forEach((player) => {
      const players = document.querySelector(`#${player.name}`);
      const Boardcoordinates = players.querySelectorAll(`[data-coordinate]`);
      player.board.shipCoordinates.forEach((shipDetail) => {
        addMarksToValidCoordiantes(shipDetail.location, Boardcoordinates);
      });
    });
  }

  const addEnemyEventListeners = () => {
    const AI_BOARD = document.getElementById('ai');
    const coordianates = AI_BOARD.querySelectorAll(`[data-coordinate]`);
    coordianates.forEach((coordinate) => {
      coordinate.addEventListener('click', PlayersAttacks.attack, {
        once: true,
      });
    });
  };
  // UpdateAllPlayersBoards();
  // addEnemyEventListeners();
})();

export { gameFlowControllers };

// AI.board.placeShip(3, 4, 5);
// AI.board.placeShip(8, 6, 2);
// AI.board.placeShip(1, 7, 3);
// AI.board.placeShip(5, 5, 3);
// AI.board.placeShip(1, 2, 1);
