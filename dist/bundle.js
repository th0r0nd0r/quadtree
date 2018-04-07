/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _quadtree_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quadtree.js */ "./quadtree.js");


console.log(_quadtree_js__WEBPACK_IMPORTED_MODULE_0__);

const Rectangle = _quadtree_js__WEBPACK_IMPORTED_MODULE_0__["default"].Rectangle;
const Point = _quadtree_js__WEBPACK_IMPORTED_MODULE_0__["default"].Point;
const QuadTree = _quadtree_js__WEBPACK_IMPORTED_MODULE_0__["default"].QuadTree;
console.log(Rectangle);
console.log(QuadTree);


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const qtree = new QuadTree(new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height));
});

/***/ }),

/***/ "./point.js":
/*!******************!*\
  !*** ./point.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Point);

console.log(Point);

/***/ }),

/***/ "./quadtree.js":
/*!*********************!*\
  !*** ./quadtree.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./point.js");
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rectangle */ "./rectangle.js");



class QuadTree {
  constructor(boundary) {
    this.boundary = boundary;
    this.capacity = 4;
    this.points = [];
    this.subtrees = {};
  }

  insert(point) {
    if (this.boundary.inBounds(point)) {
      this.points.push(point);
    }
    
    if (this.points.length >= this.capacity) {
      this.divide();
    } 
  }

  divide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width;
    const h = this.boundary.height;

    const nw = new _rectangle__WEBPACK_IMPORTED_MODULE_1__["default"](x - w/4, y - h/4, w/2, h/2);
    const ne = new _rectangle__WEBPACK_IMPORTED_MODULE_1__["default"](x + w/4, y - h/4, w/2, h/2);
    const sw = new _rectangle__WEBPACK_IMPORTED_MODULE_1__["default"](x - w/4, y + h/4, w/2, h/2);
    const se = new _rectangle__WEBPACK_IMPORTED_MODULE_1__["default"](x + w/4, y + h/4, w/2, h/2);

    this.subtrees.northWest = new QuadTree(nw);
    this.subtrees.northEast = new QuadTree(ne);
    this.subtrees.southWest = new QuadTree(sw);
    this.subtrees.southEast = new QuadTree(se);

    const trees = Object.values(this.subtrees);

    this.points.forEach(function(point) {
      trees.forEach(function(tree) {
        tree.insert(point);
      });
    });

    this.points = [];
  }


}

/* harmony default export */ __webpack_exports__["default"] = ({QuadTree, Rectangle: _rectangle__WEBPACK_IMPORTED_MODULE_1__["default"], Point: _point__WEBPACK_IMPORTED_MODULE_0__["default"]});
// console.log("aslkdfjasldkfjas;ldfjasldkfjasdlfj");
// console.log(QuadTree);
// console.log(Rectangle);
// console.log(Point);

/***/ }),

/***/ "./rectangle.js":
/*!**********************!*\
  !*** ./rectangle.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  inBounds(point) {
    return (
      point.x >= this.x - this.width / 2 &&
      point.x < this.x + this.width / 2 &&
      point.y > this.y - this.height / 2 &&
      point.y <= this.y + this.height / 2
    );
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Rectangle);

// console.log(Rectangle);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map