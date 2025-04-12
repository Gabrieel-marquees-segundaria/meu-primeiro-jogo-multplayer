import express from "express";
import http from "http";
import { Server } from "socket.io"; // importa a classe Server corretamente
import createGame from './public/game.js'; // supondo que é algo tipo lógica de jogo


const app = express();
const server = http.createServer(app);
const sockets = new Server(server); // instância do Socket.IO




app.use(express.static("public"));


const game = createGame();
game.start();

game.subscribe((command) => {
  console.log(`Game state changed: ${command.type}`);
  sockets.emit(command.type, command);
});

sockets.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`User connected ${socket.id}`);
  game.addPlayer({playerId: playerId});
  socket.emit("setup", game.state);

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
    game.removePlayer({playerId: socket.id});
  });

  socket.on('move-player', (command)=>{
    command.playerId = playerId;
    command.type = 'move-player'
    game.movePlayer(command)
  })
})




server.listen(8000, () => {
  console.log("listening on *:8000");
});
