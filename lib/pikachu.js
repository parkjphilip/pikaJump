const numPlatforms = 6;
const canvasWidth = 400;
const canvasHeight = 550;
const platformWidth = 75;
const platformHeight = 15;
const pikachuWidth = 70;
const pikachuHeight = 70;
const jumpSound = new Audio('./assets/sounds/pika.wav');
const normalEnemyDim = 60;
const legendEnemyDim = 100;

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
    this.vy = 0.3;
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
          this.vy = -5;
        }
    }
  }

  checkEnemyCollision() {
    if (        (this.x < this.platforms[i].x + platformWidth) &&
            (this.x + this.height > this.platforms[i].x) &&
            (this.y + this.height > this.platforms[i].y) &&
            (this.y + this.height < this.platforms[i].y + platformHeight)) {
              this.game.gameOver = true;
            })
  }
  renderPikachu() {
    var pikachuImage = document.getElementById("pikachu");
    this.ctx.drawImage(pikachuImage, this.x, this.y, pikachuWidth, pikachuHeight);
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
