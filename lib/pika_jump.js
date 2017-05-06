const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  var splash = document.getElementById("splash");
  splash.style.backgroundColor = 'yellow';
  const newGame = new Game();
  // debugger
  document.addEventListener("keydown", newGame.beginGame.bind(newGame), false);
  // newGame.beginGame();

});

// function splashScreen = () => {
//   var canvas = document.getElementById("splash");
//   canvas.style.backgroundColor = 'yellow';
// };
// function beginGame(e, game) {
//   if (e.keyCode === 13) {
//     document.removeEventListener("keydown", game.);
//
//   }
// }
