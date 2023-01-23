import { gameFlowControllers, renderBoards } from './game-loop';
import { mouseEvents } from './MouseEvents';

const MAX_BOARD_LENGTH = 10;

const BoardSetup = (() => {
  const boards = document.querySelectorAll('.player');
  const yourBoard = document.getElementById('jeff');

  const createBoards = (() => {
    const render = (board) => {
      for (let y = 0; y < MAX_BOARD_LENGTH; y++) {
        for (let x = 0; x < MAX_BOARD_LENGTH; x++) {
          const coordinate = document.createElement('div');
          coordinate.setAttribute('data-coordinate', [x, y]);
          board.appendChild(coordinate);
        }
      }
    };
    for (let board of boards) {
      render(board);
    }
  })();

  const displayShipCoordinates = () => {
    console.log('displaying');
    const shipLoactions = [];
    const target = yourBoard.querySelectorAll('[data-coordinate]');
    for (let coordinate of gameFlowControllers.playerOne.board
      .shipCoordinates) {
      for (let location of coordinate.location) {
        for (const coordinate of target) {
          coordinate.getAttribute('data-coordinate') ==
            location.substring(0, 3) && shipLoactions.push(coordinate);
        }
      }

      for (let location of shipLoactions) {
        location.setAttribute('class', 'mark');
        location.removeEventListener('click', isvalidPlacement);
      }
    }
  };

  const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
  const coordinates = yourBoard.querySelectorAll('[data-coordinate]');

  const isvalidPlacement = (event) => {
    let TOTAL_SPACE_OCCUPIED = 0;
    if (SHIP_LENGTHS.length > 0) {
      const currentShipLength = SHIP_LENGTHS[0];
      const coordinate = event.target.getAttribute('data-coordinate');
      const coordinateY = +coordinate[0];
      const coordinateX = +coordinate[2];

      if (mouseEvents.getisHorizontal()) {
        TOTAL_SPACE_OCCUPIED = coordinateY + currentShipLength;
      } else {
        TOTAL_SPACE_OCCUPIED = coordinateX + currentShipLength;
      }
      console.log('collide :', isCollidingWithOtherShip());
      if (
        TOTAL_SPACE_OCCUPIED <= MAX_BOARD_LENGTH &&
        !isCollidingWithOtherShip()
      ) {
        gameFlowControllers.playerOne.board.placeShip(
          coordinateY,
          coordinateX,
          currentShipLength
        );
        displayShipCoordinates();
        SHIP_LENGTHS.shift();
        if (BoardSetup.SHIP_LENGTHS.length === 0) {
          const start = document.getElementById('start');
          start.addEventListener('click', startBattle.start);
          start.setAttribute('class', 'ready');
        }
      }
    }
  };

  const isCollidingWithOtherShip = () => {
    const finalInvalidCoordinates = [];
    const hovers = document.querySelectorAll('.hover');
    const allShipLocations =
      gameFlowControllers.playerOne.board.shipCoordinates.map(
        (ship) => ship.location
      );
    for (let locations of allShipLocations) {
      locations.map((location) => {
        finalInvalidCoordinates.push(location.substring(0, 3));
      });
    }
    const alreadyMarked = Array.from(hovers).map((coordinate) =>
      coordinate.getAttribute('data-coordinate')
    );
    return alreadyMarked.some((coordinate) =>
      finalInvalidCoordinates.includes(coordinate)
    );
  };
  for (let coordianate of coordinates) {
    coordianate.addEventListener('click', isvalidPlacement, { once: true });
  }

  const highlight = (event) => {
    event.target.style.cursor = 'crosshair';
    const CURRENT_LENGTH = SHIP_LENGTHS[0];
    const selectedCoordinate = event.target.getAttribute('data-coordinate');
    const firstNumber = +selectedCoordinate[0];
    const secondNumber = +selectedCoordinate[2];
    let TOTAL_SPACE_OCCUPIED = firstNumber + CURRENT_LENGTH;
    mouseEvents.getisHorizontal()
      ? (TOTAL_SPACE_OCCUPIED = firstNumber + CURRENT_LENGTH)
      : (TOTAL_SPACE_OCCUPIED = secondNumber + CURRENT_LENGTH);
    mouseEvents.checkTotal(
      TOTAL_SPACE_OCCUPIED,
      selectedCoordinate,
      CURRENT_LENGTH,
      event
    );
  };

  const removeHighlight = () => {
    for (let coordinate of mouseEvents.validCoordinates) {
      if (coordinate.getAttribute('class') === 'mark') {
      } else {
        coordinate.classList.remove('hover');
      }
    }
  };

  for (let coordinate of coordinates) {
    coordinate.addEventListener('mouseover', highlight);
    coordinate.addEventListener('mouseout', removeHighlight);
  }

  return { coordinates, SHIP_LENGTHS, isCollidingWithOtherShip };
})();

const startBattle = (() => {
  const clearSetup = () => {
    const buttons = document.querySelectorAll('button');
    const computer = document.getElementById('hidden');
    const infomation = document.querySelector('.options');

    for (let button of buttons) {
      button.remove();
    }
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

export { BoardSetup, MAX_BOARD_LENGTH };
