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
const AI = (0,_players_factory__WEBPACK_IMPORTED_MODULE_0__.computer)('ai');
AI.randomize();
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
    } else {
      ('none');
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
    setTimeout(enemyAttack, 500);
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
  const attack = (coordinates, enemyBoard) => {
    return enemyBoard.receiveAttack(coordinates);
  };

  const randomize = () => {
    for (let i = 0; i < 5; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      let shipLength = Math.floor(Math.random() * 5);
      board.placeShip(coordinate1, coordinate2, 3);
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
      genarateCoordinates();
    } else {
      coordinatesUsed.push(arr);

      return `${arr[0]},${arr[1]}`;
    }
  };
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);

  const randomize = () => {
    for (let i = 0; i < 5; i++) {
      let coordinate1 = Math.floor(Math.random() * 10);
      let coordinate2 = Math.floor(Math.random() * 10);
      let shipLength = Math.floor(Math.random() * 5);
      board.placeShip(coordinate1, coordinate2, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVycy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXJzLWZhY3RvcnknO1xyXG5jb25zdCB0ZW1wUGxheWVycyA9IFtdO1xyXG5jb25zdCBwbGF5ZXJPbmUgPSBwbGF5ZXIoJ2plZmYnKTtcclxucGxheWVyT25lLnJhbmRvbWl6ZSgpO1xyXG50ZW1wUGxheWVycy5wdXNoKHBsYXllck9uZSk7XHJcbmNvbnN0IEFJID0gY29tcHV0ZXIoJ2FpJyk7XHJcbkFJLnJhbmRvbWl6ZSgpO1xyXG50ZW1wUGxheWVycy5wdXNoKEFJKTtcclxuXHJcbmNvbnN0IGF0dGFja2luZyA9ICgoKSA9PiB7XHJcbiAgbGV0IHR1cm4gPSAxO1xyXG4gIGxldCBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xyXG4gIGxldCBjdXJyZW50RW5lbXkgPSBBSTtcclxuICBjb25zdCBzd2l0Y2hUdXJucyA9ICgpID0+IHtcclxuICAgIGlmICh0dXJuKSB7XHJcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBBSTtcclxuICAgICAgY3VycmVudEVuZW15ID0gcGxheWVyT25lO1xyXG4gICAgICB0dXJuLS07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xyXG4gICAgICBjdXJyZW50RW5lbXkgPSBBSTtcclxuICAgICAgdHVybisrO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xyXG4gICAgaWYgKGN1cnJlbnRFbmVteS5ib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZ2FtZW92ZXInKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICgnbm9uZScpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBjb29yZGlhbmF0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZGluYXRlJyk7XHJcbiAgICBpZiAoY3VycmVudFBsYXllci5hdHRhY2soY29vcmRpYW5hdGUsIGN1cnJlbnRFbmVteS5ib2FyZCkpIHtcclxuICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWlzcycpO1xyXG4gICAgfVxyXG4gICAgZ2FtZU92ZXIoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBlbmVteUF0dGFjayA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvb3JkaWFuYXRlID0gQUkuZ2VuYXJhdGVDb29yZGluYXRlcygpO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2plZmYnKTtcclxuICAgIGNvbnN0IGJveCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlPVwiJHtjb29yZGlhbmF0ZX1cIl1gKTtcclxuICAgIGlmIChjdXJyZW50UGxheWVyLmF0dGFjayhjb29yZGlhbmF0ZSwgY3VycmVudEVuZW15LmJvYXJkKSkge1xyXG4gICAgICBib3guc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcclxuICAgIH1cclxuICAgIGdhbWVPdmVyKCk7XHJcbiAgICBzd2l0Y2hUdXJucygpO1xyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGF0dGFjayhlKSB7XHJcbiAgICBwbGF5ZXJBdHRhY2soZSk7XHJcbiAgICBzd2l0Y2hUdXJucygpO1xyXG4gICAgc2V0VGltZW91dChlbmVteUF0dGFjaywgNTAwKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IGF0dGFjaywgc3dpdGNoVHVybnMsIGN1cnJlbnRQbGF5ZXIgfTtcclxufSkoKTtcclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgoKSA9PiB7XHJcbiAgZnVuY3Rpb24gY3JlYXRlQm9hcmRzKCkge1xyXG4gICAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcicpO1xyXG4gICAgY29uc3QgcmVuZGVyID0gKGJvYXJkKSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScsIFt4LCBpXSk7XHJcbiAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjb29yZGluYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHJlbmRlcihib2FyZCkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlUGxheWVyT25lQm9hcmQoKSB7XHJcbiAgICB0ZW1wUGxheWVycy5mb3JFYWNoKChkdWRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtkdWRlLm5hbWV9YCk7XHJcbiAgICAgIGR1ZGUuYm9hcmQuc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBwbGF5ZXJzLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvb3JkaW5hdGVdYCk7XHJcbiAgICAgICAgaWYgKGR1ZGUubmFtZSA9PSAnYWknKSB7XHJcbiAgICAgICAgICBBcnJheS5mcm9tKHRhcmdldCkuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNraW5nLmF0dGFjaywge1xyXG4gICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBBcnJheS5mcm9tKHRhcmdldCkuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBbaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScpXVswXSA9PSBjb29yZGluYXRlLmxvY2F0aW9uWzBdXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRlc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21hcmsnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0ZXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAvLyAgIGZvciAobGV0IHggPSAwOyB4IDwgY29vcmRpbmF0ZS5zaGlwLnNoaXBMZW5ndGg7IHgrKykge1xyXG4gICAgICAgIC8vICAgICBjb25zdCBudW0gPSBOdW1iZXIoY29vcmRpbmF0ZS5sb2NhdGlvblswXS5jaGFyQXQoMikpO1xyXG4gICAgICAgIC8vICAgICBjb25zdCBib3ggPSBwbGF5ZXJzLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgLy8gICAgICAgYFtkYXRhLWNvb3JkaW5hdGU9XCIke051bWJlcihjb29yZGluYXRlLmxvY2F0aW9uWzBdLmNoYXJBdCgwKSl9LCR7XHJcbiAgICAgICAgLy8gICAgICAgICBudW0gKyB4XHJcbiAgICAgICAgLy8gICAgICAgfVwiXWBcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyAgICAgYm94LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWFyaycpO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm9hcmRzKCk7XHJcbiAgY3JlYXRlUGxheWVyT25lQm9hcmQoKTtcclxuXHJcbiAgcmV0dXJuIHsgY3JlYXRlQm9hcmRzIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyByZW5kZXJCb2FyZHMgfTtcclxuIiwiaW1wb3J0IHsgc2hpcCBhcyBCYXR0bGVTaGlwIH0gZnJvbSAnLi9zaGlwcy1mYWN0b3J5JztcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkaW5hdGVzMSwgY29vcmRpbmF0ZXMyLCBsZW5ndGgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBCYXR0bGVTaGlwKGxlbmd0aCk7XHJcbiAgICBjb25zdCBzaGlwRGV0YWlscyA9IHtcclxuICAgICAgc2hpcDogY2FycmllcixcclxuICAgICAgbG9jYXRpb246IFtgJHtjb29yZGluYXRlczF9LCR7Y29vcmRpbmF0ZXMyfWBdLFxyXG4gICAgfTtcclxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcclxuICB9O1xyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuc29tZSgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBpZiAoY29vcmRpbmF0ZS5sb2NhdGlvbiA9PSBjb29yZGluYXRlcykge1xyXG4gICAgICAgIGNvb3JkaW5hdGUuc2hpcC5oaXQoMSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWlzc2VkLnB1c2goY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWlzc2VkID0gW107XHJcblxyXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuZXZlcnkoKHgpID0+IHguc2hpcC5pc1NpbmsoKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgc2hpcENvb3JkaW5hdGVzLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2FtZWJvYXJkIH07XHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLWZhY3RvcnknO1xyXG5cclxuY29uc3QgcGxheWVyID0gKGFyZykgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSBhcmc7XHJcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+IHtcclxuICAgIHJldHVybiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJhbmRvbWl6ZSA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIGxldCBjb29yZGluYXRlMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IGNvb3JkaW5hdGUyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgc2hpcExlbmd0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpO1xyXG4gICAgICBib2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZTEsIGNvb3JkaW5hdGUyLCAzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4geyBib2FyZCwgYXR0YWNrLCByYW5kb21pemUsIG5hbWUgfTtcclxufTtcclxuXHJcbmNvbnN0IGNvbXB1dGVyID0gKHVzZXIpID0+IHtcclxuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xyXG4gIGNvbnN0IG5hbWUgPSB1c2VyO1xyXG4gIGNvbnN0IGdlbmFyYXRlQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XHJcbiAgICBsZXQgYXJyID0gJyc7XHJcbiAgICB3aGlsZSAoYXJyLmxlbmd0aCA8IDIpIHtcclxuICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGFyciArPSByO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZlcmlmeShhcnIpO1xyXG4gIH07XHJcbiAgY29uc3QgY29vcmRpbmF0ZXNVc2VkID0gW107XHJcbiAgY29uc3QgdmVyaWZ5ID0gKGFycikgPT4ge1xyXG4gICAgaWYgKGNvb3JkaW5hdGVzVXNlZC5pbmNsdWRlcyhhcnIpKSB7XHJcbiAgICAgIGdlbmFyYXRlQ29vcmRpbmF0ZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvb3JkaW5hdGVzVXNlZC5wdXNoKGFycik7XHJcblxyXG4gICAgICByZXR1cm4gYCR7YXJyWzBdfSwke2FyclsxXX1gO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkaW5hdGVzLCBlbmVteUJvYXJkKSA9PlxyXG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcclxuXHJcbiAgY29uc3QgcmFuZG9taXplID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgbGV0IGNvb3JkaW5hdGUxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBzaGlwTGVuZ3RoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XHJcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlMSwgY29vcmRpbmF0ZTIsIDEpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIHsgYm9hcmQsIGF0dGFjaywgZ2VuYXJhdGVDb29yZGluYXRlcywgcmFuZG9taXplLCBuYW1lIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XHJcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XHJcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcclxuICBjb25zdCBzaGlwSGl0cyA9IFtdO1xyXG4gIGNvbnN0IGhpdCA9IChwb3N0aW9uKSA9PiB7XHJcbiAgICBpZiAoIXNoaXBIaXRzLmluY2x1ZGVzKHBvc3Rpb24pICYmIHBvc3Rpb24gPD0gc2hpcExlbmd0aCkge1xyXG4gICAgICBzaGlwSGl0cy5wdXNoKHBvc3Rpb24pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzU2luayA9ICgpID0+IHtcclxuICAgIHJldHVybiBzaGlwTGVuZ3RoID09IHNoaXBIaXRzLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcclxuICB9O1xyXG4gIHJldHVybiB7IGhpdCwgc2hpcEhpdHMsIGlzU2luaywgc2hpcExlbmd0aCB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgc2hpcCB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9