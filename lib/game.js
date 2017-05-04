const Pikachu = require("./pikachu.js");
const Platform = require("./platform.js");

const canvasWidth = 400;
const canvasHeight = 550;

class Game {
  constructor() {
    this.pikachu = new Pikachu();
    this.platforms = [];
    this.platform = new Platform();
  }

  loopGame() {
    setInterval(() => {
      this.pikachu.updatePikachu();
      this.platform.renderPlatform();
    }, 10);
  }

  beginGame() {
    addEventListener('keydown', this.pikachu.doKeyDown, false);
    addEventListener('keyup', this.pikachu.doKeyClear, false);
    this.loopGame();
  }
}

module.exports = Game;
