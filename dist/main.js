/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Factories/gameboard-factory.js":
/*!********************************************!*\
  !*** ./src/Factories/gameboard-factory.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _MouseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MouseEvents */ "./src/MouseEvents.js");
/* harmony import */ var _ships_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships-factory */ "./src/Factories/ships-factory.js");



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

      _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.mouseEvents.getisHorizontal()
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
      for (let location of coordinate.location) {
        location.substring(0, 3) == coordinates
          ? coordinate.ship.hit(location.substring(4))
          : missedAttacks.push(coordinates);
      }

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

/***/ "./src/Factories/players-factory.js":
/*!******************************************!*\
  !*** ./src/Factories/players-factory.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard-factory */ "./src/Factories/gameboard-factory.js");


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

/***/ "./src/Factories/ships-factory.js":
/*!****************************************!*\
  !*** ./src/Factories/ships-factory.js ***!
  \****************************************/
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
    }
  };

  const isSink = () => {
    return shipLength == shipHits.length ? true : false;
  };
  return { hit, shipHits, isSink, shipLength };
};




/***/ }),

/***/ "./src/MouseEvents.js":
/*!****************************!*\
  !*** ./src/MouseEvents.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mouseEvents": () => (/* binding */ mouseEvents)
/* harmony export */ });
/* harmony import */ var _board_setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board-setup */ "./src/board-setup.js");


const mouseEvents = (() => {
  let isHorizontal = true;
  let validCoordinates = [];

  const getisHorizontal = () => isHorizontal;
  const getValidCoordinates = () => {
    return validCoordinates;
  };

  const rotate = () => {
    return isHorizontal ? (isHorizontal = false) : (isHorizontal = true);
  };

  const checkTotal = (
    TOTAL_SPACE_OCCUPIED,
    selectedCoordinate,
    CURRENT_LENGTH,
    event
  ) => {
    if (TOTAL_SPACE_OCCUPIED <= _board_setup__WEBPACK_IMPORTED_MODULE_0__.MAX_BOARD_LENGTH) {
      for (let shipLength = 0; shipLength < CURRENT_LENGTH; shipLength++) {
        let firstNumber = +selectedCoordinate[0];
        let secondNumber = +selectedCoordinate[2];
        isHorizontal
          ? (firstNumber += shipLength)
          : (secondNumber += shipLength);

        const coordinate = document.querySelector(
          `[data-coordinate="${firstNumber},${secondNumber}"]`
        );
        if (coordinate.getAttribute('class') === 'mark') {
          event.target.style.cursor = 'not-allowed';
        }
        coordinate.classList.add('hover');
        validCoordinates.push(coordinate);
      }
      return;
    }
    event.target.style.cursor = 'not-allowed';
    return false;
  };

  const rotateBtn = document.getElementById('rotate');
  rotateBtn.addEventListener('click', rotate);

  return {
    rotate,
    getisHorizontal,
    checkTotal,
    getValidCoordinates,
    validCoordinates,
  };
})();




/***/ }),

/***/ "./src/board-setup.js":
/*!****************************!*\
  !*** ./src/board-setup.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoardSetup": () => (/* binding */ BoardSetup),
/* harmony export */   "MAX_BOARD_LENGTH": () => (/* binding */ MAX_BOARD_LENGTH)
/* harmony export */ });
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loop */ "./src/game-loop.js");
/* harmony import */ var _MouseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MouseEvents */ "./src/MouseEvents.js");



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
    for (let coordinate of _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.shipCoordinates) {
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

      if (_MouseEvents__WEBPACK_IMPORTED_MODULE_1__.mouseEvents.getisHorizontal()) {
        TOTAL_SPACE_OCCUPIED = coordinateY + currentShipLength;
      } else {
        TOTAL_SPACE_OCCUPIED = coordinateX + currentShipLength;
      }
      console.log('collide :', isCollidingWithOtherShip());
      if (
        TOTAL_SPACE_OCCUPIED <= MAX_BOARD_LENGTH &&
        !isCollidingWithOtherShip()
      ) {
        _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.placeShip(
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
      _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.shipCoordinates.map(
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
    _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.mouseEvents.getisHorizontal()
      ? (TOTAL_SPACE_OCCUPIED = firstNumber + CURRENT_LENGTH)
      : (TOTAL_SPACE_OCCUPIED = secondNumber + CURRENT_LENGTH);
    _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.mouseEvents.checkTotal(
      TOTAL_SPACE_OCCUPIED,
      selectedCoordinate,
      CURRENT_LENGTH,
      event
    );
  };

  const removeHighlight = () => {
    for (let coordinate of _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.mouseEvents.validCoordinates) {
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
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.AI.randomize();
  };

  const start = () => {
    clearSetup();
    computerMoves();
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.renderBoards.UpdateAllPlayersBoards();
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.renderBoards.addEnemyEventListeners();
  };

  return { start };
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
/* harmony import */ var _Factories_players_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Factories/players-factory */ "./src/Factories/players-factory.js");


const gameFlowControllers = (() => {
  const playerOne = (0,_Factories_players_factory__WEBPACK_IMPORTED_MODULE_0__.player)('jeff');
  const AI = (0,_Factories_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');

  const players = {
    playerOne: playerOne,
    AI: AI,
  };

  let allPlayers = [];
  let currentPlayer = playerOne;
  let currentEnemy = AI;

  const getCurrentPlayer = () => currentPlayer;
  const getCurrentEnemy = () => currentEnemy;

  allPlayers.push(playerOne);

  const gameOver = () => currentEnemy.board.allShipsSunk() && true;

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
    const enemy = document.querySelector(
      `${gameFlowControllers.playerOne.name}`
    );
    const coordianate = enemy.querySelector(
      `[data-coordinate="${coordianates}"]`
    );

    IF_CURRENT_PLAYER_ATTACKED(coordianates)
      ? coordianate.setAttribute('class', 'hit')
      : coordianate.setAttribute('class', 'miss');

    gameFlowControllers.switchTurns();
  };

  const attack = (e) => {
    if (gameFlowControllers.gameOver()) {
      return;
    }
    playerAttack(e);
    gameFlowControllers.switchTurns();
    setTimeout(enemyAttack, AI_ATTACK_DELAY);
  };

  return { attack };
})();

const renderBoards = (() => {
  const addMarksToValidCoordiantes = (locations, Boardcoordinates) => {
    for (let location of locations) {
      for (const coordinate of Boardcoordinates) {
        const currentCoordinate = coordinate.getAttribute('data-coordinate');
        currentCoordinate == location.substring(0, 3) &&
          coordinate.setAttribute('class', 'mark');
      }
    }
  };

  const UpdateAllPlayersBoards = () => {
    for (let player of gameFlowControllers.allPlayers) {
      console.log(player);
      const players = document.querySelector(`#${player.name}`);
      const Boardcoordinates = players.querySelectorAll(`[data-coordinate]`);
      for (let shipDetail of player.board.shipCoordinates) {
        addMarksToValidCoordiantes(shipDetail.location, Boardcoordinates);
      }
    }
  };

  const addEnemyEventListeners = () => {
    const AI_BOARD = document.getElementById('ai');
    const coordianates = AI_BOARD.querySelectorAll(`[data-coordinate]`);
    for (let coordianate of coordianates) {
      coordianate.addEventListener('click', PlayersAttacks.attack, {
        once: true,
      });
    }
  };

  return { UpdateAllPlayersBoards, addEnemyEventListeners };
})();




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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/board-setup.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtQ0FBbUM7QUFDNUM7QUFDQTtBQUNBLDJCQUEyQixhQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFlBQVk7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRDtBQUM2Qzs7Ozs7OztVQzlIN0M7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9GYWN0b3JpZXMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvRmFjdG9yaWVzL3BsYXllcnMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9GYWN0b3JpZXMvc2hpcHMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9Nb3VzZUV2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZC1zZXR1cC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW91c2VFdmVudHMgfSBmcm9tICcuLi9Nb3VzZUV2ZW50cyc7XHJcbmltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xyXG4gIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoQ09PUkRJTkFURV9PTkUsIENPT1JESU5BVEVfVFdPLCBTSElQX0xFTkdUSCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcERldGFpbHMgPSB7XHJcbiAgICAgIHNoaXA6IEJhdHRsZVNoaXAoU0hJUF9MRU5HVEgpLFxyXG4gICAgICBsb2NhdGlvbjogW10sXHJcbiAgICB9O1xyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XHJcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA8IFNISVBfTEVOR1RIO1xyXG4gICAgICBjdXJyZW50UG9zaXRpb24rK1xyXG4gICAgKSB7XHJcbiAgICAgIGxldCBmaXJzdENvb3JkaW5hdGUgPSBDT09SRElOQVRFX09ORTtcclxuICAgICAgbGV0IHNlY29uZENvb3JkaW5hdGUgPSBDT09SRElOQVRFX1RXTztcclxuXHJcbiAgICAgIG1vdXNlRXZlbnRzLmdldGlzSG9yaXpvbnRhbCgpXHJcbiAgICAgICAgPyAoZmlyc3RDb29yZGluYXRlICs9IGN1cnJlbnRQb3NpdGlvbilcclxuICAgICAgICA6IChzZWNvbmRDb29yZGluYXRlICs9IGN1cnJlbnRQb3NpdGlvbik7XHJcblxyXG4gICAgICBjb25zdCBzaGlwUG9zb3Rpb24gPSBjdXJyZW50UG9zaXRpb247XHJcbiAgICAgIHNoaXBEZXRhaWxzLmxvY2F0aW9uLnB1c2goXHJcbiAgICAgICAgYCR7Zmlyc3RDb29yZGluYXRlfSwke3NlY29uZENvb3JkaW5hdGV9LCR7c2hpcFBvc290aW9ufWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XHJcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLnNvbWUoKGNvb3JkaW5hdGUpID0+IHtcclxuICAgICAgZm9yIChsZXQgbG9jYXRpb24gb2YgY29vcmRpbmF0ZS5sb2NhdGlvbikge1xyXG4gICAgICAgIGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgPyBjb29yZGluYXRlLnNoaXAuaGl0KGxvY2F0aW9uLnN1YnN0cmluZyg0KSlcclxuICAgICAgICAgIDogbWlzc2VkQXR0YWNrcy5wdXNoKGNvb3JkaW5hdGVzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNvb3JkaW5hdGUubG9jYXRpb24uc29tZShcclxuICAgICAgICAoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2hpcC5pc1NpbmsoKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoaXBDb29yZGluYXRlcyxcclxuICAgIHBsYWNlU2hpcCxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBhbGxTaGlwc1N1bmssXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdhbWVib2FyZCB9O1xyXG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC1mYWN0b3J5JztcclxuXHJcbmNvbnN0IHBsYXllciA9ICh1c2VybmFtZSkgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSB1c2VybmFtZTtcclxuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT4ge1xyXG4gICAgcmV0dXJuIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGlmIChpID09IDMpIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xyXG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgcmFuZG9taXplLCBuYW1lIH07XHJcbn07XHJcblxyXG5jb25zdCBjb21wdXRlciA9ICh1c2VybmFtZSkgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSB1c2VybmFtZTtcclxuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzVXNlZCA9IFtdO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+XHJcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xyXG5cclxuICBjb25zdCBnZW5hcmF0ZUF0dGFja0Nvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgbGV0IGNvb3JkaW5hdGVzID0gJyc7XHJcbiAgICB3aGlsZSAoY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikge1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29vcmRpbmF0ZXMgKz0gY29vcmRpbmF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB2ZXJpZnlDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmVyaWZ5Q29vcmRpbmF0ZXMgPSAoY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIGlmIChjb29yZGluYXRlc1VzZWQuaW5jbHVkZXMoY29vcmRpbmF0ZXMpKSB7XHJcbiAgICAgIHJldHVybiBnZW5hcmF0ZUF0dGFja0Nvb3JkaW5hdGVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChjb29yZGluYXRlcyk7XHJcbiAgICAgIHJldHVybiBgJHtjb29yZGluYXRlc1swXX0sJHtjb29yZGluYXRlc1sxXX1gO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IFNISVBfTEVOR1RIUyA9IFs1LCA0LCAzLCAzLCAyLCAyXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU0hJUF9MRU5HVEhTLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCBTSElQX0xFTkdUSFMucG9wKCkpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgZ2VuYXJhdGVBdHRhY2tDb29yZGluYXRlcywgcmFuZG9taXplLCBuYW1lIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XHJcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGNvbnN0IHNoaXBIaXRzID0gW107XG4gIGNvbnN0IGhpdCA9IChwb3N0aW9uKSA9PiB7XG4gICAgaWYgKCFzaGlwSGl0cy5pbmNsdWRlcyhwb3N0aW9uKSAmJiBwb3N0aW9uIDw9IHNoaXBMZW5ndGgpIHtcbiAgICAgIHNoaXBIaXRzLnB1c2gocG9zdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzU2luayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcExlbmd0aCA9PSBzaGlwSGl0cy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIHJldHVybiB7IGhpdCwgc2hpcEhpdHMsIGlzU2luaywgc2hpcExlbmd0aCB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiaW1wb3J0IHsgTUFYX0JPQVJEX0xFTkdUSCB9IGZyb20gJy4vYm9hcmQtc2V0dXAnO1xyXG5cclxuY29uc3QgbW91c2VFdmVudHMgPSAoKCkgPT4ge1xyXG4gIGxldCBpc0hvcml6b250YWwgPSB0cnVlO1xyXG4gIGxldCB2YWxpZENvb3JkaW5hdGVzID0gW107XHJcblxyXG4gIGNvbnN0IGdldGlzSG9yaXpvbnRhbCA9ICgpID0+IGlzSG9yaXpvbnRhbDtcclxuICBjb25zdCBnZXRWYWxpZENvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHZhbGlkQ29vcmRpbmF0ZXM7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgcm90YXRlID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGlzSG9yaXpvbnRhbCA/IChpc0hvcml6b250YWwgPSBmYWxzZSkgOiAoaXNIb3Jpem9udGFsID0gdHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2hlY2tUb3RhbCA9IChcclxuICAgIFRPVEFMX1NQQUNFX09DQ1VQSUVELFxyXG4gICAgc2VsZWN0ZWRDb29yZGluYXRlLFxyXG4gICAgQ1VSUkVOVF9MRU5HVEgsXHJcbiAgICBldmVudFxyXG4gICkgPT4ge1xyXG4gICAgaWYgKFRPVEFMX1NQQUNFX09DQ1VQSUVEIDw9IE1BWF9CT0FSRF9MRU5HVEgpIHtcclxuICAgICAgZm9yIChsZXQgc2hpcExlbmd0aCA9IDA7IHNoaXBMZW5ndGggPCBDVVJSRU5UX0xFTkdUSDsgc2hpcExlbmd0aCsrKSB7XHJcbiAgICAgICAgbGV0IGZpcnN0TnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVswXTtcclxuICAgICAgICBsZXQgc2Vjb25kTnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVsyXTtcclxuICAgICAgICBpc0hvcml6b250YWxcclxuICAgICAgICAgID8gKGZpcnN0TnVtYmVyICs9IHNoaXBMZW5ndGgpXHJcbiAgICAgICAgICA6IChzZWNvbmROdW1iZXIgKz0gc2hpcExlbmd0aCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke2ZpcnN0TnVtYmVyfSwke3NlY29uZE51bWJlcn1cIl1gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdtYXJrJykge1xyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmN1cnNvciA9ICdub3QtYWxsb3dlZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvb3JkaW5hdGUuY2xhc3NMaXN0LmFkZCgnaG92ZXInKTtcclxuICAgICAgICB2YWxpZENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZXZlbnQudGFyZ2V0LnN0eWxlLmN1cnNvciA9ICdub3QtYWxsb3dlZCc7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdGF0ZScpO1xyXG4gIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByb3RhdGUsXHJcbiAgICBnZXRpc0hvcml6b250YWwsXHJcbiAgICBjaGVja1RvdGFsLFxyXG4gICAgZ2V0VmFsaWRDb29yZGluYXRlcyxcclxuICAgIHZhbGlkQ29vcmRpbmF0ZXMsXHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IG1vdXNlRXZlbnRzIH07XHJcbiIsImltcG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMsIHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuaW1wb3J0IHsgbW91c2VFdmVudHMgfSBmcm9tICcuL01vdXNlRXZlbnRzJztcclxuXHJcbmNvbnN0IE1BWF9CT0FSRF9MRU5HVEggPSAxMDtcclxuXHJcbmNvbnN0IEJvYXJkU2V0dXAgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXInKTtcclxuICBjb25zdCB5b3VyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamVmZicpO1xyXG5cclxuICBjb25zdCBjcmVhdGVCb2FyZHMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgcmVuZGVyID0gKGJvYXJkKSA9PiB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgTUFYX0JPQVJEX0xFTkdUSDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBNQVhfQk9BUkRfTEVOR1RIOyB4KyspIHtcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnLCBbeCwgeV0pO1xyXG4gICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29vcmRpbmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgYm9hcmQgb2YgYm9hcmRzKSB7XHJcbiAgICAgIHJlbmRlcihib2FyZCk7XHJcbiAgICB9XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3QgZGlzcGxheVNoaXBDb29yZGluYXRlcyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdkaXNwbGF5aW5nJyk7XHJcbiAgICBjb25zdCBzaGlwTG9hY3Rpb25zID0gW107XHJcbiAgICBjb25zdCB0YXJnZXQgPSB5b3VyQm9hcmQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29vcmRpbmF0ZV0nKTtcclxuICAgIGZvciAobGV0IGNvb3JkaW5hdGUgb2YgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmRcclxuICAgICAgLnNoaXBDb29yZGluYXRlcykge1xyXG4gICAgICBmb3IgKGxldCBsb2NhdGlvbiBvZiBjb29yZGluYXRlLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIHRhcmdldCkge1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSAmJiBzaGlwTG9hY3Rpb25zLnB1c2goY29vcmRpbmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBsb2NhdGlvbiBvZiBzaGlwTG9hY3Rpb25zKSB7XHJcbiAgICAgICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJyk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpc3ZhbGlkUGxhY2VtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFNISVBfTEVOR1RIUyA9IFs1LCA0LCAzLCAzLCAyLCAyXTtcclxuICBjb25zdCBjb29yZGluYXRlcyA9IHlvdXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb29yZGluYXRlXScpO1xyXG5cclxuICBjb25zdCBpc3ZhbGlkUGxhY2VtZW50ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBsZXQgVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSAwO1xyXG4gICAgaWYgKFNISVBfTEVOR1RIUy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGlwTGVuZ3RoID0gU0hJUF9MRU5HVEhTWzBdO1xyXG4gICAgICBjb25zdCBjb29yZGluYXRlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVZID0gK2Nvb3JkaW5hdGVbMF07XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVYID0gK2Nvb3JkaW5hdGVbMl07XHJcblxyXG4gICAgICBpZiAobW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICBUT1RBTF9TUEFDRV9PQ0NVUElFRCA9IGNvb3JkaW5hdGVZICsgY3VycmVudFNoaXBMZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSBjb29yZGluYXRlWCArIGN1cnJlbnRTaGlwTGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKCdjb2xsaWRlIDonLCBpc0NvbGxpZGluZ1dpdGhPdGhlclNoaXAoKSk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBUT1RBTF9TUEFDRV9PQ0NVUElFRCA8PSBNQVhfQk9BUkRfTEVOR1RIICYmXHJcbiAgICAgICAgIWlzQ29sbGlkaW5nV2l0aE90aGVyU2hpcCgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgICAgIGNvb3JkaW5hdGVZLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZVgsXHJcbiAgICAgICAgICBjdXJyZW50U2hpcExlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZGlzcGxheVNoaXBDb29yZGluYXRlcygpO1xyXG4gICAgICAgIFNISVBfTEVOR1RIUy5zaGlmdCgpO1xyXG4gICAgICAgIGlmIChCb2FyZFNldHVwLlNISVBfTEVOR1RIUy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0QmF0dGxlLnN0YXJ0KTtcclxuICAgICAgICAgIHN0YXJ0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncmVhZHknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBpc0NvbGxpZGluZ1dpdGhPdGhlclNoaXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbEludmFsaWRDb29yZGluYXRlcyA9IFtdO1xyXG4gICAgY29uc3QgaG92ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvdmVyJyk7XHJcbiAgICBjb25zdCBhbGxTaGlwTG9jYXRpb25zID1cclxuICAgICAgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLm1hcChcclxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5sb2NhdGlvblxyXG4gICAgICApO1xyXG4gICAgZm9yIChsZXQgbG9jYXRpb25zIG9mIGFsbFNoaXBMb2NhdGlvbnMpIHtcclxuICAgICAgbG9jYXRpb25zLm1hcCgobG9jYXRpb24pID0+IHtcclxuICAgICAgICBmaW5hbEludmFsaWRDb29yZGluYXRlcy5wdXNoKGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWxyZWFkeU1hcmtlZCA9IEFycmF5LmZyb20oaG92ZXJzKS5tYXAoKGNvb3JkaW5hdGUpID0+XHJcbiAgICAgIGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBhbHJlYWR5TWFya2VkLnNvbWUoKGNvb3JkaW5hdGUpID0+XHJcbiAgICAgIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLmluY2x1ZGVzKGNvb3JkaW5hdGUpXHJcbiAgICApO1xyXG4gIH07XHJcbiAgZm9yIChsZXQgY29vcmRpYW5hdGUgb2YgY29vcmRpbmF0ZXMpIHtcclxuICAgIGNvb3JkaWFuYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaXN2YWxpZFBsYWNlbWVudCwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGlnaGxpZ2h0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XHJcbiAgICBjb25zdCBDVVJSRU5UX0xFTkdUSCA9IFNISVBfTEVOR1RIU1swXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkQ29vcmRpbmF0ZSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgY29uc3QgZmlyc3ROdW1iZXIgPSArc2VsZWN0ZWRDb29yZGluYXRlWzBdO1xyXG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVsyXTtcclxuICAgIGxldCBUT1RBTF9TUEFDRV9PQ0NVUElFRCA9IGZpcnN0TnVtYmVyICsgQ1VSUkVOVF9MRU5HVEg7XHJcbiAgICBtb3VzZUV2ZW50cy5nZXRpc0hvcml6b250YWwoKVxyXG4gICAgICA/IChUT1RBTF9TUEFDRV9PQ0NVUElFRCA9IGZpcnN0TnVtYmVyICsgQ1VSUkVOVF9MRU5HVEgpXHJcbiAgICAgIDogKFRPVEFMX1NQQUNFX09DQ1VQSUVEID0gc2Vjb25kTnVtYmVyICsgQ1VSUkVOVF9MRU5HVEgpO1xyXG4gICAgbW91c2VFdmVudHMuY2hlY2tUb3RhbChcclxuICAgICAgVE9UQUxfU1BBQ0VfT0NDVVBJRUQsXHJcbiAgICAgIHNlbGVjdGVkQ29vcmRpbmF0ZSxcclxuICAgICAgQ1VSUkVOVF9MRU5HVEgsXHJcbiAgICAgIGV2ZW50XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUhpZ2hsaWdodCA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGNvb3JkaW5hdGUgb2YgbW91c2VFdmVudHMudmFsaWRDb29yZGluYXRlcykge1xyXG4gICAgICBpZiAoY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdtYXJrJykge1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvb3JkaW5hdGUuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGZvciAobGV0IGNvb3JkaW5hdGUgb2YgY29vcmRpbmF0ZXMpIHtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGlnaGxpZ2h0KTtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCByZW1vdmVIaWdobGlnaHQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIFNISVBfTEVOR1RIUywgaXNDb2xsaWRpbmdXaXRoT3RoZXJTaGlwIH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCBzdGFydEJhdHRsZSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgY2xlYXJTZXR1cCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcclxuICAgIGNvbnN0IGNvbXB1dGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbicpO1xyXG4gICAgY29uc3QgaW5mb21hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHRpb25zJyk7XHJcblxyXG4gICAgZm9yIChsZXQgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcclxuICAgICAgYnV0dG9uLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgY29tcHV0ZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBpbmZvbWF0aW9uLnJlbW92ZSgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNvbXB1dGVyTW92ZXMgPSAoKSA9PiB7XHJcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLkFJLnJhbmRvbWl6ZSgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgY2xlYXJTZXR1cCgpO1xyXG4gICAgY29tcHV0ZXJNb3ZlcygpO1xyXG4gICAgcmVuZGVyQm9hcmRzLlVwZGF0ZUFsbFBsYXllcnNCb2FyZHMoKTtcclxuICAgIHJlbmRlckJvYXJkcy5hZGRFbmVteUV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgc3RhcnQgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IEJvYXJkU2V0dXAsIE1BWF9CT0FSRF9MRU5HVEggfTtcclxuIiwiaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vRmFjdG9yaWVzL3BsYXllcnMtZmFjdG9yeSc7XHJcblxyXG5jb25zdCBnYW1lRmxvd0NvbnRyb2xsZXJzID0gKCgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJPbmUgPSBwbGF5ZXIoJ2plZmYnKTtcclxuICBjb25zdCBBSSA9IGNvbXB1dGVyKCdhaScpO1xyXG5cclxuICBjb25zdCBwbGF5ZXJzID0ge1xyXG4gICAgcGxheWVyT25lOiBwbGF5ZXJPbmUsXHJcbiAgICBBSTogQUksXHJcbiAgfTtcclxuXHJcbiAgbGV0IGFsbFBsYXllcnMgPSBbXTtcclxuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcclxuICBsZXQgY3VycmVudEVuZW15ID0gQUk7XHJcblxyXG4gIGNvbnN0IGdldEN1cnJlbnRQbGF5ZXIgPSAoKSA9PiBjdXJyZW50UGxheWVyO1xyXG4gIGNvbnN0IGdldEN1cnJlbnRFbmVteSA9ICgpID0+IGN1cnJlbnRFbmVteTtcclxuXHJcbiAgYWxsUGxheWVycy5wdXNoKHBsYXllck9uZSk7XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4gY3VycmVudEVuZW15LmJvYXJkLmFsbFNoaXBzU3VuaygpICYmIHRydWU7XHJcblxyXG4gIGNvbnN0IHN3aXRjaFR1cm5zID0gKCkgPT4ge1xyXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT0gcGxheWVyT25lKSB7XHJcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBBSTtcclxuICAgICAgY3VycmVudEVuZW15ID0gcGxheWVyT25lO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT0gQUkpIHtcclxuICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcclxuICAgICAgY3VycmVudEVuZW15ID0gQUk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgQUksXHJcbiAgICBwbGF5ZXJPbmUsXHJcbiAgICBhbGxQbGF5ZXJzLFxyXG5cclxuICAgIGdhbWVPdmVyLFxyXG4gICAgc3dpdGNoVHVybnMsXHJcbiAgICBnZXRDdXJyZW50UGxheWVyLFxyXG4gICAgZ2V0Q3VycmVudEVuZW15LFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCBQbGF5ZXJzQXR0YWNrcyA9ICgoKSA9PiB7XHJcbiAgY29uc3QgQUlfQVRUQUNLX0RFTEFZID0gMjAwO1xyXG4gIGNvbnN0IElGX0NVUlJFTlRfUExBWUVSX0FUVEFDS0VEID0gKGNvb3JkaWFuYXRlKSA9PiB7XHJcbiAgICByZXR1cm4gZ2FtZUZsb3dDb250cm9sbGVyc1xyXG4gICAgICAuZ2V0Q3VycmVudFBsYXllcigpXHJcbiAgICAgIC5hdHRhY2soY29vcmRpYW5hdGUsIGdhbWVGbG93Q29udHJvbGxlcnMuZ2V0Q3VycmVudEVuZW15KCkuYm9hcmQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XHJcbiAgICBJRl9DVVJSRU5UX1BMQVlFUl9BVFRBQ0tFRChjb29yZGlhbmF0ZSlcclxuICAgICAgPyBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpXHJcbiAgICAgIDogZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5lbXlBdHRhY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjb29yZGlhbmF0ZXMgPSBnYW1lRmxvd0NvbnRyb2xsZXJzLkFJLmdlbmFyYXRlQXR0YWNrQ29vcmRpbmF0ZXMoKTtcclxuICAgIGNvbnN0IGVuZW15ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCR7Z2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUubmFtZX1gXHJcbiAgICApO1xyXG4gICAgY29uc3QgY29vcmRpYW5hdGUgPSBlbmVteS5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgW2RhdGEtY29vcmRpbmF0ZT1cIiR7Y29vcmRpYW5hdGVzfVwiXWBcclxuICAgICk7XHJcblxyXG4gICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGVzKVxyXG4gICAgICA/IGNvb3JkaWFuYXRlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0JylcclxuICAgICAgOiBjb29yZGlhbmF0ZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcclxuXHJcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLnN3aXRjaFR1cm5zKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKGUpID0+IHtcclxuICAgIGlmIChnYW1lRmxvd0NvbnRyb2xsZXJzLmdhbWVPdmVyKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcGxheWVyQXR0YWNrKGUpO1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5zd2l0Y2hUdXJucygpO1xyXG4gICAgc2V0VGltZW91dChlbmVteUF0dGFjaywgQUlfQVRUQUNLX0RFTEFZKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBhdHRhY2sgfTtcclxufSkoKTtcclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgoKSA9PiB7XHJcbiAgY29uc3QgYWRkTWFya3NUb1ZhbGlkQ29vcmRpYW50ZXMgPSAobG9jYXRpb25zLCBCb2FyZGNvb3JkaW5hdGVzKSA9PiB7XHJcbiAgICBmb3IgKGxldCBsb2NhdGlvbiBvZiBsb2NhdGlvbnMpIHtcclxuICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIEJvYXJkY29vcmRpbmF0ZXMpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZSA9PSBsb2NhdGlvbi5zdWJzdHJpbmcoMCwgMykgJiZcclxuICAgICAgICAgIGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBVcGRhdGVBbGxQbGF5ZXJzQm9hcmRzID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgcGxheWVyIG9mIGdhbWVGbG93Q29udHJvbGxlcnMuYWxsUGxheWVycykge1xyXG4gICAgICBjb25zb2xlLmxvZyhwbGF5ZXIpO1xyXG4gICAgICBjb25zdCBwbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cGxheWVyLm5hbWV9YCk7XHJcbiAgICAgIGNvbnN0IEJvYXJkY29vcmRpbmF0ZXMgPSBwbGF5ZXJzLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XHJcbiAgICAgIGZvciAobGV0IHNoaXBEZXRhaWwgb2YgcGxheWVyLmJvYXJkLnNoaXBDb29yZGluYXRlcykge1xyXG4gICAgICAgIGFkZE1hcmtzVG9WYWxpZENvb3JkaWFudGVzKHNoaXBEZXRhaWwubG9jYXRpb24sIEJvYXJkY29vcmRpbmF0ZXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWRkRW5lbXlFdmVudExpc3RlbmVycyA9ICgpID0+IHtcclxuICAgIGNvbnN0IEFJX0JPQVJEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FpJyk7XHJcbiAgICBjb25zdCBjb29yZGlhbmF0ZXMgPSBBSV9CT0FSRC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xyXG4gICAgZm9yIChsZXQgY29vcmRpYW5hdGUgb2YgY29vcmRpYW5hdGVzKSB7XHJcbiAgICAgIGNvb3JkaWFuYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGxheWVyc0F0dGFja3MuYXR0YWNrLCB7XHJcbiAgICAgICAgb25jZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgVXBkYXRlQWxsUGxheWVyc0JvYXJkcywgYWRkRW5lbXlFdmVudExpc3RlbmVycyB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgZ2FtZUZsb3dDb250cm9sbGVycywgcmVuZGVyQm9hcmRzIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYm9hcmQtc2V0dXAuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=