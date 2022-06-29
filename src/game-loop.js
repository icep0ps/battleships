import { player, computer } from './players-factory';
const tempPlayers = [];
const playerOne = player('jeff');
playerOne.randomize();
tempPlayers.push(playerOne);
const AI = computer('ai');
AI.randomize();
tempPlayers.push(AI);

const attacking = (() => {
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
    if (currentEnemy.board.allShipsSunk()) {
      console.log('gameover');
    } else {
      ('none');
    }
  };

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      e.target.setAttribute('class', 'hit');
    } else {
      e.target.setAttribute('class', 'miss');
    }
    gameOver();
  };

  const enemyAttack = () => {
    const coordianate = AI.genarateCoordinates();
    const target = document.querySelector('#jeff');
    const box = target.querySelector(`[data-coordinate="${coordianate}"]`);
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      box.setAttribute('class', 'hit');
    } else {
      box.setAttribute('class', 'miss');
    }
    gameOver();
    switchTurns();
  };

  function attack(e) {
    playerAttack(e);
    switchTurns();
    setTimeout(enemyAttack, 500);
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
        const test = Array.from(target).filter((item) => {
          return (
            [item.getAttribute('data-coordinate')][0] == coordinate.location[0]
          );
        });
        test.forEach((item) => {
          item.setAttribute('class', 'mark');
        });
        // test.forEach((item) => {
        //   for (let x = 0; x < coordinate.ship.shipLength; x++) {
        //     const num = Number(coordinate.location[0].charAt(2));
        //     const box = players.querySelector(
        //       `[data-coordinate="${Number(coordinate.location[0].charAt(0))},${
        //         num + x
        //       }"]`
        //     );
        //     box.setAttribute('class', 'mark');
        //   }
        // });
      });
    });
  }

  createBoards();
  createPlayerOneBoard();

  return { createBoards };
})();

export { renderBoards };
