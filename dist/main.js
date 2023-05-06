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
/* harmony import */ var _board_setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../board-setup */ "./src/board-setup.js");



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

  const SHIP_LENGTHS = [5, 4, 3, 3, 2, 2];
  const randomize = () => {
    while (SHIP_LENGTHS.length !== 0) {
      console.log(SHIP_LENGTHS);
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      isValidComputerPlacement(coordinate1, coordinate2);
    }
  };

  const isCollidingWithOtherShip = (coordinate1, coordinate2) => {
    const finalInvalidCoordinates = [];

    const allShipLocations = board.shipCoordinates.map((ship) => ship.location);
    for (let locations of allShipLocations) {
      locations.map((location) => {
        finalInvalidCoordinates.push(location.substring(0, 3));
      });
    }

    return finalInvalidCoordinates.includes(`${coordinate1},${coordinate2}`);
  };

  const isValidComputerPlacement = (coordinate1, coordinate2) => {
    const position = true;
    let TOTAL_SPACE_OCCUPIED = 0;
    if (SHIP_LENGTHS.length > 0) {
      const currentShipLength = SHIP_LENGTHS.shift();
      let coordinateY = coordinate1;
      let coordinateX = coordinate2;

      const SHIP_IS_NOT_COLLIDIING = function () {
        if (position) {
          TOTAL_SPACE_OCCUPIED = coordinateY + currentShipLength;
        } else {
          TOTAL_SPACE_OCCUPIED = coordinateX + currentShipLength;
        }
        (TOTAL_SPACE_OCCUPIED <= _board_setup__WEBPACK_IMPORTED_MODULE_1__.MAX_BOARD_LENGTH) &
          console.log(TOTAL_SPACE_OCCUPIED);
        return (
          TOTAL_SPACE_OCCUPIED <= _board_setup__WEBPACK_IMPORTED_MODULE_1__.MAX_BOARD_LENGTH &&
          !isCollidingWithOtherShip(coordinate1, coordinate2)
        );
      };
      let ship_is_colliding = !SHIP_IS_NOT_COLLIDIING();
      while (ship_is_colliding) {
        coordinateY = Math.floor(Math.random() * 10);
        coordinateX = Math.floor(Math.random() * 10);
        ship_is_colliding = !SHIP_IS_NOT_COLLIDIING;
        console.log('-------genarating new coordinates------');
      }
      console.log(coordinateY, coordinateX, currentShipLength);
      board.placeShip(coordinateY, coordinateX, currentShipLength);
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
        displayNextShipToPlace(SHIP_LENGTHS[0]);
        if (BoardSetup.SHIP_LENGTHS.length === 0) {
          const panel = document.querySelector('.ship');
          const Readytext = document.createElement('p');
          Readytext.innerText = 'Ready for battle!';
          panel.appendChild(Readytext);
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

  const displayNextShipToPlace = (shipLength) => {
    const panel = document.querySelector('.ship');

    while (panel.firstChild) {
      panel.removeChild(panel.firstChild);
    }
    for (let i = 1; i <= shipLength; i++) {
      const span = document.createElement('span');
      panel.appendChild(span);
    }
  };

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

  const gameOver = () => currentPlayer.board.allShipsSunk();

  const switchTurns = () => {
    if (currentPlayer === playerOne) {
      currentPlayer = AI;
      currentEnemy = playerOne;
      return;
    }

    if (currentPlayer === AI) {
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

  const playerAttack = (usersAttack) => {
    if (gameFlowControllers.gameOver()) {
      return console.log(
        `Gameover ${gameFlowControllers.getCurrentEnemy().name} wins`
      );
    }
    if (usersAttack) {
      const coordianate = usersAttack.target.getAttribute('data-coordinate');
      IF_CURRENT_PLAYER_ATTACKED(coordianate)
        ? usersAttack.target.setAttribute('class', 'hit')
        : usersAttack.target.setAttribute('class', 'miss');
    } else {
      const coordianates = gameFlowControllers.AI.genarateAttackCoordinates();
      const enemy = document.querySelector(
        `#${gameFlowControllers.playerOne.name}`
      );
      const coordianate = enemy.querySelector(
        `[data-coordinate="${coordianates}"]`
      );
      IF_CURRENT_PLAYER_ATTACKED(coordianates)
        ? coordianate.setAttribute('class', 'hit')
        : coordianate.setAttribute('class', 'miss');
    }
    gameFlowControllers.switchTurns();
    return;
  };

  const attack = (event) => {
    playerAttack(event);
    playerAttack(null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9GYWN0b3JpZXMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvRmFjdG9yaWVzL3BsYXllcnMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9GYWN0b3JpZXMvc2hpcHMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9Nb3VzZUV2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZC1zZXR1cC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW91c2VFdmVudHMgfSBmcm9tICcuLi9Nb3VzZUV2ZW50cyc7XHJcbmltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xyXG4gIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoQ09PUkRJTkFURV9PTkUsIENPT1JESU5BVEVfVFdPLCBTSElQX0xFTkdUSCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcERldGFpbHMgPSB7XHJcbiAgICAgIHNoaXA6IEJhdHRsZVNoaXAoU0hJUF9MRU5HVEgpLFxyXG4gICAgICBsb2NhdGlvbjogW10sXHJcbiAgICB9O1xyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XHJcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA8IFNISVBfTEVOR1RIO1xyXG4gICAgICBjdXJyZW50UG9zaXRpb24rK1xyXG4gICAgKSB7XHJcbiAgICAgIGxldCBmaXJzdENvb3JkaW5hdGUgPSBDT09SRElOQVRFX09ORTtcclxuICAgICAgbGV0IHNlY29uZENvb3JkaW5hdGUgPSBDT09SRElOQVRFX1RXTztcclxuXHJcbiAgICAgIG1vdXNlRXZlbnRzLmdldGlzSG9yaXpvbnRhbCgpXHJcbiAgICAgICAgPyAoZmlyc3RDb29yZGluYXRlICs9IGN1cnJlbnRQb3NpdGlvbilcclxuICAgICAgICA6IChzZWNvbmRDb29yZGluYXRlICs9IGN1cnJlbnRQb3NpdGlvbik7XHJcblxyXG4gICAgICBjb25zdCBzaGlwUG9zb3Rpb24gPSBjdXJyZW50UG9zaXRpb247XHJcbiAgICAgIHNoaXBEZXRhaWxzLmxvY2F0aW9uLnB1c2goXHJcbiAgICAgICAgYCR7Zmlyc3RDb29yZGluYXRlfSwke3NlY29uZENvb3JkaW5hdGV9LCR7c2hpcFBvc290aW9ufWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XHJcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLnNvbWUoKGNvb3JkaW5hdGUpID0+IHtcclxuICAgICAgZm9yIChsZXQgbG9jYXRpb24gb2YgY29vcmRpbmF0ZS5sb2NhdGlvbikge1xyXG4gICAgICAgIGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgPyBjb29yZGluYXRlLnNoaXAuaGl0KGxvY2F0aW9uLnN1YnN0cmluZyg0KSlcclxuICAgICAgICAgIDogbWlzc2VkQXR0YWNrcy5wdXNoKGNvb3JkaW5hdGVzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNvb3JkaW5hdGUubG9jYXRpb24uc29tZShcclxuICAgICAgICAoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2hpcC5pc1NpbmsoKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoaXBDb29yZGluYXRlcyxcclxuICAgIHBsYWNlU2hpcCxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBhbGxTaGlwc1N1bmssXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdhbWVib2FyZCB9O1xyXG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC1mYWN0b3J5JztcclxuaW1wb3J0IHsgTUFYX0JPQVJEX0xFTkdUSCB9IGZyb20gJy4uL2JvYXJkLXNldHVwJztcclxuXHJcbmNvbnN0IHBsYXllciA9ICh1c2VybmFtZSkgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSB1c2VybmFtZTtcclxuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT4ge1xyXG4gICAgcmV0dXJuIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGlmIChpID09IDMpIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xyXG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgcmFuZG9taXplLCBuYW1lIH07XHJcbn07XHJcblxyXG5jb25zdCBjb21wdXRlciA9ICh1c2VybmFtZSkgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSB1c2VybmFtZTtcclxuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzVXNlZCA9IFtdO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+XHJcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xyXG5cclxuICBjb25zdCBnZW5hcmF0ZUF0dGFja0Nvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgbGV0IGNvb3JkaW5hdGVzID0gJyc7XHJcbiAgICB3aGlsZSAoY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikge1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29vcmRpbmF0ZXMgKz0gY29vcmRpbmF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB2ZXJpZnlDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmVyaWZ5Q29vcmRpbmF0ZXMgPSAoY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIGlmIChjb29yZGluYXRlc1VzZWQuaW5jbHVkZXMoY29vcmRpbmF0ZXMpKSB7XHJcbiAgICAgIHJldHVybiBnZW5hcmF0ZUF0dGFja0Nvb3JkaW5hdGVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChjb29yZGluYXRlcyk7XHJcbiAgICAgIHJldHVybiBgJHtjb29yZGluYXRlc1swXX0sJHtjb29yZGluYXRlc1sxXX1gO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFNISVBfTEVOR1RIUyA9IFs1LCA0LCAzLCAzLCAyLCAyXTtcclxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XHJcbiAgICB3aGlsZSAoU0hJUF9MRU5HVEhTLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhTSElQX0xFTkdUSFMpO1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgaXNWYWxpZENvbXB1dGVyUGxhY2VtZW50KGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNDb2xsaWRpbmdXaXRoT3RoZXJTaGlwID0gKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxJbnZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICBjb25zdCBhbGxTaGlwTG9jYXRpb25zID0gYm9hcmQuc2hpcENvb3JkaW5hdGVzLm1hcCgoc2hpcCkgPT4gc2hpcC5sb2NhdGlvbik7XHJcbiAgICBmb3IgKGxldCBsb2NhdGlvbnMgb2YgYWxsU2hpcExvY2F0aW9ucykge1xyXG4gICAgICBsb2NhdGlvbnMubWFwKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLnB1c2gobG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsSW52YWxpZENvb3JkaW5hdGVzLmluY2x1ZGVzKGAke2Nvb3JkaW5hdGUxfSwke2Nvb3JkaW5hdGUyfWApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzVmFsaWRDb21wdXRlclBsYWNlbWVudCA9IChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIpID0+IHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdHJ1ZTtcclxuICAgIGxldCBUT1RBTF9TUEFDRV9PQ0NVUElFRCA9IDA7XHJcbiAgICBpZiAoU0hJUF9MRU5HVEhTLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgY3VycmVudFNoaXBMZW5ndGggPSBTSElQX0xFTkdUSFMuc2hpZnQoKTtcclxuICAgICAgbGV0IGNvb3JkaW5hdGVZID0gY29vcmRpbmF0ZTE7XHJcbiAgICAgIGxldCBjb29yZGluYXRlWCA9IGNvb3JkaW5hdGUyO1xyXG5cclxuICAgICAgY29uc3QgU0hJUF9JU19OT1RfQ09MTElESUlORyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICAgIFRPVEFMX1NQQUNFX09DQ1VQSUVEID0gY29vcmRpbmF0ZVkgKyBjdXJyZW50U2hpcExlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSBjb29yZGluYXRlWCArIGN1cnJlbnRTaGlwTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPD0gTUFYX0JPQVJEX0xFTkdUSCkgJlxyXG4gICAgICAgICAgY29uc29sZS5sb2coVE9UQUxfU1BBQ0VfT0NDVVBJRUQpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBUT1RBTF9TUEFDRV9PQ0NVUElFRCA8PSBNQVhfQk9BUkRfTEVOR1RIICYmXHJcbiAgICAgICAgICAhaXNDb2xsaWRpbmdXaXRoT3RoZXJTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMilcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gICAgICBsZXQgc2hpcF9pc19jb2xsaWRpbmcgPSAhU0hJUF9JU19OT1RfQ09MTElESUlORygpO1xyXG4gICAgICB3aGlsZSAoc2hpcF9pc19jb2xsaWRpbmcpIHtcclxuICAgICAgICBjb29yZGluYXRlWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBjb29yZGluYXRlWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBzaGlwX2lzX2NvbGxpZGluZyA9ICFTSElQX0lTX05PVF9DT0xMSURJSU5HO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tZ2VuYXJhdGluZyBuZXcgY29vcmRpbmF0ZXMtLS0tLS0nKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhjb29yZGluYXRlWSwgY29vcmRpbmF0ZVgsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcclxuICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGVZLCBjb29yZGluYXRlWCwgY3VycmVudFNoaXBMZW5ndGgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIGdlbmFyYXRlQXR0YWNrQ29vcmRpbmF0ZXMsIHJhbmRvbWl6ZSwgbmFtZSB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xyXG4iLCJjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBjb25zdCBzaGlwSGl0cyA9IFtdO1xuICBjb25zdCBoaXQgPSAocG9zdGlvbikgPT4ge1xuICAgIGlmICghc2hpcEhpdHMuaW5jbHVkZXMocG9zdGlvbikgJiYgcG9zdGlvbiA8PSBzaGlwTGVuZ3RoKSB7XG4gICAgICBzaGlwSGl0cy5wdXNoKHBvc3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1NpbmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT0gc2hpcEhpdHMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICByZXR1cm4geyBoaXQsIHNoaXBIaXRzLCBpc1NpbmssIHNoaXBMZW5ndGggfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAgfTtcbiIsImltcG9ydCB7IE1BWF9CT0FSRF9MRU5HVEggfSBmcm9tICcuL2JvYXJkLXNldHVwJztcclxuXHJcbmNvbnN0IG1vdXNlRXZlbnRzID0gKCgpID0+IHtcclxuICBsZXQgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuICBsZXQgdmFsaWRDb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICBjb25zdCBnZXRpc0hvcml6b250YWwgPSAoKSA9PiBpc0hvcml6b250YWw7XHJcbiAgY29uc3QgZ2V0VmFsaWRDb29yZGluYXRlcyA9ICgpID0+IHtcclxuICAgIHJldHVybiB2YWxpZENvb3JkaW5hdGVzO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBpc0hvcml6b250YWwgPyAoaXNIb3Jpem9udGFsID0gZmFsc2UpIDogKGlzSG9yaXpvbnRhbCA9IHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNoZWNrVG90YWwgPSAoXHJcbiAgICBUT1RBTF9TUEFDRV9PQ0NVUElFRCxcclxuICAgIHNlbGVjdGVkQ29vcmRpbmF0ZSxcclxuICAgIENVUlJFTlRfTEVOR1RILFxyXG4gICAgZXZlbnRcclxuICApID0+IHtcclxuICAgIGlmIChUT1RBTF9TUEFDRV9PQ0NVUElFRCA8PSBNQVhfQk9BUkRfTEVOR1RIKSB7XHJcbiAgICAgIGZvciAobGV0IHNoaXBMZW5ndGggPSAwOyBzaGlwTGVuZ3RoIDwgQ1VSUkVOVF9MRU5HVEg7IHNoaXBMZW5ndGgrKykge1xyXG4gICAgICAgIGxldCBmaXJzdE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMF07XHJcbiAgICAgICAgbGV0IHNlY29uZE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMl07XHJcbiAgICAgICAgaXNIb3Jpem9udGFsXHJcbiAgICAgICAgICA/IChmaXJzdE51bWJlciArPSBzaGlwTGVuZ3RoKVxyXG4gICAgICAgICAgOiAoc2Vjb25kTnVtYmVyICs9IHNoaXBMZW5ndGgpO1xyXG5cclxuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIGBbZGF0YS1jb29yZGluYXRlPVwiJHtmaXJzdE51bWJlcn0sJHtzZWNvbmROdW1iZXJ9XCJdYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbWFyaycpIHtcclxuICAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5jdXJzb3IgPSAnbm90LWFsbG93ZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb29yZGluYXRlLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJyk7XHJcbiAgICAgICAgdmFsaWRDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGV2ZW50LnRhcmdldC5zdHlsZS5jdXJzb3IgPSAnbm90LWFsbG93ZWQnO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUnKTtcclxuICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcm90YXRlLFxyXG4gICAgZ2V0aXNIb3Jpem9udGFsLFxyXG4gICAgY2hlY2tUb3RhbCxcclxuICAgIGdldFZhbGlkQ29vcmRpbmF0ZXMsXHJcbiAgICB2YWxpZENvb3JkaW5hdGVzLFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBtb3VzZUV2ZW50cyB9O1xyXG4iLCJpbXBvcnQgeyBnYW1lRmxvd0NvbnRyb2xsZXJzLCByZW5kZXJCb2FyZHMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbmltcG9ydCB7IG1vdXNlRXZlbnRzIH0gZnJvbSAnLi9Nb3VzZUV2ZW50cyc7XHJcblxyXG5jb25zdCBNQVhfQk9BUkRfTEVOR1RIID0gMTA7XHJcblxyXG5jb25zdCBCb2FyZFNldHVwID0gKCgpID0+IHtcclxuICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyJyk7XHJcbiAgY29uc3QgeW91ckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2plZmYnKTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmRzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlciA9IChib2FyZCkgPT4ge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IE1BWF9CT0FSRF9MRU5HVEg7IHkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgTUFYX0JPQVJEX0xFTkdUSDsgeCsrKSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICBjb29yZGluYXRlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJywgW3gsIHldKTtcclxuICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZvciAobGV0IGJvYXJkIG9mIGJvYXJkcykge1xyXG4gICAgICByZW5kZXIoYm9hcmQpO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlTaGlwQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzaGlwTG9hY3Rpb25zID0gW107XHJcbiAgICBjb25zdCB0YXJnZXQgPSB5b3VyQm9hcmQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29vcmRpbmF0ZV0nKTtcclxuICAgIGZvciAobGV0IGNvb3JkaW5hdGUgb2YgZ2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUuYm9hcmRcclxuICAgICAgLnNoaXBDb29yZGluYXRlcykge1xyXG4gICAgICBmb3IgKGxldCBsb2NhdGlvbiBvZiBjb29yZGluYXRlLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIHRhcmdldCkge1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSAmJiBzaGlwTG9hY3Rpb25zLnB1c2goY29vcmRpbmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBsb2NhdGlvbiBvZiBzaGlwTG9hY3Rpb25zKSB7XHJcbiAgICAgICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJyk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpc3ZhbGlkUGxhY2VtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFNISVBfTEVOR1RIUyA9IFs1LCA0LCAzLCAzLCAyLCAyXTtcclxuICBjb25zdCBjb29yZGluYXRlcyA9IHlvdXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb29yZGluYXRlXScpO1xyXG5cclxuICBjb25zdCBpc3ZhbGlkUGxhY2VtZW50ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBsZXQgVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSAwO1xyXG4gICAgaWYgKFNISVBfTEVOR1RIUy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGlwTGVuZ3RoID0gU0hJUF9MRU5HVEhTWzBdO1xyXG4gICAgICBjb25zdCBjb29yZGluYXRlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVZID0gK2Nvb3JkaW5hdGVbMF07XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVYID0gK2Nvb3JkaW5hdGVbMl07XHJcblxyXG4gICAgICBpZiAobW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICBUT1RBTF9TUEFDRV9PQ0NVUElFRCA9IGNvb3JkaW5hdGVZICsgY3VycmVudFNoaXBMZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSBjb29yZGluYXRlWCArIGN1cnJlbnRTaGlwTGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICBUT1RBTF9TUEFDRV9PQ0NVUElFRCA8PSBNQVhfQk9BUkRfTEVOR1RIICYmXHJcbiAgICAgICAgIWlzQ29sbGlkaW5nV2l0aE90aGVyU2hpcCgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgICAgIGNvb3JkaW5hdGVZLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZVgsXHJcbiAgICAgICAgICBjdXJyZW50U2hpcExlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZGlzcGxheVNoaXBDb29yZGluYXRlcygpO1xyXG4gICAgICAgIFNISVBfTEVOR1RIUy5zaGlmdCgpO1xyXG4gICAgICAgIGRpc3BsYXlOZXh0U2hpcFRvUGxhY2UoU0hJUF9MRU5HVEhTWzBdKTtcclxuICAgICAgICBpZiAoQm9hcmRTZXR1cC5TSElQX0xFTkdUSFMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwJyk7XHJcbiAgICAgICAgICBjb25zdCBSZWFkeXRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICBSZWFkeXRleHQuaW5uZXJUZXh0ID0gJ1JlYWR5IGZvciBiYXR0bGUhJztcclxuICAgICAgICAgIHBhbmVsLmFwcGVuZENoaWxkKFJlYWR5dGV4dCk7XHJcbiAgICAgICAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG4gICAgICAgICAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEJhdHRsZS5zdGFydCk7XHJcbiAgICAgICAgICBzdGFydC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3JlYWR5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNDb2xsaWRpbmdXaXRoT3RoZXJTaGlwID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZmluYWxJbnZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGNvbnN0IGhvdmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob3ZlcicpO1xyXG4gICAgY29uc3QgYWxsU2hpcExvY2F0aW9ucyA9XHJcbiAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnNoaXBDb29yZGluYXRlcy5tYXAoXHJcbiAgICAgICAgKHNoaXApID0+IHNoaXAubG9jYXRpb25cclxuICAgICAgKTtcclxuICAgIGZvciAobGV0IGxvY2F0aW9ucyBvZiBhbGxTaGlwTG9jYXRpb25zKSB7XHJcbiAgICAgIGxvY2F0aW9ucy5tYXAoKGxvY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgZmluYWxJbnZhbGlkQ29vcmRpbmF0ZXMucHVzaChsb2NhdGlvbi5zdWJzdHJpbmcoMCwgMykpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IGFscmVhZHlNYXJrZWQgPSBBcnJheS5mcm9tKGhvdmVycykubWFwKChjb29yZGluYXRlKSA9PlxyXG4gICAgICBjb29yZGluYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJylcclxuICAgICk7XHJcbiAgICByZXR1cm4gYWxyZWFkeU1hcmtlZC5zb21lKChjb29yZGluYXRlKSA9PlxyXG4gICAgICBmaW5hbEludmFsaWRDb29yZGluYXRlcy5pbmNsdWRlcyhjb29yZGluYXRlKVxyXG4gICAgKTtcclxuICB9O1xyXG4gIGZvciAobGV0IGNvb3JkaWFuYXRlIG9mIGNvb3JkaW5hdGVzKSB7XHJcbiAgICBjb29yZGlhbmF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlzdmFsaWRQbGFjZW1lbnQsIHsgb25jZTogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhpZ2hsaWdodCA9IChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQudGFyZ2V0LnN0eWxlLmN1cnNvciA9ICdjcm9zc2hhaXInO1xyXG4gICAgY29uc3QgQ1VSUkVOVF9MRU5HVEggPSBTSElQX0xFTkdUSFNbMF07XHJcbiAgICBjb25zdCBzZWxlY3RlZENvb3JkaW5hdGUgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgIGNvbnN0IGZpcnN0TnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVswXTtcclxuICAgIGNvbnN0IHNlY29uZE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMl07XHJcbiAgICBsZXQgVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSBmaXJzdE51bWJlciArIENVUlJFTlRfTEVOR1RIO1xyXG4gICAgbW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKClcclxuICAgICAgPyAoVE9UQUxfU1BBQ0VfT0NDVVBJRUQgPSBmaXJzdE51bWJlciArIENVUlJFTlRfTEVOR1RIKVxyXG4gICAgICA6IChUT1RBTF9TUEFDRV9PQ0NVUElFRCA9IHNlY29uZE51bWJlciArIENVUlJFTlRfTEVOR1RIKTtcclxuICAgIG1vdXNlRXZlbnRzLmNoZWNrVG90YWwoXHJcbiAgICAgIFRPVEFMX1NQQUNFX09DQ1VQSUVELFxyXG4gICAgICBzZWxlY3RlZENvb3JkaW5hdGUsXHJcbiAgICAgIENVUlJFTlRfTEVOR1RILFxyXG4gICAgICBldmVudFxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW1vdmVIaWdobGlnaHQgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBjb29yZGluYXRlIG9mIG1vdXNlRXZlbnRzLnZhbGlkQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgaWYgKGNvb3JkaW5hdGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbWFyaycpIHtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb29yZGluYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBmb3IgKGxldCBjb29yZGluYXRlIG9mIGNvb3JkaW5hdGVzKSB7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhpZ2hsaWdodCk7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgcmVtb3ZlSGlnaGxpZ2h0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlOZXh0U2hpcFRvUGxhY2UgPSAoc2hpcExlbmd0aCkgPT4ge1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcCcpO1xyXG5cclxuICAgIHdoaWxlIChwYW5lbC5maXJzdENoaWxkKSB7XHJcbiAgICAgIHBhbmVsLnJlbW92ZUNoaWxkKHBhbmVsLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHBhbmVsLmFwcGVuZENoaWxkKHNwYW4pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBTSElQX0xFTkdUSFMsIGlzQ29sbGlkaW5nV2l0aE90aGVyU2hpcCB9O1xyXG59KSgpO1xyXG5cclxuY29uc3Qgc3RhcnRCYXR0bGUgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGNsZWFyU2V0dXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBjb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4nKTtcclxuICAgIGNvbnN0IGluZm9tYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3B0aW9ucycpO1xyXG5cclxuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XHJcbiAgICAgIGJ1dHRvbi5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGNvbXB1dGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgaW5mb21hdGlvbi5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjb21wdXRlck1vdmVzID0gKCkgPT4ge1xyXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5BSS5yYW5kb21pemUoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcclxuICAgIGNsZWFyU2V0dXAoKTtcclxuICAgIGNvbXB1dGVyTW92ZXMoKTtcclxuICAgIHJlbmRlckJvYXJkcy5VcGRhdGVBbGxQbGF5ZXJzQm9hcmRzKCk7XHJcbiAgICByZW5kZXJCb2FyZHMuYWRkRW5lbXlFdmVudExpc3RlbmVycygpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IHN0YXJ0IH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBCb2FyZFNldHVwLCBNQVhfQk9BUkRfTEVOR1RIIH07XHJcbiIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL0ZhY3Rvcmllcy9wbGF5ZXJzLWZhY3RvcnknO1xyXG5cclxuY29uc3QgZ2FtZUZsb3dDb250cm9sbGVycyA9ICgoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyT25lID0gcGxheWVyKCdqZWZmJyk7XHJcbiAgY29uc3QgQUkgPSBjb21wdXRlcignYWknKTtcclxuXHJcbiAgY29uc3QgcGxheWVycyA9IHtcclxuICAgIHBsYXllck9uZTogcGxheWVyT25lLFxyXG4gICAgQUk6IEFJLFxyXG4gIH07XHJcblxyXG4gIGxldCBhbGxQbGF5ZXJzID0gW107XHJcbiAgbGV0IGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XHJcbiAgbGV0IGN1cnJlbnRFbmVteSA9IEFJO1xyXG5cclxuICBjb25zdCBnZXRDdXJyZW50UGxheWVyID0gKCkgPT4gY3VycmVudFBsYXllcjtcclxuICBjb25zdCBnZXRDdXJyZW50RW5lbXkgPSAoKSA9PiBjdXJyZW50RW5lbXk7XHJcblxyXG4gIGFsbFBsYXllcnMucHVzaChwbGF5ZXJPbmUpO1xyXG5cclxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IGN1cnJlbnRQbGF5ZXIuYm9hcmQuYWxsU2hpcHNTdW5rKCk7XHJcblxyXG4gIGNvbnN0IHN3aXRjaFR1cm5zID0gKCkgPT4ge1xyXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IHBsYXllck9uZSkge1xyXG4gICAgICBjdXJyZW50UGxheWVyID0gQUk7XHJcbiAgICAgIGN1cnJlbnRFbmVteSA9IHBsYXllck9uZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBBSSkge1xyXG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xyXG4gICAgICBjdXJyZW50RW5lbXkgPSBBSTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBBSSxcclxuICAgIHBsYXllck9uZSxcclxuICAgIGFsbFBsYXllcnMsXHJcblxyXG4gICAgZ2FtZU92ZXIsXHJcbiAgICBzd2l0Y2hUdXJucyxcclxuICAgIGdldEN1cnJlbnRQbGF5ZXIsXHJcbiAgICBnZXRDdXJyZW50RW5lbXksXHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmNvbnN0IFBsYXllcnNBdHRhY2tzID0gKCgpID0+IHtcclxuICBjb25zdCBBSV9BVFRBQ0tfREVMQVkgPSAyMDA7XHJcbiAgY29uc3QgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQgPSAoY29vcmRpYW5hdGUpID0+IHtcclxuICAgIHJldHVybiBnYW1lRmxvd0NvbnRyb2xsZXJzXHJcbiAgICAgIC5nZXRDdXJyZW50UGxheWVyKClcclxuICAgICAgLmF0dGFjayhjb29yZGlhbmF0ZSwgZ2FtZUZsb3dDb250cm9sbGVycy5nZXRDdXJyZW50RW5lbXkoKS5ib2FyZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKHVzZXJzQXR0YWNrKSA9PiB7XHJcbiAgICBpZiAoZ2FtZUZsb3dDb250cm9sbGVycy5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcclxuICAgICAgICBgR2FtZW92ZXIgJHtnYW1lRmxvd0NvbnRyb2xsZXJzLmdldEN1cnJlbnRFbmVteSgpLm5hbWV9IHdpbnNgXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodXNlcnNBdHRhY2spIHtcclxuICAgICAgY29uc3QgY29vcmRpYW5hdGUgPSB1c2Vyc0F0dGFjay50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGUpXHJcbiAgICAgICAgPyB1c2Vyc0F0dGFjay50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKVxyXG4gICAgICAgIDogdXNlcnNBdHRhY2sudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY29vcmRpYW5hdGVzID0gZ2FtZUZsb3dDb250cm9sbGVycy5BSS5nZW5hcmF0ZUF0dGFja0Nvb3JkaW5hdGVzKCk7XHJcbiAgICAgIGNvbnN0IGVuZW15ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBgIyR7Z2FtZUZsb3dDb250cm9sbGVycy5wbGF5ZXJPbmUubmFtZX1gXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGNvb3JkaWFuYXRlID0gZW5lbXkucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBgW2RhdGEtY29vcmRpbmF0ZT1cIiR7Y29vcmRpYW5hdGVzfVwiXWBcclxuICAgICAgKTtcclxuICAgICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGVzKVxyXG4gICAgICAgID8gY29vcmRpYW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKVxyXG4gICAgICAgIDogY29vcmRpYW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XHJcbiAgICB9XHJcbiAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLnN3aXRjaFR1cm5zKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICBwbGF5ZXJBdHRhY2soZXZlbnQpO1xyXG4gICAgcGxheWVyQXR0YWNrKG51bGwpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGF0dGFjayB9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcclxuICBjb25zdCBhZGRNYXJrc1RvVmFsaWRDb29yZGlhbnRlcyA9IChsb2NhdGlvbnMsIEJvYXJkY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIGZvciAobGV0IGxvY2F0aW9uIG9mIGxvY2F0aW9ucykge1xyXG4gICAgICBmb3IgKGNvbnN0IGNvb3JkaW5hdGUgb2YgQm9hcmRjb29yZGluYXRlcykge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb29yZGluYXRlID0gY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgICAgIGN1cnJlbnRDb29yZGluYXRlID09IGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSAmJlxyXG4gICAgICAgICAgY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21hcmsnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFVwZGF0ZUFsbFBsYXllcnNCb2FyZHMgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBwbGF5ZXIgb2YgZ2FtZUZsb3dDb250cm9sbGVycy5hbGxQbGF5ZXJzKSB7XHJcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXIubmFtZX1gKTtcclxuICAgICAgY29uc3QgQm9hcmRjb29yZGluYXRlcyA9IHBsYXllcnMucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcclxuICAgICAgZm9yIChsZXQgc2hpcERldGFpbCBvZiBwbGF5ZXIuYm9hcmQuc2hpcENvb3JkaW5hdGVzKSB7XHJcbiAgICAgICAgYWRkTWFya3NUb1ZhbGlkQ29vcmRpYW50ZXMoc2hpcERldGFpbC5sb2NhdGlvbiwgQm9hcmRjb29yZGluYXRlcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBhZGRFbmVteUV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgQUlfQk9BUkQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWknKTtcclxuICAgIGNvbnN0IGNvb3JkaWFuYXRlcyA9IEFJX0JPQVJELnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XHJcbiAgICBmb3IgKGxldCBjb29yZGlhbmF0ZSBvZiBjb29yZGlhbmF0ZXMpIHtcclxuICAgICAgY29vcmRpYW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQbGF5ZXJzQXR0YWNrcy5hdHRhY2ssIHtcclxuICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4geyBVcGRhdGVBbGxQbGF5ZXJzQm9hcmRzLCBhZGRFbmVteUV2ZW50TGlzdGVuZXJzIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBnYW1lRmxvd0NvbnRyb2xsZXJzLCByZW5kZXJCb2FyZHMgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9ib2FyZC1zZXR1cC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==