const Pikachu = require("./pikachu.js");

class Game {
  constructor(ctx) {
    this.pikachu = new Pikachu(ctx);
    this.ctx = ctx;
  }

  playGame() {
    this.pikachu.renderPikachu(this.ctx);
  }
}

module.exports = Game;
