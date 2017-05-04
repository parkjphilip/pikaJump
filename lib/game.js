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
    this.pikachu = new Pikachu(this.platforms);
  }

  beginGame() {
    this.createPlatforms();
    // this.pikachu = new Pikachu(this.platforms);
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
        this.platforms[i].updatePlatform();
      }
      // this.platforms.forEach(platform => {platform.renderPlatform();});
    }, 10);
  }

  createPlatforms() {
    for (var i = 0; i < numPlatforms; i++) {
      var x = Math.random() * 325;
      var y = 70 * (i + 1);
      var newPlatform = new Platform(x, y, this.pikachu);
      this.platforms.push(newPlatform);
    }
  }

}

module.exports = Game;
