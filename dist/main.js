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
    const infomation = document.querySelector('.options');

    buttons.forEach((button) => {
      button.remove();
    });
    computer.style.display = 'block';
    infomation.remove();
  };

  const computerMoves = () => {
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.randomize();
    console.log('ran');
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
    const coordianates = gameFlowControllers.AI.genarateAttackCoordinates();
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


const player = (username) => {
  const name = username;
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

const computer = (username) => {
  const name = username;
  const board = (0,_gameboard_factory__WEBPACK_IMPORTED_MODULE_0__.gameboard)();
  const coordinatesUsed = [];

  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const genarateAttackCoordinates = () => {
    let coordinates = '';
    while (coordinates.length < 2) {
      let coordinate = Math.floor(Math.random() * 10);
      coordinates += coordinate;
    }
    return verifyCoordinates(coordinates);
  };

  const verifyCoordinates = (coordinates) => {
    if (coordinatesUsed.includes(coordinates)) {
      return genarateAttackCoordinates();
    } else {
      coordinatesUsed.push(coordinates);
      return `${coordinates[0]},${coordinates[1]}`;
    }
  };

  const randomize = () => {
    const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      board.placeShip(coordinate1, coordinate2, SHIP_LENGTHS.pop());
    }
  };
  return { board, attack, genarateAttackCoordinates, randomize, name };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVnQjs7Ozs7OztVQ2hCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvYm9hcmQtc2V0dXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS1sb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVib2FyZC1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllcnMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwcy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZUZsb3dDb250cm9sbGVycywgcmVuZGVyQm9hcmRzIH0gZnJvbSAnLi9nYW1lLWxvb3AnO1xyXG5jb25zdCBNQVhfQk9BUkRfTEVOR1RIID0gMTA7XHJcblxyXG5jb25zdCBCb2FyZFNldHVwID0gKCgpID0+IHtcclxuICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyJyk7XHJcbiAgY29uc3QgeW91ckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2plZmYnKTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmRzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmVuZGVyID0gKGJvYXJkKSA9PiB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgTUFYX0JPQVJEX0xFTkdUSDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBNQVhfQk9BUkRfTEVOR1RIOyB4KyspIHtcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnLCBbeCwgeV0pO1xyXG4gICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29vcmRpbmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiByZW5kZXIoYm9hcmQpKTtcclxuICB9O1xyXG4gIGNyZWF0ZUJvYXJkcygpO1xyXG5cclxuICBjb25zdCBjcmVhdGVQbGF5ZXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGxldCBzaGlwTG9hY3Rpb25zID0gW107XHJcbiAgICBjb25zdCB0YXJnZXQgPSB5b3VyQm9hcmQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcclxuXHJcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLnBsYXllck9uZS5ib2FyZC5zaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaChcclxuICAgICAgKGNvb3JkaW5hdGUpID0+IHtcclxuICAgICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGNvb3JkaW5hdGUgb2YgdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKSA9PVxyXG4gICAgICAgICAgICBsb2NhdGlvbi5zdWJzdHJpbmcoMCwgMylcclxuICAgICAgICAgICAgICA/IHNoaXBMb2FjdGlvbnMucHVzaChjb29yZGluYXRlKVxyXG4gICAgICAgICAgICAgIDogZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2hpcExvYWN0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJyk7XHJcbiAgICAgICAgICBsb2NhdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGlzdmFsaWRQbGFjZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IFNISVBfTEVOR1RIUyA9IFs1LCA0LCAzLCAzLCAyLCAyXTtcclxuICBjb25zdCBjb29yZGluYXRlcyA9IHlvdXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xyXG5cclxuICBjb25zdCBpc3ZhbGlkUGxhY2VtZW50ID0gKGUpID0+IHtcclxuICAgIGlmIChTSElQX0xFTkdUSFMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBjdXJyZW50U2hpcExlbmd0aCA9IFNISVBfTEVOR1RIU1swXTtcclxuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XHJcbiAgICAgIGNvbnN0IHkgPSArY29vcmRpbmF0ZVswXTtcclxuICAgICAgY29uc3QgeCA9ICtjb29yZGluYXRlWzJdO1xyXG4gICAgICBsZXQgVE9UQUwgPSAwO1xyXG4gICAgICBtb3VzZUV2ZW50cy5nZXRpc0hvcml6b250YWwoKVxyXG4gICAgICAgID8gKFRPVEFMID0geSArIGN1cnJlbnRTaGlwTGVuZ3RoKVxyXG4gICAgICAgIDogKFRPVEFMID0geCArIGN1cnJlbnRTaGlwTGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChUT1RBTCA8PSBNQVhfQk9BUkRfTEVOR1RIICYmICFpc0NvbGxpZGluZygpKSB7XHJcbiAgICAgICAgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKHksIHgsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcclxuICAgICAgICBjcmVhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgIFNISVBfTEVOR1RIUy5zaGlmdCgpO1xyXG4gICAgICAgIGlmIChCb2FyZFNldHVwLlNISVBfTEVOR1RIUy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0QmF0dGxlLnN0YXJ0KTtcclxuICAgICAgICAgIHN0YXJ0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncmVhZHknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBpc0NvbGxpZGluZyA9ICgpID0+IHtcclxuICAgIGxldCBjb2xsaWRpbmcgPSBmYWxzZTtcclxuICAgIGNvbnN0IGhvdmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob3ZlcicpO1xyXG4gICAgY29uc3QgYWxsU2hpcExvY2F0aW9ucyA9XHJcbiAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnNoaXBDb29yZGluYXRlcy5tYXAoXHJcbiAgICAgICAgKHNoaXApID0+IHNoaXAubG9jYXRpb25cclxuICAgICAgKTtcclxuICAgIGNvbnN0IGZpbmFsSW52YWxpZENvb3JkaW5hdGVzID0gW107XHJcbiAgICBhbGxTaGlwTG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9ucykgPT4ge1xyXG4gICAgICByZXR1cm4gbG9jYXRpb25zLm1hcCgobG9jYXRpb24pID0+IHtcclxuICAgICAgICBmaW5hbEludmFsaWRDb29yZGluYXRlcy5wdXNoKGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBob3ZlcnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBmaW5hbEludmFsaWRDb29yZGluYXRlcy5pbmNsdWRlcyhcclxuICAgICAgICBjb29yZGluYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJylcclxuICAgICAgKVxyXG4gICAgICAgID8gKGNvbGxpZGluZyA9IHRydWUpXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjb2xsaWRpbmc7XHJcbiAgfTtcclxuXHJcbiAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgY29vcmRpbmF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlzdmFsaWRQbGFjZW1lbnQsIHsgb25jZTogdHJ1ZSB9KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIFNISVBfTEVOR1RIUywgaXNDb2xsaWRpbmcgfTtcclxufSkoKTtcclxuXHJcbmNvbnN0IHN0YXJ0QmF0dGxlID0gKCgpID0+IHtcclxuICBjb25zdCBjbGVhclNldHVwID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xyXG4gICAgY29uc3QgY29tcHV0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuJyk7XHJcbiAgICBjb25zdCBpbmZvbWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wdGlvbnMnKTtcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24ucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIGNvbXB1dGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgaW5mb21hdGlvbi5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjb21wdXRlck1vdmVzID0gKCkgPT4ge1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5BSS5yYW5kb21pemUoKTtcclxuICAgIGNvbnNvbGUubG9nKCdyYW4nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcclxuICAgIGNsZWFyU2V0dXAoKTtcclxuICAgIGNvbXB1dGVyTW92ZXMoKTtcclxuICAgIHJlbmRlckJvYXJkcy5VcGRhdGVBbGxQbGF5ZXJzQm9hcmRzKCk7XHJcbiAgICByZW5kZXJCb2FyZHMuYWRkRW5lbXlFdmVudExpc3RlbmVycygpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IHN0YXJ0IH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCBtb3VzZUV2ZW50cyA9ICgoKSA9PiB7XHJcbiAgbGV0IGlzSG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgbGV0IHZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgY29uc3QgZ2V0aXNIb3Jpem9udGFsID0gKCkgPT4gaXNIb3Jpem9udGFsO1xyXG5cclxuICBjb25zdCByb3RhdGUgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gaXNIb3Jpem9udGFsID8gKGlzSG9yaXpvbnRhbCA9IGZhbHNlKSA6IChpc0hvcml6b250YWwgPSB0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGVja1RvdGFsID0gKFRPVEFMLCBzZWxlY3RlZENvb3JkaW5hdGUsIENVUlJFTlRfTEVOR1RILCBldmVudCkgPT4ge1xyXG4gICAgaWYgKFRPVEFMIDw9IE1BWF9CT0FSRF9MRU5HVEgpIHtcclxuICAgICAgZm9yIChsZXQgc2hpcExlbmd0aCA9IDA7IHNoaXBMZW5ndGggPCBDVVJSRU5UX0xFTkdUSDsgc2hpcExlbmd0aCsrKSB7XHJcbiAgICAgICAgbGV0IGZpcnN0TnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVswXTtcclxuICAgICAgICBsZXQgc2Vjb25kTnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVsyXTtcclxuICAgICAgICBpc0hvcml6b250YWxcclxuICAgICAgICAgID8gKGZpcnN0TnVtYmVyICs9IHNoaXBMZW5ndGgpXHJcbiAgICAgICAgICA6IChzZWNvbmROdW1iZXIgKz0gc2hpcExlbmd0aCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke2ZpcnN0TnVtYmVyfSwke3NlY29uZE51bWJlcn1cIl1gXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29vcmRpbmF0ZS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xyXG4gICAgICAgIHZhbGlkQ29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKGV2ZW50LnRhcmdldC5zdHlsZS5jdXJzb3IgPSAnbm90LWFsbG93ZWQnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoaWdobGlnaHQgPSAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnRhcmdldC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcclxuICAgIGNvbnN0IENVUlJFTlRfTEVOR1RIID0gQm9hcmRTZXR1cC5TSElQX0xFTkdUSFNbMF07XHJcbiAgICBjb25zdCBzZWxlY3RlZENvb3JkaW5hdGUgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgIGNvbnN0IGZpcnN0TnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVswXTtcclxuICAgIGNvbnN0IHNlY29uZE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMl07XHJcbiAgICBsZXQgVE9UQUwgPSBmaXJzdE51bWJlciArIENVUlJFTlRfTEVOR1RIO1xyXG4gICAgaXNIb3Jpem9udGFsXHJcbiAgICAgID8gKFRPVEFMID0gZmlyc3ROdW1iZXIgKyBDVVJSRU5UX0xFTkdUSClcclxuICAgICAgOiAoVE9UQUwgPSBzZWNvbmROdW1iZXIgKyBDVVJSRU5UX0xFTkdUSCk7XHJcbiAgICBjaGVja1RvdGFsKFRPVEFMLCBzZWxlY3RlZENvb3JkaW5hdGUsIENVUlJFTlRfTEVOR1RILCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVtb3ZlSGlnaGxpZ2h0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICB2YWxpZENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcclxuICAgICAgY29vcmRpbmF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgQm9hcmRTZXR1cC5jb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhpZ2hsaWdodCk7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgcmVtb3ZlSGlnaGxpZ2h0KTtcclxuICB9KTtcclxuXHJcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdGF0ZScpO1xyXG4gIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XHJcblxyXG4gIHJldHVybiB7IHJvdGF0ZSwgZ2V0aXNIb3Jpem9udGFsIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBtb3VzZUV2ZW50cyB9O1xyXG4iLCJpbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXJzLWZhY3RvcnknO1xuXG5jb25zdCBnYW1lRmxvd0NvbnRyb2xsZXJzID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyT25lID0gcGxheWVyKCdqZWZmJyk7XG4gIGNvbnN0IEFJID0gY29tcHV0ZXIoJ2FpJyk7XG5cbiAgbGV0IGFsbFBsYXllcnMgPSBbXTtcbiAgbGV0IGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIGxldCBjdXJyZW50RW5lbXkgPSBBSTtcblxuICBjb25zdCBnZXRDdXJyZW50UGxheWVyID0gKCkgPT4gY3VycmVudFBsYXllcjtcbiAgY29uc3QgZ2V0Q3VycmVudEVuZW15ID0gKCkgPT4gY3VycmVudEVuZW15O1xuXG4gIGFsbFBsYXllcnMucHVzaChwbGF5ZXJPbmUpO1xuXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4gKGN1cnJlbnRFbmVteS5ib2FyZC5hbGxTaGlwc1N1bmsoKSA/IHRydWUgOiBmYWxzZSk7XG5cbiAgY29uc3Qgc3dpdGNoVHVybnMgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT0gcGxheWVyT25lKSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gQUk7XG4gICAgICBjdXJyZW50RW5lbXkgPSBwbGF5ZXJPbmU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT0gQUkpIHtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gICAgICBjdXJyZW50RW5lbXkgPSBBSTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBBSSxcbiAgICBwbGF5ZXJPbmUsXG4gICAgYWxsUGxheWVycyxcblxuICAgIGdhbWVPdmVyLFxuICAgIHN3aXRjaFR1cm5zLFxuICAgIGdldEN1cnJlbnRQbGF5ZXIsXG4gICAgZ2V0Q3VycmVudEVuZW15LFxuICB9O1xufSkoKTtcblxuY29uc3QgUGxheWVyc0F0dGFja3MgPSAoKCkgPT4ge1xuICBjb25zdCBBSV9BVFRBQ0tfREVMQVkgPSAyMDA7XG4gIGNvbnN0IElGX0NVUlJFTlRfUExBWUVSX0FUVEFDS0VEID0gKGNvb3JkaWFuYXRlKSA9PiB7XG4gICAgcmV0dXJuIGdhbWVGbG93Q29udHJvbGxlcnNcbiAgICAgIC5nZXRDdXJyZW50UGxheWVyKClcbiAgICAgIC5hdHRhY2soY29vcmRpYW5hdGUsIGdhbWVGbG93Q29udHJvbGxlcnMuZ2V0Q3VycmVudEVuZW15KCkuYm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChlKSA9PiB7XG4gICAgY29uc3QgY29vcmRpYW5hdGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xuICAgIElGX0NVUlJFTlRfUExBWUVSX0FUVEFDS0VEKGNvb3JkaWFuYXRlKVxuICAgICAgPyBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpXG4gICAgICA6IGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xuICB9O1xuXG4gIGNvbnN0IGVuZW15QXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlcyA9IGdhbWVGbG93Q29udHJvbGxlcnMuQUkuZ2VuYXJhdGVBdHRhY2tDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IGVuZW15ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2plZmYnKTtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGVuZW15LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29vcmRpbmF0ZT1cIiR7Y29vcmRpYW5hdGVzfVwiXWBcbiAgICApO1xuXG4gICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGVzKVxuICAgICAgPyBjb29yZGlhbmF0ZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpXG4gICAgICA6IGNvb3JkaWFuYXRlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xuXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5zd2l0Y2hUdXJucygpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGF0dGFjayhlKSB7XG4gICAgaWYgKGdhbWVGbG93Q29udHJvbGxlcnMuZ2FtZU92ZXIoKSkge1xuICAgICAgY29uc29sZS5sb2coJ2dhbWVvdmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllckF0dGFjayhlKTtcbiAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMuc3dpdGNoVHVybnMoKTtcbiAgICAgIHNldFRpbWVvdXQoZW5lbXlBdHRhY2ssIEFJX0FUVEFDS19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYXR0YWNrIH07XG59KSgpO1xuXG5jb25zdCByZW5kZXJCb2FyZHMgPSAoKCkgPT4ge1xuICBjb25zdCBhZGRNYXJrc1RvVmFsaWRDb29yZGlhbnRlcyA9IChsb2NhdGlvbnMsIEJvYXJkY29vcmRpbmF0ZXMpID0+IHtcbiAgICBsb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgIGZvciAoY29uc3QgY29vcmRpbmF0ZSBvZiBCb2FyZGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb29yZGluYXRlID0gY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xuICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZSA9PSBsb2NhdGlvbi5zdWJzdHJpbmcoMCwgMylcbiAgICAgICAgICA/IGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJylcbiAgICAgICAgICA6IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIFVwZGF0ZUFsbFBsYXllcnNCb2FyZHMoKSB7XG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5hbGxQbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgICAgY29uc3QgcGxheWVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BsYXllci5uYW1lfWApO1xuICAgICAgY29uc3QgQm9hcmRjb29yZGluYXRlcyA9IHBsYXllcnMucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgICAgIHBsYXllci5ib2FyZC5zaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoc2hpcERldGFpbCkgPT4ge1xuICAgICAgICBhZGRNYXJrc1RvVmFsaWRDb29yZGlhbnRlcyhzaGlwRGV0YWlsLmxvY2F0aW9uLCBCb2FyZGNvb3JkaW5hdGVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgYWRkRW5lbXlFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBBSV9CT0FSRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaScpO1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlcyA9IEFJX0JPQVJELnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XG4gICAgY29vcmRpYW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQbGF5ZXJzQXR0YWNrcy5hdHRhY2ssIHtcbiAgICAgICAgb25jZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7IFVwZGF0ZUFsbFBsYXllcnNCb2FyZHMsIGFkZEVuZW15RXZlbnRMaXN0ZW5lcnMgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMsIHJlbmRlckJvYXJkcyB9O1xuIiwiaW1wb3J0IHsgbW91c2VFdmVudHMgfSBmcm9tICcuL2JvYXJkLXNldHVwJztcbmltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XG5cbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoQ09PUkRJTkFURV9PTkUsIENPT1JESU5BVEVfVFdPLCBTSElQX0xFTkdUSCkgPT4ge1xuICAgIGNvbnN0IHNoaXBEZXRhaWxzID0ge1xuICAgICAgc2hpcDogQmF0dGxlU2hpcChTSElQX0xFTkdUSCksXG4gICAgICBsb2NhdGlvbjogW10sXG4gICAgfTtcbiAgICBmb3IgKFxuICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICBjdXJyZW50UG9zaXRpb24gPCBTSElQX0xFTkdUSDtcbiAgICAgIGN1cnJlbnRQb3NpdGlvbisrXG4gICAgKSB7XG4gICAgICBsZXQgZmlyc3RDb29yZGluYXRlID0gQ09PUkRJTkFURV9PTkU7XG4gICAgICBsZXQgc2Vjb25kQ29vcmRpbmF0ZSA9IENPT1JESU5BVEVfVFdPO1xuXG4gICAgICBtb3VzZUV2ZW50cy5nZXRpc0hvcml6b250YWwoKVxuICAgICAgICA/IChmaXJzdENvb3JkaW5hdGUgKz0gY3VycmVudFBvc2l0aW9uKVxuICAgICAgICA6IChzZWNvbmRDb29yZGluYXRlICs9IGN1cnJlbnRQb3NpdGlvbik7XG5cbiAgICAgIGNvbnN0IHNoaXBQb3NvdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgIHNoaXBEZXRhaWxzLmxvY2F0aW9uLnB1c2goXG4gICAgICAgIGAke2ZpcnN0Q29vcmRpbmF0ZX0sJHtzZWNvbmRDb29yZGluYXRlfSwke3NoaXBQb3NvdGlvbn1gXG4gICAgICApO1xuICAgIH1cbiAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChzaGlwRGV0YWlscyk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuc29tZSgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBsb2NhdGlvbi5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcbiAgICAgICAgICA/IGNvb3JkaW5hdGUuc2hpcC5oaXQobG9jYXRpb24uc3Vic3RyaW5nKDQpKVxuICAgICAgICAgIDogbWlzc2VkQXR0YWNrcy5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvb3JkaW5hdGUubG9jYXRpb24uc29tZShcbiAgICAgICAgKGNvb3JkaW5hdGUpID0+IGNvb3JkaW5hdGUuc3Vic3RyaW5nKDAsIDMpID09IGNvb3JkaW5hdGVzXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnNoaXAuaXNTaW5rKCkpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2hpcENvb3JkaW5hdGVzLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzU3VuayxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQtZmFjdG9yeSc7XG5cbmNvbnN0IHBsYXllciA9ICh1c2VybmFtZSkgPT4ge1xuICBjb25zdCBuYW1lID0gdXNlcm5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT4ge1xuICAgIHJldHVybiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gNTsgaSA+IDA7IGktLSkge1xuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYgKGkgPT0gMykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xuICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIDMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgcmFuZG9taXplLCBuYW1lIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICh1c2VybmFtZSkgPT4ge1xuICBjb25zdCBuYW1lID0gdXNlcm5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gIGNvbnN0IGNvb3JkaW5hdGVzVXNlZCA9IFtdO1xuXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuXG4gIGNvbnN0IGdlbmFyYXRlQXR0YWNrQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gJyc7XG4gICAgd2hpbGUgKGNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgIGxldCBjb29yZGluYXRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29vcmRpbmF0ZXMgKz0gY29vcmRpbmF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZlcmlmeUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCB2ZXJpZnlDb29yZGluYXRlcyA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGlmIChjb29yZGluYXRlc1VzZWQuaW5jbHVkZXMoY29vcmRpbmF0ZXMpKSB7XG4gICAgICByZXR1cm4gZ2VuYXJhdGVBdHRhY2tDb29yZGluYXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChjb29yZGluYXRlcyk7XG4gICAgICByZXR1cm4gYCR7Y29vcmRpbmF0ZXNbMF19LCR7Y29vcmRpbmF0ZXNbMV19YDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xuICAgIGNvbnN0IFNISVBfTEVOR1RIUyA9IFs1LCA0LCAzLCAzLCAyLCAyXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNISVBfTEVOR1RIUy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgU0hJUF9MRU5HVEhTLnBvcCgpKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIGdlbmFyYXRlQXR0YWNrQ29vcmRpbmF0ZXMsIHJhbmRvbWl6ZSwgbmFtZSB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgY29uc3Qgc2hpcEhpdHMgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHBvc3Rpb24pID0+IHtcbiAgICBpZiAoIXNoaXBIaXRzLmluY2x1ZGVzKHBvc3Rpb24pICYmIHBvc3Rpb24gPD0gc2hpcExlbmd0aCkge1xuICAgICAgc2hpcEhpdHMucHVzaChwb3N0aW9uKTtcbiAgICAgIGNvbnNvbGUubG9nKHNoaXBIaXRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNTaW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGVuZ3RoID09IHNoaXBIaXRzLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIHsgaGl0LCBzaGlwSGl0cywgaXNTaW5rLCBzaGlwTGVuZ3RoIH07XG59O1xuXG5leHBvcnQgeyBzaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbmltcG9ydCB7IHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9