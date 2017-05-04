
class Platform {
  constructor() {
    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');
    this.x = 200;
    this.y = 450;
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
    this.ctx.rect(this.x, this.y, 75, 10);
    this.ctx.fillStyle = "rgb(102, 172, 46)";
    this.ctx.fillRect(this.x, this.y, 75, 10);
    this.ctx.stroke();
  }

}

module.exports = Platform;
