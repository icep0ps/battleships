/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board-setup.js":
/*!****************************!*\
  !*** ./src/board-setup.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mouseEvents": () => (/* binding */ mouseEvents)
/* harmony export */ });
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loop */ "./src/game-loop.js");

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

    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.shipCoordinates.forEach(
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
        _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.placeShip(y, x, currentShipLength);
        createPlayerBoard();
        SHIP_LENGTHS.shift();
      }
    }
  };

  const isColliding = () => {
    let colliding = false;
    const hovers = document.querySelectorAll('.hover');
    const allShipLocations =
      _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.shipCoordinates.map(
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
    buttons.forEach((button) => {
      button.remove();
    });
    computer.style.display = 'block';
  };

  const computerMoves = () => {
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.board.placeShip(3, 4, 5);
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.board.placeShip(8, 6, 2);
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.board.placeShip(1, 7, 3);
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.board.placeShip(5, 5, 3);
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.board.placeShip(1, 2, 1);
  };

  const start = () => {
    clearSetup();
    computerMoves();
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.renderBoards.UpdateAllPlayersBoards();
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.renderBoards.addEnemyEventListeners();
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

  const start = document.getElementById('start');
  start.addEventListener('click', startBattle.start);

  return { rotate, getisHorizontal };
})();




/***/ }),

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameFlowControllers": () => (/* binding */ gameFlowControllers),
/* harmony export */   "renderBoards": () => (/* binding */ renderBoards)
/* harmony export */ });
/* harmony import */ var _players_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players-factory */ "./src/players-factory.js");


const gameFlowControllers = (() => {
  const playerOne = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.player)('jeff');
  const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');

  let allPlayers = [];
  let currentPlayer = playerOne;
  let currentEnemy = AI;

  const getCurrentPlayer = () => currentPlayer;
  const getCurrentEnemy = () => currentEnemy;

  allPlayers.push(playerOne);

  const gameOver = () => (currentEnemy.board.allShipsSunk() ? true : false);

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

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    IF_CURRENT_PLAYER_ATTACKED(coordianate)
      ? e.target.setAttribute('class', 'hit')
      : e.target.setAttribute('class', 'miss');
  };

  const enemyAttack = () => {
    const coordianates = gameFlowControllers.AI.genarateCoordinates();
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
    if (gameFlowControllers.gameOver()) {
      console.log('gameover');
    } else {
      playerAttack(e);
      gameFlowControllers.switchTurns();
      setTimeout(enemyAttack, AI_ATTACK_DELAY);
    }
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

  return { UpdateAllPlayersBoards, addEnemyEventListeners };
})();




/***/ }),

/***/ "./src/gameboard-factory.js":
/*!**********************************!*\
  !*** ./src/gameboard-factory.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _board_setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board-setup */ "./src/board-setup.js");
/* harmony import */ var _ships_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships-factory */ "./src/ships-factory.js");



const gameboard = () => {
  const missedAttacks = [];
  const shipCoordinates = [];

  const placeShip = (COORDINATE_ONE, COORDINATE_TWO, SHIP_LENGTH) => {
    const shipDetails = {
      ship: (0,_ships_factory__WEBPACK_IMPORTED_MODULE_1__.ship)(SHIP_LENGTH),
      location: [],
    };
    for (
      let currentPosition = 0;
      currentPosition < SHIP_LENGTH;
      currentPosition++
    ) {
      let firstCoordinate = COORDINATE_ONE;
      let secondCoordinate = COORDINATE_TWO;

      _board_setup__WEBPACK_IMPORTED_MODULE_0__.mouseEvents.getisHorizontal()
        ? (firstCoordinate += currentPosition)
        : (secondCoordinate += currentPosition);

      const shipPosotion = currentPosition;
      shipDetails.location.push(
        `${firstCoordinate},${secondCoordinate},${shipPosotion}`
      );
    }
    shipCoordinates.push(shipDetails);
  };

  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      coordinate.location.forEach((location) => {
        location.substring(0, 3) == coordinates
          ? coordinate.ship.hit(location.substring(4))
          : missedAttacks.push(coordinates);
      });
      return coordinate.location.some(
        (coordinate) => coordinate.substring(0, 3) == coordinates
      );
    });
  };

  const allShipsSunk = () => {
    return shipCoordinates.every((ship) => ship.ship.isSink());
  };

  return {
    shipCoordinates,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};




/***/ }),

/***/ "./src/players-factory.js":
/*!********************************!*\
  !*** ./src/players-factory.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard-factory */ "./src/gameboard-factory.js");


const player = (arg) => {
  const name = arg;
  const board = (0,_gameboard_factory__WEBPACK_IMPORTED_MODULE_0__.gameboard)();
  const attack = (coordinates, enemyBoard) => {
    return enemyBoard.receiveAttack(coordinates);
  };

  const randomize = () => {
    for (let i = 5; i > 0; i--) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      if (i == 3) {
        for (let x = 0; x < 2; x++) {
          board.placeShip(coordinate1, coordinate2, 3);
        }
      } else {
        board.placeShip(coordinate1, coordinate2, i);
      }
    }
  };

  return { board, attack, randomize, name };
};

const computer = (user) => {
  const board = (0,_gameboard_factory__WEBPACK_IMPORTED_MODULE_0__.gameboard)();
  const name = user;
  const genarateCoordinates = () => {
    let arr = '';
    while (arr.length < 2) {
      let r = Math.floor(Math.random() * 10);
      arr += r;
    }
    return verify(arr);
  };
  const coordinatesUsed = [];
  const verify = (arr) => {
    if (coordinatesUsed.includes(arr)) {
      return genarateCoordinates();
    } else {
      coordinatesUsed.push(arr);
      console.log(`${arr[0]},${arr[1]}`);
      return arr[0] + ',' + arr[1];
    }
  };
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const randomize = () => {
    for (let i = 5; i > 0; i--) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      if (i == 3) {
        for (let x = 0; x < 2; x++) {
          board.placeShip(coordinate1, coordinate2, 3);
        }
      } else {
        board.placeShip(coordinate1, coordinate2, i);
      }
    }
  };
  return { board, attack, genarateCoordinates, randomize, name };
};




/***/ }),

/***/ "./src/ships-factory.js":
/*!******************************!*\
  !*** ./src/ships-factory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
const ship = (length) => {
  const shipLength = length;
  const shipHits = [];
  const hit = (postion) => {
    if (!shipHits.includes(postion) && postion <= shipLength) {
      shipHits.push(postion);
      console.log(shipHits);
    }
  };

  const isSink = () => {
    return shipLength == shipHits.length ? true : false;
  };
  return { hit, shipHits, isSink, shipLength };
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loop */ "./src/game-loop.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7OztBQ2xFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNoQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDUCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkLXNldHVwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUtbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXJzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcHMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMsIHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuY29uc3QgTUFYX0JPQVJEX0xFTkdUSCA9IDEwO1xyXG5cclxuY29uc3QgQm9hcmRTZXR1cCA9ICgoKSA9PiB7XHJcbiAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcicpO1xyXG4gIGNvbnN0IHlvdXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZWZmJyk7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlciA9IChib2FyZCkgPT4ge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IE1BWF9CT0FSRF9MRU5HVEg7IHkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgTUFYX0JPQVJEX0xFTkdUSDsgeCsrKSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICBjb29yZGluYXRlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJywgW3gsIHldKTtcclxuICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4gcmVuZGVyKGJvYXJkKSk7XHJcbiAgfTtcclxuICBjcmVhdGVCb2FyZHMoKTtcclxuXHJcbiAgY29uc3QgY3JlYXRlUGxheWVyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBsZXQgc2hpcExvYWN0aW9ucyA9IFtdO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0geW91ckJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XHJcblxyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLmZvckVhY2goXHJcbiAgICAgIChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIHRhcmdldCkge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJykgPT1cclxuICAgICAgICAgICAgbG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpXHJcbiAgICAgICAgICAgICAgPyBzaGlwTG9hY3Rpb25zLnB1c2goY29vcmRpbmF0ZSlcclxuICAgICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNoaXBMb2FjdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcclxuICAgICAgICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xyXG4gICAgICAgICAgbG9jYXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpc3ZhbGlkUGxhY2VtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBTSElQX0xFTkdUSFMgPSBbNSwgNCwgMywgMywgMiwgMl07XHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSB5b3VyQm9hcmQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcclxuXHJcbiAgY29uc3QgaXN2YWxpZFBsYWNlbWVudCA9IChlKSA9PiB7XHJcbiAgICBpZiAoU0hJUF9MRU5HVEhTLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgY3VycmVudFNoaXBMZW5ndGggPSBTSElQX0xFTkdUSFNbMF07XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgICBjb25zdCB5ID0gK2Nvb3JkaW5hdGVbMF07XHJcbiAgICAgIGNvbnN0IHggPSArY29vcmRpbmF0ZVsyXTtcclxuICAgICAgbGV0IFRPVEFMID0gMDtcclxuICAgICAgbW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKClcclxuICAgICAgICA/IChUT1RBTCA9IHkgKyBjdXJyZW50U2hpcExlbmd0aClcclxuICAgICAgICA6IChUT1RBTCA9IHggKyBjdXJyZW50U2hpcExlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoVE9UQUwgPD0gTUFYX0JPQVJEX0xFTkdUSCAmJiAhaXNDb2xsaWRpbmcoKSkge1xyXG4gICAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcCh5LCB4LCBjdXJyZW50U2hpcExlbmd0aCk7XHJcbiAgICAgICAgY3JlYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICBTSElQX0xFTkdUSFMuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzQ29sbGlkaW5nID0gKCkgPT4ge1xyXG4gICAgbGV0IGNvbGxpZGluZyA9IGZhbHNlO1xyXG4gICAgY29uc3QgaG92ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvdmVyJyk7XHJcbiAgICBjb25zdCBhbGxTaGlwTG9jYXRpb25zID1cclxuICAgICAgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLm1hcChcclxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5sb2NhdGlvblxyXG4gICAgICApO1xyXG4gICAgY29uc3QgZmluYWxJbnZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGFsbFNoaXBMb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb25zKSA9PiB7XHJcbiAgICAgIHJldHVybiBsb2NhdGlvbnMubWFwKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLnB1c2gobG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGhvdmVycy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLmluY2x1ZGVzKFxyXG4gICAgICAgIGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKVxyXG4gICAgICApXHJcbiAgICAgICAgPyAoY29sbGlkaW5nID0gdHJ1ZSlcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxpZGluZztcclxuICB9O1xyXG5cclxuICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaXN2YWxpZFBsYWNlbWVudCwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4geyBjb29yZGluYXRlcywgU0hJUF9MRU5HVEhTLCBpc0NvbGxpZGluZyB9O1xyXG59KSgpO1xyXG5cclxuY29uc3Qgc3RhcnRCYXR0bGUgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGNsZWFyU2V0dXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBjb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4nKTtcclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgY29tcHV0ZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY29tcHV0ZXJNb3ZlcyA9ICgpID0+IHtcclxuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuQUkuYm9hcmQucGxhY2VTaGlwKDMsIDQsIDUpO1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5BSS5ib2FyZC5wbGFjZVNoaXAoOCwgNiwgMik7XHJcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLkFJLmJvYXJkLnBsYWNlU2hpcCgxLCA3LCAzKTtcclxuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuQUkuYm9hcmQucGxhY2VTaGlwKDUsIDUsIDMpO1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5BSS5ib2FyZC5wbGFjZVNoaXAoMSwgMiwgMSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICBjbGVhclNldHVwKCk7XHJcbiAgICBjb21wdXRlck1vdmVzKCk7XHJcbiAgICByZW5kZXJCb2FyZHMuVXBkYXRlQWxsUGxheWVyc0JvYXJkcygpO1xyXG4gICAgcmVuZGVyQm9hcmRzLmFkZEVuZW15RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBzdGFydCB9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgbW91c2VFdmVudHMgPSAoKCkgPT4ge1xyXG4gIGxldCBpc0hvcml6b250YWwgPSB0cnVlO1xyXG4gIGxldCB2YWxpZENvb3JkaW5hdGVzID0gW107XHJcblxyXG4gIGNvbnN0IGdldGlzSG9yaXpvbnRhbCA9ICgpID0+IGlzSG9yaXpvbnRhbDtcclxuXHJcbiAgY29uc3Qgcm90YXRlID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGlzSG9yaXpvbnRhbCA/IChpc0hvcml6b250YWwgPSBmYWxzZSkgOiAoaXNIb3Jpem9udGFsID0gdHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2hlY2tUb3RhbCA9IChUT1RBTCwgc2VsZWN0ZWRDb29yZGluYXRlLCBDVVJSRU5UX0xFTkdUSCwgZXZlbnQpID0+IHtcclxuICAgIGlmIChUT1RBTCA8PSBNQVhfQk9BUkRfTEVOR1RIKSB7XHJcbiAgICAgIGZvciAobGV0IHNoaXBMZW5ndGggPSAwOyBzaGlwTGVuZ3RoIDwgQ1VSUkVOVF9MRU5HVEg7IHNoaXBMZW5ndGgrKykge1xyXG4gICAgICAgIGxldCBmaXJzdE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMF07XHJcbiAgICAgICAgbGV0IHNlY29uZE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMl07XHJcbiAgICAgICAgaXNIb3Jpem9udGFsXHJcbiAgICAgICAgICA/IChmaXJzdE51bWJlciArPSBzaGlwTGVuZ3RoKVxyXG4gICAgICAgICAgOiAoc2Vjb25kTnVtYmVyICs9IHNoaXBMZW5ndGgpO1xyXG5cclxuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIGBbZGF0YS1jb29yZGluYXRlPVwiJHtmaXJzdE51bWJlcn0sJHtzZWNvbmROdW1iZXJ9XCJdYFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvb3JkaW5hdGUuY2xhc3NMaXN0LmFkZCgnaG92ZXInKTtcclxuICAgICAgICB2YWxpZENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChldmVudC50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ25vdC1hbGxvd2VkJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGlnaGxpZ2h0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XHJcbiAgICBjb25zdCBDVVJSRU5UX0xFTkdUSCA9IEJvYXJkU2V0dXAuU0hJUF9MRU5HVEhTWzBdO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb29yZGluYXRlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XHJcbiAgICBjb25zdCBmaXJzdE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMF07XHJcbiAgICBjb25zdCBzZWNvbmROdW1iZXIgPSArc2VsZWN0ZWRDb29yZGluYXRlWzJdO1xyXG4gICAgbGV0IFRPVEFMID0gZmlyc3ROdW1iZXIgKyBDVVJSRU5UX0xFTkdUSDtcclxuICAgIGlzSG9yaXpvbnRhbFxyXG4gICAgICA/IChUT1RBTCA9IGZpcnN0TnVtYmVyICsgQ1VSUkVOVF9MRU5HVEgpXHJcbiAgICAgIDogKFRPVEFMID0gc2Vjb25kTnVtYmVyICsgQ1VSUkVOVF9MRU5HVEgpO1xyXG4gICAgY2hlY2tUb3RhbChUT1RBTCwgc2VsZWN0ZWRDb29yZGluYXRlLCBDVVJSRU5UX0xFTkdUSCwgZXZlbnQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUhpZ2hsaWdodCA9IChldmVudCkgPT4ge1xyXG4gICAgdmFsaWRDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgIGNvb3JkaW5hdGUuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIEJvYXJkU2V0dXAuY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgY29vcmRpbmF0ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoaWdobGlnaHQpO1xyXG4gICAgY29vcmRpbmF0ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHJlbW92ZUhpZ2hsaWdodCk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUnKTtcclxuICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xyXG5cclxuICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG4gIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRCYXR0bGUuc3RhcnQpO1xyXG5cclxuICByZXR1cm4geyByb3RhdGUsIGdldGlzSG9yaXpvbnRhbCB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgbW91c2VFdmVudHMgfTtcclxuIiwiaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVycy1mYWN0b3J5JztcblxuY29uc3QgZ2FtZUZsb3dDb250cm9sbGVycyA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZSA9IHBsYXllcignamVmZicpO1xuICBjb25zdCBBSSA9IGNvbXB1dGVyKCdhaScpO1xuXG4gIGxldCBhbGxQbGF5ZXJzID0gW107XG4gIGxldCBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICBsZXQgY3VycmVudEVuZW15ID0gQUk7XG5cbiAgY29uc3QgZ2V0Q3VycmVudFBsYXllciA9ICgpID0+IGN1cnJlbnRQbGF5ZXI7XG4gIGNvbnN0IGdldEN1cnJlbnRFbmVteSA9ICgpID0+IGN1cnJlbnRFbmVteTtcblxuICBhbGxQbGF5ZXJzLnB1c2gocGxheWVyT25lKTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IChjdXJyZW50RW5lbXkuYm9hcmQuYWxsU2hpcHNTdW5rKCkgPyB0cnVlIDogZmFsc2UpO1xuXG4gIGNvbnN0IHN3aXRjaFR1cm5zID0gKCkgPT4ge1xuICAgIGlmIChjdXJyZW50UGxheWVyID09IHBsYXllck9uZSkge1xuICAgICAgY3VycmVudFBsYXllciA9IEFJO1xuICAgICAgY3VycmVudEVuZW15ID0gcGxheWVyT25lO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50UGxheWVyID09IEFJKSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICAgICAgY3VycmVudEVuZW15ID0gQUk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgQUksXG4gICAgcGxheWVyT25lLFxuICAgIGFsbFBsYXllcnMsXG5cbiAgICBnYW1lT3ZlcixcbiAgICBzd2l0Y2hUdXJucyxcbiAgICBnZXRDdXJyZW50UGxheWVyLFxuICAgIGdldEN1cnJlbnRFbmVteSxcbiAgfTtcbn0pKCk7XG5cbmNvbnN0IFBsYXllcnNBdHRhY2tzID0gKCgpID0+IHtcbiAgY29uc3QgQUlfQVRUQUNLX0RFTEFZID0gMjAwO1xuICBjb25zdCBJRl9DVVJSRU5UX1BMQVlFUl9BVFRBQ0tFRCA9IChjb29yZGlhbmF0ZSkgPT4ge1xuICAgIHJldHVybiBnYW1lRmxvd0NvbnRyb2xsZXJzXG4gICAgICAuZ2V0Q3VycmVudFBsYXllcigpXG4gICAgICAuYXR0YWNrKGNvb3JkaWFuYXRlLCBnYW1lRmxvd0NvbnRyb2xsZXJzLmdldEN1cnJlbnRFbmVteSgpLmJvYXJkKTtcbiAgfTtcblxuICBjb25zdCBwbGF5ZXJBdHRhY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcbiAgICBJRl9DVVJSRU5UX1BMQVlFUl9BVFRBQ0tFRChjb29yZGlhbmF0ZSlcbiAgICAgID8gZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKVxuICAgICAgOiBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcbiAgfTtcblxuICBjb25zdCBlbmVteUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZXMgPSBnYW1lRmxvd0NvbnRyb2xsZXJzLkFJLmdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBlbmVteSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqZWZmJyk7XG4gICAgY29uc3QgY29vcmRpYW5hdGUgPSBlbmVteS5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke2Nvb3JkaWFuYXRlc31cIl1gXG4gICAgKTtcblxuICAgIElGX0NVUlJFTlRfUExBWUVSX0FUVEFDS0VEKGNvb3JkaWFuYXRlcylcbiAgICAgID8gY29vcmRpYW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKVxuICAgICAgOiBjb29yZGlhbmF0ZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcblxuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuc3dpdGNoVHVybnMoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBhdHRhY2soZSkge1xuICAgIGlmIChnYW1lRmxvd0NvbnRyb2xsZXJzLmdhbWVPdmVyKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdnYW1lb3ZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJBdHRhY2soZSk7XG4gICAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLnN3aXRjaFR1cm5zKCk7XG4gICAgICBzZXRUaW1lb3V0KGVuZW15QXR0YWNrLCBBSV9BVFRBQ0tfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGF0dGFjayB9O1xufSkoKTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcbiAgY29uc3QgYWRkTWFya3NUb1ZhbGlkQ29vcmRpYW50ZXMgPSAobG9jYXRpb25zLCBCb2FyZGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgbG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGNvb3JkaW5hdGUgb2YgQm9hcmRjb29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcbiAgICAgICAgY3VycmVudENvb3JkaW5hdGUgPT0gbG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpXG4gICAgICAgICAgPyBjb29yZGluYXRlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpXG4gICAgICAgICAgOiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBVcGRhdGVBbGxQbGF5ZXJzQm9hcmRzKCkge1xuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuYWxsUGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXIubmFtZX1gKTtcbiAgICAgIGNvbnN0IEJvYXJkY29vcmRpbmF0ZXMgPSBwbGF5ZXJzLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XG4gICAgICBwbGF5ZXIuYm9hcmQuc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKHNoaXBEZXRhaWwpID0+IHtcbiAgICAgICAgYWRkTWFya3NUb1ZhbGlkQ29vcmRpYW50ZXMoc2hpcERldGFpbC5sb2NhdGlvbiwgQm9hcmRjb29yZGluYXRlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGFkZEVuZW15RXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgQUlfQk9BUkQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWknKTtcbiAgICBjb25zdCBjb29yZGlhbmF0ZXMgPSBBSV9CT0FSRC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xuICAgIGNvb3JkaWFuYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGxheWVyc0F0dGFja3MuYXR0YWNrLCB7XG4gICAgICAgIG9uY2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBVcGRhdGVBbGxQbGF5ZXJzQm9hcmRzLCBhZGRFbmVteUV2ZW50TGlzdGVuZXJzIH07XG59KSgpO1xuXG5leHBvcnQgeyBnYW1lRmxvd0NvbnRyb2xsZXJzLCByZW5kZXJCb2FyZHMgfTtcbiIsImltcG9ydCB7IG1vdXNlRXZlbnRzIH0gZnJvbSAnLi9ib2FyZC1zZXR1cCc7XG5pbXBvcnQgeyBzaGlwIGFzIEJhdHRsZVNoaXAgfSBmcm9tICcuL3NoaXBzLWZhY3RvcnknO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKENPT1JESU5BVEVfT05FLCBDT09SRElOQVRFX1RXTywgU0hJUF9MRU5HVEgpID0+IHtcbiAgICBjb25zdCBzaGlwRGV0YWlscyA9IHtcbiAgICAgIHNoaXA6IEJhdHRsZVNoaXAoU0hJUF9MRU5HVEgpLFxuICAgICAgbG9jYXRpb246IFtdLFxuICAgIH07XG4gICAgZm9yIChcbiAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgY3VycmVudFBvc2l0aW9uIDwgU0hJUF9MRU5HVEg7XG4gICAgICBjdXJyZW50UG9zaXRpb24rK1xuICAgICkge1xuICAgICAgbGV0IGZpcnN0Q29vcmRpbmF0ZSA9IENPT1JESU5BVEVfT05FO1xuICAgICAgbGV0IHNlY29uZENvb3JkaW5hdGUgPSBDT09SRElOQVRFX1RXTztcblxuICAgICAgbW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKClcbiAgICAgICAgPyAoZmlyc3RDb29yZGluYXRlICs9IGN1cnJlbnRQb3NpdGlvbilcbiAgICAgICAgOiAoc2Vjb25kQ29vcmRpbmF0ZSArPSBjdXJyZW50UG9zaXRpb24pO1xuXG4gICAgICBjb25zdCBzaGlwUG9zb3Rpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICBzaGlwRGV0YWlscy5sb2NhdGlvbi5wdXNoKFxuICAgICAgICBgJHtmaXJzdENvb3JkaW5hdGV9LCR7c2Vjb25kQ29vcmRpbmF0ZX0sJHtzaGlwUG9zb3Rpb259YFxuICAgICAgKTtcbiAgICB9XG4gICAgc2hpcENvb3JkaW5hdGVzLnB1c2goc2hpcERldGFpbHMpO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLnNvbWUoKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvb3JkaW5hdGUubG9jYXRpb24uZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgbG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpID09IGNvb3JkaW5hdGVzXG4gICAgICAgICAgPyBjb29yZGluYXRlLnNoaXAuaGl0KGxvY2F0aW9uLnN1YnN0cmluZyg0KSlcbiAgICAgICAgICA6IG1pc3NlZEF0dGFja3MucHVzaChjb29yZGluYXRlcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb29yZGluYXRlLmxvY2F0aW9uLnNvbWUoXG4gICAgICAgIChjb29yZGluYXRlKSA9PiBjb29yZGluYXRlLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaGlwLmlzU2luaygpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNoaXBDb29yZGluYXRlcyxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTaGlwc1N1bmssXG4gIH07XG59O1xuXG5leHBvcnQgeyBnYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLWZhY3RvcnknO1xuXG5jb25zdCBwbGF5ZXIgPSAoYXJnKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBhcmc7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT4ge1xuICAgIHJldHVybiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gNTsgaSA+IDA7IGktLSkge1xuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYgKGkgPT0gMykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xuICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIDMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgcmFuZG9taXplLCBuYW1lIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICh1c2VyKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gIGNvbnN0IG5hbWUgPSB1c2VyO1xuICBjb25zdCBnZW5hcmF0ZUNvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgIGxldCBhcnIgPSAnJztcbiAgICB3aGlsZSAoYXJyLmxlbmd0aCA8IDIpIHtcbiAgICAgIGxldCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgYXJyICs9IHI7XG4gICAgfVxuICAgIHJldHVybiB2ZXJpZnkoYXJyKTtcbiAgfTtcbiAgY29uc3QgY29vcmRpbmF0ZXNVc2VkID0gW107XG4gIGNvbnN0IHZlcmlmeSA9IChhcnIpID0+IHtcbiAgICBpZiAoY29vcmRpbmF0ZXNVc2VkLmluY2x1ZGVzKGFycikpIHtcbiAgICAgIHJldHVybiBnZW5hcmF0ZUNvb3JkaW5hdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvb3JkaW5hdGVzVXNlZC5wdXNoKGFycik7XG4gICAgICBjb25zb2xlLmxvZyhgJHthcnJbMF19LCR7YXJyWzFdfWApO1xuICAgICAgcmV0dXJuIGFyclswXSArICcsJyArIGFyclsxXTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gNTsgaSA+IDA7IGktLSkge1xuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYgKGkgPT0gMykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xuICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIDMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIGdlbmFyYXRlQ29vcmRpbmF0ZXMsIHJhbmRvbWl6ZSwgbmFtZSB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgY29uc3Qgc2hpcEhpdHMgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHBvc3Rpb24pID0+IHtcbiAgICBpZiAoIXNoaXBIaXRzLmluY2x1ZGVzKHBvc3Rpb24pICYmIHBvc3Rpb24gPD0gc2hpcExlbmd0aCkge1xuICAgICAgc2hpcEhpdHMucHVzaChwb3N0aW9uKTtcbiAgICAgIGNvbnNvbGUubG9nKHNoaXBIaXRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNTaW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGVuZ3RoID09IHNoaXBIaXRzLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIHsgaGl0LCBzaGlwSGl0cywgaXNTaW5rLCBzaGlwTGVuZ3RoIH07XG59O1xuXG5leHBvcnQgeyBzaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbmltcG9ydCB7IHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9