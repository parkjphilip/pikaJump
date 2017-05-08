
// const normEnemy1 = document.getElementById("bulbasaur");
// const normEnemy2 = document.getElementById("charmander");
// const legendEnemy1 = document.getElementById("articuno");
// const legendEnemy2 = document.getElementById("moltres");
// const legendEnemy3 = document.getElementById("zapados");

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

    if (this.score < 3000) {
      this.rand = Math.floor( Math.random() * ( 1 + 3 - 2) ) + 1;
      this.enemyDim = 60;
    } else {
      this.rand = Math.floor( Math.random() * ( 1 + 3 - 1) ) + 1;
      this.enemyDim = 100;
    }
  }

  drawEnemy(enemyNum) {
    if (this.score < 3000) {
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
    this.ctx.drawImage(enemyImage, this.x, this.y, normalEnemyDim, normalEnemyDim);
  }

  drawLegendEnemy(enemyNum, enemy) {
    var enemyImage = document.getElementById(`legendEnemy${enemyNum}`);
    this.ctx.drawImage(enemyImage, this.x, this.y, legendEnemyDim, legendEnemyDim);
  }

}

module.exports = Enemy;
