class Enemy {
  constructor(x, y, score) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.score = score;
    this.vy = 1.3;
    this.gravity = 1.0;
    this.drawEnemy = this.drawEnemy.bind(this);
    this.drawNormalEnemy = this.drawNormalEnemy.bind(this);
    this.drawLegendEnemy = this.drawLegendEnemy.bind(this);
    this.updateEnemy = this.updateEnemy.bind(this);

    if (this.score < 2500) {
      this.rand = Math.floor( Math.random() * ( 1 + 3 - 2) ) + 1;
      this.enemyDim = 40;
    } else {
      this.rand = Math.floor( Math.random() * ( 1 + 3 - 1) ) + 1;
      this.enemyDim = 80;
    }
  }

  drawEnemy(enemyNum) {
    if (this.score < 2500) {
      this.drawNormalEnemy(enemyNum);
    } else {
      this.drawLegendEnemy(enemyNum);
    }
  }

  updateEnemy(enemyNum) {
    this.y += this.vy;
    this.drawEnemy(enemyNum);
  }

  drawNormalEnemy(enemyNum, enemy) {
    var enemyImage = document.getElementById(`normEnemy${enemyNum}`);
    this.ctx.drawImage(enemyImage, this.x, this.y, this.enemyDim, this.enemyDim-10);
  }

  drawLegendEnemy(enemyNum, enemy) {
    var enemyImage = document.getElementById(`legendEnemy${enemyNum}`);
    this.ctx.drawImage(enemyImage, this.x, this.y, this.enemyDim, this.enemyDim-15);
  }

}

module.exports = Enemy;
