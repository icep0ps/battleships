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
/* harmony import */ var _gameboard_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard-factory */ "./src/gameboard-factory.js");


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
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.shipCoordinates.forEach(
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
        _game_loop__WEBPACK_IMPORTED_MODULE_0__.gameFlowControllers.playerOne.board.placeShip(y, x, currentShipLength);
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




/***/ }),

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameFlowControllers": () => (/* binding */ gameFlowControllers)
/* harmony export */ });
/* harmony import */ var _players_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players-factory */ "./src/players-factory.js");


const gameFlowControllers = (() => {
  const playerOne = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.player)('jeff');
  const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');

  let allPlayers = [];
  let currentPlayer = playerOne;
  let currentEnemy = AI;
  allPlayers.push(playerOne);

  const gameOver = () => {
    currentEnemy.board.allShipsSunk() ? (endgame = true) : false;
  };

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
    gameOver,
    switchTurns,
    currentPlayer,
    currentEnemy,
    allPlayers,
    playerOne,
  };
})();

const PlayersAttacks = (() => {
  const AI_ATTACK_DELAY = 200;
  const IF_CURRENT_PLAYER_ATTACKED = (coordianate) => {
    return gameFlowControllers.currentPlayer.attack(
      coordianate,
      gameFlowControllers.currentEnemy.board
    );
  };

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    IF_CURRENT_PLAYER_ATTACKED(coordianate)
      ? e.target.setAttribute('class', 'hit')
      : e.target.setAttribute('class', 'miss');
  };

  const enemyAttack = () => {
    const coordianates = AI.genarateCoordinates();
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
    playerAttack(e);
    gameFlowControllers.switchTurns();
    setTimeout(enemyAttack, AI_ATTACK_DELAY);
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
  // UpdateAllPlayersBoards();
  // addEnemyEventListeners();
})();



// AI.board.placeShip(3, 4, 5);
// AI.board.placeShip(8, 6, 2);
// AI.board.placeShip(1, 7, 3);
// AI.board.placeShip(5, 5, 3);
// AI.board.placeShip(1, 2, 1);


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
      console.log('clicked');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkLXNldHVwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUtbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXJzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcHMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLWZhY3RvcnknO1xyXG5jb25zdCBNQVhfQk9BUkRfTEVOR1RIID0gMTA7XHJcblxyXG5jb25zdCBCb2FyZFNldHVwID0gKCgpID0+IHtcclxuICBjb25zdCBjcmVhdGVCb2FyZHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyJyk7XHJcbiAgICBjb25zdCByZW5kZXIgPSAoYm9hcmQpID0+IHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBNQVhfQk9BUkRfTEVOR1RIOyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IE1BWF9CT0FSRF9MRU5HVEg7IHgrKykge1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScsIFt4LCB5XSk7XHJcbiAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjb29yZGluYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHJlbmRlcihib2FyZCkpO1xyXG4gIH07XHJcbiAgY3JlYXRlQm9hcmRzKCk7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZVBsYXllckJvYXJkID0gKCkgPT4ge1xyXG4gICAgbGV0IHNoaXBMb2FjdGlvbnMgPSBbXTtcclxuICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKFxyXG4gICAgICAoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XHJcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIHRhcmdldCkge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJykgPT1cclxuICAgICAgICAgICAgbG9jYXRpb24uc3Vic3RyaW5nKDAsIDMpXHJcbiAgICAgICAgICAgICAgPyBzaGlwTG9hY3Rpb25zLnB1c2goY29vcmRpbmF0ZSlcclxuICAgICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNoaXBMb2FjdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcclxuICAgICAgICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDFdO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcclxuICBjb25zdCBpc3ZhbGlkUGxhY2VtZW50ID0gKGUpID0+IHtcclxuICAgIGlmIChzaGlwcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGlwTGVuZ3RoID0gc2hpcHNbMF07XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgICBjb25zdCB5ID0gK2Nvb3JkaW5hdGVbMF07XHJcbiAgICAgIGNvbnN0IHggPSArY29vcmRpbmF0ZVsyXTtcclxuICAgICAgbGV0IFRPVEFMID0gMDtcclxuICAgICAgbW91c2VFdmVudHMuZ2V0aXNIb3Jpem9udGFsKClcclxuICAgICAgICA/IChUT1RBTCA9IHkgKyBjdXJyZW50U2hpcExlbmd0aClcclxuICAgICAgICA6IChUT1RBTCA9IHggKyBjdXJyZW50U2hpcExlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoVE9UQUwgPD0gTUFYX0JPQVJEX0xFTkdUSCkge1xyXG4gICAgICAgIGdhbWVGbG93Q29udHJvbGxlcnMucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcCh5LCB4LCBjdXJyZW50U2hpcExlbmd0aCk7XHJcbiAgICAgICAgY3JlYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICBzaGlwcy5zaGlmdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgY29vcmRpbmF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlzdmFsaWRQbGFjZW1lbnQsIHsgb25jZTogdHJ1ZSB9KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIHNoaXBzIH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCBtb3VzZUV2ZW50cyA9ICgoKSA9PiB7XHJcbiAgbGV0IGlzSG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgbGV0IHZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgY29uc3QgZ2V0aXNIb3Jpem9udGFsID0gKCkgPT4gaXNIb3Jpem9udGFsO1xyXG5cclxuICBjb25zdCByb3RhdGUgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gaXNIb3Jpem9udGFsID8gKGlzSG9yaXpvbnRhbCA9IGZhbHNlKSA6IChpc0hvcml6b250YWwgPSB0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoaWdobGlnaHQgPSAoZSkgPT4ge1xyXG4gICAgZS50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb29yZGluYXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgIGNvbnN0IGZpcnN0TnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVswXTtcclxuICAgIGNvbnN0IHNlY29uZE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMl07XHJcbiAgICBsZXQgVE9UQUwgPSBmaXJzdE51bWJlciArIEJvYXJkU2V0dXAuc2hpcHMubGVuZ3RoO1xyXG4gICAgaXNIb3Jpem9udGFsXHJcbiAgICAgID8gKFRPVEFMID0gZmlyc3ROdW1iZXIgKyBCb2FyZFNldHVwLnNoaXBzLmxlbmd0aClcclxuICAgICAgOiAoVE9UQUwgPSBzZWNvbmROdW1iZXIgKyBCb2FyZFNldHVwLnNoaXBzLmxlbmd0aCk7XHJcblxyXG4gICAgY29uc3QgY2hlY2tUb3RhbCA9ICgpID0+IHtcclxuICAgICAgaWYgKFRPVEFMIDw9IE1BWF9CT0FSRF9MRU5HVEgpIHtcclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgbGV0IHNoaXBMZW5ndGggPSAwO1xyXG4gICAgICAgICAgc2hpcExlbmd0aCA8IEJvYXJkU2V0dXAuc2hpcHMubGVuZ3RoO1xyXG4gICAgICAgICAgc2hpcExlbmd0aCsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwTGVuZ3RoKTtcclxuICAgICAgICAgIGxldCBmaXJzdE51bWJlciA9ICtzZWxlY3RlZENvb3JkaW5hdGVbMF07XHJcbiAgICAgICAgICBsZXQgc2Vjb25kTnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVsyXTtcclxuICAgICAgICAgIGlzSG9yaXpvbnRhbFxyXG4gICAgICAgICAgICA/IChmaXJzdE51bWJlciArPSBzaGlwTGVuZ3RoKVxyXG4gICAgICAgICAgICA6IChzZWNvbmROdW1iZXIgKz0gc2hpcExlbmd0aCk7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke2ZpcnN0TnVtYmVyfSwke3NlY29uZE51bWJlcn1cIl1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xyXG4gICAgICAgICAgdmFsaWRDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoZS50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ25vdC1hbGxvd2VkJyk7XHJcbiAgICB9O1xyXG4gICAgY2hlY2tUb3RhbCgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUhpZ2hsaWdodCA9ICgpID0+IHtcclxuICAgIHZhbGlkQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBjb29yZGluYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBCb2FyZFNldHVwLmNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGlnaGxpZ2h0KTtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCByZW1vdmVIaWdobGlnaHQpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcclxuXHJcbiAgcmV0dXJuIHsgcm90YXRlLCBnZXRpc0hvcml6b250YWwgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IG1vdXNlRXZlbnRzIH07XHJcbiIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcnMtZmFjdG9yeSc7XG5cbmNvbnN0IGdhbWVGbG93Q29udHJvbGxlcnMgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmUgPSBwbGF5ZXIoJ2plZmYnKTtcbiAgY29uc3QgQUkgPSBjb21wdXRlcignYWknKTtcblxuICBsZXQgYWxsUGxheWVycyA9IFtdO1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IGN1cnJlbnRFbmVteSA9IEFJO1xuICBhbGxQbGF5ZXJzLnB1c2gocGxheWVyT25lKTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgICBjdXJyZW50RW5lbXkuYm9hcmQuYWxsU2hpcHNTdW5rKCkgPyAoZW5kZ2FtZSA9IHRydWUpIDogZmFsc2U7XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoVHVybnMgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT0gcGxheWVyT25lKSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gQUk7XG4gICAgICBjdXJyZW50RW5lbXkgPSBwbGF5ZXJPbmU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT0gQUkpIHtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gICAgICBjdXJyZW50RW5lbXkgPSBBSTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lT3ZlcixcbiAgICBzd2l0Y2hUdXJucyxcbiAgICBjdXJyZW50UGxheWVyLFxuICAgIGN1cnJlbnRFbmVteSxcbiAgICBhbGxQbGF5ZXJzLFxuICAgIHBsYXllck9uZSxcbiAgfTtcbn0pKCk7XG5cbmNvbnN0IFBsYXllcnNBdHRhY2tzID0gKCgpID0+IHtcbiAgY29uc3QgQUlfQVRUQUNLX0RFTEFZID0gMjAwO1xuICBjb25zdCBJRl9DVVJSRU5UX1BMQVlFUl9BVFRBQ0tFRCA9IChjb29yZGlhbmF0ZSkgPT4ge1xuICAgIHJldHVybiBnYW1lRmxvd0NvbnRyb2xsZXJzLmN1cnJlbnRQbGF5ZXIuYXR0YWNrKFxuICAgICAgY29vcmRpYW5hdGUsXG4gICAgICBnYW1lRmxvd0NvbnRyb2xsZXJzLmN1cnJlbnRFbmVteS5ib2FyZFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XG4gICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGUpXG4gICAgICA/IGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0JylcbiAgICAgIDogZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XG4gIH07XG5cbiAgY29uc3QgZW5lbXlBdHRhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRpYW5hdGVzID0gQUkuZ2VuYXJhdGVDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IGVuZW15ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2plZmYnKTtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGVuZW15LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29vcmRpbmF0ZT1cIiR7Y29vcmRpYW5hdGVzfVwiXWBcbiAgICApO1xuXG4gICAgSUZfQ1VSUkVOVF9QTEFZRVJfQVRUQUNLRUQoY29vcmRpYW5hdGVzKVxuICAgICAgPyBjb29yZGlhbmF0ZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpXG4gICAgICA6IGNvb3JkaWFuYXRlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xuXG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5zd2l0Y2hUdXJucygpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGF0dGFjayhlKSB7XG4gICAgcGxheWVyQXR0YWNrKGUpO1xuICAgIGdhbWVGbG93Q29udHJvbGxlcnMuc3dpdGNoVHVybnMoKTtcbiAgICBzZXRUaW1lb3V0KGVuZW15QXR0YWNrLCBBSV9BVFRBQ0tfREVMQVkpO1xuICB9XG5cbiAgcmV0dXJuIHsgYXR0YWNrIH07XG59KSgpO1xuXG5jb25zdCByZW5kZXJCb2FyZHMgPSAoKCkgPT4ge1xuICBjb25zdCBhZGRNYXJrc1RvVmFsaWRDb29yZGlhbnRlcyA9IChsb2NhdGlvbnMsIEJvYXJkY29vcmRpbmF0ZXMpID0+IHtcbiAgICBsb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgIGZvciAoY29uc3QgY29vcmRpbmF0ZSBvZiBCb2FyZGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb29yZGluYXRlID0gY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xuICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZSA9PSBsb2NhdGlvbi5zdWJzdHJpbmcoMCwgMylcbiAgICAgICAgICA/IGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJylcbiAgICAgICAgICA6IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIFVwZGF0ZUFsbFBsYXllcnNCb2FyZHMoKSB7XG4gICAgZ2FtZUZsb3dDb250cm9sbGVycy5hbGxQbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgICAgY29uc3QgcGxheWVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BsYXllci5uYW1lfWApO1xuICAgICAgY29uc3QgQm9hcmRjb29yZGluYXRlcyA9IHBsYXllcnMucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgICAgIHBsYXllci5ib2FyZC5zaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoc2hpcERldGFpbCkgPT4ge1xuICAgICAgICBhZGRNYXJrc1RvVmFsaWRDb29yZGlhbnRlcyhzaGlwRGV0YWlsLmxvY2F0aW9uLCBCb2FyZGNvb3JkaW5hdGVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgYWRkRW5lbXlFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBBSV9CT0FSRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaScpO1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlcyA9IEFJX0JPQVJELnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XG4gICAgY29vcmRpYW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQbGF5ZXJzQXR0YWNrcy5hdHRhY2ssIHtcbiAgICAgICAgb25jZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICAvLyBVcGRhdGVBbGxQbGF5ZXJzQm9hcmRzKCk7XG4gIC8vIGFkZEVuZW15RXZlbnRMaXN0ZW5lcnMoKTtcbn0pKCk7XG5cbmV4cG9ydCB7IGdhbWVGbG93Q29udHJvbGxlcnMgfTtcblxuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDMsIDQsIDUpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDgsIDYsIDIpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDEsIDcsIDMpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDUsIDUsIDMpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDEsIDIsIDEpO1xuIiwiaW1wb3J0IHsgbW91c2VFdmVudHMgfSBmcm9tICcuL2JvYXJkLXNldHVwJztcbmltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XG5cbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoQ09PUkRJTkFURV9PTkUsIENPT1JESU5BVEVfVFdPLCBTSElQX0xFTkdUSCkgPT4ge1xuICAgIGNvbnN0IHNoaXBEZXRhaWxzID0ge1xuICAgICAgc2hpcDogQmF0dGxlU2hpcChTSElQX0xFTkdUSCksXG4gICAgICBsb2NhdGlvbjogW10sXG4gICAgfTtcbiAgICBmb3IgKFxuICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICBjdXJyZW50UG9zaXRpb24gPCBTSElQX0xFTkdUSDtcbiAgICAgIGN1cnJlbnRQb3NpdGlvbisrXG4gICAgKSB7XG4gICAgICBsZXQgZmlyc3RDb29yZGluYXRlID0gQ09PUkRJTkFURV9PTkU7XG4gICAgICBsZXQgc2Vjb25kQ29vcmRpbmF0ZSA9IENPT1JESU5BVEVfVFdPO1xuICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcbiAgICAgIG1vdXNlRXZlbnRzLmdldGlzSG9yaXpvbnRhbCgpXG4gICAgICAgID8gKGZpcnN0Q29vcmRpbmF0ZSArPSBjdXJyZW50UG9zaXRpb24pXG4gICAgICAgIDogKHNlY29uZENvb3JkaW5hdGUgKz0gY3VycmVudFBvc2l0aW9uKTtcblxuICAgICAgY29uc3Qgc2hpcFBvc290aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgc2hpcERldGFpbHMubG9jYXRpb24ucHVzaChcbiAgICAgICAgYCR7Zmlyc3RDb29yZGluYXRlfSwke3NlY29uZENvb3JkaW5hdGV9LCR7c2hpcFBvc290aW9ufWBcbiAgICAgICk7XG4gICAgfVxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5zb21lKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xuICAgICAgICAgID8gY29vcmRpbmF0ZS5zaGlwLmhpdChsb2NhdGlvbi5zdWJzdHJpbmcoNCkpXG4gICAgICAgICAgOiBtaXNzZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZS5sb2NhdGlvbi5zb21lKFxuICAgICAgICAoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2hpcC5pc1NpbmsoKSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwQ29vcmRpbmF0ZXMsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNTdW5rLFxuICB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC1mYWN0b3J5JztcblxuY29uc3QgcGxheWVyID0gKGFyZykgPT4ge1xuICBjb25zdCBuYW1lID0gYXJnO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+IHtcbiAgICByZXR1cm4gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAyOyB4KyspIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIHJhbmRvbWl6ZSwgbmFtZSB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAodXNlcikgPT4ge1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuICBjb25zdCBuYW1lID0gdXNlcjtcbiAgY29uc3QgZ2VuYXJhdGVDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBsZXQgYXJyID0gJyc7XG4gICAgd2hpbGUgKGFyci5sZW5ndGggPCAyKSB7XG4gICAgICBsZXQgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGFyciArPSByO1xuICAgIH1cbiAgICByZXR1cm4gdmVyaWZ5KGFycik7XG4gIH07XG4gIGNvbnN0IGNvb3JkaW5hdGVzVXNlZCA9IFtdO1xuICBjb25zdCB2ZXJpZnkgPSAoYXJyKSA9PiB7XG4gICAgaWYgKGNvb3JkaW5hdGVzVXNlZC5pbmNsdWRlcyhhcnIpKSB7XG4gICAgICByZXR1cm4gZ2VuYXJhdGVDb29yZGluYXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChhcnIpO1xuICAgICAgY29uc29sZS5sb2coYCR7YXJyWzBdfSwke2FyclsxXX1gKTtcbiAgICAgIHJldHVybiBhcnJbMF0gKyAnLCcgKyBhcnJbMV07XG4gICAgfVxuICB9O1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcblxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAyOyB4KyspIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4geyBib2FyZCwgYXR0YWNrLCBnZW5hcmF0ZUNvb3JkaW5hdGVzLCByYW5kb21pemUsIG5hbWUgfTtcbn07XG5cbmV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGNvbnN0IHNoaXBIaXRzID0gW107XG4gIGNvbnN0IGhpdCA9IChwb3N0aW9uKSA9PiB7XG4gICAgaWYgKCFzaGlwSGl0cy5pbmNsdWRlcyhwb3N0aW9uKSAmJiBwb3N0aW9uIDw9IHNoaXBMZW5ndGgpIHtcbiAgICAgIHNoaXBIaXRzLnB1c2gocG9zdGlvbik7XG4gICAgICBjb25zb2xlLmxvZyhzaGlwSGl0cyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzU2luayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcExlbmd0aCA9PSBzaGlwSGl0cy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIHJldHVybiB7IGhpdCwgc2hpcEhpdHMsIGlzU2luaywgc2hpcExlbmd0aCB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lRmxvd0NvbnRyb2xsZXJzIH0gZnJvbSAnLi9nYW1lLWxvb3AnO1xyXG5pbXBvcnQgeyByZW5kZXJCb2FyZHMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==