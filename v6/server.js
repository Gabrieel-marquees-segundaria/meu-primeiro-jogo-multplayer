import express from "express";
import http from "http";
import createGame from './public/game.js'

const app = express();
const server = http.createServer(app);




app.use(express.static("public"));


const game = createGame();
game.addPlayer({
  playerId: "player1",
  playerX: 4,
  playerY: 3,
});
game.addPlayer({
  playerId: "player2",
  playerX: 4,
  playerY: 5,
});
game.addFruit({
  fruitId: 'fruit1',
  fruitX: 5,
  fruitY: 6,
});
game.addFruit({
  fruitId: 'fruit2',
  fruitX: 9,
  fruitY: 9,
});
game.movePlayer({player: 'player1', KeyPressed: 'ArrowRight'})
console.log(game.state)

server.listen(5000, () => {
  console.log("listening on *:5000");
});
