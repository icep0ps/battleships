import { player, computer } from './players-factory';
const tempPlayers = [];
const playerOne = player('jeff');
playerOne.randomize();
tempPlayers.push(playerOne);
const AI = player('ai');
AI.randomize();
tempPlayers.push(AI);

const attacking = (() => {
  let turn = 1;
  let currentPlayer = playerOne;
  const switchTurns = () => {
    if (turn) {
      currentPlayer = AI;
      turn--;
    } else {
      currentPlayer = playerOne;

      turn++;
    }
  };

  const attack = (coordinates) => {
    const playerTwo = document.querySelector(`#${currentPlayer.name}`);
    const data = coordinates.target.getAttribute('data-coordinate');
    if (currentPlayer.board.receiveAttack(data)) {
      const target = playerTwo.querySelector(`[data-coordinate="${data}"]`);
      target.classList.add('hit');
    } else {
      const target = playerTwo.querySelector(`[data-coordinate="${data}"]`);
      target.classList.add('miss');
    }
    switchTurns();
    gameOver();
  };

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
      console.log(dude.board.shipCoordinates);
      const players = document.querySelector(`#${dude.name}`);
      dude.board.shipCoordinates.forEach((coordinate) => {
        const target = players.querySelectorAll(`[data-coordinate]`);
        Array.from(target).forEach((coordinate) => {
          coordinate.addEventListener('click', attacking.attack, {
            once: true,
          });
        });
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

const gameOver = () => {
  if (playerOne.board.allShipsSunk()) {
    console.log('gameover');
  } else {
    ('none');
  }
};

export { renderBoards };
