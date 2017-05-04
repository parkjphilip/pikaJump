const pikaWidth = 40;
const pikaHeight = 40;
const numPlatforms = 6;

class Pikachu {
  constructor(platforms) {
    this.gravity = 0.2;
    this.bounce = 1.0;
    this.x = 180;
    this.y = 350;
    this.vx = 0;
    this.vy = 1.0;
    this.platforms = platforms;

    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');

    this.renderPikachu = this.renderPikachu.bind(this);
    this.updatePikachu = this.updatePikachu.bind(this);
    this.doKeyDown = this.doKeyDown.bind(this);
    this.doKeyClear = this.doKeyClear.bind(this);
    this.checkPlatformCollision = this.checkPlatformCollision.bind(this);
  }

  renderPikachu() {
    var pikachuImage = document.getElementById("pikachu");
    this.ctx.drawImage(pikachuImage, this.x, this.y, 70, 70) ;
  }

  updatePikachu() {
    this.checkPlatformCollision();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.x + pikaWidth > 0 || this.x + pikaWidth < 400) {
      this.x += this.vx;
    }
    // else if ( this.x < 0 || this.x > 400 ){
    //   debugger
    //   this.vx = 0;
    // }
    if (this.y + pikaHeight > 550) {
      this.vy = -8;
    }
  }

  checkPlatformCollision() {
    for (var i = 0; i < numPlatforms; i++) {
      if ( (this.vy > 0) && (
      this.x > this.platforms[i].x - 45 &&
      this.x + pikaWidth < this.platforms[i].x + 85 &&
      this.y + 40 > this.platforms[i].y &&
      this.y < this.platforms[i].y + 10) ) {
        this.vy = -8;
      }
    }
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
