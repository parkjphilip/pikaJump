const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");
const Enemy = require("./enemy.js");

const canvasWidth = 440;
const canvasHeight = 550;
const numPlatforms = 6;
const pokemonThemeSong = new Audio('./assets/sounds/pokemon-theme.mp3');
const pikachant = new Audio('./assets/sounds/chantpika.dsp.wav');
const startPikaSound = new Audio ('./assets/sounds/gamestartpika.dsp.wav');
const pikadeath1 = new Audio('./assets/sounds/pikadeath.dsp.wav');
const pikadeath2 = new Audio('./assets/sounds/pikadeath2.dsp.wav');
const pikadeath3 = new Audio('./assets/sounds/pikadeath3.dsp.wav');
var footer = document.getElementById("footer");

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
    this.enemy = new Enemy(Math.random() * 325, 0, this.score);

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
        this.gameStarted = true;
        startPikaSound.play();
        document.getElementById("game-over").style.zIndex = "-1";
        setTimeout( () => {
          footer.style.display = 'none';
          pokemonThemeSong.play();
          this.gameStarted = true;
          this.platforms = [];
          this.createPlatforms();
          this.pikachu = new Pikachu(this.platforms, this, this.enemy);
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
      this.pikachu.updatePikachu(this.enemy);
      this.updateScore();

      if (this.gameOver === false) {
        if (this.score > 4000) {
          pikachant.play();
        }
        for (var i = 0; i < this.platforms.length; i++) {
          this.platforms[i].updatePlatform();
        }
        if (this.score % 400 === 0) {
          this.enemy = new Enemy(Math.random() * 325, 0, this.score);
          this.enemy.drawEnemy(this.enemy.rand);
        } else {
          this.enemy.updateEnemy(this.enemy.rand);
        }
      } else {
        clearInterval(loopInterval);
        this.platforms = [];
        pokemonThemeSong.pause();
        this.pikadeath();
        this.gameStarted = false;
        this.gameOverScreen();
      }
    }, 10);
  }

  gameOverScreen() {
    var gameover = document.getElementById('game-over');
    footer.style.display = 'flex';
    gameover.style.display = "initial";
    gameover.style.backgroundColor = 'yellow';
    gameover.style.zIndex = "1";
    $('#gameover-2').html(`Your score was ${this.score}`);
    document.onkeydown = function(e) {
      if (e.keyCode == 13) {
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
      pokemonThemeSong.pause();
    } else {
      this.songIsPlaying = true;
      pokemonThemeSong.play();
    }
  }

}

module.exports = Game;
