/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 563:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Poppins', sans-serif;\n  font-weight: 400;\n  font-style: normal;\n  box-sizing: border-box;\n}\n\nh1 {\n  margin: 0;\n}\n\nhtml,\nbody,\nmain {\n  width: 100%;\n  height: 100%;\n}\n\nmain {\n  width: 60%;\n  display: flex;\n  margin: 0 auto;\n  flex-direction: column;\n  gap: 10px;\n  justify-content: flex-start;\n}\n\nsection {\n  display: flex;\n  justify-content: space-between;\n}\n\ntable {\n  min-width: fit-content;\n  margin: 0;\n  cursor: default;\n  display: inline-block;\n  position: relative;\n}\n\ntd {\n  width: 35px;\n  height: 35px;\n  border: 1px solid black;\n  cursor: pointer;\n}\n\nbutton {\n  padding: 10px 20px;\n  border-radius: 10px;\n  border: 1px solid black;\n  cursor: pointer;\n  z-index: 10;\n  width: fit-content;\n}\n\n.highlight {\n  border: 3px solid white;\n  transition: ease-in 0.2s;\n  background-color: black;\n}\n\n.ship {\n  text-align: center;\n  background-color: rgb(83, 83, 83);\n}\n\n.hit {\n  color: white;\n  background-color: rgb(255, 53, 53);\n  text-align: center;\n  transition: ease-in 0.2s;\n}\n\n.miss {\n  color: white;\n  text-align: center;\n  transition: ease-in 0.2s;\n  background-color: rgb(65, 65, 255);\n}\n\n.surrounding-destroyed {\n  text-align: center;\n  color: white;\n  background-color: rgb(182, 182, 182) !important;\n}\n\n#enemy-table {\n  opacity: 0.5;\n}\n", "",{"version":3,"sources":["webpack://./public/style.css"],"names":[],"mappings":"AAEA;EACE,kCAAkC;EAClC,gBAAgB;EAChB,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,SAAS;AACX;;AAEA;;;EAGE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;EACV,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,SAAS;EACT,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,sBAAsB;EACtB,SAAS;EACT,eAAe;EACf,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;EACvB,wBAAwB;EACxB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,iCAAiC;AACnC;;AAEA;EACE,YAAY;EACZ,kCAAkC;EAClC,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,wBAAwB;EACxB,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,+CAA+C;AACjD;;AAEA;EACE,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');\n\n* {\n  font-family: 'Poppins', sans-serif;\n  font-weight: 400;\n  font-style: normal;\n  box-sizing: border-box;\n}\n\nh1 {\n  margin: 0;\n}\n\nhtml,\nbody,\nmain {\n  width: 100%;\n  height: 100%;\n}\n\nmain {\n  width: 60%;\n  display: flex;\n  margin: 0 auto;\n  flex-direction: column;\n  gap: 10px;\n  justify-content: flex-start;\n}\n\nsection {\n  display: flex;\n  justify-content: space-between;\n}\n\ntable {\n  min-width: fit-content;\n  margin: 0;\n  cursor: default;\n  display: inline-block;\n  position: relative;\n}\n\ntd {\n  width: 35px;\n  height: 35px;\n  border: 1px solid black;\n  cursor: pointer;\n}\n\nbutton {\n  padding: 10px 20px;\n  border-radius: 10px;\n  border: 1px solid black;\n  cursor: pointer;\n  z-index: 10;\n  width: fit-content;\n}\n\n.highlight {\n  border: 3px solid white;\n  transition: ease-in 0.2s;\n  background-color: black;\n}\n\n.ship {\n  text-align: center;\n  background-color: rgb(83, 83, 83);\n}\n\n.hit {\n  color: white;\n  background-color: rgb(255, 53, 53);\n  text-align: center;\n  transition: ease-in 0.2s;\n}\n\n.miss {\n  color: white;\n  text-align: center;\n  transition: ease-in 0.2s;\n  background-color: rgb(65, 65, 255);\n}\n\n.surrounding-destroyed {\n  text-align: center;\n  color: white;\n  background-color: rgb(182, 182, 182) !important;\n}\n\n#enemy-table {\n  opacity: 0.5;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 537:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(795);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(569);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(565);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(216);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(589);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(563);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
__webpack_require__(280);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxFQUFFLENBQUM7SUFFeEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBYkQsb0RBYUM7Ozs7Ozs7VUNiRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vcHVibGljL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3B1YmxpYy9zdHlsZS5jc3M/Y2VjNyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY2xhc3Nlcy9Db29yZGluYXRlLnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvRGlzcGxheS50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jbGFzc2VzL0VuZW15LnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvRXZlbnRzLnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NsYXNzZXMvR2FtZS50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jbGFzc2VzL1BsYXllci50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jbGFzc2VzL1NoaXAudHMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY2xhc3Nlcy9TdGF0ZS50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3V0aWxzL2dldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcy50cyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDEwMDswLDIwMDswLDMwMDswLDQwMDswLDUwMDswLDYwMDswLDcwMDswLDgwMDswLDkwMDsxLDEwMDsxLDIwMDsxLDMwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMDsxLDgwMDsxLDkwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuaDEge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5odG1sLFxcbmJvZHksXFxubWFpbiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxubWFpbiB7XFxuICB3aWR0aDogNjAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMTBweDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG50YWJsZSB7XFxuICBtaW4td2lkdGg6IGZpdC1jb250ZW50O1xcbiAgbWFyZ2luOiAwO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG50ZCB7XFxuICB3aWR0aDogMzVweDtcXG4gIGhlaWdodDogMzVweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgei1pbmRleDogMTA7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi5oaWdobGlnaHQge1xcbiAgYm9yZGVyOiAzcHggc29saWQgd2hpdGU7XFxuICB0cmFuc2l0aW9uOiBlYXNlLWluIDAuMnM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLnNoaXAge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDgzLCA4MywgODMpO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDUzLCA1Myk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBlYXNlLWluIDAuMnM7XFxufVxcblxcbi5taXNzIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGVhc2UtaW4gMC4ycztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2NSwgNjUsIDI1NSk7XFxufVxcblxcbi5zdXJyb3VuZGluZy1kZXN0cm95ZWQge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4MiwgMTgyLCAxODIpICFpbXBvcnRhbnQ7XFxufVxcblxcbiNlbmVteS10YWJsZSB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3B1YmxpYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7OztFQUdFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtFQUNiLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsU0FBUztFQUNULDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsU0FBUztFQUNULGVBQWU7RUFDZixxQkFBcUI7RUFDckIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHdCQUF3QjtFQUN4Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtDQUFrQztFQUNsQyxrQkFBa0I7RUFDbEIsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCwxMDA7MCwyMDA7MCwzMDA7MCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MCw4MDA7MCw5MDA7MSwxMDA7MSwyMDA7MSwzMDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDA7MSw4MDA7MSw5MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuKiB7XFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmgxIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaHRtbCxcXG5ib2R5LFxcbm1haW4ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IDYwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDEwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxudGFibGUge1xcbiAgbWluLXdpZHRoOiBmaXQtY29udGVudDtcXG4gIG1hcmdpbjogMDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxudGQge1xcbiAgd2lkdGg6IDM1cHg7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHotaW5kZXg6IDEwO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbn1cXG5cXG4uaGlnaGxpZ2h0IHtcXG4gIGJvcmRlcjogM3B4IHNvbGlkIHdoaXRlO1xcbiAgdHJhbnNpdGlvbjogZWFzZS1pbiAwLjJzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbi5zaGlwIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig4MywgODMsIDgzKTtcXG59XFxuXFxuLmhpdCB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA1MywgNTMpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogZWFzZS1pbiAwLjJzO1xcbn1cXG5cXG4ubWlzcyB7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBlYXNlLWluIDAuMnM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDY1LCAyNTUpO1xcbn1cXG5cXG4uc3Vycm91bmRpbmctZGVzdHJveWVkIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxODIsIDE4MiwgMTgyKSAhaW1wb3J0YW50O1xcbn1cXG5cXG4jZW5lbXktdGFibGUge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCBDb29yZGluYXRlIGZyb20gJy4vQ29vcmRpbmF0ZSc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIF9fc2hpcHNfXzogU2hpcFtdO1xuICBwcml2YXRlIF9fY29vcmRpbmF0ZXNfXzogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyID0gMTApIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuX19jb29yZGluYXRlc19fID0gdGhpcy5nZW5lcmF0ZUNvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5fX3NoaXBzX18gPSBbXG4gICAgICBuZXcgU2hpcCg0KSxcbiAgICAgIG5ldyBTaGlwKDMpLFxuICAgICAgbmV3IFNoaXAoMyksXG4gICAgICBuZXcgU2hpcCgyKSxcbiAgICAgIG5ldyBTaGlwKDIpLFxuICAgICAgbmV3IFNoaXAoMSksXG4gICAgICBuZXcgU2hpcCgxKSxcbiAgICAgIG5ldyBTaGlwKDEpLFxuICAgICAgbmV3IFNoaXAoMSksXG4gICAgXTtcbiAgfVxuXG4gIGdldCBzaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoaXBzX187XG4gIH1cblxuICBnZXQgY29vcmRpbmF0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19jb29yZGluYXRlc19fO1xuICB9XG5cbiAgc2V0IGNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX19jb29yZGluYXRlc19fID0gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBzZXQgc2hpcHMoc2hpcHM6IFNoaXBbXSkge1xuICAgIHRoaXMuX19zaGlwc19fID0gc2hpcHM7XG4gIH1cblxuICBnZXQgaW5kZXhPZlVucGxhY2VkU2hpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoaXBzX18uZmluZEluZGV4KChzaGlwKSA9PiBzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMCk7XG4gIH1cblxuICBhbGxTaGlwc0FyZVBsYWNlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoaXBzX18uZXZlcnkoXG4gICAgICAoc2hpcCkgPT4gc2hpcC5jb29yZGluYXRlcy5sZW5ndGggPT09IHNoaXAuc2l6ZVxuICAgICk7XG4gIH1cblxuICBwbGFjZVNoaXAoY29vcmRpbmF0ZXM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHRoaXMuaW5kZXhPZlVucGxhY2VkU2hpcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcGxhY2Ugc2hpcDogQWxsIGJvYXJkIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWQnKTtcblxuICAgIHRoaXMuX19zaGlwc19fW3RoaXMuaW5kZXhPZlVucGxhY2VkU2hpcF0uY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcy5tYXAoXG4gICAgICAoY29vcmRpbmF0ZSkgPT4gbmV3IENvb3JkaW5hdGUoY29vcmRpbmF0ZSlcbiAgICApO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlczogc3RyaW5nKTogbnVsbCB8IFNoaXAge1xuICAgIGxldCBzaGlwSGl0ID0gbnVsbDtcblxuICAgIHRoaXMuX19zaGlwc19fLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBzaGlwLmNvb3JkaW5hdGVzLmZpbHRlcihcbiAgICAgICAgKGNvb3JkaW5hdGUpID0+IGNvb3JkaW5hdGUudmFsdWUgPT09IGNvb3JkaW5hdGVzXG4gICAgICApWzBdO1xuXG4gICAgICBpZiAoY29vcmRpbmF0ZSkge1xuICAgICAgICBjb29yZGluYXRlLmhpdCA9IHRydWU7XG4gICAgICAgIHNoaXBIaXQgPSBzaGlwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBIaXQ7XG4gIH1cblxuICBhbGxTaGlwc0FyZURlc3Ryb3llZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoaXBzX18uZXZlcnkoKHNoaXApID0+IHNoaXAuaXNEZXN0cm95ZWQoKSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvb3JkaW5hdGVzKCkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zaXplOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5zaXplOyB5KyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh4LnRvU3RyaW5nKCkgKyAnLCcgKyB5LnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxufVxuIiwiY2xhc3MgQ29vcmRpbmF0ZSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGhpdDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaGl0ID0gZmFsc2U7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvb3JkaW5hdGU7XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBnZXRDb29yZGluYXRlc1N1cnJvdW5kaW5nR3JpZHMgZnJvbSAnLi4vdXRpbHMvZ2V0Q29vcmRpbmF0ZXNTdXJyb3VuZGluZ0dyaWRzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5IHtcbiAgZ2FtZTogR2FtZTtcblxuICBjb25zdHJ1Y3RvcihnYW1lOiBHYW1lKSB7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgfVxuXG4gIHNoaXAoYm9hcmRpZDogc3RyaW5nLCBjb29yZGluYXRlczogc3RyaW5nW10pIHtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvYXJkaWQpO1xuXG4gICAgICBpZiAoIWJvYXJkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGdyaWQgPSBib2FyZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtY29vcmRpbmF0ZXM9XCIke2Nvb3JkaW5hdGVbMF19LCR7Y29vcmRpbmF0ZVsyXX1cIl1gXG4gICAgICApO1xuICAgICAgaWYgKGdyaWQpIHtcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaG93R2FtZW92ZXJEaWFsb2cobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nJyk7XG4gICAgZGlhbG9nPy5zaG93TW9kYWwoKTtcblxuICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZyBwJyk7XG4gICAgaWYgKHBhcmFncmFwaCkgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZyBidXR0b24nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBkaWFsb2c/LmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnYW1lYm9hcmRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllcmJvYXJkID0gdGhpcy5nYW1lLmNvbnRyb2xsZXJzLmRpc3BsYXkuY3JlYXRlQm9hcmQoXG4gICAgICAncGxheWVyJyxcbiAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5wbGF5ZXJzLnBsYXllci5ib2FyZC5zaXplLFxuICAgICAgJ1lvdXIgYm9hcmQnXG4gICAgKTtcbiAgICBjb25zdCBlbmVteWJvYXJkID0gdGhpcy5nYW1lLmNvbnRyb2xsZXJzLmRpc3BsYXkuY3JlYXRlQm9hcmQoXG4gICAgICAnZW5lbXknLFxuICAgICAgdGhpcy5nYW1lLnN0YXRlLnBsYXllcnMuZW5lbXkuYm9hcmQuc2l6ZSxcbiAgICAgICdFbmVteSBib2FyZCdcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgcGxheWVyOiBwbGF5ZXJib2FyZCwgZW5lbXk6IGVuZW15Ym9hcmQgfTtcbiAgfTtcblxuICBjaGFuZ2VCb2FyZE9wYWNpdHkoY3VycmVudEVuZW15OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwbGF5ZXJUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdGFibGUnKTtcbiAgICBjb25zdCBlbmVteVRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZW15LXRhYmxlJyk7XG4gICAgaWYgKGVuZW15VGFibGUgJiYgcGxheWVyVGFibGUpIHtcbiAgICAgIGlmIChjdXJyZW50RW5lbXkgIT09ICdlbmVteScpIHtcbiAgICAgICAgcGxheWVyVGFibGUuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuICAgICAgICBlbmVteVRhYmxlLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF5ZXJUYWJsZS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICBlbmVteVRhYmxlLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNhYmxlQnV0dG9ucygpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgaWYgKGJ1dHRvbnMpIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiAoYnV0dG9uLmRpc2FibGVkID0gdHJ1ZSkpO1xuICB9XG5cbiAgYXR0YWNrKGVuZW15OiBzdHJpbmcsIGNvb3JkaW5hdGU6IHN0cmluZywgc2hpcEhpdDogU2hpcCB8IG51bGwpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVuZW15KTtcbiAgICBpZiAoIWJvYXJkKSByZXR1cm47XG5cbiAgICBjb25zdCBncmlkID0gYm9hcmQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1jb29yZGluYXRlcz1cIiR7Y29vcmRpbmF0ZVswXX0sJHtjb29yZGluYXRlWzJdfVwiXWBcbiAgICApO1xuXG4gICAgaWYgKGdyaWQpIHtcbiAgICAgIGlmIChzaGlwSGl0KSB7XG4gICAgICAgIGdyaWQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQnKTtcbiAgICAgICAgZ3JpZC50ZXh0Q29udGVudCA9ICfinJYnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JpZC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21pc3MnKTtcbiAgICAgICAgZ3JpZC50ZXh0Q29udGVudCA9ICfigKInO1xuICAgICAgICB0aGlzLmNoYW5nZUJvYXJkT3BhY2l0eShlbmVteSk7XG4gICAgICB9XG4gICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQnKTtcbiAgICB9XG4gIH1cblxuICBpc1ZhbGlkUGxhY2VtZW50KGdyaWRzOiBIVE1MVGFibGVDZWxsRWxlbWVudFtdKSB7XG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLmdhbWUuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQ7XG4gICAgcmV0dXJuIGdyaWRzLmxlbmd0aCA9PT0gYm9hcmQuc2hpcHNbYm9hcmQuaW5kZXhPZlVucGxhY2VkU2hpcF0uc2l6ZTtcbiAgfVxuXG4gIG1hcmtEZXN0cm95ZWRTaGlwc0Nvb3JkaW5hdGVzKGJvYXJkOiBIVE1MRWxlbWVudCwgY29vcmRpbmF0ZXM6IHN0cmluZ1tdKSB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgZ2V0Q29vcmRpbmF0ZXNTdXJyb3VuZGluZ0dyaWRzKGNvb3JkaW5hdGUpLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmRDb29yZGluYXRlID0gYm9hcmQucXVlcnlTZWxlY3RvcjxIVE1MVGFibGVDZWxsRWxlbWVudD4oXG4gICAgICAgICAgYFtkYXRhLWNvb3JkaW5hdGVzPVwiJHtjb29yZGluYXRlWzBdfSwke2Nvb3JkaW5hdGVbMl19XCJdYFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChib2FyZENvb3JkaW5hdGUpIHtcbiAgICAgICAgICBib2FyZENvb3JkaW5hdGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICBpZiAoYm9hcmRDb29yZGluYXRlLmNsYXNzTGlzdC5jb250YWlucygnaGl0JykpIHJldHVybjtcbiAgICAgICAgICBib2FyZENvb3JkaW5hdGUuY2xhc3NMaXN0LmFkZCgnc3Vycm91bmRpbmctZGVzdHJveWVkJyk7XG4gICAgICAgICAgYm9hcmRDb29yZGluYXRlLmlubmVyVGV4dCA9ICfigKInO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYXllckJvYXJkKGJvYXJkaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9hcmRpZCk7XG4gICAgaWYgKCFib2FyZCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBib2FyZCB3aXRoIElEOiAnICsgYm9hcmRpZCk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgY3JlYXRlQm9hcmQgPSAoaWQ6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBib2FyZFRpdGxlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBsZXR0ZXJzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdJJywgJ0onXTtcblxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VjdGlvbicpWzBdO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuY3JlYXRlRWxlbWVudChcbiAgICAgICd0YWJsZScsXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3dyYXBwZXInLFxuICAgICAgICBpZDogaWQgPT09ICdlbmVteScgPyAnZW5lbXktdGFibGUnIDogJ3BsYXllci10YWJsZScsXG4gICAgICB9LFxuICAgICAgbWFpblxuICAgICk7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2gxJywgbnVsbCwgd3JhcHBlcik7XG4gICAgcGxheWVyLmlubmVyVGV4dCA9IGJvYXJkVGl0bGU7XG5cbiAgICBjb25zdCBib2FyZCA9IHRoaXMuY3JlYXRlRWxlbWVudChcbiAgICAgICd0Ym9keScsXG4gICAgICB7IGNsYXNzTmFtZTogJ2JvYXJkJywgaWQgfSxcbiAgICAgIHdyYXBwZXJcbiAgICApO1xuXG4gICAgaWYgKGlkID09PSAnZW5lbXknKSB7XG4gICAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idG4nKTtcbiAgICAgIGlmIChzdGFydEJ1dHRvbilcbiAgICAgICAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmdhbWUuc3RhcnQoYm9hcmQpKTtcbiAgICB9XG5cbiAgICAvL2NoYW5nZSB0aGlzIHNvIHRoYXQgaXQgdXNlcyB0aGUgZ3JpZHMgaW4gdGhlIGJvYXJkIGNsYXNzIHRvIGNyZWF0ZSBkb20gZ3JpZHNcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZTsgeSsrKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdhbWUuY29udHJvbGxlcnMuZGlzcGxheS5jcmVhdGVHcmlkcyhcbiAgICAgICAgICB4LnRvU3RyaW5nKCkgKyAnLCcgKyB5LnRvU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGdyaWQpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNyZWF0ZUdyaWRzKGNvb3JkaW5hdGVzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBncmlkLmRhdGFzZXQuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuXG4gIGdldFNoaXBHcmlkcyhncmlkOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgc2hpcDogU2hpcCkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ3JpZC5kYXRhc2V0LmNvb3JkaW5hdGVzIGFzIHN0cmluZztcbiAgICBjb25zdCBncmlkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IHhheGlzID0gY29vcmRpbmF0ZXNbMF07XG4gICAgICBjb25zdCB5YXhpcyA9IE51bWJlcihjb29yZGluYXRlc1syXSk7XG5cbiAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtY29vcmRpbmF0ZXM9XCIke3hheGlzfSwke3lheGlzICsgaX1cIl1gXG4gICAgICApO1xuICAgICAgaWYgKGdyaWQpIGdyaWRzLnB1c2goZ3JpZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyaWRzIGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50W107XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KFxuICAgIHRhZ05hbWU6IGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcCxcbiAgICBvcHRpb25zOiB7XG4gICAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgICBpZD86IHN0cmluZztcbiAgICB9IHwgbnVsbCxcbiAgICBwYXJlbnQ/OiBIVE1MRWxlbWVudFxuICApIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaWQpIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIG9wdGlvbnMuaWQpO1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3NOYW1lKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpO1xuICAgIH1cblxuICAgIGlmIChwYXJlbnQpIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlDb250cm9sbGVyIGZyb20gJy4vRGlzcGxheSc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcblxuY2xhc3MgQ29tcHV0ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBwcml2YXRlIGNvb3JkaW5hdGVzQXR0YWNrZWQ6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdFTkVNWScpO1xuICAgIHRoaXMuY29vcmRpbmF0ZXNBdHRhY2tlZCA9IFtdO1xuICB9XG5cbiAgZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcyhtYXg6IG51bWJlciA9IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIHtcbiAgICBsZXQgeGF4aXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuICAgIGxldCB5YXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gYCR7eGF4aXN9LCR7eWF4aXN9YDtcblxuICAgIHdoaWxlICh0aGlzLmNvb3JkaW5hdGVzQXR0YWNrZWQuaW5jbHVkZXMoY29vcmRpbmF0ZXMpKSB7XG4gICAgICB4YXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XG4gICAgICB5YXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XG4gICAgICBjb29yZGluYXRlcyA9IGAke3hheGlzfSwke3lheGlzfWA7XG4gICAgfVxuXG4gICAgdGhpcy5jb29yZGluYXRlc0F0dGFja2VkLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29tcHV0ZXI7XG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuL0Rpc3BsYXknO1xuXG5jbGFzcyBFdmVudHMge1xuICBwcml2YXRlIHN0YXRlOiBTdGF0ZTtcbiAgcHJpdmF0ZSBkaXNwbGF5Q29udHJvbGxlcjogRGlzcGxheTtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGUsIGRpc3BsYXlDb250cm9sbGVyOiBEaXNwbGF5KSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIgPSBkaXNwbGF5Q29udHJvbGxlcjtcbiAgfVxuXG4gIGF0dGFjayA9IGFzeW5jIChldmVudDogTW91c2VFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICh0aGlzLmlzR2FtZU92ZXIoKSB8fCB0aGlzLmlzRW5lbXlUdXJuKCkpIHJldHVybjtcblxuICAgIGNvbnN0IGdyaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSB0aGlzLmdldENvb3JkaW5hdGUoZ3JpZCk7XG4gICAgaWYgKCFjb29yZGluYXRlKSByZXR1cm47XG5cbiAgICBjb25zdCBlbmVteVNoaXAgPSB0aGlzLnN0YXRlLnBsYXllcnMuZW5lbXkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKTtcblxuICAgIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIuYXR0YWNrKCdlbmVteScsIGNvb3JkaW5hdGUsIGVuZW15U2hpcCk7XG4gICAgZ3JpZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgaWYgKGVuZW15U2hpcD8uaXNEZXN0cm95ZWQoKSkge1xuICAgICAgY29uc3QgYm9hcmQgPSB0aGlzLmRpc3BsYXlDb250cm9sbGVyLmdldFBsYXllckJvYXJkKCdlbmVteScpO1xuICAgICAgdGhpcy5kaXNwbGF5Q29udHJvbGxlci5tYXJrRGVzdHJveWVkU2hpcHNDb29yZGluYXRlcyhcbiAgICAgICAgYm9hcmQsXG4gICAgICAgIGVuZW15U2hpcC5jb29yZGluYXRlcy5tYXAoKGNvb3JkaW5hdGUpID0+IGNvb3JkaW5hdGUudmFsdWUpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRW5lbXlEZWZlYXRlZCgpKSB7XG4gICAgICB0aGlzLmVuZEdhbWUoJ1lvdSB3aW4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZW5lbXlTaGlwKSByZXR1cm47XG5cbiAgICB0aGlzLnN3aXRjaEN1cnJlbnRQbGF5ZXIoKTtcbiAgICBhd2FpdCB0aGlzLmVuZW15VHVybigpO1xuICB9O1xuXG4gIHBsYWNlU2hpcCA9IChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5nZXRDb29yZGluYXRlc0ZvclNoaXBQbGFjZW1lbnQoZ3JpZCk7XG4gICAgaWYgKCFjb29yZGluYXRlcy5sZW5ndGgpIHJldHVybjtcblxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gdGhpcy5zdGF0ZS5wbGF5ZXJzLnBsYXllci5ib2FyZDtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIuc2hpcCgncGxheWVyJywgY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIHN3aXRjaEN1cnJlbnRQbGF5ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwbGF5ZXIsIGVuZW15IH0gPSB0aGlzLnN0YXRlLnBsYXllcnM7XG4gICAgY29uc3QgY3VycmVudFBsYXllclR5cGUgPSB0aGlzLnN0YXRlLmN1cnJlbnQucGxheWVyLnR5cGU7XG5cbiAgICB0aGlzLnN0YXRlLnNldFN0YXRlKCdjdXJyZW50Jywge1xuICAgICAgcGxheWVyOiBjdXJyZW50UGxheWVyVHlwZSA9PT0gJ1BMQVlFUicgPyBlbmVteSA6IHBsYXllcixcbiAgICAgIGVuZW15OiBjdXJyZW50UGxheWVyVHlwZSA9PT0gJ1BMQVlFUicgPyBwbGF5ZXIgOiBlbmVteSxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEhpZ2hsaWdodCA9IChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLmFsbFNoaXBzUGxhY2VkKCkpIHJldHVybjtcblxuICAgIGNvbnN0IGdyaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xuICAgIGNvbnN0IGdyaWRzID0gdGhpcy5nZXRHcmlkc0ZvckhpZ2hsaWdodGluZyhncmlkKTtcblxuICAgIGlmICh0aGlzLmRpc3BsYXlDb250cm9sbGVyLmlzVmFsaWRQbGFjZW1lbnQoZ3JpZHMpKSB7XG4gICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpKTtcbiAgICB9XG4gIH07XG5cbiAgcmVtb3ZlSGlnaGxpZ2h0ID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuYWxsU2hpcHNQbGFjZWQoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZ3JpZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gICAgY29uc3QgZ3JpZHMgPSB0aGlzLmdldEdyaWRzRm9ySGlnaGxpZ2h0aW5nKGdyaWQpO1xuXG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBhc3luYyBlbmVteVR1cm4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGVuZW15QXR0YWNrUmVzdWx0O1xuXG4gICAgZG8ge1xuICAgICAgZW5lbXlBdHRhY2tSZXN1bHQgPSBhd2FpdCB0aGlzLmV4ZWN1dGVFbmVteUF0dGFjaygpO1xuICAgIH0gd2hpbGUgKGVuZW15QXR0YWNrUmVzdWx0KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZXhlY3V0ZUVuZW15QXR0YWNrKCk6IFByb21pc2U8Ym9vbGVhbiB8IG51bGw+IHtcbiAgICBjb25zdCBFTkVNWV9BVFRBQ0tfREVMQVlfVElNRSA9IDkwMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBlbmVteUNvb3JkaW5hdGVzID1cbiAgICAgICAgICB0aGlzLnN0YXRlLnBsYXllcnMuZW5lbXkuZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICBjb25zdCBwbGF5ZXJzU2hpcCA9XG4gICAgICAgICAgdGhpcy5zdGF0ZS5wbGF5ZXJzLnBsYXllci5ib2FyZC5yZWNlaXZlQXR0YWNrKGVuZW15Q29vcmRpbmF0ZXMpO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIuYXR0YWNrKCdwbGF5ZXInLCBlbmVteUNvb3JkaW5hdGVzLCBwbGF5ZXJzU2hpcCk7XG5cbiAgICAgICAgaWYgKHBsYXllcnNTaGlwPy5pc0Rlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgY29uc3QgYm9hcmQgPSB0aGlzLmRpc3BsYXlDb250cm9sbGVyLmdldFBsYXllckJvYXJkKCdwbGF5ZXInKTtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlDb250cm9sbGVyLm1hcmtEZXN0cm95ZWRTaGlwc0Nvb3JkaW5hdGVzKFxuICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICBwbGF5ZXJzU2hpcC5jb29yZGluYXRlcy5tYXAoKGNvb3JkaW5hdGUpID0+IGNvb3JkaW5hdGUudmFsdWUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwbGF5ZXJzU2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuc3dpdGNoQ3VycmVudFBsYXllcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQuYWxsU2hpcHNBcmVEZXN0cm95ZWQoKSkge1xuICAgICAgICAgIHRoaXMuZW5kR2FtZSgnWW91IGxvc2UnKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoISFwbGF5ZXJzU2hpcCk7XG4gICAgICAgIH1cbiAgICAgIH0sIEVORU1ZX0FUVEFDS19ERUxBWV9USU1FKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZW5kR2FtZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnNldFN0YXRlKCdzdGF0dXMnLCAnR0FNRS1PVkVSJyk7XG4gICAgdGhpcy5kaXNwbGF5Q29udHJvbGxlci5zaG93R2FtZW92ZXJEaWFsb2cobWVzc2FnZSk7XG4gIH1cblxuICBwcml2YXRlIGlzR2FtZU92ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuc3RhdHVzID09PSAnR0FNRS1PVkVSJztcbiAgfVxuXG4gIHByaXZhdGUgaXNFbmVteVR1cm4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudC5wbGF5ZXIudHlwZSA9PT0gJ0VORU1ZJztcbiAgfVxuXG4gIHByaXZhdGUgaXNFbmVteURlZmVhdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnBsYXllcnMuZW5lbXkuYm9hcmQuYWxsU2hpcHNBcmVEZXN0cm95ZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWxsU2hpcHNQbGFjZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXIuYm9hcmQuYWxsU2hpcHNBcmVQbGFjZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29vcmRpbmF0ZShncmlkOiBIVE1MVGFibGVDZWxsRWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiBncmlkLmRhdGFzZXQuY29vcmRpbmF0ZXMgfHwgbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29vcmRpbmF0ZXNGb3JTaGlwUGxhY2VtZW50KGdyaWQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50KTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gdGhpcy5zdGF0ZS5wbGF5ZXJzLnBsYXllci5ib2FyZDtcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5Q29udHJvbGxlclxuICAgICAgLmdldFNoaXBHcmlkcyhncmlkLCBwbGF5ZXJCb2FyZC5zaGlwc1twbGF5ZXJCb2FyZC5pbmRleE9mVW5wbGFjZWRTaGlwXSlcbiAgICAgIC5tYXAoKGdyaWQpID0+IGdyaWQuZGF0YXNldC5jb29yZGluYXRlcyB8fCAnJyk7XG4gIH1cblxuICBwcml2YXRlIGdldEdyaWRzRm9ySGlnaGxpZ2h0aW5nKFxuICAgIGdyaWQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50XG4gICk6IEhUTUxUYWJsZUNlbGxFbGVtZW50W10ge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXMuc3RhdGUucGxheWVycy5wbGF5ZXI7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRyb2xsZXIuZ2V0U2hpcEdyaWRzKFxuICAgICAgZ3JpZCxcbiAgICAgIHBsYXllci5ib2FyZC5zaGlwc1twbGF5ZXIuYm9hcmQuaW5kZXhPZlVucGxhY2VkU2hpcF1cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50cztcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL1N0YXRlJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vRGlzcGxheSc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vRXZlbnRzJztcblxuY2xhc3MgR2FtZSB7XG4gIHN0YXRlOiBTdGF0ZTtcblxuICBjb250cm9sbGVyczoge1xuICAgIGV2ZW50czogRXZlbnRzO1xuICAgIGRpc3BsYXk6IERpc3BsYXk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IG5ldyBTdGF0ZSgpO1xuICAgIGNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gbmV3IERpc3BsYXkodGhpcyk7XG5cbiAgICB0aGlzLmNvbnRyb2xsZXJzID0ge1xuICAgICAgLy8gZGlzcGxheSBiZWZvcmUgc3RhdGVcbiAgICAgIGRpc3BsYXk6IGRpc3BsYXlDb250cm9sbGVyLFxuICAgICAgZXZlbnRzOiBuZXcgRXZlbnRzKHRoaXMuc3RhdGUsIGRpc3BsYXlDb250cm9sbGVyKSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCB7IHBsYXllcjogYm9hcmQgfSA9IHRoaXMuY29udHJvbGxlcnMuZGlzcGxheS5nYW1lYm9hcmRzKCk7XG4gICAgdGhpcy5zdGF0ZS5wbGF5ZXJzLnBsYXllci5wbGFjZVNoaXBzKCk7XG5cbiAgICB0aGlzLnN0YXRlLnBsYXllcnMucGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHRoaXMuY29udHJvbGxlcnMuZGlzcGxheS5zaGlwKFxuICAgICAgICAncGxheWVyJyxcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcy5tYXAoKGNvb3JkaW5hdGUpID0+IGNvb3JkaW5hdGUudmFsdWUpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0dyaWRzKFxuICAgICAgYm9hcmQsXG4gICAgICAnbW91c2VlbnRlcicsXG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLmV2ZW50cy5hZGRIaWdobGlnaHRcbiAgICApO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvR3JpZHMoXG4gICAgICBib2FyZCxcbiAgICAgICdtb3VzZWxlYXZlJyxcbiAgICAgIHRoaXMuY29udHJvbGxlcnMuZXZlbnRzLnJlbW92ZUhpZ2hsaWdodFxuICAgICk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9HcmlkcyhcbiAgICAgIGJvYXJkLFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIHRoaXMuY29udHJvbGxlcnMuZXZlbnRzLnBsYWNlU2hpcC5iaW5kKHRoaXMuY29udHJvbGxlcnMuZGlzcGxheSksXG4gICAgICB7XG4gICAgICAgIG9uY2U6IHRydWUsXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHN0YXJ0KGVuZW15YmFvcmQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb250cm9sbGVycy5kaXNwbGF5LmRpc2FibGVCdXR0b25zKCk7XG4gICAgdGhpcy5jb250cm9sbGVycy5kaXNwbGF5LmNoYW5nZUJvYXJkT3BhY2l0eSgncGxheWVyJyk7XG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuXG4gICAgdGhpcy5zdGF0ZS5wbGF5ZXJzLnBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLmRpc3BsYXkuc2hpcChcbiAgICAgICAgJ3BsYXllcicsXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBjb29yZGluYXRlLnZhbHVlKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0dyaWRzKFxuICAgICAgZW5lbXliYW9yZCxcbiAgICAgICdjbGljaycsXG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLmV2ZW50cy5hdHRhY2ssXG4gICAgICB7IGNhcHR1cmU6IHRydWUgfVxuICAgICk7XG5cbiAgICAvLyBjb21wdXRlciBnZW5lcmF0ZSBzaGlwc1xuICAgIHRoaXMuc3RhdGUucGxheWVycy5lbmVteS5wbGFjZVNoaXBzKCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyc1RvR3JpZHMoXG4gICAgYm9hcmQ6IEhUTUxFbGVtZW50LFxuICAgIGV2ZW50OiBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwLFxuICAgIGNhbGxiYWNrOiBhbnksXG4gICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGlmIChncmlkIGluc3RhbmNlb2YgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpXG4gICAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXJ0eXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IGdldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcyBmcm9tICcuLi91dGlscy9nZXRDb29yZGluYXRlc1N1cnJvdW5kaW5nR3JpZHMnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICBwdWJsaWMgYm9hcmQ6IEJvYXJkO1xuICBwcml2YXRlIF9fdHlwZV9fOiBQbGF5ZXJ0eXBlO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IFBsYXllcnR5cGUpIHtcbiAgICB0aGlzLl9fdHlwZV9fID0gdHlwZTtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3R5cGVfXztcbiAgfVxuXG4gIHBsYWNlU2hpcHMoKSB7XG4gICAgdGhpcy5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuZ2VuZXJhdGVTaGlwQ29vcmRpbmF0ZXMoc2hpcC5zaXplKTtcbiAgICAgIHRoaXMuYm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdlbmVyYXRlU2hpcENvb3JkaW5hdGVzKHNoaXBTaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIC8vIEFkanVzdCBmaWx0ZXJpbmcgdG8gc2VsZWN0IGFwcHJvcHJpYXRlIHN0YXJ0aW5nIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmJvYXJkLmNvb3JkaW5hdGVzLmZpbHRlcihcbiAgICAgIChjb29yZGluYXRlLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgY29uc3QgW3Bvc2l0aW9uWCwgcG9zaXRpb25ZXSA9IGNvb3JkaW5hdGUuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBwb3NpdGlvblkgPD0gdGhpcy5ib2FyZC5zaXplIC0gc2hpcFNpemUgJiZcbiAgICAgICAgICB0aGlzLmNvb3JkaW5hdGVTdXBwb3J0c1NoaXBTaXplKGNvb3JkaW5hdGUsIHNoaXBTaXplKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBFbnN1cmUgdGhlcmUgYXJlIHZhbGlkIGNvb3JkaW5hdGVzIGF2YWlsYWJsZVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHdpbmRvdy5hbGVydCgnTm8gdmFsaWQgY29vcmRpbmF0ZXMgYXZhaWxhYmxlIGZvciBwbGFjaW5nIHRoZSBzaGlwLicpO1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ05vIHZhbGlkIGNvb3JkaW5hdGVzIGF2YWlsYWJsZSBmb3IgcGxhY2luZyB0aGUgc2hpcC4nLFxuICAgICAgICB0aGlzLmJvYXJkLnNoaXBzW3RoaXMuYm9hcmQuaW5kZXhPZlVucGxhY2VkU2hpcF1cbiAgICAgICk7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gU2VsZWN0IGEgcmFuZG9tIHN0YXJ0aW5nIGNvb3JkaW5hdGVcbiAgICBjb25zdCBjb29yZGluYXRlID1cbiAgICAgIGNvb3JkaW5hdGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvb3JkaW5hdGVzLmxlbmd0aCldO1xuXG4gICAgLy8gR2VuZXJhdGUgY29vcmRpbmF0ZXMgZm9yIHRoZSBjdXJyZW50IHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBTaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IFtwb3NpdGlvblgsIHBvc2l0aW9uWV0gPSBjb29yZGluYXRlLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgICBjb25zdCBjdXJyZW50UG9zaXRpb25ZID0gcG9zaXRpb25ZICsgaTtcblxuICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGUgPSBgJHtwb3NpdGlvblh9LCR7Y3VycmVudFBvc2l0aW9uWX1gO1xuICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goc2hpcENvb3JkaW5hdGUpO1xuICAgIH1cblxuICAgIC8vIEdldCBzdXJyb3VuZGluZyBjb29yZGluYXRlcyBmb3IgdGhlIGVudGlyZSBzaGlwXG4gICAgY29uc3QgY29vcmRpbmF0ZVBsdXNJdHNTdXJyb3VuZGluZ0dyaWRzID0gW1xuICAgICAgLi4ubmV3IFNldChcbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLmZsYXRNYXAoKGNvb3JkKSA9PiBbXG4gICAgICAgICAgY29vcmQsXG4gICAgICAgICAgLi4uZ2V0Q29vcmRpbmF0ZXNTdXJyb3VuZGluZ0dyaWRzKGNvb3JkKSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXTtcblxuICAgIC8vIEZpbHRlciBvdXQgdGhlIHNoaXAncyBjb29yZGluYXRlcyBhbmQgdGhlaXIgc3Vycm91bmRpbmdzXG4gICAgY29uc3QgY29vcmRpbmF0ZXNUaGF0RXhjbHVkZVNoaXBDb29yZGluYXRlc0FuZFRoZWlyU3Vycm91bmRpbmcgPVxuICAgICAgdGhpcy5ib2FyZC5jb29yZGluYXRlcy5maWx0ZXIoXG4gICAgICAgIChib2FyZENvb3JkaW5hdGUpID0+XG4gICAgICAgICAgIWNvb3JkaW5hdGVQbHVzSXRzU3Vycm91bmRpbmdHcmlkcy5pbmNsdWRlcyhib2FyZENvb3JkaW5hdGUpXG4gICAgICApO1xuXG4gICAgdGhpcy5ib2FyZC5jb29yZGluYXRlcyA9XG4gICAgICBjb29yZGluYXRlc1RoYXRFeGNsdWRlU2hpcENvb3JkaW5hdGVzQW5kVGhlaXJTdXJyb3VuZGluZztcblxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXM7XG4gIH1cblxuICBwcml2YXRlIGNvb3JkaW5hdGVTdXBwb3J0c1NoaXBTaXplID0gKFxuICAgIGNvb3JkaW5hdGU6IHN0cmluZyxcbiAgICBzaGlwU2l6ZTogbnVtYmVyXG4gICkgPT4ge1xuICAgIGlmICghY29vcmRpbmF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IG5leHRTaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFNpemU7IGkrKykge1xuICAgICAgY29uc3QgW3Bvc2l0aW9uWCwgcG9zaXRpb25ZXSA9IGNvb3JkaW5hdGUuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICAgIGNvbnN0IG5leHRQb3NpdGlvblkgPSBwb3NpdGlvblkgKyBpO1xuICAgICAgbmV4dFNoaXBDb29yZGluYXRlcy5wdXNoKGAke3Bvc2l0aW9uWH0sJHtuZXh0UG9zaXRpb25ZfWApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U2hpcENvb3JkaW5hdGVzLmV2ZXJ5KChjb29yZCkgPT5cbiAgICAgIHRoaXMuYm9hcmQuY29vcmRpbmF0ZXMuaW5jbHVkZXMoY29vcmQpXG4gICAgKTtcbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCBDb29yZGluYXRlIGZyb20gJy4vQ29vcmRpbmF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIF9fY29vcmRpbmF0ZXNfXzogQ29vcmRpbmF0ZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5fX2Nvb3JkaW5hdGVzX18gPSBbXTtcbiAgfVxuXG4gIGdldCBjb29yZGluYXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX2Nvb3JkaW5hdGVzX187XG4gIH1cblxuICBzZXQgY29vcmRpbmF0ZXMoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVbXSkge1xuICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXNGb3JtYXQgPSBuZXcgUmVnRXhwKC9eWzAtOV0sWzAtOV0kLyk7XG5cbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBpZiAoIWNvb3JkaW5hdGUudmFsdWUubWF0Y2godmFsaWRDb29yZGluYXRlc0Zvcm1hdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvb3JkaW5hdGVzIGZvcm1hdCwgR290OiAnICsgY29vcmRpbmF0ZXMpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fX2Nvb3JkaW5hdGVzX18ubGVuZ3RoID4gdGhpcy5zaXplKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVG9vIG1hbnkgY29vcmRpbmF0ZXMgc2hpcCBpcyBzaXplICR7dGhpcy5zaXplfSBidXQgZ290IG1vcmUgdGhhdCAke3RoaXMuc2l6ZX0gY29vcmRpbmF0ZXNgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX19jb29yZGluYXRlc19fLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpc0Rlc3Ryb3llZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb29yZGluYXRlcy5ldmVyeSgoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5oaXQpO1xuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcbmltcG9ydCBDb21wdXRlciBmcm9tICcuL0VuZW15JztcbmltcG9ydCB7IEdhbWVTdGF0dXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbnR5cGUgc3RhdHVzID0gJ3N0YXR1cyc7XG50eXBlIGN1cnJlbnQgPSAnY3VycmVudCc7XG50eXBlIGtleXMgPSBzdGF0dXMgfCBjdXJyZW50O1xuXG5jbGFzcyBTdGF0ZSB7XG4gIHN0YXR1czogR2FtZVN0YXR1cztcblxuICBjdXJyZW50OiB7XG4gICAgcGxheWVyOiBQbGF5ZXI7XG4gICAgZW5lbXk6IENvbXB1dGVyO1xuICB9O1xuXG4gIHBsYXllcnM6IHtcbiAgICBwbGF5ZXI6IFBsYXllcjtcbiAgICBlbmVteTogQ29tcHV0ZXI7XG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGF0dXMgPSAnUExBWUVSUy1TRVRVUCc7XG4gICAgdGhpcy5jdXJyZW50ID0ge1xuICAgICAgZW5lbXk6IG5ldyBDb21wdXRlcigpLFxuICAgICAgcGxheWVyOiBuZXcgUGxheWVyKCdQTEFZRVInKSxcbiAgICB9O1xuXG4gICAgdGhpcy5wbGF5ZXJzID0ge1xuICAgICAgZW5lbXk6IG5ldyBDb21wdXRlcigpLFxuICAgICAgcGxheWVyOiBuZXcgUGxheWVyKCdQTEFZRVInKSxcbiAgICB9O1xuICB9XG5cbiAgc2V0U3RhdGU8VCBleHRlbmRzIGtleXM+KFxuICAgIHByb3BlcnR5OiBULFxuICAgIHZhbHVlOiBUIGV4dGVuZHMgJ3N0YXR1cycgPyBHYW1lU3RhdHVzIDogeyBwbGF5ZXI6IFBsYXllcjsgZW5lbXk6IFBsYXllciB9XG4gICk6IHZvaWQge1xuICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWUgYXMgYW55O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcbiIsImltcG9ydCAnQHB1YmxpYy9zdHlsZS5jc3MnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9jbGFzc2VzL0dhbWUnO1xuXG5uZXcgR2FtZSgpLmluaXRpYWxpemUoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzU3Vycm91bmRpbmdHcmlkcyhjb29yZGlhbnRlOiBzdHJpbmcpIHtcbiAgY29uc3QgW3Bvc2l0aW9uWCwgcG9zaXRpb25ZXSA9IGNvb3JkaWFudGUuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcblxuICBjb25zdCB0b3AgPSBgJHtwb3NpdGlvblh9LCR7cG9zaXRpb25ZIC0gMX1gO1xuICBjb25zdCBib3R0b20gPSBgJHtwb3NpdGlvblh9LCR7cG9zaXRpb25ZICsgMX1gO1xuICBjb25zdCBsZWZ0ID0gYCR7cG9zaXRpb25YIC0gMX0sJHtwb3NpdGlvbll9YDtcbiAgY29uc3QgcmlnaHQgPSBgJHtwb3NpdGlvblggKyAxfSwke3Bvc2l0aW9uWX1gO1xuICBjb25zdCB0b3BsZWZ0ID0gYCR7cG9zaXRpb25YIC0gMX0sJHtwb3NpdGlvblkgLSAxfWA7XG4gIGNvbnN0IHRvcHJpZ2h0ID0gYCR7cG9zaXRpb25YICsgMX0sJHtwb3NpdGlvblkgLSAxfWA7XG4gIGNvbnN0IGJvdHRvbWxlZnQgPSBgJHtwb3NpdGlvblggLSAxfSwke3Bvc2l0aW9uWSArIDF9YDtcbiAgY29uc3QgYm90dG9tcmlnaHQgPSBgJHtwb3NpdGlvblggKyAxfSwke3Bvc2l0aW9uWSArIDF9YDtcblxuICByZXR1cm4gW3RvcCwgYm90dG9tLCBsZWZ0LCByaWdodCwgdG9wbGVmdCwgdG9wcmlnaHQsIGJvdHRvbWxlZnQsIGJvdHRvbXJpZ2h0XTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MTkpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9