const Game = require("./game.js");
const song = new Audio('./assets/sounds/pokemon-theme.mp3');

document.addEventListener("DOMContentLoaded", () => {
  var splash = document.getElementById("splash");
  splash.style.backgroundColor = 'yellow';
  const newGame = new Game();
  document.addEventListener("keydown", newGame.beginGame.bind(newGame), false);
});
