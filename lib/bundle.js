/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);



document.addEventListener("DOMContentLoaded", () => {
  const newGame = new Game();
  newGame.beginGame();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Pikachu {
  constructor() {
    this.gravity = 0.2;
    this.bounce = 0.98;

    this.x = 200;
    this.y = 50;
    this.vx = 0;
    this.vy = 1.0;
    this.updatePikachu = this.updatePikachu.bind(this);
    this.doKeyDown = this.doKeyDown.bind(this);
    this.doKeyClear = this.doKeyClear.bind(this);

  }

  renderPikachu() {
    var pikachuImage = new Image();
    pikachuImage.src = "./assets/pikachu_sprite.png";
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext('2d');
    pikachuImage.onload = () => {
      ctx.drawImage(pikachuImage, this.x, this.y, 70, 70) ;
    };
  }

  clearCanvas() {
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(163, 201, 241)";
    ctx.fillRect(0, 0, 400, 550);
  }

  updatePikachu() {
    this.clearCanvas();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.x + 70 > 0 || this.x + 70 < 400) {
      this.x += this.vx;
    }
    if (this.y + 70 > 550) {
      this.y = 550 - 70;
      this.vy *= -this.bounce;
    }
  }

  doKeyDown(e) {

    switch (e.keyCode) {
      case 37:  /* Left arrow was pressed */
        if (this.x - this.vx > 0){
          this.vx = -2;
        } else {
          this.vx = 0;
        }
        break;
      case 39:  /* Right arrow was pressed */
        if (this.x + this.vx < 400){
          this.vx = 2;
        } else {
          this.vx = 0;
        }
        break;
    }
  }

  doKeyClear(e) {
    this.vx = 0;
  }

}

module.exports = Pikachu;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Pikachu = __webpack_require__(1);
const Platform = __webpack_require__(3);

const canvasWidth = 400;
const canvasHeight = 550;

class Game {
  constructor() {
    this.pikachu = new Pikachu();

  }

  //clear canvas so that we can rerender all images
  // clearCanvas() {
  //   this.ctx.fillStyle = "rgb(163, 201, 241)";
  //   this.ctx.beginPath();
  //   this.ctx.rect(0, 0, canvasWidth, canvasHeight);
  //   this.ctx.closePath();
  //   this.ctx.fill();
  // }

  loopGame() {

    setInterval(this.pikachu.updatePikachu, 10);

  }

  beginGame() {
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext('2d');
    addEventListener('keydown', this.pikachu.doKeyDown, false);
    addEventListener('keyup', this.pikachu.doKeyClear, false);

    this.loopGame();
  }

}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Platform {
  constructor(ctx) {
    this.ctx = ctx;
  }
  renderPlatforms(ctx) {
    for (var i = 0; i < 7; i++) {
      var x = Math.random() * 325;
      var y = 70*(i+1);
      this.ctx.rect(x, y, 75, 10);
      this.ctx.fillStyle = "rgb(102, 172, 46)";
      this.ctx.fillRect(x, y, 75, 10);
      this.ctx.stroke();
    }
  }
  // renderPlatform(ctx) {
  //   this.ctx.rect(20,100,75,10);
  //   this.ctx.stroke();
  // }
}

module.exports = Platform;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map