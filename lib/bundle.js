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
const song = new Audio('./assets/sounds/pokemon-theme.mp3');
const pikachant = new Audio('./assets/sounds/chantpika.dsp.wav');
const gamestartpika = new Audio ('./assets/sounds/gamestartpika.dsp.wav');
const pikadeath1 = new Audio('./assets/sounds/pikadeath.dsp.wav');
const pikadeath2 = new Audio('./assets/sounds/pikadeath2.dsp.wav');
const pikadeath3 = new Audio('./assets/sounds/pikadeath3.dsp.wav');

class Game {
  constructor() {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.platforms = [];
    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;
    this.initx = 0;
    this.inity = 400;
    this.songIsPlaying = true;

    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.loopGame = this.loopGame.bind(this);
    this.gameOverScreen = this.gameOverScreen.bind(this);
    this.pikadeath = this.pikadeath.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  beginGame(e) {
    if (e.keyCode === 84) {
      this.toggleSound();
    }
    if (!this.gameStarted){
      if (e.keyCode === 13 && document.getElementById('game-over').style.zIndex != "1") {
        this.gameStarted = false;
        gamestartpika.play();
        document.getElementById("game-over").style.zIndex = "-1";
        setTimeout( () => {
          song.play();
          this.gameStarted = true;
          this.platforms = [];
          this.createPlatforms();
          this.pikachu = new Pikachu(this.platforms, this);
          document.getElementById("splash").style.zIndex = "-1";
          document.addEventListener('keydown', this.pikachu.doKeyDown, false);
          document.addEventListener('keyup', this.pikachu.doKeyClear, false);
          this.loopGame();
        }, 1500);
      }
    } else {
      return;
    }
  }

  loopGame() {
    var loopInterval = setInterval(() => {
      var gameover = document.getElementById('game-over');
      gameover.style.zIndex = "-1";

      this.clearCanvas();
      this.pikachu.updatePikachu();
      this.updateScore();
      //if game is not over, rerender platforms
      if (this.gameOver === false) {
        if (this.score > 4000) {
          pikachant.play();
        }
        for (var i = 0; i < this.platforms.length; i++) {
          this.platforms[i].updatePlatform();
        }
      } else {
        clearInterval(loopInterval);
        this.platforms = [];
        // this.createPlatforms();
        song.pause();
        this.pikadeath();
        this.gameStarted = false;
        this.gameOverScreen();
      }
    }, 10);
  }

  gameOverScreen() {
    debugger
    var gameover = document.getElementById('game-over');
    gameover.style.display = "initial";
    gameover.style.backgroundColor = 'yellow';
    gameover.style.zIndex = "1";
    document.onkeydown = function(evt) {
      // debugger
        // var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if(evt.keyCode == 13)
        {
          location.reload();
        }
    };
  }

  pikadeath() {
    var rand = Math.floor( Math.random() * ( 1 + 3 - 1) ) + 1;
    switch(rand) {
      case 1:
        pikadeath1.play();
        break;
      case 2:
        pikadeath2.play();
        break;
      case 3:
        pikadeath3.play();
        break;
      }
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

  toggleSound() {
    if (this.songIsPlaying) {
      this.songIsPlaying = false;
      song.pause();
    } else {
      this.songIsPlaying = true;
      song.play();
    }
  }

}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const song = new Audio('./assets/sounds/pokemon-theme.mp3');

document.addEventListener("DOMContentLoaded", () => {
  var splash = document.getElementById("splash");
  splash.style.backgroundColor = 'yellow';
  const newGame = new Game();
  document.addEventListener("keydown", newGame.beginGame.bind(newGame), false);
});


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
const jumpSound = new Audio('./assets/sounds/pika.wav');

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
          jumpSound.play();
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

  updatePlatform() {
    this.y += this.vy;
    if (this.y > canvasHeight) {
      this.x = Math.random() * 325;
      this.y = this.y - canvasHeight;
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