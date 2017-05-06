
const normalPlatformColor = "rgb(102, 172, 46)";
const canvasWidth = 400;
const canvasHeight = 550;
const platformWidth = 75;
const platformHeight = 15;

class Platform {
  constructor(x, y, score) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.score = score;
    this.vy = 2.0;
    this.gravity = 1.0;

    this.drawPlatform = this.drawPlatform.bind(this);
  }

  updatePlatform(type) {
    if (type === 'normal') {
      this.y += this.vy;
      if (this.y > canvasHeight) {
        this.x = Math.random() * 325;
        this.y = this.y - 550;
      }
    } else if (type === 'gameOver') {
      if (this.y > canvasHeight) {
        this.x = Math.random() * 325;
        this.y = 0;
      }
      this.y += 12;
    }
    this.drawPlatform();
  }

  drawPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.fillStyle = normalPlatformColor;
    this.ctx.fillRect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

module.exports = Platform;
