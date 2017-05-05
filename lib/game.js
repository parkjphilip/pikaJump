const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");

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
        }
        this.pikachu.updateGameOverPikachu();
        // setTimeout(clearInterval(loopInterval), 40000);
      }
    }, 10);
    // setTimeout(alert(`game over. your score was ${this.score}`), 2000);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 550);
  }

  createPlatforms() {
    for (var i = 0; i < numPlatforms; i++) {
      var x = Math.random() * 325;
      var y = 80 * (i + 1);
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
