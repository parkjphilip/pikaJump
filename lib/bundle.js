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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Pikachu = __webpack_require__(2);
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
    this.pikachu = new Pikachu(this.platforms, this);
    this.updateScore = this.updateScore.bind(this);
    this.score = 0;
    this.gameOver = false;
    this.initx = 0;
    this.inity = 400;
    this.currentScore=-1500;
  }

  beginGame() {
    this.createPlatforms();
    addEventListener('keydown', this.pikachu.doKeyDown, false);
    addEventListener('keyup', this.pikachu.doKeyClear, false);
    this.loopGame();

  }


  loopGame() {
    var loopInterval = setInterval(() => {
      this.clearCanvas();
      this.pikachu.updatePikachu();
      this.updateScore();
      if (this.gameOver === false) {
        for (var i = 0; i < this.platforms.length; i++) {
          this.platforms[i].updatePlatform();
        }
      } else {
        for (var j = 0; j < this.platforms.length; j++) {
          // this.platforms[j].updatePlatform();
          this.platforms[j].gameOverPlatform();
          this.currentScore++;
        }

        // this.loopGame = () => {
        //   return;
        // };
        // this.loopGame();
        this.pikachu.updateGameOverPikachu();
        if (this.currentScore>0) {
          clearInterval(loopInterval);
          alert('GG Loser!');
        }
        // setTimeout(clearInterval(loopInterval), 40000);
      }
    }, 10);
    // setTimeout(alert(`game over. your score was ${this.score}`), 2000);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 550);
    var background = document.getElementById("background");

    var dy = 0.01;
    this.inity -= dy;
    this.ctx.drawImage(background, this.initx, this.inity, 330, 200, 0, 0, 450, 550);
  }

  createPlatforms() {
    for (var i = 0; i < numPlatforms; i++) {
      var x = Math.random() * 325;
      // var y = 80 * (i + 1);
      var y = (550 / numPlatforms) * (i);
      var newPlatform = new Platform(x, y, this.pikachu, this.score);
      this.platforms.push(newPlatform);
    }
  }

  updateScore() {
    this.ctx.font = "27px Arial";
    this.ctx.fillText(`score: ${this.score}`, 0, 25);
    this.ctx.strokeText(`score: ${this.score}`, 0, 25);
    this.score += 1;
  }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", () => {

  const newGame = new Game();
  newGame.beginGame();

});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const pikaWidth = 40;
const pikaHeight = 40;
const numPlatforms = 6;

class Pikachu {
  constructor(platforms, game) {
    this.game = game;
    this.gravity = 0.1;
    this.bounce = 1.0;
    this.x = 180;
    this.y = 200;
    this.vx = 0;
    this.vy = 0.7;
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
    if (this.y + pikaHeight > 550) {
      this.game.gameOver = true;
    }
  }

  updateGameOverPikachu() {
    this.renderPikachu();
    this.vy = -0.5;
    this.y += this.vy;
  }


  // if(doge.vy>0 &&
  //         (doge.x < platform.x+platform.width) &&
  //         (doge.x+doge.width > platform.x) &&
  //         (doge.y+doge.height > platform.y) &&
  //         (doge.y+doge.height < platform.y + platform.height)){


  // checkPlatformCollision() {
  //   for (var i = 0; i < numPlatforms; i++) {
  //     if ( (this.vy > 0) && (
  //     this.x > this.platforms[i].x - 45 &&
  //     this.x + pikaWidth < this.platforms[i].x + 85 &&
  //     this.y + 40 > this.platforms[i].y &&
  //     this.y < this.platforms[i].y + 10) ) {
  //       this.vy = -5;
  //     }
  //   }
  // }

  checkPlatformCollision() {
    for (var i = 0; i < numPlatforms; i++) {
      if(this.vy>0 &&
        (this.x < this.platforms[i].x + 75) &&
        (this.x+pikaWidth > this.platforms[i].x) &&
        (this.y+pikaHeight > this.platforms[i].y) &&
        (this.y+pikaHeight < this.platforms[i].y + 15)) {
          this.vy = -6;
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
/* 3 */
/***/ (function(module, exports) {


class Platform {
  constructor(x, y, pikachu, score) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.pikachu = pikachu;
    this.x = x;
    this.y = y;
    this.score = score;
    this.vy = 2.0;
    this.gravity = 1.0;
    this.renderPlatform = this.renderPlatform.bind(this);
    this.renderPlatformGravity = this.renderPlatformGravity.bind(this);
  }

  renderPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  renderPlatformGravity() {
    this.y += this.vy;
    if (this.y > 550) {
      this.x = Math.random() * 325;
      this.y = this.y - 550;
    }
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  updatePlatform() {
    this.renderPlatformGravity();
  }

  gameOverPlatform() {
    if (this.y > 550) {
      this.x = Math.random() * 325;
      this.y = 0;
    }
    this.y += 12;

    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

module.exports = Platform;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map