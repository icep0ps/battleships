import { playerOne } from './game-loop';

const BoardSetup = (() => {
  function createBoards() {
    const boards = document.querySelectorAll('.player');
    const render = (board) => {
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          const coordinate = document.createElement('div');
          coordinate.setAttribute('data-coordinate', [x, y]);
          board.appendChild(coordinate);
        }
      }
    };
    boards.forEach((board) => render(board));
  }
  createBoards();

  function createPlayerBoard() {
    let shipLoactions = [];
    playerOne.board.shipCoordinates.forEach((coordinate) => {
      const target = document.querySelectorAll(`[data-coordinate]`);
      coordinate.location.forEach((location) => {
        for (const coordinate of target) {
          coordinate.getAttribute('data-coordinate') == location.substring(0, 3)
            ? shipLoactions.push(coordinate)
            : false;
        }
      });
      shipLoactions.forEach((location) => {
        location.setAttribute('class', 'mark');
      });
    });
  }

  const ships = [5, 4, 3, 3, 1];
  const coordinates = document.querySelectorAll(`[data-coordinate]`);
  const placeShip = (e) => {
    if (ships.length > 0) {
      const currentShipLength = ships.shift();
      const coordinate = e.target.getAttribute('data-coordinate');
      const y = +coordinate[0];
      const x = +coordinate[2];
      const total = y + currentShipLength;
      if (total <= 10) {
        playerOne.board.placeShip(y, x, currentShipLength);
        createPlayerBoard();
      }
    }
  };
  coordinates.forEach((coordinate) => {
    coordinate.addEventListener('click', placeShip, { once: true });
  });

  return { coordinates, ships };
})();

const mouseEvents = (() => {
  let horizontal = true;
  let validCoordinates = [];
  const rotate = () => {
    return horizontal ? (horizontal = false) : (horizontal = true);
  };

  const highlight = (e) => {
    e.target.style.cursor = 'move';
    const selectedCoordinate = e.target.getAttribute('data-coordinate');
    const firstNumber = +selectedCoordinate[0];
    const secondNumber = +selectedCoordinate[2];
    let TOTAL = firstNumber + BoardSetup.ships.length;
    horizontal
      ? (TOTAL = firstNumber + BoardSetup.ships.length)
      : (TOTAL = secondNumber + BoardSetup.ships.length);

    const checkTotal = () => {
      if (TOTAL <= 10) {
        for (
          let shipLength = 0;
          shipLength < BoardSetup.ships.length;
          shipLength++
        ) {
          let firstNumber = +selectedCoordinate[0];
          let secondNumber = +selectedCoordinate[2];
          horizontal
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
})();

export { BoardSetup, mouseEvents };
