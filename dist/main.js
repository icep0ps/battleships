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
const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');
// AI.board.placeShip(3, 4, 5);
// AI.board.placeShip(8, 6, 2);
// AI.board.placeShip(1, 7, 3);
// AI.board.placeShip(5, 5, 3);
// AI.board.placeShip(1, 2, 1);
tempPlayers.push(playerOne);

const attacking = (() => {
  let endgame = false;

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

  return { createBoards };
})();



const setup = (() => {
  function createPlayerOneBoard() {
    playerOne.board.shipCoordinates.forEach((coordinate) => {
      const target = document.querySelectorAll(`[data-coordinate]`);
      let final = [];
      coordinate.location.forEach((locate) => {
        const test = Array.from(target);
        for (const coord of test) {
          if (coord.getAttribute('data-coordinate') == locate.substring(0, 3)) {
            final.push(coord);
          }
        }
      });

      final.forEach((item) => {
        item.setAttribute('class', 'mark');
      });
    });
  }

  const ships = [5, 4, 3, 3, 1];
  const grids = document.querySelectorAll(`[data-coordinate]`);
  const place = (e) => {
    if (ships.length > 0) {
      const currentShip = ships.shift();
      const coords = e.target.getAttribute('data-coordinate');
      const y = coords[0];
      const x = coords[2];
      const total = Number(y) + Number(currentShip);

      if (total <= 10) {
        playerOne.board.placeShip(Number(y), Number(x), currentShip);
        createPlayerOneBoard();
      }
    }
  };
  grids.forEach((grid) => {
    grid.addEventListener('click', place, { once: true });
  });
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
    console.log(coordinates1, coordinates2, length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRWdCOzs7Ozs7O1VDaEJoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS1sb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVib2FyZC1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllcnMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwcy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVycy1mYWN0b3J5JztcbmNvbnN0IHRlbXBQbGF5ZXJzID0gW107XG5jb25zdCBwbGF5ZXJPbmUgPSBwbGF5ZXIoJ2plZmYnKTtcbmNvbnN0IEFJID0gY29tcHV0ZXIoJ2FpJyk7XG4vLyBBSS5ib2FyZC5wbGFjZVNoaXAoMywgNCwgNSk7XG4vLyBBSS5ib2FyZC5wbGFjZVNoaXAoOCwgNiwgMik7XG4vLyBBSS5ib2FyZC5wbGFjZVNoaXAoMSwgNywgMyk7XG4vLyBBSS5ib2FyZC5wbGFjZVNoaXAoNSwgNSwgMyk7XG4vLyBBSS5ib2FyZC5wbGFjZVNoaXAoMSwgMiwgMSk7XG50ZW1wUGxheWVycy5wdXNoKHBsYXllck9uZSk7XG5cbmNvbnN0IGF0dGFja2luZyA9ICgoKSA9PiB7XG4gIGxldCBlbmRnYW1lID0gZmFsc2U7XG5cbiAgbGV0IHR1cm4gPSAxO1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IGN1cnJlbnRFbmVteSA9IEFJO1xuICBjb25zdCBzd2l0Y2hUdXJucyA9ICgpID0+IHtcbiAgICBpZiAodHVybikge1xuICAgICAgY3VycmVudFBsYXllciA9IEFJO1xuICAgICAgY3VycmVudEVuZW15ID0gcGxheWVyT25lO1xuICAgICAgdHVybi0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICAgICAgY3VycmVudEVuZW15ID0gQUk7XG4gICAgICB0dXJuKys7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xuICAgIGN1cnJlbnRFbmVteS5ib2FyZC5hbGxTaGlwc1N1bmsoKSA/IChlbmRnYW1lID0gdHJ1ZSkgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGF5ZXJBdHRhY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcbiAgICBpZiAoY3VycmVudFBsYXllci5hdHRhY2soY29vcmRpYW5hdGUsIGN1cnJlbnRFbmVteS5ib2FyZCkpIHtcbiAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbmVteUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IEFJLmdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjamVmZicpO1xuICAgIGNvbnN0IGJveCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlPVwiJHtjb29yZGlhbmF0ZX1cIl1gKTtcbiAgICBjb25zb2xlLmxvZyhjb29yZGlhbmF0ZSk7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIuYXR0YWNrKGNvb3JkaWFuYXRlLCBjdXJyZW50RW5lbXkuYm9hcmQpKSB7XG4gICAgICBib3guc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm94LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xuICAgIH1cbiAgICBzd2l0Y2hUdXJucygpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGF0dGFjayhlKSB7XG4gICAgcGxheWVyQXR0YWNrKGUpO1xuICAgIHN3aXRjaFR1cm5zKCk7XG4gICAgc2V0VGltZW91dChlbmVteUF0dGFjaywgMjAwKTtcbiAgfVxuXG4gIHJldHVybiB7IGF0dGFjaywgc3dpdGNoVHVybnMsIGN1cnJlbnRQbGF5ZXIgfTtcbn0pKCk7XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgoKSA9PiB7XG4gIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkcygpIHtcbiAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyJyk7XG4gICAgY29uc3QgcmVuZGVyID0gKGJvYXJkKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNvb3JkaW5hdGUuc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnLCBbeCwgaV0pO1xuICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNvb3JkaW5hdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHJlbmRlcihib2FyZCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGxheWVyT25lQm9hcmQoKSB7XG4gICAgdGVtcFBsYXllcnMuZm9yRWFjaCgoZHVkZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZHVkZSk7XG4gICAgICBjb25zdCBwbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZHVkZS5uYW1lfWApO1xuICAgICAgZHVkZS5ib2FyZC5zaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBwbGF5ZXJzLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XG4gICAgICAgIGlmIChkdWRlLm5hbWUgPT0gJ2FpJykge1xuICAgICAgICAgIEFycmF5LmZyb20odGFyZ2V0KS5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgICAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNraW5nLmF0dGFjaywge1xuICAgICAgICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpbmFsID0gW107XG4gICAgICAgIGNvb3JkaW5hdGUubG9jYXRpb24uZm9yRWFjaCgobG9jYXRlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGVzdCA9IEFycmF5LmZyb20odGFyZ2V0KTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIHRlc3QpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKSA9PSBsb2NhdGUuc3Vic3RyaW5nKDAsIDMpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgZmluYWwucHVzaChjb29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmaW5hbC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21hcmsnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUJvYXJkcygpO1xuXG4gIHJldHVybiB7IGNyZWF0ZUJvYXJkcyB9O1xufSkoKTtcblxuZXhwb3J0IHsgcmVuZGVyQm9hcmRzIH07XG5cbmNvbnN0IHNldHVwID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlUGxheWVyT25lQm9hcmQoKSB7XG4gICAgcGxheWVyT25lLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb29yZGluYXRlXWApO1xuICAgICAgbGV0IGZpbmFsID0gW107XG4gICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGxvY2F0ZSkgPT4ge1xuICAgICAgICBjb25zdCB0ZXN0ID0gQXJyYXkuZnJvbSh0YXJnZXQpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIHRlc3QpIHtcbiAgICAgICAgICBpZiAoY29vcmQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKSA9PSBsb2NhdGUuc3Vic3RyaW5nKDAsIDMpKSB7XG4gICAgICAgICAgICBmaW5hbC5wdXNoKGNvb3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBmaW5hbC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdtYXJrJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDFdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XG4gIGNvbnN0IHBsYWNlID0gKGUpID0+IHtcbiAgICBpZiAoc2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBzaGlwcy5zaGlmdCgpO1xuICAgICAgY29uc3QgY29vcmRzID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkaW5hdGUnKTtcbiAgICAgIGNvbnN0IHkgPSBjb29yZHNbMF07XG4gICAgICBjb25zdCB4ID0gY29vcmRzWzJdO1xuICAgICAgY29uc3QgdG90YWwgPSBOdW1iZXIoeSkgKyBOdW1iZXIoY3VycmVudFNoaXApO1xuXG4gICAgICBpZiAodG90YWwgPD0gMTApIHtcbiAgICAgICAgcGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChOdW1iZXIoeSksIE51bWJlcih4KSwgY3VycmVudFNoaXApO1xuICAgICAgICBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZSwgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBzaGlwIGFzIEJhdHRsZVNoaXAgfSBmcm9tICcuL3NoaXBzLWZhY3RvcnknO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZGluYXRlczEsIGNvb3JkaW5hdGVzMiwgbGVuZ3RoKSA9PiB7XG4gICAgY29uc29sZS5sb2coY29vcmRpbmF0ZXMxLCBjb29yZGluYXRlczIsIGxlbmd0aCk7XG4gICAgY29uc3QgY2FycmllciA9IEJhdHRsZVNoaXAobGVuZ3RoKTtcbiAgICBjb25zdCBzaGlwRGV0YWlscyA9IHtcbiAgICAgIHNoaXA6IGNhcnJpZXIsXG4gICAgICBsb2NhdGlvbjogW10sXG4gICAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmaXJzdCA9IGNvb3JkaW5hdGVzMSArIGk7XG4gICAgICBjb25zdCBzZWMgPSBjb29yZGluYXRlczI7XG4gICAgICBjb25zdCBwb3NvdGlvbiA9IGk7XG4gICAgICBzaGlwRGV0YWlscy5sb2NhdGlvbi5wdXNoKGAke2ZpcnN0fSwke3NlY30sJHtwb3NvdGlvbn1gKTtcbiAgICB9XG4gICAgc2hpcENvb3JkaW5hdGVzLnB1c2goc2hpcERldGFpbHMpO1xuICB9O1xuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5zb21lKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLmxvY2F0aW9uLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgIGNvb3JkLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xuICAgICAgICAgID8gY29vcmRpbmF0ZS5zaGlwLmhpdChjb29yZC5zdWJzdHJpbmcoNCkpXG4gICAgICAgICAgOiBtaXNzZWQucHVzaChjb29yZGluYXRlcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb29yZGluYXRlLmxvY2F0aW9uLnNvbWUoXG4gICAgICAgIChjb29yZCkgPT4gY29vcmQuc3Vic3RyaW5nKDAsIDMpID09IGNvb3JkaW5hdGVzXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IG1pc3NlZCA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzLmV2ZXJ5KCh4KSA9PiB4LnNoaXAuaXNTaW5rKCkpO1xuICB9O1xuXG4gIHJldHVybiB7IHNoaXBDb29yZGluYXRlcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQtZmFjdG9yeSc7XG5cbmNvbnN0IHBsYXllciA9IChhcmcpID0+IHtcbiAgY29uc3QgbmFtZSA9IGFyZztcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkaW5hdGVzLCBlbmVteUJvYXJkKSA9PiB7XG4gICAgcmV0dXJuIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSA1OyBpID4gMDsgaS0tKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjsgeCsrKSB7XG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgYXR0YWNrLCByYW5kb21pemUsIG5hbWUgfTtcbn07XG5cbmNvbnN0IGNvbXB1dGVyID0gKHVzZXIpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcbiAgY29uc3QgbmFtZSA9IHVzZXI7XG4gIGNvbnN0IGdlbmFyYXRlQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgbGV0IGFyciA9ICcnO1xuICAgIHdoaWxlIChhcnIubGVuZ3RoIDwgMikge1xuICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBhcnIgKz0gcjtcbiAgICB9XG4gICAgcmV0dXJuIHZlcmlmeShhcnIpO1xuICB9O1xuICBjb25zdCBjb29yZGluYXRlc1VzZWQgPSBbXTtcbiAgY29uc3QgdmVyaWZ5ID0gKGFycikgPT4ge1xuICAgIGlmIChjb29yZGluYXRlc1VzZWQuaW5jbHVkZXMoYXJyKSkge1xuICAgICAgcmV0dXJuIGdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29vcmRpbmF0ZXNVc2VkLnB1c2goYXJyKTtcbiAgICAgIGNvbnNvbGUubG9nKGAke2FyclswXX0sJHthcnJbMV19YCk7XG4gICAgICByZXR1cm4gYXJyWzBdICsgJywnICsgYXJyWzFdO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkaW5hdGVzLCBlbmVteUJvYXJkKSA9PlxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG5cbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSA1OyBpID4gMDsgaS0tKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjsgeCsrKSB7XG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGUxLCBjb29yZGluYXRlMiwgMyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgZ2VuYXJhdGVDb29yZGluYXRlcywgcmFuZG9taXplLCBuYW1lIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBjb25zdCBzaGlwSGl0cyA9IFtdO1xuICBjb25zdCBoaXQgPSAocG9zdGlvbikgPT4ge1xuICAgIGlmICghc2hpcEhpdHMuaW5jbHVkZXMocG9zdGlvbikgJiYgcG9zdGlvbiA8PSBzaGlwTGVuZ3RoKSB7XG4gICAgICBzaGlwSGl0cy5wdXNoKHBvc3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coc2hpcEhpdHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1NpbmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT0gc2hpcEhpdHMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICByZXR1cm4geyBoaXQsIHNoaXBIaXRzLCBpc1NpbmssIHNoaXBMZW5ndGggfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQm9hcmRzIH0gZnJvbSAnLi9nYW1lLWxvb3AnO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=