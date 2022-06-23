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
/* harmony import */ var _gameboard_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard-factory */ "./src/gameboard-factory.js");



const renderBoards = (() => {
  const boards = document.querySelectorAll('.player');
  const render = (board) => {
    for (let x = 0; x < 100; x++) {
      const coordinate = document.createElement('div');
      coordinate.setAttribute('data-coordinate', x);
      board.appendChild(coordinate);
    }
  };

  Array.from(boards).forEach((board) => render(board));
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

  const placeShip = (coordinates) => {
    const carrier = (0,_ships_factory__WEBPACK_IMPORTED_MODULE_0__.ship)(3);
    const shipDetails = {
      ship: carrier,
      location: coordinates,
    };
    shipCoordinates.push(shipDetails);
  };
  const receiveAttack = (coordinates) => {
    return shipCoordinates.some((coordinate) => {
      if (
        coordinate.location[0] == coordinates[0] &&
        coordinate.location[1] == coordinates[1]
      ) {
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
    return shipCoordinates.every((shipDetail) => {
      shipDetail.ship.isSink() == true;
    });
  };

  return { shipCoordinates, placeShip, receiveAttack };
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


const player = (name) => {
  const playerName = name;
  const turn = true;
  const board = _gameboard_factory__WEBPACK_IMPORTED_MODULE_0__.gameboard;
  const attack = (coordinates, enemyBoard) =>
    enemyBoard.receiveAttack(coordinates);
  return { playerName, turn, board, attack };
};

const computer = {
  turn: false,
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
  return { hit, shipHits, isSink };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0s7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUN3Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDcUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkMyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5REFBUztBQUN6QjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx5REFBUztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQzRCOzs7Ozs7Ozs7Ozs7Ozs7QUNsQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ2dCOzs7Ozs7O1VDZmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVycy1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBzLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIgfSBmcm9tICcuL3BsYXllcnMtZmFjdG9yeSc7XHJcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLWZhY3RvcnknO1xyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcclxuICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyJyk7XHJcbiAgY29uc3QgcmVuZGVyID0gKGJvYXJkKSA9PiB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29vcmRpbmF0ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmRpbmF0ZScsIHgpO1xyXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChjb29yZGluYXRlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBBcnJheS5mcm9tKGJvYXJkcykuZm9yRWFjaCgoYm9hcmQpID0+IHJlbmRlcihib2FyZCkpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgcmVuZGVyQm9hcmRzIH07XHJcbiIsImltcG9ydCB7IHNoaXAgYXMgQmF0dGxlU2hpcCB9IGZyb20gJy4vc2hpcHMtZmFjdG9yeSc7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZGluYXRlcykgPT4ge1xyXG4gICAgY29uc3QgY2FycmllciA9IEJhdHRsZVNoaXAoMyk7XHJcbiAgICBjb25zdCBzaGlwRGV0YWlscyA9IHtcclxuICAgICAgc2hpcDogY2FycmllcixcclxuICAgICAgbG9jYXRpb246IGNvb3JkaW5hdGVzLFxyXG4gICAgfTtcclxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBEZXRhaWxzKTtcclxuICB9O1xyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcclxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXMuc29tZSgoY29vcmRpbmF0ZSkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29vcmRpbmF0ZS5sb2NhdGlvblswXSA9PSBjb29yZGluYXRlc1swXSAmJlxyXG4gICAgICAgIGNvb3JkaW5hdGUubG9jYXRpb25bMV0gPT0gY29vcmRpbmF0ZXNbMV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgY29vcmRpbmF0ZS5zaGlwLmhpdCgxKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtaXNzZWQucHVzaChjb29yZGluYXRlcyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBtaXNzZWQgPSBbXTtcclxuXHJcbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcy5ldmVyeSgoc2hpcERldGFpbCkgPT4ge1xyXG4gICAgICBzaGlwRGV0YWlsLnNoaXAuaXNTaW5rKCkgPT0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IHNoaXBDb29yZGluYXRlcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBnYW1lYm9hcmQgfTtcclxuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQtZmFjdG9yeSc7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xyXG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xyXG4gIGNvbnN0IHR1cm4gPSB0cnVlO1xyXG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkO1xyXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZGluYXRlcywgZW5lbXlCb2FyZCkgPT5cclxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XHJcbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgdHVybiwgYm9hcmQsIGF0dGFjayB9O1xyXG59O1xyXG5cclxuY29uc3QgY29tcHV0ZXIgPSB7XHJcbiAgdHVybjogZmFsc2UsXHJcbiAgYm9hcmQ6IGdhbWVib2FyZCxcclxuICBnZW5hcmF0ZUNvb3JkaW5hdGVzOiAoKSA9PiB7XHJcbiAgICBsZXQgYXJyID0gW107XHJcbiAgICB3aGlsZSAoYXJyLmxlbmd0aCA8IDIpIHtcclxuICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xyXG4gICAgICBpZiAoYXJyLmluZGV4T2YocikgPT09IC0xKSBhcnIucHVzaChyKTtcclxuICAgIH1cclxuICAgIHZlcmlmeShhcnIpO1xyXG4gIH0sXHJcbiAgY29vcmRpbmF0ZXNVc2VkOiBbXSxcclxuICB2ZXJpZnk6IChhcnIpID0+IHtcclxuICAgIGlmIChjb29yZGluYXRlc1VzZWQuaW5jbHVkZXMoYXJyKSkge1xyXG4gICAgICBnZW5hcmF0ZUNvb3JkaW5hdGVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb29yZGluYXRlc1VzZWQucHVzaChhcnIpO1xyXG4gICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXR0YWNrOiAoY29vcmRpbmF0ZXMsIGVuZW15Qm9hcmQpID0+IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyksXHJcbn07XHJcblxyXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XHJcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XHJcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcclxuICBjb25zdCBzaGlwSGl0cyA9IFtdO1xyXG4gIGNvbnN0IGhpdCA9IChwb3N0aW9uKSA9PiB7XHJcbiAgICBpZiAoIXNoaXBIaXRzLmluY2x1ZGVzKHBvc3Rpb24pICYmIHBvc3Rpb24gPD0gc2hpcExlbmd0aCkge1xyXG4gICAgICBzaGlwSGl0cy5wdXNoKHBvc3Rpb24pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzU2luayA9ICgpID0+IHtcclxuICAgIHJldHVybiBzaGlwTGVuZ3RoID09IHNoaXBIaXRzLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcclxuICB9O1xyXG4gIHJldHVybiB7IGhpdCwgc2hpcEhpdHMsIGlzU2luayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgc2hpcCB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckJvYXJkcyB9IGZyb20gJy4vZ2FtZS1sb29wJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9