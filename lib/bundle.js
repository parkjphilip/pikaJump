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

const pikaWidth = 40;
const pikaHeight = 40;
const numPlatforms = 6;

class Pikachu {
  constructor(platforms) {
    this.gravity = 0.2;
    this.bounce = 1.0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 1.0;
    this.platforms = platforms;

    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');

    this.renderPikachu = this.renderPikachu.bind(this);
    this.updatePikachu = this.updatePikachu.bind(this);
    this.doKeyDown = this.doKeyDown.bind(this);
    this.doKeyClear = this.doKeyClear.bind(this);
    this.checkPlatformCollision = this.checkPlatformCollision.bind(this);
  }

  renderPikachu() {
    var pikachuImage = document.getElementById("pikachu");
    this.ctx.drawImage(pikachuImage, this.x, this.y, 70, 70) ;
  }

  updatePikachu() {
    this.checkPlatformCollision();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.x + pikaWidth > 0 || this.x + pikaWidth < 400) {
      this.x += this.vx;
    }
    //if pikachu hits the bottom, reset position and reverse speed
    if (this.y + pikaHeight > 550) {
      this.vy = -8;
    }
  }

  checkPlatformCollision() {
    for (var i = 0; i < numPlatforms; i++) {
      if ( (this.vy > 0) &&
      (this.x + pikaWidth > this.platforms[i].x && this.x < this.platforms[i].x + 75 &&
        this.y + pikaHeight > this.platforms[i].y && this.y < this.platforms[i].y + 10) ) {
          this.vy = -8;
        }
    }
  }

  doKeyDown(e) {
    switch (e.keyCode) {
      case 37:  // left arrow key
        this.vx = ((this.x - this.vx) > 0 ? -2 : 0);
        break;
      case 39:  // right arrow key
        this.vx = ((this.x + this.vx) < 330 ? 2 : 0);
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
const numPlatforms = 6;

class Game {
  constructor() {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.pikachu = null;
    this.platforms = [];
    this.loopGame = this.loopGame.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  beginGame() {
    this.createPlatforms();
    this.pikachu = new Pikachu(this.platforms);
    addEventListener('keydown', this.pikachu.doKeyDown, false);
    addEventListener('keyup', this.pikachu.doKeyClear, false);
    window.requestAnimationFrame(this.loopGame);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 550);
  }

  loopGame() {
    setInterval(() => {
      this.clearCanvas();
      this.pikachu.updatePikachu();
      for (var i = 0; i < this.platforms.length; i++) {
        this.platforms[i].renderPlatform();
      }
      // this.platforms.forEach(platform => {platform.renderPlatform();});
    }, 10);
  }

  createPlatforms() {
    for (var i = 0; i < numPlatforms; i++) {
      var x = Math.random() * 325;
      var y = 70 * (i + 1);
      var newPlatform = new Platform(x, y);
      this.platforms.push(newPlatform);
    }
  }

}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Platform {
  constructor(x, y) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
  }

  // renderPlatforms(ctx) {
  //   for (var i = 0; i < 7; i++) {
  //     var x = Math.random() * 325;
  //     var y = 70*(i+1);
  //     this.ctx.rect(x, y, 75, 10);
  //     this.ctx.fillStyle = "rgb(102, 172, 46)";
  //     this.ctx.fillRect(x, y, 75, 10);
  //     this.ctx.stroke();
  //   }
  // }

  renderPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 10);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 10);
    this.ctx.stroke();
    this.ctx.closePath();
  }

}

module.exports = Platform;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map