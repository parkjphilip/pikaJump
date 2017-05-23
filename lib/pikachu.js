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
  constructor(platforms, game, enemy) {
    this.game = game;
    this.gravity = 0.1;
    this.bounce = 1.0;
    this.width = 70;
    this.height = 70;
    this.x = 180;
    this.y = 300;
    this.vx = 0;
    this.vy = -5.0;
    this.platforms = platforms;
    this.enemy = enemy;
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');

    this.renderPikachu = this.renderPikachu.bind(this);
    this.updatePikachu = this.updatePikachu.bind(this);
    this.doKeyDown = this.doKeyDown.bind(this);
    this.doKeyClear = this.doKeyClear.bind(this);
    this.checkPlatformCollision = this.checkPlatformCollision.bind(this);
    this.checkEnemyCollision = this.checkEnemyCollision.bind(this);
  }

  updatePikachu(enemy) {
    this.enemy = enemy;
    this.checkPlatformCollision();
    this.checkEnemyCollision();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.y < 0) {
      this.y = 0;
    }
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
        (this.x + 25 < this.platforms[i].x + platformWidth) &&
        (this.x + pikachuWidth > this.platforms[i].x + 25) &&
        (this.y + pikachuHeight > this.platforms[i].y + 5) &&
        (this.y + pikachuHeight < this.platforms[i].y + platformHeight + 5))
        {
          jumpSound.play();
          this.vy = -5;
        }
    }
  }

  checkEnemyCollision() {
    if ((this.x + 10 < this.enemy.x + this.enemy.enemyDim) &&
        (this.x + pikachuWidth > this.enemy.x + 10) &&
        (this.y + pikachuHeight > this.enemy.y + 10) &&
        (this.y + pikachuHeight < this.enemy.y + this.enemy.enemyDim + 10)) {
          this.game.gameOver = true;
        }
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
