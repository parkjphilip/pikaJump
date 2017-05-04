class Pikachu {
  constructor() {
    this.gravity = 0.2;
    this.bounce = 0.98;
    this.x = 200;
    this.y = 200;
    this.vx = 0;
    this.vy = 1.0;

    var canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext('2d');

    this.renderPikachu = this.renderPikachu.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.updatePikachu = this.updatePikachu.bind(this);
    this.doKeyDown = this.doKeyDown.bind(this);
    this.doKeyClear = this.doKeyClear.bind(this);
    // this.jumpPikachu = this.jumpPikachu.bind(this);
  }

  renderPikachu() {
    var pikachuImage = new Image();
    pikachuImage.src = "./assets/pikachu_sprite.png";

    pikachuImage.onload = () => {
      this.ctx.drawImage(pikachuImage, this.x, this.y, 70, 70) ;
    };
  }

  clearCanvas() {
    this.ctx.fillStyle = "rgb(163, 201, 241)";
    this.ctx.fillRect(0, 0, 400, 550);
  }

  updatePikachu() {
    this.clearCanvas();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.x + 70 > 0 || this.x + 70 < 400) {
      this.x += this.vx;
    }
    //if pikachu hits the bottom, reset position and reverse speed
    if (this.y + 70 > 550) {
      this.y = 550 - 70;
      this.vy *= -this.bounce;
    }
    //jump pikachu if he hits a platform
    if ((this.x > 160 && this.x < 235) && (this.y > 400 && this.y < 410)) {
      // debugger
      this.vy *= -this.bounce;
    }
  }

  // jumpPikachu() {
  //   debugger
  //   if ((this.x > 200 && this.x < 275) && (this.y > 450 && this.y < 460)) {
  //     this.vy *= -this.bounce;
  //   }
  // }

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
