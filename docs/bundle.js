/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 485:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 462:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Coordinate_1 = __importDefault(__webpack_require__(226));
const Ship_1 = __importDefault(__webpack_require__(154));
class Board {
    constructor(size = 10) {
        this.size = size;
        this.__coordinates__ = this.generateCoordinates();
        this.__ships__ = [
            new Ship_1.default(4),
            new Ship_1.default(3),
            new Ship_1.default(3),
            new Ship_1.default(2),
            new Ship_1.default(2),
            new Ship_1.default(1),
            new Ship_1.default(1),
            new Ship_1.default(1),
            new Ship_1.default(1),
        ];
    }
    get ships() {
        return this.__ships__;
    }
    get coordinates() {
        return this.__coordinates__;
    }
    set coordinates(coordinates) {
        this.__coordinates__ = coordinates;
    }
    set ships(ships) {
        this.__ships__ = ships;
    }
    get indexOfUnplacedShip() {
        return this.__ships__.findIndex((ship) => ship.coordinates.length === 0);
    }
    allShipsArePlaced() {
        return this.__ships__.every((ship) => ship.coordinates.length === ship.size);
    }
    placeShip(coordinates) {
        if (this.indexOfUnplacedShip === undefined)
            throw new Error('Failed to place ship: All board ships have been placed');
        this.__ships__[this.indexOfUnplacedShip].coordinates = coordinates.map((coordinate) => new Coordinate_1.default(coordinate));
    }
    receiveAttack(coordinates) {
        let shipHit = null;
        this.__ships__.forEach((ship) => {
            const coordinate = ship.coordinates.filter((coordinate) => coordinate.value === coordinates)[0];
            if (coordinate) {
                coordinate.hit = true;
                shipHit = ship;
            }
        });
        return shipHit;
    }
    allShipsAreDestroyed() {
        return this.__ships__.every((ship) => ship.isDestroyed());
    }
    generateCoordinates() {
        const coordinates = [];
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                coordinates.push(x.toString() + ',' + y.toString());
            }
        }
        return coordinates;
    }
}
exports["default"] = Board;


/***/ }),

/***/ 226:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Coordinate {
    constructor(value) {
        this.value = value;
        this.hit = false;
    }
}
exports["default"] = Coordinate;


/***/ }),

/***/ 489:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const getCoordinatesSurroundingGrids_1 = __importDefault(__webpack_require__(119));
class Display {
    constructor(game) {
        this.gameboards = () => {
            const playerboard = this.game.controllers.display.createBoard('player', this.game.state.players.player.board.size, 'Your board');
            const enemyboard = this.game.controllers.display.createBoard('enemy', this.game.state.players.enemy.board.size, 'Enemy board');
            return { player: playerboard, enemy: enemyboard };
        };
        this.createBoard = (id, size, boardTitle) => {
            const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J'];
            const main = document.getElementsByTagName('section')[0];
            const wrapper = this.createElement('table', {
                className: 'wrapper',
                id: id === 'enemy' ? 'enemy-table' : 'player-table',
            }, main);
            const player = this.createElement('h1', null, wrapper);
            player.innerText = boardTitle;
            const board = this.createElement('tbody', { className: 'board', id }, wrapper);
            if (id === 'enemy') {
                const startButton = document.getElementById('start-btn');
                if (startButton)
                    startButton.addEventListener('click', () => this.game.start(board));
            }
            //change this so that it uses the grids in the board class to create dom grids
            for (let x = 0; x < size; x++) {
                const row = document.createElement('tr');
                for (let y = 0; y < size; y++) {
                    const grid = this.game.controllers.display.createGrids(x.toString() + ',' + y.toString());
                    row.appendChild(grid);
                }
                board.append(row);
            }
            return board;
        };
        this.game = game;
    }
    ship(boardid, coordinates) {
        coordinates.forEach((coordinate) => {
            const board = document.getElementById(boardid);
            if (!board)
                return;
            const grid = board.querySelector(`[data-coordinates="${coordinate[0]},${coordinate[2]}"]`);
            if (grid) {
                grid.classList.add('ship');
            }
        });
    }
    showGameoverDialog(message) {
        var _a;
        const dialog = document.querySelector('dialog');
        dialog === null || dialog === void 0 ? void 0 : dialog.showModal();
        const paragraph = document.querySelector('dialog p');
        if (paragraph)
            paragraph.textContent = message;
        (_a = document.querySelector('dialog button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            window.location.reload();
            dialog === null || dialog === void 0 ? void 0 : dialog.close();
        });
    }
    changeBoardOpacity(currentEnemy) {
        const playerTable = document.getElementById('player-table');
        const enemyTable = document.getElementById('enemy-table');
        if (enemyTable && playerTable) {
            if (currentEnemy !== 'enemy') {
                playerTable.style.opacity = '0.5';
                enemyTable.style.opacity = '1';
            }
            else {
                playerTable.style.opacity = '1';
                enemyTable.style.opacity = '0.5';
            }
        }
    }
    disableButtons() {
        const buttons = document.querySelectorAll('button');
        if (buttons)
            buttons.forEach((button) => (button.disabled = true));
    }
    attack(enemy, coordinate, shipHit) {
        const board = document.getElementById(enemy);
        if (!board)
            return;
        const grid = board.querySelector(`[data-coordinates="${coordinate[0]},${coordinate[2]}"]`);
        if (grid) {
            if (shipHit) {
                grid.setAttribute('class', 'hit');
                grid.textContent = '✖';
            }
            else {
                grid.setAttribute('class', 'miss');
                grid.textContent = '•';
                this.changeBoardOpacity(enemy);
            }
            grid.classList.remove('grid');
        }
    }
    isValidPlacement(grids) {
        const board = this.game.state.players.player.board;
        return grids.length === board.ships[board.indexOfUnplacedShip].size;
    }
    markDestroyedShipsCoordinates(board, coordinates) {
        coordinates.forEach((coordinate) => {
            (0, getCoordinatesSurroundingGrids_1.default)(coordinate).forEach((coordinate) => {
                const boardCoordinate = board.querySelector(`[data-coordinates="${coordinate[0]},${coordinate[2]}"]`);
                if (boardCoordinate) {
                    boardCoordinate.style.pointerEvents = 'none';
                    if (boardCoordinate.classList.contains('hit'))
                        return;
                    boardCoordinate.classList.add('surrounding-destroyed');
                    boardCoordinate.innerText = '•';
                }
            });
        });
    }
    getPlayerBoard(boardid) {
        const board = document.getElementById(boardid);
        if (!board)
            throw new Error('Could not find board with ID: ' + boardid);
        return board;
    }
    createGrids(coordinates) {
        const grid = document.createElement('td');
        grid.dataset.coordinates = coordinates;
        return grid;
    }
    getShipGrids(grid, ship) {
        const coordinates = grid.dataset.coordinates;
        const grids = [];
        for (let i = 0; i < ship.size; i++) {
            const xaxis = coordinates[0];
            const yaxis = Number(coordinates[2]);
            const grid = document.querySelector(`[data-coordinates="${xaxis},${yaxis + i}"]`);
            if (grid)
                grids.push(grid);
        }
        return grids;
    }
    createElement(tagName, options, parent) {
        const element = document.createElement(tagName);
        if (options) {
            if (options.id)
                element.setAttribute('id', options.id);
            if (options.className)
                element.classList.add(options.className);
        }
        if (parent)
            parent.appendChild(element);
        return element;
    }
}
exports["default"] = Display;


/***/ }),

/***/ 432:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Player_1 = __importDefault(__webpack_require__(756));
class Computer extends Player_1.default {
    constructor() {
        super('ENEMY');
        this.coordinatesAttacked = [];
    }
    generateRandomCoordinates(max = this.board.size - 1) {
        let xaxis = Math.floor(Math.random() * max);
        let yaxis = Math.floor(Math.random() * max);
        let coordinates = `${xaxis},${yaxis}`;
        while (this.coordinatesAttacked.includes(coordinates)) {
            xaxis = Math.floor(Math.random() * max);
            yaxis = Math.floor(Math.random() * max);
            coordinates = `${xaxis},${yaxis}`;
        }
        this.coordinatesAttacked.push(coordinates);
        return coordinates;
    }
}
exports["default"] = Computer;


/***/ }),

/***/ 434:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
class Events {
    constructor(state, displayController) {
        this.attack = (event) => __awaiter(this, void 0, void 0, function* () {
            if (this.isGameOver() || this.isEnemyTurn())
                return;
            const grid = event.currentTarget;
            const coordinate = this.getCoordinate(grid);
            if (!coordinate)
                return;
            const enemyShip = this.state.players.enemy.board.receiveAttack(coordinate);
            this.displayController.attack('enemy', coordinate, enemyShip);
            grid.style.pointerEvents = 'none';
            if (enemyShip === null || enemyShip === void 0 ? void 0 : enemyShip.isDestroyed()) {
                const board = this.displayController.getPlayerBoard('enemy');
                this.displayController.markDestroyedShipsCoordinates(board, enemyShip.coordinates.map((coordinate) => coordinate.value));
            }
            if (this.isEnemyDefeated()) {
                this.endGame('You win');
                return;
            }
            if (enemyShip)
                return;
            this.switchCurrentPlayer();
            yield this.enemyTurn();
        });
        this.placeShip = (event) => {
            const grid = event.currentTarget;
            const coordinates = this.getCoordinatesForShipPlacement(grid);
            if (!coordinates.length)
                return;
            const playerBoard = this.state.players.player.board;
            playerBoard.placeShip(coordinates);
            this.displayController.ship('player', coordinates);
        };
        this.addHighlight = (event) => {
            if (this.allShipsPlaced())
                return;
            const grid = event.currentTarget;
            const grids = this.getGridsForHighlighting(grid);
            if (this.displayController.isValidPlacement(grids)) {
                grids.forEach((grid) => grid.classList.add('highlight'));
            }
        };
        this.removeHighlight = (event) => {
            if (this.allShipsPlaced())
                return;
            const grid = event.currentTarget;
            const grids = this.getGridsForHighlighting(grid);
            grids.forEach((grid) => grid.classList.remove('highlight'));
        };
        this.state = state;
        this.displayController = displayController;
    }
    switchCurrentPlayer() {
        const { player, enemy } = this.state.players;
        const currentPlayerType = this.state.current.player.type;
        this.state.setState('current', {
            player: currentPlayerType === 'PLAYER' ? enemy : player,
            enemy: currentPlayerType === 'PLAYER' ? player : enemy,
        });
    }
    enemyTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            let enemyAttackResult;
            do {
                enemyAttackResult = yield this.executeEnemyAttack();
            } while (enemyAttackResult);
        });
    }
    executeEnemyAttack() {
        return __awaiter(this, void 0, void 0, function* () {
            const ENEMY_ATTACK_DELAY_TIME = 900;
            return new Promise((resolve) => {
                setTimeout(() => {
                    const enemyCoordinates = this.state.players.enemy.generateRandomCoordinates();
                    const playersShip = this.state.players.player.board.receiveAttack(enemyCoordinates);
                    this.displayController.attack('player', enemyCoordinates, playersShip);
                    if (playersShip === null || playersShip === void 0 ? void 0 : playersShip.isDestroyed()) {
                        const board = this.displayController.getPlayerBoard('player');
                        this.displayController.markDestroyedShipsCoordinates(board, playersShip.coordinates.map((coordinate) => coordinate.value));
                    }
                    if (playersShip === null) {
                        this.switchCurrentPlayer();
                    }
                    if (this.state.players.player.board.allShipsAreDestroyed()) {
                        this.endGame('You lose');
                        resolve(null);
                    }
                    else {
                        resolve(!!playersShip);
                    }
                }, ENEMY_ATTACK_DELAY_TIME);
            });
        });
    }
    endGame(message) {
        this.state.setState('status', 'GAME-OVER');
        this.displayController.showGameoverDialog(message);
    }
    isGameOver() {
        return this.state.status === 'GAME-OVER';
    }
    isEnemyTurn() {
        return this.state.current.player.type === 'ENEMY';
    }
    isEnemyDefeated() {
        return this.state.players.enemy.board.allShipsAreDestroyed();
    }
    allShipsPlaced() {
        return this.state.players.player.board.allShipsArePlaced();
    }
    getCoordinate(grid) {
        return grid.dataset.coordinates || null;
    }
    getCoordinatesForShipPlacement(grid) {
        const playerBoard = this.state.players.player.board;
        return this.displayController
            .getShipGrids(grid, playerBoard.ships[playerBoard.indexOfUnplacedShip])
            .map((grid) => grid.dataset.coordinates || '');
    }
    getGridsForHighlighting(grid) {
        const player = this.state.players.player;
        return this.displayController.getShipGrids(grid, player.board.ships[player.board.indexOfUnplacedShip]);
    }
}
exports["default"] = Events;


/***/ }),

/***/ 53:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const State_1 = __importDefault(__webpack_require__(421));
const Display_1 = __importDefault(__webpack_require__(489));
const Events_1 = __importDefault(__webpack_require__(434));
class Game {
    constructor() {
        this.state = new State_1.default();
        const displayController = new Display_1.default(this);
        this.controllers = {
            // display before state
            display: displayController,
            events: new Events_1.default(this.state, displayController),
        };
    }
    initialize() {
        const { player: board } = this.controllers.display.gameboards();
        this.state.players.player.placeShips();
        this.state.players.player.board.ships.forEach((ship) => {
            this.controllers.display.ship('player', ship.coordinates.map((coordinate) => coordinate.value));
        });
        // add event listeners
        this.addEventListenersToGrids(board, 'mouseenter', this.controllers.events.addHighlight);
        this.addEventListenersToGrids(board, 'mouseleave', this.controllers.events.removeHighlight);
        this.addEventListenersToGrids(board, 'click', this.controllers.events.placeShip.bind(this.controllers.display), {
            once: true,
        });
    }
    start(enemybaord) {
        this.controllers.display.disableButtons();
        this.controllers.display.changeBoardOpacity('player');
        // add event listeners
        this.state.players.player.board.ships.forEach((ship) => {
            this.controllers.display.ship('player', ship.coordinates.map((coordinate) => coordinate.value));
        });
        this.addEventListenersToGrids(enemybaord, 'click', this.controllers.events.attack, { capture: true });
        // computer generate ships
        this.state.players.enemy.placeShips();
    }
    addEventListenersToGrids(board, event, callback, options) {
        board.querySelectorAll('td').forEach((grid) => {
            if (grid instanceof HTMLTableCellElement)
                grid.addEventListener(event, callback, options);
        });
    }
}
exports["default"] = Game;


/***/ }),

/***/ 756:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Board_1 = __importDefault(__webpack_require__(462));
const getCoordinatesSurroundingGrids_1 = __importDefault(__webpack_require__(119));
class Player {
    constructor(type) {
        this.coordinateSupportsShipSize = (coordinate, shipSize) => {
            if (!coordinate)
                return false;
            const nextShipCoordinates = [];
            for (let i = 0; i < shipSize; i++) {
                const [positionX, positionY] = coordinate.split(',').map(Number);
                const nextPositionY = positionY + i;
                nextShipCoordinates.push(`${positionX},${nextPositionY}`);
            }
            return nextShipCoordinates.every((coord) => this.board.coordinates.includes(coord));
        };
        this.__type__ = type;
        this.board = new Board_1.default();
    }
    get type() {
        return this.__type__;
    }
    placeShips() {
        this.board.ships.forEach((ship) => {
            const coordinates = this.generateShipCoordinates(ship.size);
            this.board.placeShip(coordinates);
        });
    }
    generateShipCoordinates(shipSize) {
        const shipCoordinates = [];
        // Adjust filtering to select appropriate starting coordinates
        const coordinates = this.board.coordinates.filter((coordinate, index, array) => {
            const [positionX, positionY] = coordinate.split(',').map(Number);
            return (positionY <= this.board.size - shipSize &&
                this.coordinateSupportsShipSize(coordinate, shipSize));
        });
        // Ensure there are valid coordinates available
        if (coordinates.length === 0) {
            window.alert('No valid coordinates available for placing the ship.');
            console.error('No valid coordinates available for placing the ship.', this.board.ships[this.board.indexOfUnplacedShip]);
            return [];
        }
        // Select a random starting coordinate
        const coordinate = coordinates[Math.floor(Math.random() * coordinates.length)];
        // Generate coordinates for the current ship
        for (let i = 0; i < shipSize; i++) {
            const [positionX, positionY] = coordinate.split(',').map(Number);
            const currentPositionY = positionY + i;
            const shipCoordinate = `${positionX},${currentPositionY}`;
            shipCoordinates.push(shipCoordinate);
        }
        // Get surrounding coordinates for the entire ship
        const coordinatePlusItsSurroundingGrids = [
            ...new Set(shipCoordinates.flatMap((coord) => [
                coord,
                ...(0, getCoordinatesSurroundingGrids_1.default)(coord),
            ])),
        ];
        // Filter out the ship's coordinates and their surroundings
        const coordinatesThatExcludeShipCoordinatesAndTheirSurrounding = this.board.coordinates.filter((boardCoordinate) => !coordinatePlusItsSurroundingGrids.includes(boardCoordinate));
        this.board.coordinates =
            coordinatesThatExcludeShipCoordinatesAndTheirSurrounding;
        return shipCoordinates;
    }
}
exports["default"] = Player;


/***/ }),

/***/ 154:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Ship {
    constructor(size) {
        this.size = size;
        this.__coordinates__ = [];
    }
    get coordinates() {
        return this.__coordinates__;
    }
    set coordinates(coordinates) {
        const validCoordinatesFormat = new RegExp(/^[0-9],[0-9]$/);
        coordinates.forEach((coordinate) => {
            if (!coordinate.value.match(validCoordinatesFormat)) {
                throw new Error('Invalid coordinates format, Got: ' + coordinates);
            }
            if (this.__coordinates__.length > this.size) {
                throw new Error(`Too many coordinates ship is size ${this.size} but got more that ${this.size} coordinates`);
            }
            this.__coordinates__.push(coordinate);
        });
    }
    isDestroyed() {
        return this.coordinates.every((coordinate) => coordinate.hit);
    }
}
exports["default"] = Ship;


/***/ }),

/***/ 421:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Player_1 = __importDefault(__webpack_require__(756));
const Enemy_1 = __importDefault(__webpack_require__(432));
class State {
    constructor() {
        this.status = 'PLAYERS-SETUP';
        this.current = {
            enemy: new Enemy_1.default(),
            player: new Player_1.default('PLAYER'),
        };
        this.players = {
            enemy: new Enemy_1.default(),
            player: new Player_1.default('PLAYER'),
        };
    }
    setState(property, value) {
        this[property] = value;
    }
}
exports["default"] = State;


/***/ }),

/***/ 519:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(485);
const Game_1 = __importDefault(__webpack_require__(53));
new Game_1.default().initialize();


/***/ }),

/***/ 119:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getCoordinatesSurroundingGrids(coordiante) {
    const [positionX, positionY] = coordiante.split(',').map(Number);
    const top = `${positionX},${positionY - 1}`;
    const bottom = `${positionX},${positionY + 1}`;
    const left = `${positionX - 1},${positionY}`;
    const right = `${positionX + 1},${positionY}`;
    const topleft = `${positionX - 1},${positionY - 1}`;
    const topright = `${positionX + 1},${positionY - 1}`;
    const bottomleft = `${positionX - 1},${positionY + 1}`;
    const bottomright = `${positionX + 1},${positionY + 1}`;
    return [top, bottom, left, right, topleft, topright, bottomleft, bottomright];
}
exports["default"] = getCoordinatesSurroundingGrids;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = __webpack_require__(519);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9wdWJsaWMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY2xhc3Nlcy9Db29yZGluYXRlLnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvRGlzcGxheS50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jbGFzc2VzL0VuZW15LnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvRXZlbnRzLnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvR2FtZS50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jbGFzc2VzL1BsYXllci50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jbGFzc2VzL1NoaXAudHMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY2xhc3Nlcy9TdGF0ZS50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3V0aWxzL2dldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcy50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tICcuL0Nvb3JkaW5hdGUnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgcHVibGljIHNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfX3NoaXBzX186IFNoaXBbXTtcbiAgcHJpdmF0ZSBfX2Nvb3JkaW5hdGVzX186IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlciA9IDEwKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLl9fY29vcmRpbmF0ZXNfXyA9IHRoaXMuZ2VuZXJhdGVDb29yZGluYXRlcygpO1xuICAgIHRoaXMuX19zaGlwc19fID0gW1xuICAgICAgbmV3IFNoaXAoNCksXG4gICAgICBuZXcgU2hpcCgzKSxcbiAgICAgIG5ldyBTaGlwKDMpLFxuICAgICAgbmV3IFNoaXAoMiksXG4gICAgICBuZXcgU2hpcCgyKSxcbiAgICAgIG5ldyBTaGlwKDEpLFxuICAgICAgbmV3IFNoaXAoMSksXG4gICAgICBuZXcgU2hpcCgxKSxcbiAgICAgIG5ldyBTaGlwKDEpLFxuICAgIF07XG4gIH1cblxuICBnZXQgc2hpcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGlwc19fO1xuICB9XG5cbiAgZ2V0IGNvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9fY29vcmRpbmF0ZXNfXztcbiAgfVxuXG4gIHNldCBjb29yZGluYXRlcyhjb29yZGluYXRlczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9fY29vcmRpbmF0ZXNfXyA9IGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgc2V0IHNoaXBzKHNoaXBzOiBTaGlwW10pIHtcbiAgICB0aGlzLl9fc2hpcHNfXyA9IHNoaXBzO1xuICB9XG5cbiAgZ2V0IGluZGV4T2ZVbnBsYWNlZFNoaXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGlwc19fLmZpbmRJbmRleCgoc2hpcCkgPT4gc2hpcC5jb29yZGluYXRlcy5sZW5ndGggPT09IDApO1xuICB9XG5cbiAgYWxsU2hpcHNBcmVQbGFjZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGlwc19fLmV2ZXJ5KFxuICAgICAgKHNoaXApID0+IHNoaXAuY29vcmRpbmF0ZXMubGVuZ3RoID09PSBzaGlwLnNpemVcbiAgICApO1xuICB9XG5cbiAgcGxhY2VTaGlwKGNvb3JkaW5hdGVzOiBzdHJpbmdbXSkge1xuICAgIGlmICh0aGlzLmluZGV4T2ZVbnBsYWNlZFNoaXAgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHBsYWNlIHNoaXA6IEFsbCBib2FyZCBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkJyk7XG5cbiAgICB0aGlzLl9fc2hpcHNfX1t0aGlzLmluZGV4T2ZVbnBsYWNlZFNoaXBdLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKFxuICAgICAgKGNvb3JkaW5hdGUpID0+IG5ldyBDb29yZGluYXRlKGNvb3JkaW5hdGUpXG4gICAgKTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXM6IHN0cmluZyk6IG51bGwgfCBTaGlwIHtcbiAgICBsZXQgc2hpcEhpdCA9IG51bGw7XG5cbiAgICB0aGlzLl9fc2hpcHNfXy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gc2hpcC5jb29yZGluYXRlcy5maWx0ZXIoXG4gICAgICAgIChjb29yZGluYXRlKSA9PiBjb29yZGluYXRlLnZhbHVlID09PSBjb29yZGluYXRlc1xuICAgICAgKVswXTtcblxuICAgICAgaWYgKGNvb3JkaW5hdGUpIHtcbiAgICAgICAgY29vcmRpbmF0ZS5oaXQgPSB0cnVlO1xuICAgICAgICBzaGlwSGl0ID0gc2hpcDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwSGl0O1xuICB9XG5cbiAgYWxsU2hpcHNBcmVEZXN0cm95ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGlwc19fLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzRGVzdHJveWVkKCkpO1xuICB9XG5cbiAgZ2VuZXJhdGVDb29yZGluYXRlcygpIHtcbiAgICBjb25zdCBjb29yZGluYXRlczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2l6ZTsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc2l6ZTsgeSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goeC50b1N0cmluZygpICsgJywnICsgeS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cbn1cbiIsImNsYXNzIENvb3JkaW5hdGUge1xuICB2YWx1ZTogc3RyaW5nO1xuICBoaXQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmhpdCA9IGZhbHNlO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb29yZGluYXRlO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgZ2V0Q29vcmRpbmF0ZXNTdXJyb3VuZGluZ0dyaWRzIGZyb20gJy4uL3V0aWxzL2dldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheSB7XG4gIGdhbWU6IEdhbWU7XG5cbiAgY29uc3RydWN0b3IoZ2FtZTogR2FtZSkge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gIH1cblxuICBzaGlwKGJvYXJkaWQ6IHN0cmluZywgY29vcmRpbmF0ZXM6IHN0cmluZ1tdKSB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib2FyZGlkKTtcblxuICAgICAgaWYgKCFib2FyZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBncmlkID0gYm9hcmQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGVzPVwiJHtjb29yZGluYXRlWzBdfSwke2Nvb3JkaW5hdGVbMl19XCJdYFxuICAgICAgKTtcbiAgICAgIGlmIChncmlkKSB7XG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0dhbWVvdmVyRGlhbG9nKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpO1xuICAgIGRpYWxvZz8uc2hvd01vZGFsKCk7XG5cbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cgcCcpO1xuICAgIGlmIChwYXJhZ3JhcGgpIHBhcmFncmFwaC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cgYnV0dG9uJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgZGlhbG9nPy5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2FtZWJvYXJkcyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJib2FyZCA9IHRoaXMuZ2FtZS5jb250cm9sbGVycy5kaXNwbGF5LmNyZWF0ZUJvYXJkKFxuICAgICAgJ3BsYXllcicsXG4gICAgICB0aGlzLmdhbWUuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQuc2l6ZSxcbiAgICAgICdZb3VyIGJvYXJkJ1xuICAgICk7XG4gICAgY29uc3QgZW5lbXlib2FyZCA9IHRoaXMuZ2FtZS5jb250cm9sbGVycy5kaXNwbGF5LmNyZWF0ZUJvYXJkKFxuICAgICAgJ2VuZW15JyxcbiAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5wbGF5ZXJzLmVuZW15LmJvYXJkLnNpemUsXG4gICAgICAnRW5lbXkgYm9hcmQnXG4gICAgKTtcblxuICAgIHJldHVybiB7IHBsYXllcjogcGxheWVyYm9hcmQsIGVuZW15OiBlbmVteWJvYXJkIH07XG4gIH07XG5cbiAgY2hhbmdlQm9hcmRPcGFjaXR5KGN1cnJlbnRFbmVteTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGxheWVyVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXRhYmxlJyk7XG4gICAgY29uc3QgZW5lbXlUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmVteS10YWJsZScpO1xuICAgIGlmIChlbmVteVRhYmxlICYmIHBsYXllclRhYmxlKSB7XG4gICAgICBpZiAoY3VycmVudEVuZW15ICE9PSAnZW5lbXknKSB7XG4gICAgICAgIHBsYXllclRhYmxlLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgICAgZW5lbXlUYWJsZS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxheWVyVGFibGUuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgZW5lbXlUYWJsZS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbnMoKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIGlmIChidXR0b25zKSBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gKGJ1dHRvbi5kaXNhYmxlZCA9IHRydWUpKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteTogc3RyaW5nLCBjb29yZGluYXRlOiBzdHJpbmcsIHNoaXBIaXQ6IFNoaXAgfCBudWxsKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbmVteSk7XG4gICAgaWYgKCFib2FyZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZ3JpZCA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29vcmRpbmF0ZXM9XCIke2Nvb3JkaW5hdGVbMF19LCR7Y29vcmRpbmF0ZVsyXX1cIl1gXG4gICAgKTtcblxuICAgIGlmIChncmlkKSB7XG4gICAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBncmlkLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGl0Jyk7XG4gICAgICAgIGdyaWQudGV4dENvbnRlbnQgPSAn4pyWJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtaXNzJyk7XG4gICAgICAgIGdyaWQudGV4dENvbnRlbnQgPSAn4oCiJztcbiAgICAgICAgdGhpcy5jaGFuZ2VCb2FyZE9wYWNpdHkoZW5lbXkpO1xuICAgICAgfVxuICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkJyk7XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZFBsYWNlbWVudChncmlkczogSFRNTFRhYmxlQ2VsbEVsZW1lbnRbXSkge1xuICAgIGNvbnN0IGJvYXJkID0gdGhpcy5nYW1lLnN0YXRlLnBsYXllcnMucGxheWVyLmJvYXJkO1xuICAgIHJldHVybiBncmlkcy5sZW5ndGggPT09IGJvYXJkLnNoaXBzW2JvYXJkLmluZGV4T2ZVbnBsYWNlZFNoaXBdLnNpemU7XG4gIH1cblxuICBtYXJrRGVzdHJveWVkU2hpcHNDb29yZGluYXRlcyhib2FyZDogSFRNTEVsZW1lbnQsIGNvb3JkaW5hdGVzOiBzdHJpbmdbXSkge1xuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGdldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcyhjb29yZGluYXRlKS5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvYXJkQ29vcmRpbmF0ZSA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTFRhYmxlQ2VsbEVsZW1lbnQ+KFxuICAgICAgICAgIGBbZGF0YS1jb29yZGluYXRlcz1cIiR7Y29vcmRpbmF0ZVswXX0sJHtjb29yZGluYXRlWzJdfVwiXWBcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoYm9hcmRDb29yZGluYXRlKSB7XG4gICAgICAgICAgYm9hcmRDb29yZGluYXRlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgICAgaWYgKGJvYXJkQ29vcmRpbmF0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpKSByZXR1cm47XG4gICAgICAgICAgYm9hcmRDb29yZGluYXRlLmNsYXNzTGlzdC5hZGQoJ3N1cnJvdW5kaW5nLWRlc3Ryb3llZCcpO1xuICAgICAgICAgIGJvYXJkQ29vcmRpbmF0ZS5pbm5lclRleHQgPSAn4oCiJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGF5ZXJCb2FyZChib2FyZGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvYXJkaWQpO1xuICAgIGlmICghYm9hcmQpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYm9hcmQgd2l0aCBJRDogJyArIGJvYXJkaWQpO1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGNyZWF0ZUJvYXJkID0gKGlkOiBzdHJpbmcsIHNpemU6IG51bWJlciwgYm9hcmRUaXRsZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbGV0dGVycyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnSScsICdKJ107XG5cbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlY3Rpb24nKVswXTtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAndGFibGUnLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6ICd3cmFwcGVyJyxcbiAgICAgICAgaWQ6IGlkID09PSAnZW5lbXknID8gJ2VuZW15LXRhYmxlJyA6ICdwbGF5ZXItdGFibGUnLFxuICAgICAgfSxcbiAgICAgIG1haW5cbiAgICApO1xuXG4gICAgY29uc3QgcGxheWVyID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMScsIG51bGwsIHdyYXBwZXIpO1xuICAgIHBsYXllci5pbm5lclRleHQgPSBib2FyZFRpdGxlO1xuXG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAndGJvZHknLFxuICAgICAgeyBjbGFzc05hbWU6ICdib2FyZCcsIGlkIH0sXG4gICAgICB3cmFwcGVyXG4gICAgKTtcblxuICAgIGlmIChpZCA9PT0gJ2VuZW15Jykge1xuICAgICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnRuJyk7XG4gICAgICBpZiAoc3RhcnRCdXR0b24pXG4gICAgICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5nYW1lLnN0YXJ0KGJvYXJkKSk7XG4gICAgfVxuXG4gICAgLy9jaGFuZ2UgdGhpcyBzbyB0aGF0IGl0IHVzZXMgdGhlIGdyaWRzIGluIHRoZSBib2FyZCBjbGFzcyB0byBjcmVhdGUgZG9tIGdyaWRzXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzaXplOyB4KyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHNpemU7IHkrKykge1xuICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nYW1lLmNvbnRyb2xsZXJzLmRpc3BsYXkuY3JlYXRlR3JpZHMoXG4gICAgICAgICAgeC50b1N0cmluZygpICsgJywnICsgeS50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChncmlkKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjcmVhdGVHcmlkcyhjb29yZGluYXRlczogc3RyaW5nKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgZ3JpZC5kYXRhc2V0LmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICBnZXRTaGlwR3JpZHMoZ3JpZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsIHNoaXA6IFNoaXApIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdyaWQuZGF0YXNldC5jb29yZGluYXRlcyBhcyBzdHJpbmc7XG4gICAgY29uc3QgZ3JpZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCB4YXhpcyA9IGNvb3JkaW5hdGVzWzBdO1xuICAgICAgY29uc3QgeWF4aXMgPSBOdW1iZXIoY29vcmRpbmF0ZXNbMl0pO1xuXG4gICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGVzPVwiJHt4YXhpc30sJHt5YXhpcyArIGl9XCJdYFxuICAgICAgKTtcbiAgICAgIGlmIChncmlkKSBncmlkcy5wdXNoKGdyaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBncmlkcyBhcyBIVE1MVGFibGVDZWxsRWxlbWVudFtdO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChcbiAgICB0YWdOYW1lOiBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXAsXG4gICAgb3B0aW9uczoge1xuICAgICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgICAgaWQ/OiBzdHJpbmc7XG4gICAgfSB8IG51bGwsXG4gICAgcGFyZW50PzogSFRNTEVsZW1lbnRcbiAgKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmlkKSBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBvcHRpb25zLmlkKTtcbiAgICAgIGlmIChvcHRpb25zLmNsYXNzTmFtZSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50KSBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5Q29udHJvbGxlciBmcm9tICcuL0Rpc3BsYXknO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5cbmNsYXNzIENvbXB1dGVyIGV4dGVuZHMgUGxheWVyIHtcbiAgcHJpdmF0ZSBjb29yZGluYXRlc0F0dGFja2VkOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignRU5FTVknKTtcbiAgICB0aGlzLmNvb3JkaW5hdGVzQXR0YWNrZWQgPSBbXTtcbiAgfVxuXG4gIGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZXMobWF4OiBudW1iZXIgPSB0aGlzLmJvYXJkLnNpemUgLSAxKSB7XG4gICAgbGV0IHhheGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcbiAgICBsZXQgeWF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IGAke3hheGlzfSwke3lheGlzfWA7XG5cbiAgICB3aGlsZSAodGhpcy5jb29yZGluYXRlc0F0dGFja2VkLmluY2x1ZGVzKGNvb3JkaW5hdGVzKSkge1xuICAgICAgeGF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuICAgICAgeWF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuICAgICAgY29vcmRpbmF0ZXMgPSBgJHt4YXhpc30sJHt5YXhpc31gO1xuICAgIH1cblxuICAgIHRoaXMuY29vcmRpbmF0ZXNBdHRhY2tlZC5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbXB1dGVyO1xuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vU3RhdGUnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9EaXNwbGF5JztcblxuY2xhc3MgRXZlbnRzIHtcbiAgcHJpdmF0ZSBzdGF0ZTogU3RhdGU7XG4gIHByaXZhdGUgZGlzcGxheUNvbnRyb2xsZXI6IERpc3BsYXk7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGU6IFN0YXRlLCBkaXNwbGF5Q29udHJvbGxlcjogRGlzcGxheSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmRpc3BsYXlDb250cm9sbGVyID0gZGlzcGxheUNvbnRyb2xsZXI7XG4gIH1cblxuICBhdHRhY2sgPSBhc3luYyAoZXZlbnQ6IE1vdXNlRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGhpcy5pc0dhbWVPdmVyKCkgfHwgdGhpcy5pc0VuZW15VHVybigpKSByZXR1cm47XG5cbiAgICBjb25zdCBncmlkID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgICBjb25zdCBjb29yZGluYXRlID0gdGhpcy5nZXRDb29yZGluYXRlKGdyaWQpO1xuICAgIGlmICghY29vcmRpbmF0ZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZW5lbXlTaGlwID0gdGhpcy5zdGF0ZS5wbGF5ZXJzLmVuZW15LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZSk7XG5cbiAgICB0aGlzLmRpc3BsYXlDb250cm9sbGVyLmF0dGFjaygnZW5lbXknLCBjb29yZGluYXRlLCBlbmVteVNoaXApO1xuICAgIGdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgIGlmIChlbmVteVNoaXA/LmlzRGVzdHJveWVkKCkpIHtcbiAgICAgIGNvbnN0IGJvYXJkID0gdGhpcy5kaXNwbGF5Q29udHJvbGxlci5nZXRQbGF5ZXJCb2FyZCgnZW5lbXknKTtcbiAgICAgIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIubWFya0Rlc3Ryb3llZFNoaXBzQ29vcmRpbmF0ZXMoXG4gICAgICAgIGJvYXJkLFxuICAgICAgICBlbmVteVNoaXAuY29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBjb29yZGluYXRlLnZhbHVlKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VuZW15RGVmZWF0ZWQoKSkge1xuICAgICAgdGhpcy5lbmRHYW1lKCdZb3Ugd2luJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVuZW15U2hpcCkgcmV0dXJuO1xuXG4gICAgdGhpcy5zd2l0Y2hDdXJyZW50UGxheWVyKCk7XG4gICAgYXdhaXQgdGhpcy5lbmVteVR1cm4oKTtcbiAgfTtcblxuICBwbGFjZVNoaXAgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBncmlkID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXNGb3JTaGlwUGxhY2VtZW50KGdyaWQpO1xuICAgIGlmICghY29vcmRpbmF0ZXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQ7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmRpc3BsYXlDb250cm9sbGVyLnNoaXAoJ3BsYXllcicsIGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBzd2l0Y2hDdXJyZW50UGxheWVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGxheWVyLCBlbmVteSB9ID0gdGhpcy5zdGF0ZS5wbGF5ZXJzO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJUeXBlID0gdGhpcy5zdGF0ZS5jdXJyZW50LnBsYXllci50eXBlO1xuXG4gICAgdGhpcy5zdGF0ZS5zZXRTdGF0ZSgnY3VycmVudCcsIHtcbiAgICAgIHBsYXllcjogY3VycmVudFBsYXllclR5cGUgPT09ICdQTEFZRVInID8gZW5lbXkgOiBwbGF5ZXIsXG4gICAgICBlbmVteTogY3VycmVudFBsYXllclR5cGUgPT09ICdQTEFZRVInID8gcGxheWVyIDogZW5lbXksXG4gICAgfSk7XG4gIH1cblxuICBhZGRIaWdobGlnaHQgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5hbGxTaGlwc1BsYWNlZCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBncmlkID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgICBjb25zdCBncmlkcyA9IHRoaXMuZ2V0R3JpZHNGb3JIaWdobGlnaHRpbmcoZ3JpZCk7XG5cbiAgICBpZiAodGhpcy5kaXNwbGF5Q29udHJvbGxlci5pc1ZhbGlkUGxhY2VtZW50KGdyaWRzKSkge1xuICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHQnKSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbW92ZUhpZ2hsaWdodCA9IChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLmFsbFNoaXBzUGxhY2VkKCkpIHJldHVybjtcblxuICAgIGNvbnN0IGdyaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xuICAgIGNvbnN0IGdyaWRzID0gdGhpcy5nZXRHcmlkc0ZvckhpZ2hsaWdodGluZyhncmlkKTtcblxuICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0JykpO1xuICB9O1xuXG4gIHByaXZhdGUgYXN5bmMgZW5lbXlUdXJuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBlbmVteUF0dGFja1Jlc3VsdDtcblxuICAgIGRvIHtcbiAgICAgIGVuZW15QXR0YWNrUmVzdWx0ID0gYXdhaXQgdGhpcy5leGVjdXRlRW5lbXlBdHRhY2soKTtcbiAgICB9IHdoaWxlIChlbmVteUF0dGFja1Jlc3VsdCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVFbmVteUF0dGFjaygpOiBQcm9taXNlPGJvb2xlYW4gfCBudWxsPiB7XG4gICAgY29uc3QgRU5FTVlfQVRUQUNLX0RFTEFZX1RJTUUgPSA5MDA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZW5lbXlDb29yZGluYXRlcyA9XG4gICAgICAgICAgdGhpcy5zdGF0ZS5wbGF5ZXJzLmVuZW15LmdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3QgcGxheWVyc1NoaXAgPVxuICAgICAgICAgIHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQucmVjZWl2ZUF0dGFjayhlbmVteUNvb3JkaW5hdGVzKTtcblxuICAgICAgICB0aGlzLmRpc3BsYXlDb250cm9sbGVyLmF0dGFjaygncGxheWVyJywgZW5lbXlDb29yZGluYXRlcywgcGxheWVyc1NoaXApO1xuXG4gICAgICAgIGlmIChwbGF5ZXJzU2hpcD8uaXNEZXN0cm95ZWQoKSkge1xuICAgICAgICAgIGNvbnN0IGJvYXJkID0gdGhpcy5kaXNwbGF5Q29udHJvbGxlci5nZXRQbGF5ZXJCb2FyZCgncGxheWVyJyk7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5Q29udHJvbGxlci5tYXJrRGVzdHJveWVkU2hpcHNDb29yZGluYXRlcyhcbiAgICAgICAgICAgIGJvYXJkLFxuICAgICAgICAgICAgcGxheWVyc1NoaXAuY29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBjb29yZGluYXRlLnZhbHVlKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxheWVyc1NoaXAgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnN3aXRjaEN1cnJlbnRQbGF5ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBsYXllcnMucGxheWVyLmJvYXJkLmFsbFNoaXBzQXJlRGVzdHJveWVkKCkpIHtcbiAgICAgICAgICB0aGlzLmVuZEdhbWUoJ1lvdSBsb3NlJyk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCEhcGxheWVyc1NoaXApO1xuICAgICAgICB9XG4gICAgICB9LCBFTkVNWV9BVFRBQ0tfREVMQVlfVElNRSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGVuZEdhbWUobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5zZXRTdGF0ZSgnc3RhdHVzJywgJ0dBTUUtT1ZFUicpO1xuICAgIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIuc2hvd0dhbWVvdmVyRGlhbG9nKG1lc3NhZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0dhbWVPdmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnN0YXR1cyA9PT0gJ0dBTUUtT1ZFUic7XG4gIH1cblxuICBwcml2YXRlIGlzRW5lbXlUdXJuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnQucGxheWVyLnR5cGUgPT09ICdFTkVNWSc7XG4gIH1cblxuICBwcml2YXRlIGlzRW5lbXlEZWZlYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wbGF5ZXJzLmVuZW15LmJvYXJkLmFsbFNoaXBzQXJlRGVzdHJveWVkKCk7XG4gIH1cblxuICBwcml2YXRlIGFsbFNoaXBzUGxhY2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnBsYXllcnMucGxheWVyLmJvYXJkLmFsbFNoaXBzQXJlUGxhY2VkKCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvb3JkaW5hdGUoZ3JpZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gZ3JpZC5kYXRhc2V0LmNvb3JkaW5hdGVzIHx8IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldENvb3JkaW5hdGVzRm9yU2hpcFBsYWNlbWVudChncmlkOiBIVE1MVGFibGVDZWxsRWxlbWVudCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQ7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRyb2xsZXJcbiAgICAgIC5nZXRTaGlwR3JpZHMoZ3JpZCwgcGxheWVyQm9hcmQuc2hpcHNbcGxheWVyQm9hcmQuaW5kZXhPZlVucGxhY2VkU2hpcF0pXG4gICAgICAubWFwKChncmlkKSA9PiBncmlkLmRhdGFzZXQuY29vcmRpbmF0ZXMgfHwgJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRHcmlkc0ZvckhpZ2hsaWdodGluZyhcbiAgICBncmlkOiBIVE1MVGFibGVDZWxsRWxlbWVudFxuICApOiBIVE1MVGFibGVDZWxsRWxlbWVudFtdIHtcbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLnN0YXRlLnBsYXllcnMucGxheWVyO1xuICAgIHJldHVybiB0aGlzLmRpc3BsYXlDb250cm9sbGVyLmdldFNoaXBHcmlkcyhcbiAgICAgIGdyaWQsXG4gICAgICBwbGF5ZXIuYm9hcmQuc2hpcHNbcGxheWVyLmJvYXJkLmluZGV4T2ZVbnBsYWNlZFNoaXBdXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudHM7XG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuL0Rpc3BsYXknO1xuaW1wb3J0IEV2ZW50cyBmcm9tICcuL0V2ZW50cyc7XG5cbmNsYXNzIEdhbWUge1xuICBzdGF0ZTogU3RhdGU7XG5cbiAgY29udHJvbGxlcnM6IHtcbiAgICBldmVudHM6IEV2ZW50cztcbiAgICBkaXNwbGF5OiBEaXNwbGF5O1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcbiAgICBjb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IG5ldyBEaXNwbGF5KHRoaXMpO1xuXG4gICAgdGhpcy5jb250cm9sbGVycyA9IHtcbiAgICAgIC8vIGRpc3BsYXkgYmVmb3JlIHN0YXRlXG4gICAgICBkaXNwbGF5OiBkaXNwbGF5Q29udHJvbGxlcixcbiAgICAgIGV2ZW50czogbmV3IEV2ZW50cyh0aGlzLnN0YXRlLCBkaXNwbGF5Q29udHJvbGxlciksXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3QgeyBwbGF5ZXI6IGJvYXJkIH0gPSB0aGlzLmNvbnRyb2xsZXJzLmRpc3BsYXkuZ2FtZWJvYXJkcygpO1xuICAgIHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIucGxhY2VTaGlwcygpO1xuXG4gICAgdGhpcy5zdGF0ZS5wbGF5ZXJzLnBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLmRpc3BsYXkuc2hpcChcbiAgICAgICAgJ3BsYXllcicsXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBjb29yZGluYXRlLnZhbHVlKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9HcmlkcyhcbiAgICAgIGJvYXJkLFxuICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgdGhpcy5jb250cm9sbGVycy5ldmVudHMuYWRkSGlnaGxpZ2h0XG4gICAgKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0dyaWRzKFxuICAgICAgYm9hcmQsXG4gICAgICAnbW91c2VsZWF2ZScsXG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLmV2ZW50cy5yZW1vdmVIaWdobGlnaHRcbiAgICApO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvR3JpZHMoXG4gICAgICBib2FyZCxcbiAgICAgICdjbGljaycsXG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLmV2ZW50cy5wbGFjZVNoaXAuYmluZCh0aGlzLmNvbnRyb2xsZXJzLmRpc3BsYXkpLFxuICAgICAge1xuICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzdGFydChlbmVteWJhb3JkOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuY29udHJvbGxlcnMuZGlzcGxheS5kaXNhYmxlQnV0dG9ucygpO1xuICAgIHRoaXMuY29udHJvbGxlcnMuZGlzcGxheS5jaGFuZ2VCb2FyZE9wYWNpdHkoJ3BsYXllcicpO1xuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcblxuICAgIHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgdGhpcy5jb250cm9sbGVycy5kaXNwbGF5LnNoaXAoXG4gICAgICAgICdwbGF5ZXInLFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzLm1hcCgoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS52YWx1ZSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9HcmlkcyhcbiAgICAgIGVuZW15YmFvcmQsXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5jb250cm9sbGVycy5ldmVudHMuYXR0YWNrLFxuICAgICAgeyBjYXB0dXJlOiB0cnVlIH1cbiAgICApO1xuXG4gICAgLy8gY29tcHV0ZXIgZ2VuZXJhdGUgc2hpcHNcbiAgICB0aGlzLnN0YXRlLnBsYXllcnMuZW5lbXkucGxhY2VTaGlwcygpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnNUb0dyaWRzKFxuICAgIGJvYXJkOiBIVE1MRWxlbWVudCxcbiAgICBldmVudDoga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcCxcbiAgICBjYWxsYmFjazogYW55LFxuICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvckFsbCgndGQnKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBpZiAoZ3JpZCBpbnN0YW5jZW9mIEhUTUxUYWJsZUNlbGxFbGVtZW50KVxuICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQnO1xuaW1wb3J0IHsgUGxheWVydHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBnZXRDb29yZGluYXRlc1N1cnJvdW5kaW5nR3JpZHMgZnJvbSAnLi4vdXRpbHMvZ2V0Q29vcmRpbmF0ZXNTdXJyb3VuZGluZ0dyaWRzJztcblxuY2xhc3MgUGxheWVyIHtcbiAgcHVibGljIGJvYXJkOiBCb2FyZDtcbiAgcHJpdmF0ZSBfX3R5cGVfXzogUGxheWVydHlwZTtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBQbGF5ZXJ0eXBlKSB7XG4gICAgdGhpcy5fX3R5cGVfXyA9IHR5cGU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190eXBlX187XG4gIH1cblxuICBwbGFjZVNoaXBzKCkge1xuICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmdlbmVyYXRlU2hpcENvb3JkaW5hdGVzKHNoaXAuc2l6ZSk7XG4gICAgICB0aGlzLmJvYXJkLnBsYWNlU2hpcChjb29yZGluYXRlcyk7XG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZVNoaXBDb29yZGluYXRlcyhzaGlwU2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgICAvLyBBZGp1c3QgZmlsdGVyaW5nIHRvIHNlbGVjdCBhcHByb3ByaWF0ZSBzdGFydGluZyBjb29yZGluYXRlc1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5ib2FyZC5jb29yZGluYXRlcy5maWx0ZXIoXG4gICAgICAoY29vcmRpbmF0ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGNvbnN0IFtwb3NpdGlvblgsIHBvc2l0aW9uWV0gPSBjb29yZGluYXRlLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgcG9zaXRpb25ZIDw9IHRoaXMuYm9hcmQuc2l6ZSAtIHNoaXBTaXplICYmXG4gICAgICAgICAgdGhpcy5jb29yZGluYXRlU3VwcG9ydHNTaGlwU2l6ZShjb29yZGluYXRlLCBzaGlwU2l6ZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gRW5zdXJlIHRoZXJlIGFyZSB2YWxpZCBjb29yZGluYXRlcyBhdmFpbGFibGVcbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB3aW5kb3cuYWxlcnQoJ05vIHZhbGlkIGNvb3JkaW5hdGVzIGF2YWlsYWJsZSBmb3IgcGxhY2luZyB0aGUgc2hpcC4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICdObyB2YWxpZCBjb29yZGluYXRlcyBhdmFpbGFibGUgZm9yIHBsYWNpbmcgdGhlIHNoaXAuJyxcbiAgICAgICAgdGhpcy5ib2FyZC5zaGlwc1t0aGlzLmJvYXJkLmluZGV4T2ZVbnBsYWNlZFNoaXBdXG4gICAgICApO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdCBhIHJhbmRvbSBzdGFydGluZyBjb29yZGluYXRlXG4gICAgY29uc3QgY29vcmRpbmF0ZSA9XG4gICAgICBjb29yZGluYXRlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb29yZGluYXRlcy5sZW5ndGgpXTtcblxuICAgIC8vIEdlbmVyYXRlIGNvb3JkaW5hdGVzIGZvciB0aGUgY3VycmVudCBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCBbcG9zaXRpb25YLCBwb3NpdGlvblldID0gY29vcmRpbmF0ZS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uWSA9IHBvc2l0aW9uWSArIGk7XG5cbiAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlID0gYCR7cG9zaXRpb25YfSwke2N1cnJlbnRQb3NpdGlvbll9YDtcbiAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHNoaXBDb29yZGluYXRlKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgc3Vycm91bmRpbmcgY29vcmRpbmF0ZXMgZm9yIHRoZSBlbnRpcmUgc2hpcFxuICAgIGNvbnN0IGNvb3JkaW5hdGVQbHVzSXRzU3Vycm91bmRpbmdHcmlkcyA9IFtcbiAgICAgIC4uLm5ldyBTZXQoXG4gICAgICAgIHNoaXBDb29yZGluYXRlcy5mbGF0TWFwKChjb29yZCkgPT4gW1xuICAgICAgICAgIGNvb3JkLFxuICAgICAgICAgIC4uLmdldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcyhjb29yZCksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgIF07XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSBzaGlwJ3MgY29vcmRpbmF0ZXMgYW5kIHRoZWlyIHN1cnJvdW5kaW5nc1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzVGhhdEV4Y2x1ZGVTaGlwQ29vcmRpbmF0ZXNBbmRUaGVpclN1cnJvdW5kaW5nID1cbiAgICAgIHRoaXMuYm9hcmQuY29vcmRpbmF0ZXMuZmlsdGVyKFxuICAgICAgICAoYm9hcmRDb29yZGluYXRlKSA9PlxuICAgICAgICAgICFjb29yZGluYXRlUGx1c0l0c1N1cnJvdW5kaW5nR3JpZHMuaW5jbHVkZXMoYm9hcmRDb29yZGluYXRlKVxuICAgICAgKTtcblxuICAgIHRoaXMuYm9hcmQuY29vcmRpbmF0ZXMgPVxuICAgICAgY29vcmRpbmF0ZXNUaGF0RXhjbHVkZVNoaXBDb29yZGluYXRlc0FuZFRoZWlyU3Vycm91bmRpbmc7XG5cbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBjb29yZGluYXRlU3VwcG9ydHNTaGlwU2l6ZSA9IChcbiAgICBjb29yZGluYXRlOiBzdHJpbmcsXG4gICAgc2hpcFNpemU6IG51bWJlclxuICApID0+IHtcbiAgICBpZiAoIWNvb3JkaW5hdGUpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBuZXh0U2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBTaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IFtwb3NpdGlvblgsIHBvc2l0aW9uWV0gPSBjb29yZGluYXRlLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgICBjb25zdCBuZXh0UG9zaXRpb25ZID0gcG9zaXRpb25ZICsgaTtcbiAgICAgIG5leHRTaGlwQ29vcmRpbmF0ZXMucHVzaChgJHtwb3NpdGlvblh9LCR7bmV4dFBvc2l0aW9uWX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFNoaXBDb29yZGluYXRlcy5ldmVyeSgoY29vcmQpID0+XG4gICAgICB0aGlzLmJvYXJkLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGNvb3JkKVxuICAgICk7XG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tICcuL0Nvb3JkaW5hdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgcHVibGljIHNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfX2Nvb3JkaW5hdGVzX186IENvb3JkaW5hdGVbXTtcblxuICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuX19jb29yZGluYXRlc19fID0gW107XG4gIH1cblxuICBnZXQgY29vcmRpbmF0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19jb29yZGluYXRlc19fO1xuICB9XG5cbiAgc2V0IGNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBDb29yZGluYXRlW10pIHtcbiAgICBjb25zdCB2YWxpZENvb3JkaW5hdGVzRm9ybWF0ID0gbmV3IFJlZ0V4cCgvXlswLTldLFswLTldJC8pO1xuXG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKCFjb29yZGluYXRlLnZhbHVlLm1hdGNoKHZhbGlkQ29vcmRpbmF0ZXNGb3JtYXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb29yZGluYXRlcyBmb3JtYXQsIEdvdDogJyArIGNvb3JkaW5hdGVzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX19jb29yZGluYXRlc19fLmxlbmd0aCA+IHRoaXMuc2l6ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRvbyBtYW55IGNvb3JkaW5hdGVzIHNoaXAgaXMgc2l6ZSAke3RoaXMuc2l6ZX0gYnV0IGdvdCBtb3JlIHRoYXQgJHt0aGlzLnNpemV9IGNvb3JkaW5hdGVzYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9fY29vcmRpbmF0ZXNfXy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaXNEZXN0cm95ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMuZXZlcnkoKGNvb3JkaW5hdGUpID0+IGNvb3JkaW5hdGUuaGl0KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5pbXBvcnQgQ29tcHV0ZXIgZnJvbSAnLi9FbmVteSc7XG5pbXBvcnQgeyBHYW1lU3RhdHVzIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG50eXBlIHN0YXR1cyA9ICdzdGF0dXMnO1xudHlwZSBjdXJyZW50ID0gJ2N1cnJlbnQnO1xudHlwZSBrZXlzID0gc3RhdHVzIHwgY3VycmVudDtcblxuY2xhc3MgU3RhdGUge1xuICBzdGF0dXM6IEdhbWVTdGF0dXM7XG5cbiAgY3VycmVudDoge1xuICAgIHBsYXllcjogUGxheWVyO1xuICAgIGVuZW15OiBDb21wdXRlcjtcbiAgfTtcblxuICBwbGF5ZXJzOiB7XG4gICAgcGxheWVyOiBQbGF5ZXI7XG4gICAgZW5lbXk6IENvbXB1dGVyO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RhdHVzID0gJ1BMQVlFUlMtU0VUVVAnO1xuICAgIHRoaXMuY3VycmVudCA9IHtcbiAgICAgIGVuZW15OiBuZXcgQ29tcHV0ZXIoKSxcbiAgICAgIHBsYXllcjogbmV3IFBsYXllcignUExBWUVSJyksXG4gICAgfTtcblxuICAgIHRoaXMucGxheWVycyA9IHtcbiAgICAgIGVuZW15OiBuZXcgQ29tcHV0ZXIoKSxcbiAgICAgIHBsYXllcjogbmV3IFBsYXllcignUExBWUVSJyksXG4gICAgfTtcbiAgfVxuXG4gIHNldFN0YXRlPFQgZXh0ZW5kcyBrZXlzPihcbiAgICBwcm9wZXJ0eTogVCxcbiAgICB2YWx1ZTogVCBleHRlbmRzICdzdGF0dXMnID8gR2FtZVN0YXR1cyA6IHsgcGxheWVyOiBQbGF5ZXI7IGVuZW15OiBQbGF5ZXIgfVxuICApOiB2b2lkIHtcbiAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlIGFzIGFueTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4iLCJpbXBvcnQgJy4vLi4vcHVibGljL3N0eWxlLmNzcyc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL2NsYXNzZXMvR2FtZSc7XG5cbm5ldyBHYW1lKCkuaW5pdGlhbGl6ZSgpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNTdXJyb3VuZGluZ0dyaWRzKGNvb3JkaWFudGU6IHN0cmluZykge1xuICBjb25zdCBbcG9zaXRpb25YLCBwb3NpdGlvblldID0gY29vcmRpYW50ZS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuXG4gIGNvbnN0IHRvcCA9IGAke3Bvc2l0aW9uWH0sJHtwb3NpdGlvblkgLSAxfWA7XG4gIGNvbnN0IGJvdHRvbSA9IGAke3Bvc2l0aW9uWH0sJHtwb3NpdGlvblkgKyAxfWA7XG4gIGNvbnN0IGxlZnQgPSBgJHtwb3NpdGlvblggLSAxfSwke3Bvc2l0aW9uWX1gO1xuICBjb25zdCByaWdodCA9IGAke3Bvc2l0aW9uWCArIDF9LCR7cG9zaXRpb25ZfWA7XG4gIGNvbnN0IHRvcGxlZnQgPSBgJHtwb3NpdGlvblggLSAxfSwke3Bvc2l0aW9uWSAtIDF9YDtcbiAgY29uc3QgdG9wcmlnaHQgPSBgJHtwb3NpdGlvblggKyAxfSwke3Bvc2l0aW9uWSAtIDF9YDtcbiAgY29uc3QgYm90dG9tbGVmdCA9IGAke3Bvc2l0aW9uWCAtIDF9LCR7cG9zaXRpb25ZICsgMX1gO1xuICBjb25zdCBib3R0b21yaWdodCA9IGAke3Bvc2l0aW9uWCArIDF9LCR7cG9zaXRpb25ZICsgMX1gO1xuXG4gIHJldHVybiBbdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0LCB0b3BsZWZ0LCB0b3ByaWdodCwgYm90dG9tbGVmdCwgYm90dG9tcmlnaHRdO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MTkpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9