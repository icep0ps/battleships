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
playerOne.board.placeShip(3, 4, 5);
playerOne.board.placeShip(8, 6, 2);
playerOne.board.placeShip(1, 7, 3);
playerOne.board.placeShip(5, 5, 3);
playerOne.board.placeShip(1, 2, 1);
const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');
AI.board.placeShip(3, 4, 5);
AI.board.placeShip(8, 6, 2);
AI.board.placeShip(1, 7, 3);
AI.board.placeShip(5, 5, 3);
AI.board.placeShip(1, 2, 1);
tempPlayers.push(playerOne);
tempPlayers.push(AI);

const attacking = (() => {
  let turn = 1;
  let currentPlayer = playerOne;
  let currentEnemy = AI;
  const switchTurns = () => {
    if (turn) {
      currentPlayer = AI;
      currentEnemy = playerOne;
      turn--;
    } else {
      currentPlayer = playerOne;
      currentEnemy = AI;
      turn++;
    }
  };

  const gameOver = () => {
    if (currentEnemy.board.allShipsSunk()) {
      console.log('gameover');
    }
  };

  const playerAttack = (e) => {
    const coordianate = e.target.getAttribute('data-coordinate');
    if (currentPlayer.attack(coordianate, currentEnemy.board)) {
      e.target.setAttribute('class', 'hit');
    } else {
      e.target.setAttribute('class', 'miss');
    }
    gameOver();
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
    gameOver();
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

  createBoards();
  createPlayerOneBoard();

  return { createBoards };
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


const gameboard = () => {
  const shipCoordinates = [];

  const placeShip = (coordinates1, coordinates2, length) => {
    const carrier = (0,_ships_factory__WEBPACK_IMPORTED_MODULE_0__.ship)(length);
    const shipDetails = {
      ship: carrier,
      location: [],
    };
    for (let i = 0; i < length; i++) {
      const first = coordinates1 + i;
      const sec = coordinates2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVycy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXJzLWZhY3RvcnknO1xuY29uc3QgdGVtcFBsYXllcnMgPSBbXTtcbmNvbnN0IHBsYXllck9uZSA9IHBsYXllcignamVmZicpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcCgzLCA0LCA1KTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAoOCwgNiwgMik7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKDEsIDcsIDMpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcCg1LCA1LCAzKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAoMSwgMiwgMSk7XG5jb25zdCBBSSA9IGNvbXB1dGVyKCdhaScpO1xuQUkuYm9hcmQucGxhY2VTaGlwKDMsIDQsIDUpO1xuQUkuYm9hcmQucGxhY2VTaGlwKDgsIDYsIDIpO1xuQUkuYm9hcmQucGxhY2VTaGlwKDEsIDcsIDMpO1xuQUkuYm9hcmQucGxhY2VTaGlwKDUsIDUsIDMpO1xuQUkuYm9hcmQucGxhY2VTaGlwKDEsIDIsIDEpO1xudGVtcFBsYXllcnMucHVzaChwbGF5ZXJPbmUpO1xudGVtcFBsYXllcnMucHVzaChBSSk7XG5cbmNvbnN0IGF0dGFja2luZyA9ICgoKSA9PiB7XG4gIGxldCB0dXJuID0gMTtcbiAgbGV0IGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIGxldCBjdXJyZW50RW5lbXkgPSBBSTtcbiAgY29uc3Qgc3dpdGNoVHVybnMgPSAoKSA9PiB7XG4gICAgaWYgKHR1cm4pIHtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBBSTtcbiAgICAgIGN1cnJlbnRFbmVteSA9IHBsYXllck9uZTtcbiAgICAgIHR1cm4tLTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgIGN1cnJlbnRFbmVteSA9IEFJO1xuICAgICAgdHVybisrO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudEVuZW15LmJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBjb25zb2xlLmxvZygnZ2FtZW92ZXInKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheWVyQXR0YWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIuYXR0YWNrKGNvb3JkaWFuYXRlLCBjdXJyZW50RW5lbXkuYm9hcmQpKSB7XG4gICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcbiAgICB9XG4gICAgZ2FtZU92ZXIoKTtcbiAgfTtcblxuICBjb25zdCBlbmVteUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IEFJLmdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjamVmZicpO1xuICAgIGNvbnN0IGJveCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlPVwiJHtjb29yZGlhbmF0ZX1cIl1gKTtcbiAgICBjb25zb2xlLmxvZyhjb29yZGlhbmF0ZSk7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIuYXR0YWNrKGNvb3JkaWFuYXRlLCBjdXJyZW50RW5lbXkuYm9hcmQpKSB7XG4gICAgICBib3guc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm94LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xuICAgIH1cbiAgICBnYW1lT3ZlcigpO1xuICAgIHN3aXRjaFR1cm5zKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gYXR0YWNrKGUpIHtcbiAgICBwbGF5ZXJBdHRhY2soZSk7XG4gICAgc3dpdGNoVHVybnMoKTtcbiAgICBzZXRUaW1lb3V0KGVuZW15QXR0YWNrLCAyMDApO1xuICB9XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBzd2l0Y2hUdXJucywgY3VycmVudFBsYXllciB9O1xufSkoKTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlQm9hcmRzKCkge1xuICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXInKTtcbiAgICBjb25zdCByZW5kZXIgPSAoYm9hcmQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScsIFt4LCBpXSk7XG4gICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29vcmRpbmF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4gcmVuZGVyKGJvYXJkKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpIHtcbiAgICB0ZW1wUGxheWVycy5mb3JFYWNoKChkdWRlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkdWRlKTtcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtkdWRlLm5hbWV9YCk7XG4gICAgICBkdWRlLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHBsYXllcnMucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgICAgICAgaWYgKGR1ZGUubmFtZSA9PSAnYWknKSB7XG4gICAgICAgICAgQXJyYXkuZnJvbSh0YXJnZXQpLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2tpbmcuYXR0YWNrLCB7XG4gICAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmluYWwgPSBbXTtcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZXN0ID0gQXJyYXkuZnJvbSh0YXJnZXQpO1xuICAgICAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgdGVzdCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09IGxvY2F0ZS5zdWJzdHJpbmcoMCwgMylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBmaW5hbC5wdXNoKGNvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZpbmFsLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQm9hcmRzKCk7XG4gIGNyZWF0ZVBsYXllck9uZUJvYXJkKCk7XG5cbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmRzIH07XG59KSgpO1xuXG5leHBvcnQgeyByZW5kZXJCb2FyZHMgfTtcbiIsImltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XG5cbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkaW5hdGVzMSwgY29vcmRpbmF0ZXMyLCBsZW5ndGgpID0+IHtcbiAgICBjb25zdCBjYXJyaWVyID0gQmF0dGxlU2hpcChsZW5ndGgpO1xuICAgIGNvbnN0IHNoaXBEZXRhaWxzID0ge1xuICAgICAgc2hpcDogY2FycmllcixcbiAgICAgIGxvY2F0aW9uOiBbXSxcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gY29vcmRpbmF0ZXMxICsgaTtcbiAgICAgIGNvbnN0IHNlYyA9IGNvb3JkaW5hdGVzMjtcbiAgICAgIGNvbnN0IHBvc290aW9uID0gaTtcbiAgICAgIHNoaXBEZXRhaWxzLmxvY2F0aW9uLnB1c2goYCR7Zmlyc3R9LCR7c2VjfSwke3Bvc290aW9ufWApO1xuICAgIH1cbiAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChzaGlwRGV0YWlscyk7XG4gIH07XG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLnNvbWUoKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvb3JkaW5hdGUubG9jYXRpb24uZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgY29vcmQuc3Vic3RyaW5nKDAsIDMpID09IGNvb3JkaW5hdGVzXG4gICAgICAgICAgPyBjb29yZGluYXRlLnNoaXAuaGl0KGNvb3JkLnN1YnN0cmluZyg0KSlcbiAgICAgICAgICA6IG1pc3NlZC5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvb3JkaW5hdGUubG9jYXRpb24uc29tZShcbiAgICAgICAgKGNvb3JkKSA9PiBjb29yZC5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgbWlzc2VkID0gW107XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHgpID0+IHguc2hpcC5pc1NpbmsoKSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2hpcENvb3JkaW5hdGVzLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBzU3VuayB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC1mYWN0b3J5JztcblxuY29uc3QgcGxheWVyID0gKGFyZykgPT4ge1xuICBjb25zdCBuYW1lID0gYXJnO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+IHtcbiAgICByZXR1cm4gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAyOyB4KyspIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIHJhbmRvbWl6ZSwgbmFtZSB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAodXNlcikgPT4ge1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuICBjb25zdCBuYW1lID0gdXNlcjtcbiAgY29uc3QgZ2VuYXJhdGVDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBsZXQgYXJyID0gJyc7XG4gICAgd2hpbGUgKGFyci5sZW5ndGggPCAyKSB7XG4gICAgICBsZXQgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGFyciArPSByO1xuICAgIH1cbiAgICByZXR1cm4gdmVyaWZ5KGFycik7XG4gIH07XG4gIGNvbnN0IGNvb3JkaW5hdGVzVXNlZCA9IFtdO1xuICBjb25zdCB2ZXJpZnkgPSAoYXJyKSA9PiB7XG4gICAgaWYgKGNvb3JkaW5hdGVzVXNlZC5pbmNsdWRlcyhhcnIpKSB7XG4gICAgICByZXR1cm4gZ2VuYXJhdGVDb29yZGluYXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChhcnIpO1xuICAgICAgY29uc29sZS5sb2coYCR7YXJyWzBdfSwke2FyclsxXX1gKTtcbiAgICAgIHJldHVybiBhcnJbMF0gKyAnLCcgKyBhcnJbMV07XG4gICAgfVxuICB9O1xuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcblxuICBjb25zdCByYW5kb21pemUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCBjb29yZGluYXRlMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAyOyB4KyspIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4geyBib2FyZCwgYXR0YWNrLCBnZW5hcmF0ZUNvb3JkaW5hdGVzLCByYW5kb21pemUsIG5hbWUgfTtcbn07XG5cbmV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGNvbnN0IHNoaXBIaXRzID0gW107XG4gIGNvbnN0IGhpdCA9IChwb3N0aW9uKSA9PiB7XG4gICAgaWYgKCFzaGlwSGl0cy5pbmNsdWRlcyhwb3N0aW9uKSAmJiBwb3N0aW9uIDw9IHNoaXBMZW5ndGgpIHtcbiAgICAgIHNoaXBIaXRzLnB1c2gocG9zdGlvbik7XG4gICAgICBjb25zb2xlLmxvZyhzaGlwSGl0cyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzU2luayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcExlbmd0aCA9PSBzaGlwSGl0cy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIHJldHVybiB7IGhpdCwgc2hpcEhpdHMsIGlzU2luaywgc2hpcExlbmd0aCB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXJCb2FyZHMgfSBmcm9tICcuL2dhbWUtbG9vcCc7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==