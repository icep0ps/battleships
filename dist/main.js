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
    event.target.style.cursor = 'move';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7OztBQ2xFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNoQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDUCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkLXNldHVwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUtbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXJzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcHMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMsIHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuY29uc3QgTUFYX0JPQVJEX0xFTkdUSCA9IDEwO1xyXG5cclxuY29uc3QgQm9hcmRTZXR1cCA9ICgoKSA9PiB7XHJcbiAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcicpO1xyXG4gIGNvbnN0IHlvdXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZWZmJyk7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlciA9IChib2FyZCkgPT4ge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IE1BWF9CT0FSRF9MRU5HVEg7IHkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgTUFYX0JPQVJEX0xFTkdUSDsgeCsrKSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICBjb29yZGluYXRlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJywgW3gsIHldKTtcclxuICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4gcmVuZGVyKGJvYXJkKSk7XHJcbiAgfTtcclxuICBjcmVhdGVCb2FyZHMoKTtcclxuXHJcbiAgY29uc3QgY3JlYXRlUGxheWVyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBsZXQgc2hpcExvYWN0aW9ucyA9IFtdO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0geW91ckJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XHJcblxyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLmZvckVhY2goXHJcbiAgICAgIChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIHRhcmdldCkge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJykgPT1cclxuICAgICAgICAgICAgbG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpXHJcbiAgICAgICAgICAgICAgPyBzaGlwTG9hY3Rpb25zLnB1c2goY29vcmRpbmF0ZSlcclxuICAgICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNoaXBMb2FjdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcclxuICAgICAgICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xyXG4gICAgICAgICAgbG9jYXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpc3ZhbGlkUGxhY2VtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBTSElQX0xFTkdUSFMgPSBbNSwgNCwgMywgMywgMiwgMl07XHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSB5b3VyQm9hcmQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcclxuXHJcbiAgY29uc3QgaXN2YWxpZFBsYWNlbWVudCA9IChlKSA9PiB7XHJcbiAgICBpZiAoU0hJUF9MRU5HVEhTLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgY3VycmVudFNoaXBMZW5ndGggPSBTSElQX0xFTkdUSFNbMF07XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgICBjb25zdCB5ID0gK2Nvb3JkaW5hdGVbMF07XHJcbiAgICAgIGNvbnN0IHggPSArY29vcmRpbmF0ZVsyXTtcclxuICAgICAgbGV0IFRPVEFMID0gMDtcclxuICAgICAgbW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKClcclxuICAgICAgICA/IChUT1RBTCA9IHkgKyBjdXJyZW50U2hpcExlbmd0aClcclxuICAgICAgICA6IChUT1RBTCA9IHggKyBjdXJyZW50U2hpcExlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoVE9UQUwgPD0gTUFYX0JPQVJEX0xFTkdUSCAmJiAhaXNDb2xsaWRpbmcoKSkge1xyXG4gICAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcCh5LCB4LCBjdXJyZW50U2hpcExlbmd0aCk7XHJcbiAgICAgICAgY3JlYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICBTSElQX0xFTkdUSFMuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzQ29sbGlkaW5nID0gKCkgPT4ge1xyXG4gICAgbGV0IGNvbGxpZGluZyA9IGZhbHNlO1xyXG4gICAgY29uc3QgaG92ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvdmVyJyk7XHJcbiAgICBjb25zdCBhbGxTaGlwTG9jYXRpb25zID1cclxuICAgICAgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLm1hcChcclxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5sb2NhdGlvblxyXG4gICAgICApO1xyXG4gICAgY29uc3QgZmluYWxJbnZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGFsbFNoaXBMb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb25zKSA9PiB7XHJcbiAgICAgIHJldHVybiBsb2NhdGlvbnMubWFwKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLnB1c2gobG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGhvdmVycy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLmluY2x1ZGVzKFxyXG4gICAgICAgIGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKVxyXG4gICAgICApXHJcbiAgICAgICAgPyAoY29sbGlkaW5nID0gdHJ1ZSlcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxpZGluZztcclxuICB9O1xyXG5cclxuICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaXN2YWxpZFBsYWNlbWVudCwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4geyBjb29yZGluYXRlcywgU0hJUF9MRU5HVEhTLCBpc0NvbGxpZGluZyB9O1xyXG59KSgpO1xyXG5cclxuY29uc3Qgc3RhcnRCYXR0bGUgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGNsZWFyU2V0dXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBjb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4nKTtcclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgY29tcHV0ZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY29tcHV0ZXJNb3ZlcyA9ICgpID0+IHtcclxuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuQUkuYm9hcmQucGxhY2VTaGlwKDMsIDQsIDUpO1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5BSS5ib2FyZC5wbGFjZVNoaXAoOCwgNiwgMik7XHJcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLkFJLmJvYXJkLnBsYWNlU2hpcCgxLCA3LCAzKTtcclxuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuQUkuYm9hcmQucGxhY2VTaGlwKDUsIDUsIDMpO1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5BSS5ib2FyZC5wbGFjZVNoaXAoMSwgMiwgMSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICBjbGVhclNldHVwKCk7XHJcbiAgICBjb21wdXRlck1vdmVzKCk7XHJcbiAgICByZW5kZXJCb2FyZHMuVXBkYXRlQWxsUGxheWVyc0JvYXJkcygpO1xyXG4gICAgcmVuZGVyQm9hcmRzLmFkZEVuZW15RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBzdGFydCB9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgbW91c2VFdmVudHMgPSAoKCkgPT4ge1xyXG4gIGxldCBpc0hvcml6b250YWwgPSB0cnVlO1xyXG4gIGxldCB2YWxpZENvb3JkaW5hdGVzID0gW107XHJcblxyXG4gIGNvbnN0IGdldGlzSG9yaXpvbnRhbCA9ICgpID0+IGlzSG9yaXpvbnRhbDtcclxuXHJcbiAgY29uc3Qgcm90YXRlID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGlzSG9yaXpvbnRhbCA/IChpc0hvcml6b250YWwgPSBmYWxzZSkgOiAoaXNIb3Jpem9udGFsID0gdHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2hlY2tUb3RhbCA9IChUT1RBTCwgc2VsZWN0ZWRDb29yZGluYXRlLCBDVVJSRU5UX0xFTkdUSCwgZXZlbnQpID0+IHtcclxuICAgIGlmIChUT1RBTCA8PSBNQVhfQk9BUkRfTEVOR1RIKSB7XHJcbiAgICAgIGZvciAobGV0IHNoaXBMZW5ndGggPSAwOyBzaGlwTGVuZ3RoIDwgQ1VSUkVOVF9MRU5HVEg7IHNoaXBMZW5ndGgrKykge1xyXG4gICAgICAgIGxldCBmaXJzdE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMF07XHJcbiAgICAgICAgbGV0IHNlY29uZE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMl07XHJcbiAgICAgICAgaXNIb3Jpem9udGFsXHJcbiAgICAgICAgICA/IChmaXJzdE51bWJlciArPSBzaGlwTGVuZ3RoKVxyXG4gICAgICAgICAgOiAoc2Vjb25kTnVtYmVyICs9IHNoaXBMZW5ndGgpO1xyXG5cclxuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIGBbZGF0YS1jb29yZGluYXRlPVwiJHtmaXJzdE51bWJlcn0sJHtzZWNvbmROdW1iZXJ9XCJdYFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvb3JkaW5hdGUuY2xhc3NMaXN0LmFkZCgnaG92ZXInKTtcclxuICAgICAgICB2YWxpZENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChldmVudC50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ25vdC1hbGxvd2VkJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGlnaGxpZ2h0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xyXG4gICAgY29uc3QgQ1VSUkVOVF9MRU5HVEggPSBCb2FyZFNldHVwLlNISVBfTEVOR1RIU1swXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkQ29vcmRpbmF0ZSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgY29uc3QgZmlyc3ROdW1iZXIgPSArc2VsZWN0ZWRDb29yZGluYXRlWzBdO1xyXG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVsyXTtcclxuICAgIGxldCBUT1RBTCA9IGZpcnN0TnVtYmVyICsgQ1VSUkVOVF9MRU5HVEg7XHJcbiAgICBpc0hvcml6b250YWxcclxuICAgICAgPyAoVE9UQUwgPSBmaXJzdE51bWJlciArIENVUlJFTlRfTEVOR1RIKVxyXG4gICAgICA6IChUT1RBTCA9IHNlY29uZE51bWJlciArIENVUlJFTlRfTEVOR1RIKTtcclxuICAgIGNoZWNrVG90YWwoVE9UQUwsIHNlbGVjdGVkQ29vcmRpbmF0ZSwgQ1VSUkVOVF9MRU5HVEgsIGV2ZW50KTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW1vdmVIaWdobGlnaHQgPSAoZXZlbnQpID0+IHtcclxuICAgIHZhbGlkQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBjb29yZGluYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBCb2FyZFNldHVwLmNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGlnaGxpZ2h0KTtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCByZW1vdmVIaWdobGlnaHQpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcclxuXHJcbiAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0QmF0dGxlLnN0YXJ0KTtcclxuXHJcbiAgcmV0dXJuIHsgcm90YXRlLCBnZXRpc0hvcml6b250YWwgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IG1vdXNlRXZlbnRzIH07XHJcbiIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcnMtZmFjdG9yeSc7XG5cbmNvbnN0IGdhbWVGbG93Q29udHJvbGxlcnMgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmUgPSBwbGF5ZXIoJ2plZmYnKTtcbiAgY29uc3QgQUkgPSBjb21wdXRlcignYWknKTtcblxuICBsZXQgYWxsUGxheWVycyA9IFtdO1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IGN1cnJlbnRFbmVteSA9IEFJO1xuXG4gIGNvbnN0IGdldEN1cnJlbnRQbGF5ZXIgPSAoKSA9PiBjdXJyZW50UGxheWVyO1xuICBjb25zdCBnZXRDdXJyZW50RW5lbXkgPSAoKSA9PiBjdXJyZW50RW5lbXk7XG5cbiAgYWxsUGxheWVycy5wdXNoKHBsYXllck9uZSk7XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiAoY3VycmVudEVuZW15LmJvYXJkLmFsbFNoaXBzU3VuaygpID8gdHJ1ZSA6IGZhbHNlKTtcblxuICBjb25zdCBzd2l0Y2hUdXJucyA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFBsYXllciA9PSBwbGF5ZXJPbmUpIHtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBBSTtcbiAgICAgIGN1cnJlbnRFbmVteSA9IHBsYXllck9uZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFBsYXllciA9PSBBSSkge1xuICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgIGN1cnJlbnRFbmVteSA9IEFJO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIEFJLFxuICAgIHBsYXllck9uZSxcbiAgICBhbGxQbGF5ZXJzLFxuXG4gICAgZ2FtZU92ZXIsXG4gICAgc3dpdGNoVHVybnMsXG4gICAgZ2V0Q3VycmVudFBsYXllcixcbiAgICBnZXRDdXJyZW50RW5lbXksXG4gIH07XG59KSgpO1xuXG5jb25zdCBQbGF5ZXJzQXR0YWNrcyA9ICgoKSA9PiB7XG4gIGNvbnN0IEFJX0FUVEFDS19ERUxBWSA9IDIwMDtcbiAgY29uc3QgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQgPSAoY29vcmRpYW5hdGUpID0+IHtcbiAgICByZXR1cm4gZ2FtZUZsb3dDb250cm9sbGVyc1xuICAgICAgLmdldEN1cnJlbnRQbGF5ZXIoKVxuICAgICAgLmF0dGFjayhjb29yZGlhbmF0ZSwgZ2FtZUZsb3dDb250cm9sbGVycy5nZXRDdXJyZW50RW5lbXkoKS5ib2FyZCk7XG4gIH07XG5cbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XG4gICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGUpXG4gICAgICA/IGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0JylcbiAgICAgIDogZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XG4gIH07XG5cbiAgY29uc3QgZW5lbXlBdHRhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRpYW5hdGVzID0gZ2FtZUZsb3dDb250cm9sbGVycy5BSS5nZW5hcmF0ZUNvb3JkaW5hdGVzKCk7XG4gICAgY29uc3QgZW5lbXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjamVmZicpO1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlID0gZW5lbXkucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1jb29yZGluYXRlPVwiJHtjb29yZGlhbmF0ZXN9XCJdYFxuICAgICk7XG5cbiAgICBJRl9DVVJSRU5UX1BMQVlFUl9BVFRBQ0tFRChjb29yZGlhbmF0ZXMpXG4gICAgICA/IGNvb3JkaWFuYXRlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0JylcbiAgICAgIDogY29vcmRpYW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XG5cbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLnN3aXRjaFR1cm5zKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gYXR0YWNrKGUpIHtcbiAgICBpZiAoZ2FtZUZsb3dDb250cm9sbGVycy5nYW1lT3ZlcigpKSB7XG4gICAgICBjb25zb2xlLmxvZygnZ2FtZW92ZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVyQXR0YWNrKGUpO1xuICAgICAgZ2FtZUZsb3dDb250cm9sbGVycy5zd2l0Y2hUdXJucygpO1xuICAgICAgc2V0VGltZW91dChlbmVteUF0dGFjaywgQUlfQVRUQUNLX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBhdHRhY2sgfTtcbn0pKCk7XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgoKSA9PiB7XG4gIGNvbnN0IGFkZE1hcmtzVG9WYWxpZENvb3JkaWFudGVzID0gKGxvY2F0aW9ucywgQm9hcmRjb29yZGluYXRlcykgPT4ge1xuICAgIGxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIEJvYXJkY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSBjb29yZGluYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XG4gICAgICAgIGN1cnJlbnRDb29yZGluYXRlID09IGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKVxuICAgICAgICAgID8gY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21hcmsnKVxuICAgICAgICAgIDogZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gVXBkYXRlQWxsUGxheWVyc0JvYXJkcygpIHtcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLmFsbFBsYXllcnMuZm9yRWFjaCgocGxheWVyKSA9PiB7XG4gICAgICBjb25zdCBwbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cGxheWVyLm5hbWV9YCk7XG4gICAgICBjb25zdCBCb2FyZGNvb3JkaW5hdGVzID0gcGxheWVycy5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xuICAgICAgcGxheWVyLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChzaGlwRGV0YWlsKSA9PiB7XG4gICAgICAgIGFkZE1hcmtzVG9WYWxpZENvb3JkaWFudGVzKHNoaXBEZXRhaWwubG9jYXRpb24sIEJvYXJkY29vcmRpbmF0ZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBhZGRFbmVteUV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IEFJX0JPQVJEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FpJyk7XG4gICAgY29uc3QgY29vcmRpYW5hdGVzID0gQUlfQk9BUkQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgICBjb29yZGlhbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29vcmRpbmF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBsYXllcnNBdHRhY2tzLmF0dGFjaywge1xuICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgVXBkYXRlQWxsUGxheWVyc0JvYXJkcywgYWRkRW5lbXlFdmVudExpc3RlbmVycyB9O1xufSkoKTtcblxuZXhwb3J0IHsgZ2FtZUZsb3dDb250cm9sbGVycywgcmVuZGVyQm9hcmRzIH07XG4iLCJpbXBvcnQgeyBtb3VzZUV2ZW50cyB9IGZyb20gJy4vYm9hcmQtc2V0dXAnO1xuaW1wb3J0IHsgc2hpcCBhcyBCYXR0bGVTaGlwIH0gZnJvbSAnLi9zaGlwcy1mYWN0b3J5JztcblxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBtaXNzZWRBdHRhY2tzID0gW107XG4gIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChDT09SRElOQVRFX09ORSwgQ09PUkRJTkFURV9UV08sIFNISVBfTEVOR1RIKSA9PiB7XG4gICAgY29uc3Qgc2hpcERldGFpbHMgPSB7XG4gICAgICBzaGlwOiBCYXR0bGVTaGlwKFNISVBfTEVOR1RIKSxcbiAgICAgIGxvY2F0aW9uOiBbXSxcbiAgICB9O1xuICAgIGZvciAoXG4gICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA8IFNISVBfTEVOR1RIO1xuICAgICAgY3VycmVudFBvc2l0aW9uKytcbiAgICApIHtcbiAgICAgIGxldCBmaXJzdENvb3JkaW5hdGUgPSBDT09SRElOQVRFX09ORTtcbiAgICAgIGxldCBzZWNvbmRDb29yZGluYXRlID0gQ09PUkRJTkFURV9UV087XG5cbiAgICAgIG1vdXNlRXZlbnRzLmdldGlzSG9yaXpvbnRhbCgpXG4gICAgICAgID8gKGZpcnN0Q29vcmRpbmF0ZSArPSBjdXJyZW50UG9zaXRpb24pXG4gICAgICAgIDogKHNlY29uZENvb3JkaW5hdGUgKz0gY3VycmVudFBvc2l0aW9uKTtcblxuICAgICAgY29uc3Qgc2hpcFBvc290aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgc2hpcERldGFpbHMubG9jYXRpb24ucHVzaChcbiAgICAgICAgYCR7Zmlyc3RDb29yZGluYXRlfSwke3NlY29uZENvb3JkaW5hdGV9LCR7c2hpcFBvc290aW9ufWBcbiAgICAgICk7XG4gICAgfVxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5zb21lKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xuICAgICAgICAgID8gY29vcmRpbmF0ZS5zaGlwLmhpdChsb2NhdGlvbi5zdWJzdHJpbmcoNCkpXG4gICAgICAgICAgOiBtaXNzZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZS5sb2NhdGlvbi5zb21lKFxuICAgICAgICAoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2hpcC5pc1NpbmsoKSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwQ29vcmRpbmF0ZXMsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNTdW5rLFxuICB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC1mYWN0b3J5JztcblxuY29uc3QgcGxheWVyID0gKGFyZykgPT4ge1xuICBjb25zdCBuYW1lID0gYXJnO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+IHtcbiAgICByZXR1cm4gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAyOyB4KyspIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIHJhbmRvbWl6ZSwgbmFtZSB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAodXNlcikgPT4ge1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuICBjb25zdCBuYW1lID0gdXNlcjtcbiAgY29uc3QgZ2VuYXJhdGVDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBsZXQgYXJyID0gJyc7XG4gICAgd2hpbGUgKGFyci5sZW5ndGggPCAyKSB7XG4gICAgICBsZXQgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGFyciArPSByO1xuICAgIH1cbiAgICByZXR1cm4gdmVyaWZ5KGFycik7XG4gIH07XG4gIGNvbnN0IGNvb3JkaW5hdGVzVXNlZCA9IFtdO1xuICBjb25zdCB2ZXJpZnkgPSAoYXJyKSA9PiB7XG4gICAgaWYgKGNvb3JkaW5hdGVzVXNlZC5pbmNsdWRlcyhhcnIpKSB7XG4gICAgICByZXR1cm4gZ2VuYXJhdGVDb29yZGluYXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChhcnIpO1xuICAgICAgY29uc29sZS5sb2coYCR7YXJyWzBdfSwke2FyclsxXX1gKTtcbiAgICAgIHJldHVybiBhcnJbMF0gKyAnLCcgKyBhcnJbMV07XG4gICAgfVxuICB9O1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcblxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAyOyB4KyspIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4geyBib2FyZCwgYXR0YWNrLCBnZW5hcmF0ZUNvb3JkaW5hdGVzLCByYW5kb21pemUsIG5hbWUgfTtcbn07XG5cbmV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGNvbnN0IHNoaXBIaXRzID0gW107XG4gIGNvbnN0IGhpdCA9IChwb3N0aW9uKSA9PiB7XG4gICAgaWYgKCFzaGlwSGl0cy5pbmNsdWRlcyhwb3N0aW9uKSAmJiBwb3N0aW9uIDw9IHNoaXBMZW5ndGgpIHtcbiAgICAgIHNoaXBIaXRzLnB1c2gocG9zdGlvbik7XG4gICAgICBjb25zb2xlLmxvZyhzaGlwSGl0cyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzU2luayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcExlbmd0aCA9PSBzaGlwSGl0cy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIHJldHVybiB7IGhpdCwgc2hpcEhpdHMsIGlzU2luaywgc2hpcExlbmd0aCB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lRmxvd0NvbnRyb2xsZXJzIH0gZnJvbSAnLi9nYW1lLWxvb3AnO1xyXG5pbXBvcnQgeyByZW5kZXJCb2FyZHMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==