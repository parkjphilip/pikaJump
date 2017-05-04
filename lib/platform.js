
class Platform {
  constructor(ctx) {
    this.ctx = ctx;
  }
  renderPlatforms(ctx) {
    for (var i = 0; i < 7; i++) {
      var x = Math.random() * 325;
      var y = 70*(i+1);
      this.ctx.rect(x, y, 75, 10);
      this.ctx.fillStyle = "rgb(102, 172, 46)";
      this.ctx.fillRect(x, y, 75, 10);
      this.ctx.stroke();
    }
  }
  // renderPlatform(ctx) {
  //   this.ctx.rect(20,100,75,10);
  //   this.ctx.stroke();
  // }
}

module.exports = Platform;
