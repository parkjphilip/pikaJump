const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");

const canvasWidth = 400;
const canvasHeight = 550;

class Game {
  constructor() {
    this.pikachu = new Pikachu();
    this.platform = new Platform();
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
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
    // this.clearCanvas();
    // this.platform.renderPlatforms();
    // var render = this.pikachu.renderPikachu2();
    // this.pikachu.renderPikachu2();
    // this.pikachu.renderPikachu2();

    // setTimeout(this.pikachu.renderPikachu2(), 1000);
    // var pikachu = this.pikachu;
    // var ctx = this.ctx;
    //
    // ctx.fillStyle = "rgb(163, 201, 241)";
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //
    // setInterval(
    //   function() {
    //     // ctx.fillStyle = "white";
    //     // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //     pikachu.renderPikachu();
    //   }, 1000);
    //   platform.renderPlatforms();
  }

  beginGame() {

    setInterval(this.pikachu.updatePikachu, 10);

  }
}

module.exports = Game;
