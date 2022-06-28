/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderBoards": () => (/* binding */ renderBoards)
/* harmony export */ });
/* harmony import */ var _players_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players-factory */ "./src/players-factory.js");

const tempPlayers = [];
const playerOne = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.player)('jeff');
playerOne.randomize();
tempPlayers.push(playerOne);
const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.player)('ai');
AI.randomize();
tempPlayers.push(AI);

const attacking = (() => {
  let turn = 1;
  let currentPlayer = playerOne;
  const switchTurns = () => {
    if (turn) {
      currentPlayer = AI;
      turn--;
    } else {
      currentPlayer = playerOne;

      turn++;
    }
  };

  const attack = (coordinates) => {
    const playerTwo = document.querySelector(`#${currentPlayer.name}`);
    const data = coordinates.target.getAttribute('data-coordinate');
    if (currentPlayer.board.receiveAttack(data)) {
      const target = playerTwo.querySelector(`[data-coordinate="${data}"]`);
      target.classList.add('hit');
    } else {
      const target = playerTwo.querySelector(`[data-coordinate="${data}"]`);
      target.classList.add('miss');
    }
    switchTurns();
    gameOver();
  };

  return { attack, switchTurns, currentPlayer };
})();

const renderBoards = (() => {
  function createBoards() {
    const boards = document.querySelectorAll('.player');
    const render = (board) => {
      for (let i = 0; i < 10; i++) {
        for (let x = 0; x < 10; x++) {
          const coordinate = document.createElement('div');
          coordinate.setAttribute('data-coordinate', [x, i]);
          board.appendChild(coordinate);
        }
      }
    };
    boards.forEach((board) => render(board));
  }

  function createPlayerOneBoard() {
    tempPlayers.forEach((dude) => {
      console.log(dude.board.shipCoordinates);
      const players = document.querySelector(`#${dude.name}`);
      dude.board.shipCoordinates.forEach((coordinate) => {
        const target = players.querySelectorAll(`[data-coordinate]`);
        Array.from(target).forEach((coordinate) => {
          coordinate.addEventListener('click', attacking.attack, {
            once: true,
          });
        });
        const test = Array.from(target).filter((item) => {
          return (
            [item.getAttribute('data-coordinate')][0] == coordinate.location[0]
          );
        });
        test.forEach((item) => {
          item.setAttribute('class', 'mark');
        });
        // test.forEach((item) => {
        //   for (let x = 0; x < coordinate.ship.shipLength; x++) {
        //     const num = Number(coordinate.location[0].charAt(2));
        //     const box = players.querySelector(
        //       `[data-coordinate="${Number(coordinate.location[0].charAt(0))},${
        //         num + x
        //       }"]`
        //     );
        //     box.setAttribute('class', 'mark');
        //   }
        // });
      });
    });
  }

  createBoards();
  createPlayerOneBoard();

  return { createBoards };
})();

const gameOver = () => {
  if (playerOne.board.allShipsSunk()) {
    console.log('gameover');
  } else {
    ('none');
  }
};




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


const gameboard = () => {
  const shipCoordinates = [];

  const placeShip = (coordinates1, coordinates2, length) => {
    const carrier = (0,_ships_factory__WEBPACK_IMPORTED_MODULE_0__.ship)(length);
    const shipDetails = {
      ship: carrier,
      location: [`${coordinates1},${coordinates2}`],
    };
    shipCoordinates.push(shipDetails);
  };
  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      if (coordinate.location == coordinates) {
        coordinate.ship.hit(1);
        return true;
      } else {
        missed.push(coordinates);
        return false;
      }
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
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const randomize = () => {
    for (let i = 0; i < 5; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      let shipLength = Math.floor(Math.random() * 5);
      console.log(coordinate1, coordinate2);
      board.placeShip(coordinate1, coordinate2, 3);
    }
  };

  return { board, attack, randomize, name };
};

const computer = {
  board: _gameboard_factory__WEBPACK_IMPORTED_MODULE_0__.gameboard,
  genarateCoordinates: () => {
    let arr = [];
    while (arr.length < 2) {
      let r = Math.floor(Math.random() * 10) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    verify(arr);
  },
  coordinatesUsed: [],
  verify: (arr) => {
    if (coordinatesUsed.includes(arr)) {
      genarateCoordinates();
    } else {
      coordinatesUsed.push(arr);
      return arr;
    }
  },
  attack: (coordinates, enemyBoard) => enemyBoard.receiveAttack(coordinates),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUQ7QUFDckQ7QUFDQSxrQkFBa0Isd0RBQU07QUFDeEI7QUFDQTtBQUNBLFdBQVcsd0RBQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsbUJBQW1CO0FBQ3BFO0FBQ0E7QUFDQSxrRUFBa0UsS0FBSztBQUN2RTtBQUNBLE1BQU07QUFDTixrRUFBa0UsS0FBSztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsUUFBUTtBQUM5Qix3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsVUFBVTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsNkJBQTZCLGdDQUFnQztBQUM3RDtBQUNBO0FBQ0Esc0NBQXNDLHlDQUF5QztBQUMvRTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUN3Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBVTtBQUM5QjtBQUNBO0FBQ0Esb0JBQW9CLGFBQWEsR0FBRyxhQUFhO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQzJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw2REFBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUyx5REFBUztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQzRCOzs7Ozs7Ozs7Ozs7Ozs7QUMzQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ2dCOzs7Ozs7O1VDZmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVycy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXJzLWZhY3RvcnknO1xyXG5jb25zdCB0ZW1wUGxheWVycyA9IFtdO1xyXG5jb25zdCBwbGF5ZXJPbmUgPSBwbGF5ZXIoJ2plZmYnKTtcclxucGxheWVyT25lLnJhbmRvbWl6ZSgpO1xyXG50ZW1wUGxheWVycy5wdXNoKHBsYXllck9uZSk7XHJcbmNvbnN0IEFJID0gcGxheWVyKCdhaScpO1xyXG5BSS5yYW5kb21pemUoKTtcclxudGVtcFBsYXllcnMucHVzaChBSSk7XHJcblxyXG5jb25zdCBhdHRhY2tpbmcgPSAoKCkgPT4ge1xyXG4gIGxldCB0dXJuID0gMTtcclxuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcclxuICBjb25zdCBzd2l0Y2hUdXJucyA9ICgpID0+IHtcclxuICAgIGlmICh0dXJuKSB7XHJcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBBSTtcclxuICAgICAgdHVybi0tO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcclxuXHJcbiAgICAgIHR1cm4rKztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIGNvbnN0IHBsYXllclR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2N1cnJlbnRQbGF5ZXIubmFtZX1gKTtcclxuICAgIGNvbnN0IGRhdGEgPSBjb29yZGluYXRlcy50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcclxuICAgIGlmIChjdXJyZW50UGxheWVyLmJvYXJkLnJlY2VpdmVBdHRhY2soZGF0YSkpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gcGxheWVyVHdvLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3JkaW5hdGU9XCIke2RhdGF9XCJdYCk7XHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IHBsYXllclR3by5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlPVwiJHtkYXRhfVwiXWApO1xyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoVHVybnMoKTtcclxuICAgIGdhbWVPdmVyKCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgYXR0YWNrLCBzd2l0Y2hUdXJucywgY3VycmVudFBsYXllciB9O1xyXG59KSgpO1xyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcclxuICBmdW5jdGlvbiBjcmVhdGVCb2FyZHMoKSB7XHJcbiAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyJyk7XHJcbiAgICBjb25zdCByZW5kZXIgPSAoYm9hcmQpID0+IHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICBjb29yZGluYXRlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJywgW3gsIGldKTtcclxuICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNvb3JkaW5hdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4gcmVuZGVyKGJvYXJkKSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpIHtcclxuICAgIHRlbXBQbGF5ZXJzLmZvckVhY2goKGR1ZGUpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZHVkZS5ib2FyZC5zaGlwQ29vcmRpbmF0ZXMpO1xyXG4gICAgICBjb25zdCBwbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZHVkZS5uYW1lfWApO1xyXG4gICAgICBkdWRlLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcGxheWVycy5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xyXG4gICAgICAgIEFycmF5LmZyb20odGFyZ2V0KS5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XHJcbiAgICAgICAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNraW5nLmF0dGFjaywge1xyXG4gICAgICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IEFycmF5LmZyb20odGFyZ2V0KS5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFtpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyldWzBdID09IGNvb3JkaW5hdGUubG9jYXRpb25bMF1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGVzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRlc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIC8vICAgZm9yIChsZXQgeCA9IDA7IHggPCBjb29yZGluYXRlLnNoaXAuc2hpcExlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IG51bSA9IE51bWJlcihjb29yZGluYXRlLmxvY2F0aW9uWzBdLmNoYXJBdCgyKSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGJveCA9IHBsYXllcnMucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAvLyAgICAgICBgW2RhdGEtY29vcmRpbmF0ZT1cIiR7TnVtYmVyKGNvb3JkaW5hdGUubG9jYXRpb25bMF0uY2hhckF0KDApKX0sJHtcclxuICAgICAgICAvLyAgICAgICAgIG51bSArIHhcclxuICAgICAgICAvLyAgICAgICB9XCJdYFxyXG4gICAgICAgIC8vICAgICApO1xyXG4gICAgICAgIC8vICAgICBib3guc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJyk7XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVCb2FyZHMoKTtcclxuICBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpO1xyXG5cclxuICByZXR1cm4geyBjcmVhdGVCb2FyZHMgfTtcclxufSkoKTtcclxuXHJcbmNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xyXG4gIGlmIChwbGF5ZXJPbmUuYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgIGNvbnNvbGUubG9nKCdnYW1lb3ZlcicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAoJ25vbmUnKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyByZW5kZXJCb2FyZHMgfTtcclxuIiwiaW1wb3J0IHsgc2hpcCBhcyBCYXR0bGVTaGlwIH0gZnJvbSAnLi9zaGlwcy1mYWN0b3J5JztcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkaW5hdGVzMSwgY29vcmRpbmF0ZXMyLCBsZW5ndGgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBCYXR0bGVTaGlwKGxlbmd0aCk7XHJcbiAgICBjb25zdCBzaGlwRGV0YWlscyA9IHtcclxuICAgICAgc2hpcDogY2FycmllcixcclxuICAgICAgbG9jYXRpb246IFtgJHtjb29yZGluYXRlczF9LCR7Y29vcmRpbmF0ZXMyfWBdLFxyXG4gICAgfTtcclxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcclxuICB9O1xyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuc29tZSgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBpZiAoY29vcmRpbmF0ZS5sb2NhdGlvbiA9PSBjb29yZGluYXRlcykge1xyXG4gICAgICAgIGNvb3JkaW5hdGUuc2hpcC5oaXQoMSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWlzc2VkLnB1c2goY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWlzc2VkID0gW107XHJcblxyXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHgpID0+IHguc2hpcC5pc1NpbmsoKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgc2hpcENvb3JkaW5hdGVzLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2FtZWJvYXJkIH07XHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLWZhY3RvcnknO1xyXG5cclxuY29uc3QgcGxheWVyID0gKGFyZykgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSBhcmc7XHJcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+XHJcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xyXG5cclxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IHNoaXBMZW5ndGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcclxuICAgICAgY29uc29sZS5sb2coY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyKTtcclxuICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgcmFuZG9taXplLCBuYW1lIH07XHJcbn07XHJcblxyXG5jb25zdCBjb21wdXRlciA9IHtcclxuICBib2FyZDogZ2FtZWJvYXJkLFxyXG4gIGdlbmFyYXRlQ29vcmRpbmF0ZXM6ICgpID0+IHtcclxuICAgIGxldCBhcnIgPSBbXTtcclxuICAgIHdoaWxlIChhcnIubGVuZ3RoIDwgMikge1xyXG4gICAgICBsZXQgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XHJcbiAgICAgIGlmIChhcnIuaW5kZXhPZihyKSA9PT0gLTEpIGFyci5wdXNoKHIpO1xyXG4gICAgfVxyXG4gICAgdmVyaWZ5KGFycik7XHJcbiAgfSxcclxuICBjb29yZGluYXRlc1VzZWQ6IFtdLFxyXG4gIHZlcmlmeTogKGFycikgPT4ge1xyXG4gICAgaWYgKGNvb3JkaW5hdGVzVXNlZC5pbmNsdWRlcyhhcnIpKSB7XHJcbiAgICAgIGdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvb3JkaW5hdGVzVXNlZC5wdXNoKGFycik7XHJcbiAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhdHRhY2s6IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT4gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSxcclxufTtcclxuXHJcbmV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcclxuIiwiY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcclxuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xyXG4gIGNvbnN0IHNoaXBIaXRzID0gW107XHJcbiAgY29uc3QgaGl0ID0gKHBvc3Rpb24pID0+IHtcclxuICAgIGlmICghc2hpcEhpdHMuaW5jbHVkZXMocG9zdGlvbikgJiYgcG9zdGlvbiA8PSBzaGlwTGVuZ3RoKSB7XHJcbiAgICAgIHNoaXBIaXRzLnB1c2gocG9zdGlvbik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNTaW5rID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT0gc2hpcEhpdHMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH07XHJcbiAgcmV0dXJuIHsgaGl0LCBzaGlwSGl0cywgaXNTaW5rLCBzaGlwTGVuZ3RoIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBzaGlwIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQm9hcmRzIH0gZnJvbSAnLi9nYW1lLWxvb3AnO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=