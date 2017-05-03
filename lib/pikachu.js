

class Pikachu {
  constructor(ctx) {
    this.ctx = ctx;
  }

  renderPikachu(ctx) {
    var pikachu = new Image();
    pikachu.src = "./assets/pikachu_sprite.png";
    const context = this.ctx;
    pikachu.onload = function() {
      context.drawImage(pikachu, 170, 420, 70, 70);
    };
  }

}

module.exports = Pikachu;
