const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");

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
    window.addEventListener('keydown', this.pikachu.doKeyDown, true);

    this.loopGame();
  }

}

module.exports = Game;
