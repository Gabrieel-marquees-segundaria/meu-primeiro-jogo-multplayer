import express from "express";
import http from "http";
import os from "os";
import { Server } from "socket.io"; // importa a classe Server corretamente
import createGame from "./public/game.js"; // supondo que é algo tipo lógica de jogo

/**
 * Gets the local IPv4 address of the machine
 * Iterates through network interfaces to find the first non-internal IPv4 address
 * @returns {string} The local IPv4 address or 'IP não encontrado' if not found
 */
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "IP não encontrado";
}
const localIP = getLocalIP();
let timer = null;

const app = express();
const server = http.createServer(app);
const sockets = new Server(server); // instância do Socket.IO

app.use(express.static("public"));

const game = createGame();

game.subscribe(command => {
  console.log(`Game state changed: ${command.type}`);
  sockets.emit(command.type, command);
  if (command.type === "remove-fruit") {
    sockets.emit("admin-update-score-game", command);
  }
 });

sockets.on("connection", socket => {
  const playerId = socket.id;
  console.log(`User connected ${socket.id}`);
  game.addPlayer({ playerId: playerId });
  socket.emit("setup", game.state);

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
    game.removePlayer({ playerId: socket.id });
  });

  socket.on("move-player", command => {
    command.playerId = playerId;
    command.type = "move-player";
    game.movePlayer(command);
  });

  let fruitGameInterval;
  socket.on("admin-start-fruit-game", time => {
    console.log(time);
    timer = time.time
    clearInterval(fruitGameInterval);
    fruitGameInterval = setInterval(() => {
      const fruitData = game.addFruit();
      if (fruitData && timer) {
        socket.emit("add-fruit", fruitData);
      }
    }, parseInt(timer) || 2000);

  });
  socket.on("admin-stop-fruit-game", () => {
    clearInterval(fruitGameInterval);
    timer = null;
  });

});
  sockets.on("admin-players-update-score", commad => {
    game.UpdateScore(commad);
  });
  
server.listen(8000, () => {
  console.log(`listening on in ${localIP}:8000`);
});
