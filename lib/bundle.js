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

const canvasWidth = 440;
const canvasHeight = 550;
const numPlatforms = 6;

class Game {
  constructor() {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.platforms = [];
    this.pikachu = new Pikachu(this.platforms, this);
    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;
    this.initx = 0;
    this.inity = 400;
    this.clearIntervalScore = -1500;

    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.loopGame = this.loopGame.bind(this);
    this.gameOverScreen = this.gameOverScreen.bind(this);
  }

  beginGame(e) {
    // document.removeEventListener("keydown", this.beginGame.bind(this));
    // document.removeEventListener("keydown", this.beginGame.bind(this), false);
    if (!this.gameStarted){
      if (e.keyCode === 80) {
        e.preventDefault();
        this.gameStarted = true;
        // const thisGame = new Game();
        // thisGame.splashScreen();
        this.createPlatforms();
        // thisGame.
        document.getElementById("splash").style.zIndex = "-1";
        // debugger
        document.addEventListener('keydown', this.pikachu.doKeyDown, false);
        document.addEventListener('keyup', this.pikachu.doKeyClear, false);
        this.loopGame();
      }
    } else {
      return;
    }
  }

  loopGame() {
    var loopInterval = setInterval(() => {
      this.clearCanvas();
      this.pikachu.updatePikachu();
      this.updateScore();
      //if game is not over, rerender platforms
      if (this.gameOver === false) {
        for (var i = 0; i < this.platforms.length; i++) {
          this.platforms[i].updatePlatform('normal');
        }
      } else {
        //if game is over, render game over platforms and clear interval when
        // clearInterval score becomes positive
        for (var j = 0; j < this.platforms.length; j++) {
          this.platforms[j].updatePlatform('gameOver');
          this.clearIntervalScore ++;
        }
        this.pikachu.updateGameOverPikachu();
        if (this.clearIntervalScore > 0) {
          clearInterval(loopInterval);
          this.gameOverScreen();
        }
      }
    }, 10);
  }

  gameOverScreen() {
    console.log('game over screen');
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 550);
    var background = document.getElementById("background");
    var dy = 0.02;
    this.inity -= dy;
    this.ctx.drawImage(background, this.initx, this.inity, 330, 200, 0, 0, canvasWidth, canvasHeight);
  }

  createPlatforms() {
    this.clearCanvas();
    for (var i = 0; i < numPlatforms; i++) {
      var x = Math.random() * 325;
      var y = (canvasHeight / numPlatforms) * (i);
      var newPlatform = new Platform(x, y, this.score);
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
  var splash = document.getElementById("splash");
  splash.style.backgroundColor = 'yellow';
  const newGame = new Game();
  // debugger
  document.addEventListener("keydown", newGame.beginGame.bind(newGame), false);
  // newGame.beginGame();

});

// function splashScreen = () => {
//   var canvas = document.getElementById("splash");
//   canvas.style.backgroundColor = 'yellow';
// };
// function beginGame(e, game) {
//   if (e.keyCode === 13) {
//     document.removeEventListener("keydown", game.);
//
//   }
// }


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const numPlatforms = 6;
const canvasWidth = 400;
const canvasHeight = 550;
const platformWidth = 75;
const platformHeight = 15;
const pikachuWidth = 70;
const pikachuHeight = 70;

class Pikachu {
  constructor(platforms, game) {
    this.game = game;
    this.gravity = 0.1;
    this.bounce = 1.0;
    this.width = 40;
    this.height = 40;
    this.x = 180;
    this.y = 100;
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

  updatePikachu() {
    this.checkPlatformCollision();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.x + this.width > 0 || this.x + this.width < canvasWidth) {
      this.x += this.vx;
    }
    if (this.y + this.height > canvasHeight) {
      this.game.gameOver = true;
    }
  }

  updateGameOverPikachu() {
    this.renderPikachu();
    this.vy = -0.5;
    this.y += this.vy;
  }

  checkPlatformCollision() {
    for (var i = 0; i < numPlatforms; i++) {
      if(this.vy > 0 &&
        (this.x < this.platforms[i].x + platformWidth) &&
        (this.x + this.height > this.platforms[i].x) &&
        (this.y + this.height > this.platforms[i].y) &&
        (this.y + this.height < this.platforms[i].y + platformHeight)) {
          this.vy = -6;
        }
    }
  }

  renderPikachu() {
    var pikachuImage = document.getElementById("pikachu");
    this.ctx.drawImage(pikachuImage, this.x, this.y, pikachuWidth, pikachuHeight) ;
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


const normalPlatformColor = "rgb(102, 172, 46)";
const canvasWidth = 400;
const canvasHeight = 550;
const platformWidth = 75;
const platformHeight = 15;

class Platform {
  constructor(x, y, score) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.score = score;
    this.vy = 2.0;
    this.gravity = 1.0;

    this.drawPlatform = this.drawPlatform.bind(this);
  }

  updatePlatform(type) {
    if (type === 'normal') {
      this.y += this.vy;
      if (this.y > canvasHeight) {
        this.x = Math.random() * 325;
        this.y = this.y - canvasHeight;
      }
    } else if (type === 'gameOver') {
      if (this.y > canvasHeight) {
        this.x = Math.random() * 325;
        this.y = 0;
      }
      this.y += 12;
    }
    this.drawPlatform();
  }

  drawPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.fillStyle = normalPlatformColor;
    this.ctx.fillRect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

module.exports = Platform;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map