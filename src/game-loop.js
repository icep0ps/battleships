import { player, computer } from './Factories/players-factory';

const gameFlowControllers = (() => {
  const playerOne = player('jeff');
  const AI = computer('ai');

  const players = {
    playerOne: playerOne,
    AI: AI,
  };

  let allPlayers = [];
  let currentPlayer = playerOne;
  let currentEnemy = AI;

  const getCurrentPlayer = () => currentPlayer;
  const getCurrentEnemy = () => currentEnemy;

  allPlayers.push(playerOne);

  const gameOver = () => currentPlayer.board.allShipsSunk();

  const switchTurns = () => {
    if (currentPlayer === playerOne) {
      currentPlayer = AI;
      currentEnemy = playerOne;
      return;
    }

    if (currentPlayer === AI) {
      currentPlayer = playerOne;
      currentEnemy = AI;
      return;
    }
  };

  return {
    AI,
    playerOne,
    allPlayers,

    gameOver,
    switchTurns,
    getCurrentPlayer,
    getCurrentEnemy,
  };
})();

const PlayersAttacks = (() => {
  const AI_ATTACK_DELAY = 200;
  const IF_CURRENT_PLAYER_ATTACKED = (coordianate) => {
    return gameFlowControllers
      .getCurrentPlayer()
      .attack(coordianate, gameFlowControllers.getCurrentEnemy().board);
  };

  const playerAttack = (usersAttack) => {
    if (gameFlowControllers.gameOver()) {
      return console.log(
        `Gameover ${gameFlowControllers.getCurrentEnemy().name} wins`
      );
    }
    if (usersAttack) {
      const coordianate = usersAttack.target.getAttribute('data-coordinate');
      IF_CURRENT_PLAYER_ATTACKED(coordianate)
        ? usersAttack.target.setAttribute('class', 'hit')
        : usersAttack.target.setAttribute('class', 'miss');
    } else {
      const coordianates = gameFlowControllers.AI.genarateAttackCoordinates();
      const enemy = document.querySelector(
        `#${gameFlowControllers.playerOne.name}`
      );
      const coordianate = enemy.querySelector(
        `[data-coordinate="${coordianates}"]`
      );
      IF_CURRENT_PLAYER_ATTACKED(coordianates)
        ? coordianate.setAttribute('class', 'hit')
        : coordianate.setAttribute('class', 'miss');
    }
    gameFlowControllers.switchTurns();
    return;
  };

  const attack = (event) => {
    playerAttack(event);
    playerAttack(null);
  };

  return { attack };
})();

const renderBoards = (() => {
  const addMarksToValidCoordiantes = (locations, Boardcoordinates) => {
    for (let location of locations) {
      for (const coordinate of Boardcoordinates) {
        const currentCoordinate = coordinate.getAttribute('data-coordinate');
        currentCoordinate == location.substring(0, 3) &&
          coordinate.setAttribute('class', 'mark');
      }
    }
  };

  const UpdateAllPlayersBoards = () => {
    for (let player of gameFlowControllers.allPlayers) {
      const players = document.querySelector(`#${player.name}`);
      const Boardcoordinates = players.querySelectorAll(`[data-coordinate]`);
      for (let shipDetail of player.board.shipCoordinates) {
        addMarksToValidCoordiantes(shipDetail.location, Boardcoordinates);
      }
    }
  };

  const addEnemyEventListeners = () => {
    const AI_BOARD = document.getElementById('ai');
    const coordianates = AI_BOARD.querySelectorAll(`[data-coordinate]`);
    for (let coordianate of coordianates) {
      coordianate.addEventListener('click', PlayersAttacks.attack, {
        once: true,
      });
    }
  };

  return { UpdateAllPlayersBoards, addEnemyEventListeners };
})();

export { gameFlowControllers, renderBoards };
