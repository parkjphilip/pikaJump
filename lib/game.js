const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");

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
    this.pikadeath = this.pikadeath.bind(this);
  }

  beginGame(e) {
    if (!this.gameStarted){
      if (e.keyCode === 13) {
        gamestartpika.play();
        setTimeout( () => {
          song.play();
          e.preventDefault();
          this.gameStarted = true;
          this.createPlatforms();
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
      this.clearCanvas();
      this.pikachu.updatePikachu();
      this.updateScore();
      //if game is not over, rerender platforms
      if (this.gameOver === false) {
        if (this.score > 2000) {
          pikachant.play();
        }
        for (var i = 0; i < this.platforms.length; i++) {
          this.platforms[i].updatePlatform('normal');
        }
      } else {
        //if game is over, render game over platforms and clear interval when
        // clearInterval score becomes positive
        clearInterval(loopInterval);
        song.pause();
        this.pikadeath();
        // for (var j = 0; j < this.platforms.length; j++) {
        //   this.platforms[j].updatePlatform('gameOver');
        //   this.clearIntervalScore ++;
        // }
        // this.pikachu.updateGameOverPikachu();
        // if (this.clearIntervalScore > -1500) {
        //   this.pikadeath();
        // }
        // if (this.clearIntervalScore > 0) {
        //   clearInterval(loopInterval);
        //   this.gameOverScreen();
        // }
      }
    }, 10);
  }

  gameOverScreen() {
    song.pause();
    console.log('game over screen');
  }

  pikadeath() {
    var rand = Math.floor( Math.random() * ( 1 + 3 - 1) ) + 1;
    switch(rand) {
      case 0:
        pikadeath.play();
        console.log('pikadeath1');
        break;
      case 1:
        pikadeath1.play();
        console.log('pikadeath2');
        break;
      case 2:
        pikadeath2.play();
        console.log('pikadeath3');
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

}

module.exports = Game;
