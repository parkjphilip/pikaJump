const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext('2d');

  //fill background of canvas
  ctx.fillStyle = "rgb(163, 201, 241)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //create a new game
  const newGame = new Game(ctx);
  newGame.playGame();
});
