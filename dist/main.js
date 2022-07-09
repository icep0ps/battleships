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

  grids.forEach((grid) => {
    grid.addEventListener('mouseover', (e) => {
      const currentCord = e.target.getAttribute(`data-coordinate`);
      let boxes = [];
      const first = Number(currentCord[0]);
      const total = Number(first) + ships.length;
      if (total <= 10) {
        for (let i = 0; i < ships.length; i++) {
          const first = Number(currentCord[0]) + i;
          const sec = currentCord[2];
          const box = document.querySelector(
            `[data-coordinate="${first},${sec}"]`
          );
          boxes.push(box);
        }
      }
      boxes.forEach((item) => {
        item.classList.add('hover');
      });
      grid.addEventListener('mouseout', (e) => {
        boxes.forEach((item) => {
          item.classList.remove('hover');
        });
      });
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7OztBQ2xFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNoQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVycy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXJzLWZhY3RvcnknO1xuY29uc3QgdGVtcFBsYXllcnMgPSBbXTtcbmNvbnN0IHBsYXllck9uZSA9IHBsYXllcignamVmZicpO1xuY29uc3QgQUkgPSBjb21wdXRlcignYWknKTtcbi8vIEFJLmJvYXJkLnBsYWNlU2hpcCgzLCA0LCA1KTtcbi8vIEFJLmJvYXJkLnBsYWNlU2hpcCg4LCA2LCAyKTtcbi8vIEFJLmJvYXJkLnBsYWNlU2hpcCgxLCA3LCAzKTtcbi8vIEFJLmJvYXJkLnBsYWNlU2hpcCg1LCA1LCAzKTtcbi8vIEFJLmJvYXJkLnBsYWNlU2hpcCgxLCAyLCAxKTtcbnRlbXBQbGF5ZXJzLnB1c2gocGxheWVyT25lKTtcblxuY29uc3QgYXR0YWNraW5nID0gKCgpID0+IHtcbiAgbGV0IGVuZGdhbWUgPSBmYWxzZTtcblxuICBsZXQgdHVybiA9IDE7XG4gIGxldCBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICBsZXQgY3VycmVudEVuZW15ID0gQUk7XG4gIGNvbnN0IHN3aXRjaFR1cm5zID0gKCkgPT4ge1xuICAgIGlmICh0dXJuKSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gQUk7XG4gICAgICBjdXJyZW50RW5lbXkgPSBwbGF5ZXJPbmU7XG4gICAgICB0dXJuLS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gICAgICBjdXJyZW50RW5lbXkgPSBBSTtcbiAgICAgIHR1cm4rKztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgY3VycmVudEVuZW15LmJvYXJkLmFsbFNoaXBzU3VuaygpID8gKGVuZGdhbWUgPSB0cnVlKSA6IGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChlKSA9PiB7XG4gICAgY29uc3QgY29vcmRpYW5hdGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xuICAgIGlmIChjdXJyZW50UGxheWVyLmF0dGFjayhjb29yZGlhbmF0ZSwgY3VycmVudEVuZW15LmJvYXJkKSkge1xuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVuZW15QXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaWFuYXRlID0gQUkuZ2VuYXJhdGVDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqZWZmJyk7XG4gICAgY29uc3QgYm94ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3JkaW5hdGU9XCIke2Nvb3JkaWFuYXRlfVwiXWApO1xuICAgIGNvbnNvbGUubG9nKGNvb3JkaWFuYXRlKTtcbiAgICBpZiAoY3VycmVudFBsYXllci5hdHRhY2soY29vcmRpYW5hdGUsIGN1cnJlbnRFbmVteS5ib2FyZCkpIHtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hpdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3guc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XG4gICAgfVxuICAgIHN3aXRjaFR1cm5zKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gYXR0YWNrKGUpIHtcbiAgICBwbGF5ZXJBdHRhY2soZSk7XG4gICAgc3dpdGNoVHVybnMoKTtcbiAgICBzZXRUaW1lb3V0KGVuZW15QXR0YWNrLCAyMDApO1xuICB9XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBzd2l0Y2hUdXJucywgY3VycmVudFBsYXllciB9O1xufSkoKTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlQm9hcmRzKCkge1xuICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXInKTtcbiAgICBjb25zdCByZW5kZXIgPSAoYm9hcmQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScsIFt4LCBpXSk7XG4gICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY29vcmRpbmF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4gcmVuZGVyKGJvYXJkKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpIHtcbiAgICB0ZW1wUGxheWVycy5mb3JFYWNoKChkdWRlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkdWRlKTtcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtkdWRlLm5hbWV9YCk7XG4gICAgICBkdWRlLmJvYXJkLnNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHBsYXllcnMucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgICAgICAgaWYgKGR1ZGUubmFtZSA9PSAnYWknKSB7XG4gICAgICAgICAgQXJyYXkuZnJvbSh0YXJnZXQpLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2tpbmcuYXR0YWNrLCB7XG4gICAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmluYWwgPSBbXTtcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChsb2NhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZXN0ID0gQXJyYXkuZnJvbSh0YXJnZXQpO1xuICAgICAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgdGVzdCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09IGxvY2F0ZS5zdWJzdHJpbmcoMCwgMylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBmaW5hbC5wdXNoKGNvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZpbmFsLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQm9hcmRzKCk7XG5cbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmRzIH07XG59KSgpO1xuXG5leHBvcnQgeyByZW5kZXJCb2FyZHMgfTtcblxuY29uc3Qgc2V0dXAgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJPbmVCb2FyZCgpIHtcbiAgICBwbGF5ZXJPbmUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XG4gICAgICBsZXQgZmluYWwgPSBbXTtcbiAgICAgIGNvb3JkaW5hdGUubG9jYXRpb24uZm9yRWFjaCgobG9jYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlc3QgPSBBcnJheS5mcm9tKHRhcmdldCk7XG4gICAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgdGVzdCkge1xuICAgICAgICAgIGlmIChjb29yZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpID09IGxvY2F0ZS5zdWJzdHJpbmcoMCwgMykpIHtcbiAgICAgICAgICAgIGZpbmFsLnB1c2goY29vcmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGZpbmFsLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21hcmsnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3Qgc2hpcHMgPSBbNSwgNCwgMywgMywgMV07XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29vcmRpbmF0ZV1gKTtcbiAgY29uc3QgcGxhY2UgPSAoZSkgPT4ge1xuICAgIGlmIChzaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHNoaXBzLnNoaWZ0KCk7XG4gICAgICBjb25zdCBjb29yZHMgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpO1xuICAgICAgY29uc3QgeSA9IGNvb3Jkc1swXTtcbiAgICAgIGNvbnN0IHggPSBjb29yZHNbMl07XG4gICAgICBjb25zdCB0b3RhbCA9IE51bWJlcih5KSArIE51bWJlcihjdXJyZW50U2hpcCk7XG5cbiAgICAgIGlmICh0b3RhbCA8PSAxMCkge1xuICAgICAgICBwbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKE51bWJlcih5KSwgTnVtYmVyKHgpLCBjdXJyZW50U2hpcCk7XG4gICAgICAgIGNyZWF0ZVBsYXllck9uZUJvYXJkKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlLCB7IG9uY2U6IHRydWUgfSk7XG4gIH0pO1xuXG4gIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50Q29yZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShgZGF0YS1jb29yZGluYXRlYCk7XG4gICAgICBsZXQgYm94ZXMgPSBbXTtcbiAgICAgIGNvbnN0IGZpcnN0ID0gTnVtYmVyKGN1cnJlbnRDb3JkWzBdKTtcbiAgICAgIGNvbnN0IHRvdGFsID0gTnVtYmVyKGZpcnN0KSArIHNoaXBzLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbCA8PSAxMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZmlyc3QgPSBOdW1iZXIoY3VycmVudENvcmRbMF0pICsgaTtcbiAgICAgICAgICBjb25zdCBzZWMgPSBjdXJyZW50Q29yZFsyXTtcbiAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke2ZpcnN0fSwke3NlY31cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBib3hlcy5wdXNoKGJveCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJveGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xuICAgICAgfSk7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgYm94ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIiwiaW1wb3J0IHsgc2hpcCBhcyBCYXR0bGVTaGlwIH0gZnJvbSAnLi9zaGlwcy1mYWN0b3J5JztcblxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRpbmF0ZXMxLCBjb29yZGluYXRlczIsIGxlbmd0aCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzMSwgY29vcmRpbmF0ZXMyLCBsZW5ndGgpO1xuICAgIGNvbnN0IGNhcnJpZXIgPSBCYXR0bGVTaGlwKGxlbmd0aCk7XG4gICAgY29uc3Qgc2hpcERldGFpbHMgPSB7XG4gICAgICBzaGlwOiBjYXJyaWVyLFxuICAgICAgbG9jYXRpb246IFtdLFxuICAgIH07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZmlyc3QgPSBjb29yZGluYXRlczEgKyBpO1xuICAgICAgY29uc3Qgc2VjID0gY29vcmRpbmF0ZXMyO1xuICAgICAgY29uc3QgcG9zb3Rpb24gPSBpO1xuICAgICAgc2hpcERldGFpbHMubG9jYXRpb24ucHVzaChgJHtmaXJzdH0sJHtzZWN9LCR7cG9zb3Rpb259YCk7XG4gICAgfVxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcbiAgfTtcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuc29tZSgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvbi5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICBjb29yZC5zdWJzdHJpbmcoMCwgMykgPT0gY29vcmRpbmF0ZXNcbiAgICAgICAgICA/IGNvb3JkaW5hdGUuc2hpcC5oaXQoY29vcmQuc3Vic3RyaW5nKDQpKVxuICAgICAgICAgIDogbWlzc2VkLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZS5sb2NhdGlvbi5zb21lKFxuICAgICAgICAoY29vcmQpID0+IGNvb3JkLnN1YnN0cmluZygwLCAzKSA9PSBjb29yZGluYXRlc1xuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBtaXNzZWQgPSBbXTtcblxuICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5ldmVyeSgoeCkgPT4geC5zaGlwLmlzU2luaygpKTtcbiAgfTtcblxuICByZXR1cm4geyBzaGlwQ29vcmRpbmF0ZXMsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBnYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLWZhY3RvcnknO1xuXG5jb25zdCBwbGF5ZXIgPSAoYXJnKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBhcmc7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT4ge1xuICAgIHJldHVybiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gNTsgaSA+IDA7IGktLSkge1xuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYgKGkgPT0gMykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xuICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIDMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgcmFuZG9taXplLCBuYW1lIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICh1c2VyKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gIGNvbnN0IG5hbWUgPSB1c2VyO1xuICBjb25zdCBnZW5hcmF0ZUNvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgIGxldCBhcnIgPSAnJztcbiAgICB3aGlsZSAoYXJyLmxlbmd0aCA8IDIpIHtcbiAgICAgIGxldCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgYXJyICs9IHI7XG4gICAgfVxuICAgIHJldHVybiB2ZXJpZnkoYXJyKTtcbiAgfTtcbiAgY29uc3QgY29vcmRpbmF0ZXNVc2VkID0gW107XG4gIGNvbnN0IHZlcmlmeSA9IChhcnIpID0+IHtcbiAgICBpZiAoY29vcmRpbmF0ZXNVc2VkLmluY2x1ZGVzKGFycikpIHtcbiAgICAgIHJldHVybiBnZW5hcmF0ZUNvb3JkaW5hdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvb3JkaW5hdGVzVXNlZC5wdXNoKGFycik7XG4gICAgICBjb25zb2xlLmxvZyhgJHthcnJbMF19LCR7YXJyWzFdfWApO1xuICAgICAgcmV0dXJuIGFyclswXSArICcsJyArIGFyclsxXTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gNTsgaSA+IDA7IGktLSkge1xuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYgKGkgPT0gMykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI7IHgrKykge1xuICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIDMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IGJvYXJkLCBhdHRhY2ssIGdlbmFyYXRlQ29vcmRpbmF0ZXMsIHJhbmRvbWl6ZSwgbmFtZSB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgY29uc3Qgc2hpcEhpdHMgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHBvc3Rpb24pID0+IHtcbiAgICBpZiAoIXNoaXBIaXRzLmluY2x1ZGVzKHBvc3Rpb24pICYmIHBvc3Rpb24gPD0gc2hpcExlbmd0aCkge1xuICAgICAgc2hpcEhpdHMucHVzaChwb3N0aW9uKTtcbiAgICAgIGNvbnNvbGUubG9nKHNoaXBIaXRzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNTaW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGVuZ3RoID09IHNoaXBIaXRzLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIHsgaGl0LCBzaGlwSGl0cywgaXNTaW5rLCBzaGlwTGVuZ3RoIH07XG59O1xuXG5leHBvcnQgeyBzaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9