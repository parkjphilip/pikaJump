const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");

const canvasWidth = 400;
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
    this.initx = 0;
    this.inity = 400;
    this.clearIntervalScore = -1500;

    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.loopGame = this.loopGame.bind(this);
    this.gameOverScreen = this.gameOverScreen.bind(this);
  }

  beginGame() {
    this.createPlatforms();
    document.addEventListener('keydown', this.pikachu.doKeyDown, false);
    document.addEventListener('keyup', this.pikachu.doKeyClear, false);
    this.loopGame();
    console.log('abc');
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

  splashScreen() {
    console.log('splash screen');
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
