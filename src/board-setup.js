import { gameFlowControllers } from './game-loop';
import { gameboard } from './gameboard-factory';
const MAX_BOARD_LENGTH = 10;

const BoardSetup = (() => {
  const createBoards = () => {
    const boards = document.querySelectorAll('.player');
    const render = (board) => {
      for (let y = 0; y < MAX_BOARD_LENGTH; y++) {
        for (let x = 0; x < MAX_BOARD_LENGTH; x++) {
          const coordinate = document.createElement('div');
          coordinate.setAttribute('data-coordinate', [x, y]);
          board.appendChild(coordinate);
        }
      }
    };
    boards.forEach((board) => render(board));
  };
  createBoards();

  const createPlayerBoard = () => {
    let shipLoactions = [];
    gameFlowControllers.playerOne.board.shipCoordinates.forEach(
      (coordinate) => {
        const target = document.querySelectorAll(`[data-coordinate]`);
        coordinate.location.forEach((location) => {
          for (const coordinate of target) {
            coordinate.getAttribute('data-coordinate') ==
            location.substring(0, 3)
              ? shipLoactions.push(coordinate)
              : false;
          }
        });
        shipLoactions.forEach((location) => {
          location.setAttribute('class', 'mark');
        });
      }
    );
  };

  const ships = [5, 4, 3, 3, 1];
  const coordinates = document.querySelectorAll(`[data-coordinate]`);
  const isvalidPlacement = (e) => {
    if (ships.length > 0) {
      const currentShipLength = ships[0];
      const coordinate = e.target.getAttribute('data-coordinate');
      const y = +coordinate[0];
      const x = +coordinate[2];
      let TOTAL = 0;
      mouseEvents.getisHorizontal()
        ? (TOTAL = y + currentShipLength)
        : (TOTAL = x + currentShipLength);

      if (TOTAL <= MAX_BOARD_LENGTH) {
        gameFlowControllers.playerOne.board.placeShip(y, x, currentShipLength);
        createPlayerBoard();
        ships.shift();
      }
    }
  };

  coordinates.forEach((coordinate) => {
    coordinate.addEventListener('click', isvalidPlacement, { once: true });
  });

  return { coordinates, ships };
})();

const mouseEvents = (() => {
  let isHorizontal = true;
  let validCoordinates = [];

  const getisHorizontal = () => isHorizontal;

  const rotate = () => {
    return isHorizontal ? (isHorizontal = false) : (isHorizontal = true);
  };

  const highlight = (e) => {
    e.target.style.cursor = 'move';
    const selectedCoordinate = e.target.getAttribute('data-coordinate');
    const firstNumber = +selectedCoordinate[0];
    const secondNumber = +selectedCoordinate[2];
    let TOTAL = firstNumber + BoardSetup.ships.length;
    isHorizontal
      ? (TOTAL = firstNumber + BoardSetup.ships.length)
      : (TOTAL = secondNumber + BoardSetup.ships.length);

    const checkTotal = () => {
      if (TOTAL <= MAX_BOARD_LENGTH) {
        for (
          let shipLength = 0;
          shipLength < BoardSetup.ships.length;
          shipLength++
        ) {
          console.log(shipLength);
          let firstNumber = +selectedCoordinate[0];
          let secondNumber = +selectedCoordinate[2];
          isHorizontal
            ? (firstNumber += shipLength)
            : (secondNumber += shipLength);
          const coordinate = document.querySelector(
            `[data-coordinate="${firstNumber},${secondNumber}"]`
          );
          coordinate.classList.add('hover');
          validCoordinates.push(coordinate);
        }
        return;
      }

      return (e.target.style.cursor = 'not-allowed');
    };
    checkTotal();
  };

  const removeHighlight = () => {
    validCoordinates.forEach((coordinate) => {
      coordinate.classList.remove('hover');
    });
  };

  BoardSetup.coordinates.forEach((coordinate) => {
    coordinate.addEventListener('mouseover', highlight);
    coordinate.addEventListener('mouseout', removeHighlight);
  });

  const rotateBtn = document.getElementById('rotate');
  rotateBtn.addEventListener('click', rotate);

  return { rotate, getisHorizontal };
})();

export { mouseEvents };
