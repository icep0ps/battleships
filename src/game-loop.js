import { player, computer } from './players-factory';
const tempPlayers = [];
const playerOne = player('jeff');
const AI = computer('ai');
// AI.board.placeShip(3, 4, 5);
// AI.board.placeShip(8, 6, 2);
// AI.board.placeShip(1, 7, 3);
// AI.board.placeShip(5, 5, 3);
// AI.board.placeShip(1, 2, 1);
tempPlayers.push(playerOne);

const attacking = (() => {
  let endgame = false;

  let turn = 1;
  let currentPlayer = playerOne;
  let currentEnemy = AI;
  const switchTurns = () => {
    if (turn) {
      currentPlayer = AI;
      currentEnemy = playerOne;
      turn--;
    } else {
      currentPlayer = playerOne;
      currentEnemy = AI;
      turn++;
    }
  };

  const gameOver = () => {
    currentEnemy.board.allShipsSunk() ? (endgame = true) : false;
  };

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      e.target.setAttribute('class', 'hit');
    } else {
      e.target.setAttribute('class', 'miss');
    }
  };

  const enemyAttack = () => {
    const coordianate = AI.genarateCoordinates();
    const target = document.querySelector('#jeff');
    const box = target.querySelector(`[data-coordinate="${coordianate}"]`);
    console.log(coordianate);
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      box.setAttribute('class', 'hit');
    } else {
      box.setAttribute('class', 'miss');
    }
    switchTurns();
  };

  function attack(e) {
    playerAttack(e);
    switchTurns();
    setTimeout(enemyAttack, 200);
  }

  return { attack, switchTurns, currentPlayer };
})();

const renderBoards = (() => {
  function createBoards() {
    const boards = document.querySelectorAll('.player');
    const render = (board) => {
      for (let i = 0; i < 10; i++) {
        for (let x = 0; x < 10; x++) {
          const coordinate = document.createElement('div');
          coordinate.setAttribute('data-coordinate', [x, i]);
          board.appendChild(coordinate);
        }
      }
    };
    boards.forEach((board) => render(board));
  }

  function createPlayerOneBoard() {
    tempPlayers.forEach((dude) => {
      console.log(dude);
      const players = document.querySelector(`#${dude.name}`);
      dude.board.shipCoordinates.forEach((coordinate) => {
        const target = players.querySelectorAll(`[data-coordinate]`);
        if (dude.name == 'ai') {
          Array.from(target).forEach((coordinate) => {
            coordinate.addEventListener('click', attacking.attack, {
              once: true,
            });
          });
        }
        let final = [];
        coordinate.location.forEach((locate) => {
          const test = Array.from(target);
          for (const coord of test) {
            if (
              coord.getAttribute('data-coordinate') == locate.substring(0, 3)
            ) {
              final.push(coord);
            }
          }
        });

        final.forEach((item) => {
          item.setAttribute('class', 'mark');
        });
      });
    });
  }

  createBoards();

  return { createBoards };
})();

export { renderBoards };

const setup = (() => {
  function createPlayerOneBoard() {
    playerOne.board.shipCoordinates.forEach((coordinate) => {
      const target = document.querySelectorAll(`[data-coordinate]`);
      let final = [];
      coordinate.location.forEach((locate) => {
        const test = Array.from(target);
        for (const coord of test) {
          if (coord.getAttribute('data-coordinate') == locate.substring(0, 3)) {
            final.push(coord);
          }
        }
      });

      final.forEach((item) => {
        item.setAttribute('class', 'mark');
      });
    });
  }

  const ships = [5, 4, 3, 3, 1];
  const grids = document.querySelectorAll(`[data-coordinate]`);
  const place = (e) => {
    if (ships.length > 0) {
      const currentShip = ships.shift();
      const coords = e.target.getAttribute('data-coordinate');
      const y = coords[0];
      const x = coords[2];
      const total = Number(y) + Number(currentShip);

      if (total <= 10) {
        playerOne.board.placeShip(Number(y), Number(x), currentShip);
        createPlayerOneBoard();
      }
    }
  };
  grids.forEach((grid) => {
    grid.addEventListener('click', place, { once: true });
  });
})();
