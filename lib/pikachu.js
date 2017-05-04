class Pikachu {
  constructor() {
    this.gravity = 0.2;
    this.bounce = 0.98;

    this.x = 200;
    this.y = 50;
    this.vx = 0;
    this.vy = 1.0;
    this.updatePikachu = this.updatePikachu.bind(this);
    this.doKeyDown = this.doKeyDown.bind(this);
  }

  renderPikachu() {
    var pikachuImage = new Image();
    pikachuImage.src = "./assets/pikachu_sprite.png";
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext('2d');
    pikachuImage.onload = () => {
      ctx.drawImage(pikachuImage, this.x, this.y, 70, 70) ;
    };
  }

  clearCanvas() {
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(163, 201, 241)";
    ctx.fillRect(0, 0, 400, 550);
  }

  updatePikachu() {
    this.clearCanvas();
    this.renderPikachu();

    this.y += this.vy;
    this.vy += this.gravity;
    if (this.y + 70 > 550) {
      this.y = 550 - 70;
      this.vy *= -this.bounce;
    }

  }

  doKeyDown(e) {
    switch (e.keyCode) {
      case 37:  /* Left arrow was pressed */
        if (this.x - this.vx > 0){
          this.x -= 10;
        }
        break;
      case 39:  /* Right arrow was pressed */
        if (this.x + this.vx < 400){
          this.x += 10;
        }
        break;
    }
  }


}

module.exports = Pikachu;
