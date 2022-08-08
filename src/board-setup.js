import { gameFlowControllers, renderBoards } from './game-loop';
const MAX_BOARD_LENGTH = 10;

const BoardSetup = (() => {
  const boards = document.querySelectorAll('.player');
  const yourBoard = document.getElementById('jeff');

  const createBoards = () => {
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
    const target = yourBoard.querySelectorAll(`[data-coordinate]`);

    gameFlowControllers.playerOne.board.shipCoordinates.forEach(
      (coordinate) => {
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
          location.removeEventListener('click', isvalidPlacement);
        });
      }
    );
  };

  const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
  const coordinates = yourBoard.querySelectorAll(`[data-coordinate]`);

  const isvalidPlacement = (e) => {
    if (SHIP_LENGTHS.length > 0) {
      const currentShipLength = SHIP_LENGTHS[0];
      const coordinate = e.target.getAttribute('data-coordinate');
      const y = +coordinate[0];
      const x = +coordinate[2];
      let TOTAL = 0;
      mouseEvents.getisHorizontal()
        ? (TOTAL = y + currentShipLength)
        : (TOTAL = x + currentShipLength);

      if (TOTAL <= MAX_BOARD_LENGTH && !isColliding()) {
        gameFlowControllers.playerOne.board.placeShip(y, x, currentShipLength);
        createPlayerBoard();
        SHIP_LENGTHS.shift();
        if (BoardSetup.SHIP_LENGTHS.length === 0) {
          const start = document.getElementById('start');
          start.addEventListener('click', startBattle.start);
          start.setAttribute('class', 'ready');
        }
      }
    }
  };

  const isColliding = () => {
    let colliding = false;
    const hovers = document.querySelectorAll('.hover');
    const allShipLocations =
      gameFlowControllers.playerOne.board.shipCoordinates.map(
        (ship) => ship.location
      );
    const finalInvalidCoordinates = [];
    allShipLocations.forEach((locations) => {
      return locations.map((location) => {
        finalInvalidCoordinates.push(location.substring(0, 3));
      });
    });
    hovers.forEach((coordinate) => {
      finalInvalidCoordinates.includes(
        coordinate.getAttribute('data-coordinate')
      )
        ? (colliding = true)
        : false;
    });

    return colliding;
  };

  coordinates.forEach((coordinate) => {
    coordinate.addEventListener('click', isvalidPlacement, { once: true });
  });

  return { coordinates, SHIP_LENGTHS, isColliding };
})();

const startBattle = (() => {
  const clearSetup = () => {
    const buttons = document.querySelectorAll('button');
    const computer = document.getElementById('hidden');
    const infomation = document.querySelector('.options');

    buttons.forEach((button) => {
      button.remove();
    });
    computer.style.display = 'block';
    infomation.remove();
  };

  const computerMoves = () => {
    gameFlowControllers.AI.randomize();
  };

  const start = () => {
    clearSetup();
    computerMoves();
    renderBoards.UpdateAllPlayersBoards();
    renderBoards.addEnemyEventListeners();
  };

  return { start };
})();

const mouseEvents = (() => {
  let isHorizontal = true;
  let validCoordinates = [];

  const getisHorizontal = () => isHorizontal;

  const rotate = () => {
    return isHorizontal ? (isHorizontal = false) : (isHorizontal = true);
  };

  const checkTotal = (TOTAL, selectedCoordinate, CURRENT_LENGTH, event) => {
    if (TOTAL <= MAX_BOARD_LENGTH) {
      for (let shipLength = 0; shipLength < CURRENT_LENGTH; shipLength++) {
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
    return (event.target.style.cursor = 'not-allowed');
  };

  const highlight = (event) => {
    event.target.style.cursor = 'crosshair';
    const CURRENT_LENGTH = BoardSetup.SHIP_LENGTHS[0];
    const selectedCoordinate = event.target.getAttribute('data-coordinate');
    const firstNumber = +selectedCoordinate[0];
    const secondNumber = +selectedCoordinate[2];
    let TOTAL = firstNumber + CURRENT_LENGTH;
    isHorizontal
      ? (TOTAL = firstNumber + CURRENT_LENGTH)
      : (TOTAL = secondNumber + CURRENT_LENGTH);
    checkTotal(TOTAL, selectedCoordinate, CURRENT_LENGTH, event);
  };

  const removeHighlight = (event) => {
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
