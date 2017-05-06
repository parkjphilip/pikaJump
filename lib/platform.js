
class Platform {
  constructor(x, y, score, type) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.score = score;
    this.vy = 2.0;
    this.gravity = 1.0;
    this.renderPlatform = this.renderPlatform.bind(this);
  }

  updatePlatform() {
    this.y += this.vy;
    if (this.y > 550) {
      this.x = Math.random() * 325;
      this.y = this.y - 550;
    }
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  gameOverPlatform() {
    if (this.y > 550) {
      this.x = Math.random() * 325;
      this.y = 0;
    }
    this.y += 12;

    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

module.exports = Platform;
