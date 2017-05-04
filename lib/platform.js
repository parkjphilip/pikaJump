
class Platform {
  constructor(x, y, pikachu) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.pikachu = pikachu;
    this.x = x;
    this.y = y;
    this.vy = 1.0;
    this.gravity = 0.2;
    this.renderPlatform = this.renderPlatform.bind(this);
    this.renderPlatformGravity = this.renderPlatformGravity.bind(this);
  }

  // renderPlatforms(ctx) {
  //   for (var i = 0; i < 7; i++) {
  //     var x = Math.random() * 325;
  //     var y = 70*(i+1);
  //     this.ctx.rect(x, y, 75, 10);
  //     this.ctx.fillStyle = "rgb(102, 172, 46)";
  //     this.ctx.fillRect(x, y, 75, 10);
  //     this.ctx.stroke();
  //   }
  // }

  renderPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  renderPlatformGravity() {
    this.y += this.vy;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 75, 15);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 15);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  updatePlatform() {
    // debugger
    if (this.pikachu.y > 90) {
      this.renderPlatform();
    } else if (this.pikachu.y < 90) {
      // debugger
      this.renderPlatformGravity();
    }
  }
}

module.exports = Platform;
