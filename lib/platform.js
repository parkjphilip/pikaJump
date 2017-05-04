
class Platform {
  constructor(x, y) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
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

}

module.exports = Platform;
