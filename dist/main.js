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
/* harmony export */   "BoardSetup": () => (/* binding */ BoardSetup),
/* harmony export */   "mouseEvents": () => (/* binding */ mouseEvents)
/* harmony export */ });
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loop */ "./src/game-loop.js");


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
    _game_loop__WEBPACK_IMPORTED_MODULE_0__.playerOne.board.shipCoordinates.forEach((coordinate) => {
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
        _game_loop__WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placeShip(y, x, currentShipLength);
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




/***/ }),

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerOne": () => (/* binding */ playerOne)
/* harmony export */ });
/* harmony import */ var _players_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players-factory */ "./src/players-factory.js");


const tempPlayers = [];
const playerOne = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.player)('jeff');
const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');
// AI.board.placeShip(3, 4, 5);
// AI.board.placeShip(8, 6, 2);
// AI.board.placeShip(1, 7, 3);
// AI.board.placeShip(5, 5, 3);
// AI.board.placeShip(1, 2, 1);
tempPlayers.push(playerOne);

const attacking = (() => {
  let currentPlayer = playerOne;
  let currentEnemy = AI;
  const switchTurns = () => {
    if (currentPlayer == playerOne) {
      currentPlayer = AI;
      currentEnemy = playerOne;
    } else {
      currentPlayer = playerOne;
      currentEnemy = AI;
    }
  };

  const gameOver = () => {
    currentEnemy.board.allShipsSunk() ? (endgame = true) : false;
  };

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      e.target.setAttribute('class', 'hit');
    } else {
      e.target.setAttribute('class', 'miss');
    }
  };

  const enemyAttack = () => {
    const coordianate = AI.genarateCoordinates();
    const target = document.querySelector('#jeff');
    const box = target.querySelector(`[data-coordinate="${coordianate}"]`);
    console.log(coordianate);
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      box.setAttribute('class', 'hit');
    } else {
      box.setAttribute('class', 'miss');
    }
    switchTurns();
  };

  function attack(e) {
    playerAttack(e);
    switchTurns();
    setTimeout(enemyAttack, 200);
  }

  return { attack, switchTurns, currentPlayer };
})();

const renderBoards = (() => {
  function createPlayerOneBoard() {
    tempPlayers.forEach((dude) => {
      console.log(dude);
      const players = document.querySelector(`#${dude.name}`);
      dude.board.shipCoordinates.forEach((coordinate) => {
        const target = players.querySelectorAll(`[data-coordinate]`);
        if (dude.name == 'ai') {
          Array.from(target).forEach((coordinate) => {
            coordinate.addEventListener('click', attacking.attack, {
              once: true,
            });
          });
        }
        let final = [];
        coordinate.location.forEach((locate) => {
          const test = Array.from(target);
          for (const coord of test) {
            if (
              coord.getAttribute('data-coordinate') == locate.substring(0, 3)
            ) {
              final.push(coord);
            }
          }
        });

        final.forEach((item) => {
          item.setAttribute('class', 'mark');
        });
      });
    });
  }

  return {};
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
/* harmony import */ var _ships_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships-factory */ "./src/ships-factory.js");
/* harmony import */ var _board_setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board-setup */ "./src/board-setup.js");



const gameboard = () => {
  const shipCoordinates = [];

  const placeShip = (coordinates1, coordinates2, length) => {
    const carrier = (0,_ships_factory__WEBPACK_IMPORTED_MODULE_0__.ship)(length);
    const shipDetails = {
      ship: carrier,
      location: [],
    };
    for (let i = 0; i < length; i++) {
      let first = coordinates1;
      let sec = coordinates2;
      _board_setup__WEBPACK_IMPORTED_MODULE_1__.mouseEvents.horizontal ? (first += i) : (sec += i);
      const posotion = i;
      shipDetails.location.push(`${first},${sec},${posotion}`);
    }
    shipCoordinates.push(shipDetails);
  };
  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      coordinate.location.forEach((coord) => {
        coord.substring(0, 3) == coordinates
          ? coordinate.ship.hit(coord.substring(4))
          : missed.push(coordinates);
      });
      return coordinate.location.some(
        (coord) => coord.substring(0, 3) == coordinates
      );
    });
  };

  const missed = [];

  const allShipsSunk = () => {
    return shipCoordinates.every((x) => x.ship.isSink());
  };

  return { shipCoordinates, placeShip, receiveAttack, allShipsSunk };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBO0FBQ0EsZ0JBQWdCLDZEQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EscUJBQXFCLE9BQU8sR0FBRyxPQUFPO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUU0Qjs7Ozs7Ozs7Ozs7Ozs7O0FDbEU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVnQjs7Ozs7OztVQ2hCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04yQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkLXNldHVwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUtbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXJzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcHMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXllck9uZSB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuXHJcbmNvbnN0IEJvYXJkU2V0dXAgPSAoKCkgPT4ge1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkcygpIHtcclxuICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXInKTtcclxuICAgIGNvbnN0IHJlbmRlciA9IChib2FyZCkgPT4ge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnLCBbeCwgeV0pO1xyXG4gICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29vcmRpbmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiByZW5kZXIoYm9hcmQpKTtcclxuICB9XHJcbiAgY3JlYXRlQm9hcmRzKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVBsYXllckJvYXJkKCkge1xyXG4gICAgbGV0IHNoaXBMb2FjdGlvbnMgPSBbXTtcclxuICAgIHBsYXllck9uZS5ib2FyZC5zaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xyXG4gICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjb29yZGluYXRlIG9mIHRhcmdldCkge1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09IGxvY2F0aW9uLnN1YnN0cmluZygwLCAzKVxyXG4gICAgICAgICAgICA/IHNoaXBMb2FjdGlvbnMucHVzaChjb29yZGluYXRlKVxyXG4gICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHNoaXBMb2FjdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcclxuICAgICAgICBsb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21hcmsnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDFdO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcclxuICBjb25zdCBwbGFjZVNoaXAgPSAoZSkgPT4ge1xyXG4gICAgaWYgKHNoaXBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgY3VycmVudFNoaXBMZW5ndGggPSBzaGlwcy5zaGlmdCgpO1xyXG4gICAgICBjb25zdCBjb29yZGluYXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgICAgY29uc3QgeSA9ICtjb29yZGluYXRlWzBdO1xyXG4gICAgICBjb25zdCB4ID0gK2Nvb3JkaW5hdGVbMl07XHJcbiAgICAgIGNvbnN0IHRvdGFsID0geSArIGN1cnJlbnRTaGlwTGVuZ3RoO1xyXG4gICAgICBpZiAodG90YWwgPD0gMTApIHtcclxuICAgICAgICBwbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKHksIHgsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcclxuICAgICAgICBjcmVhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBzaGlwcyB9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgbW91c2VFdmVudHMgPSAoKCkgPT4ge1xyXG4gIGxldCBob3Jpem9udGFsID0gdHJ1ZTtcclxuICBsZXQgdmFsaWRDb29yZGluYXRlcyA9IFtdO1xyXG4gIGNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBob3Jpem9udGFsID8gKGhvcml6b250YWwgPSBmYWxzZSkgOiAoaG9yaXpvbnRhbCA9IHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhpZ2hsaWdodCA9IChlKSA9PiB7XHJcbiAgICBlLnRhcmdldC5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XHJcbiAgICBjb25zdCBzZWxlY3RlZENvb3JkaW5hdGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xyXG4gICAgY29uc3QgZmlyc3ROdW1iZXIgPSArc2VsZWN0ZWRDb29yZGluYXRlWzBdO1xyXG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVsyXTtcclxuICAgIGxldCBUT1RBTCA9IGZpcnN0TnVtYmVyICsgQm9hcmRTZXR1cC5zaGlwcy5sZW5ndGg7XHJcbiAgICBob3Jpem9udGFsXHJcbiAgICAgID8gKFRPVEFMID0gZmlyc3ROdW1iZXIgKyBCb2FyZFNldHVwLnNoaXBzLmxlbmd0aClcclxuICAgICAgOiAoVE9UQUwgPSBzZWNvbmROdW1iZXIgKyBCb2FyZFNldHVwLnNoaXBzLmxlbmd0aCk7XHJcblxyXG4gICAgY29uc3QgY2hlY2tUb3RhbCA9ICgpID0+IHtcclxuICAgICAgaWYgKFRPVEFMIDw9IDEwKSB7XHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgIGxldCBzaGlwTGVuZ3RoID0gMDtcclxuICAgICAgICAgIHNoaXBMZW5ndGggPCBCb2FyZFNldHVwLnNoaXBzLmxlbmd0aDtcclxuICAgICAgICAgIHNoaXBMZW5ndGgrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbGV0IGZpcnN0TnVtYmVyID0gK3NlbGVjdGVkQ29vcmRpbmF0ZVswXTtcclxuICAgICAgICAgIGxldCBzZWNvbmROdW1iZXIgPSArc2VsZWN0ZWRDb29yZGluYXRlWzJdO1xyXG4gICAgICAgICAgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICA/IChmaXJzdE51bWJlciArPSBzaGlwTGVuZ3RoKVxyXG4gICAgICAgICAgICA6IChzZWNvbmROdW1iZXIgKz0gc2hpcExlbmd0aCk7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke2ZpcnN0TnVtYmVyfSwke3NlY29uZE51bWJlcn1cIl1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xyXG4gICAgICAgICAgdmFsaWRDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoZS50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ25vdC1hbGxvd2VkJyk7XHJcbiAgICB9O1xyXG4gICAgY2hlY2tUb3RhbCgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUhpZ2hsaWdodCA9ICgpID0+IHtcclxuICAgIHZhbGlkQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBjb29yZGluYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBCb2FyZFNldHVwLmNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGlnaGxpZ2h0KTtcclxuICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCByZW1vdmVIaWdobGlnaHQpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IEJvYXJkU2V0dXAsIG1vdXNlRXZlbnRzIH07XHJcbiIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcnMtZmFjdG9yeSc7XG5cbmNvbnN0IHRlbXBQbGF5ZXJzID0gW107XG5leHBvcnQgY29uc3QgcGxheWVyT25lID0gcGxheWVyKCdqZWZmJyk7XG5jb25zdCBBSSA9IGNvbXB1dGVyKCdhaScpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDMsIDQsIDUpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDgsIDYsIDIpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDEsIDcsIDMpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDUsIDUsIDMpO1xuLy8gQUkuYm9hcmQucGxhY2VTaGlwKDEsIDIsIDEpO1xudGVtcFBsYXllcnMucHVzaChwbGF5ZXJPbmUpO1xuXG5jb25zdCBhdHRhY2tpbmcgPSAoKCkgPT4ge1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IGN1cnJlbnRFbmVteSA9IEFJO1xuICBjb25zdCBzd2l0Y2hUdXJucyA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFBsYXllciA9PSBwbGF5ZXJPbmUpIHtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBBSTtcbiAgICAgIGN1cnJlbnRFbmVteSA9IHBsYXllck9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgIGN1cnJlbnRFbmVteSA9IEFJO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgICBjdXJyZW50RW5lbXkuYm9hcmQuYWxsU2hpcHNTdW5rKCkgPyAoZW5kZ2FtZSA9IHRydWUpIDogZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIuYXR0YWNrKGNvb3JkaWFuYXRlLCBjdXJyZW50RW5lbXkuYm9hcmQpKSB7XG4gICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW5lbXlBdHRhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRpYW5hdGUgPSBBSS5nZW5hcmF0ZUNvb3JkaW5hdGVzKCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2plZmYnKTtcbiAgICBjb25zdCBib3ggPSB0YXJnZXQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcmRpbmF0ZT1cIiR7Y29vcmRpYW5hdGV9XCJdYCk7XG4gICAgY29uc29sZS5sb2coY29vcmRpYW5hdGUpO1xuICAgIGlmIChjdXJyZW50UGxheWVyLmF0dGFjayhjb29yZGlhbmF0ZSwgY3VycmVudEVuZW15LmJvYXJkKSkge1xuICAgICAgYm94LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcbiAgICB9XG4gICAgc3dpdGNoVHVybnMoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBhdHRhY2soZSkge1xuICAgIHBsYXllckF0dGFjayhlKTtcbiAgICBzd2l0Y2hUdXJucygpO1xuICAgIHNldFRpbWVvdXQoZW5lbXlBdHRhY2ssIDIwMCk7XG4gIH1cblxuICByZXR1cm4geyBhdHRhY2ssIHN3aXRjaFR1cm5zLCBjdXJyZW50UGxheWVyIH07XG59KSgpO1xuXG5jb25zdCByZW5kZXJCb2FyZHMgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpIHtcbiAgICB0ZW1wUGxheWVycy5mb3JFYWNoKChkdWRlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkdWRlKTtcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtkdWRlLm5hbWV9YCk7XG4gICAgICBkdWRlLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHBsYXllcnMucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgICAgICAgaWYgKGR1ZGUubmFtZSA9PSAnYWknKSB7XG4gICAgICAgICAgQXJyYXkuZnJvbSh0YXJnZXQpLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2tpbmcuYXR0YWNrLCB7XG4gICAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmluYWwgPSBbXTtcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZXN0ID0gQXJyYXkuZnJvbSh0YXJnZXQpO1xuICAgICAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgdGVzdCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09IGxvY2F0ZS5zdWJzdHJpbmcoMCwgMylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBmaW5hbC5wdXNoKGNvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZpbmFsLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHt9O1xufSkoKTtcbiIsImltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XG5pbXBvcnQgeyBtb3VzZUV2ZW50cyB9IGZyb20gJy4vYm9hcmQtc2V0dXAnO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZGluYXRlczEsIGNvb3JkaW5hdGVzMiwgbGVuZ3RoKSA9PiB7XG4gICAgY29uc3QgY2FycmllciA9IEJhdHRsZVNoaXAobGVuZ3RoKTtcbiAgICBjb25zdCBzaGlwRGV0YWlscyA9IHtcbiAgICAgIHNoaXA6IGNhcnJpZXIsXG4gICAgICBsb2NhdGlvbjogW10sXG4gICAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZmlyc3QgPSBjb29yZGluYXRlczE7XG4gICAgICBsZXQgc2VjID0gY29vcmRpbmF0ZXMyO1xuICAgICAgbW91c2VFdmVudHMuaG9yaXpvbnRhbCA/IChmaXJzdCArPSBpKSA6IChzZWMgKz0gaSk7XG4gICAgICBjb25zdCBwb3NvdGlvbiA9IGk7XG4gICAgICBzaGlwRGV0YWlscy5sb2NhdGlvbi5wdXNoKGAke2ZpcnN0fSwke3NlY30sJHtwb3NvdGlvbn1gKTtcbiAgICB9XG4gICAgc2hpcENvb3JkaW5hdGVzLnB1c2goc2hpcERldGFpbHMpO1xuICB9O1xuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5zb21lKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgIGNvb3JkLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xuICAgICAgICAgID8gY29vcmRpbmF0ZS5zaGlwLmhpdChjb29yZC5zdWJzdHJpbmcoNCkpXG4gICAgICAgICAgOiBtaXNzZWQucHVzaChjb29yZGluYXRlcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb29yZGluYXRlLmxvY2F0aW9uLnNvbWUoXG4gICAgICAgIChjb29yZCkgPT4gY29vcmQuc3Vic3RyaW5nKDAsIDMpID09IGNvb3JkaW5hdGVzXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IG1pc3NlZCA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLmV2ZXJ5KCh4KSA9PiB4LnNoaXAuaXNTaW5rKCkpO1xuICB9O1xuXG4gIHJldHVybiB7IHNoaXBDb29yZGluYXRlcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQtZmFjdG9yeSc7XG5cbmNvbnN0IHBsYXllciA9IChhcmcpID0+IHtcbiAgY29uc3QgbmFtZSA9IGFyZztcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkaW5hdGVzLCBlbmVteUJvYXJkKSA9PiB7XG4gICAgcmV0dXJuIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSA1OyBpID4gMDsgaS0tKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjsgeCsrKSB7XG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgYXR0YWNrLCByYW5kb21pemUsIG5hbWUgfTtcbn07XG5cbmNvbnN0IGNvbXB1dGVyID0gKHVzZXIpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcbiAgY29uc3QgbmFtZSA9IHVzZXI7XG4gIGNvbnN0IGdlbmFyYXRlQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgbGV0IGFyciA9ICcnO1xuICAgIHdoaWxlIChhcnIubGVuZ3RoIDwgMikge1xuICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBhcnIgKz0gcjtcbiAgICB9XG4gICAgcmV0dXJuIHZlcmlmeShhcnIpO1xuICB9O1xuICBjb25zdCBjb29yZGluYXRlc1VzZWQgPSBbXTtcbiAgY29uc3QgdmVyaWZ5ID0gKGFycikgPT4ge1xuICAgIGlmIChjb29yZGluYXRlc1VzZWQuaW5jbHVkZXMoYXJyKSkge1xuICAgICAgcmV0dXJuIGdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29vcmRpbmF0ZXNVc2VkLnB1c2goYXJyKTtcbiAgICAgIGNvbnNvbGUubG9nKGAke2FyclswXX0sJHthcnJbMV19YCk7XG4gICAgICByZXR1cm4gYXJyWzBdICsgJywnICsgYXJyWzFdO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkaW5hdGVzLCBlbmVteUJvYXJkKSA9PlxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG5cbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSA1OyBpID4gMDsgaS0tKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjsgeCsrKSB7XG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgZ2VuYXJhdGVDb29yZGluYXRlcywgcmFuZG9taXplLCBuYW1lIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBjb25zdCBzaGlwSGl0cyA9IFtdO1xuICBjb25zdCBoaXQgPSAocG9zdGlvbikgPT4ge1xuICAgIGlmICghc2hpcEhpdHMuaW5jbHVkZXMocG9zdGlvbikgJiYgcG9zdGlvbiA8PSBzaGlwTGVuZ3RoKSB7XG4gICAgICBzaGlwSGl0cy5wdXNoKHBvc3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coc2hpcEhpdHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1NpbmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT0gc2hpcEhpdHMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICByZXR1cm4geyBoaXQsIHNoaXBIaXRzLCBpc1NpbmssIHNoaXBMZW5ndGggfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQm9hcmRzIH0gZnJvbSAnLi9nYW1lLWxvb3AnO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=