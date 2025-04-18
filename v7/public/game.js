export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: { width: 10, height: 10 },
  };

  const observrs = [];

  function start() {
    const frequecy = 2000;
    setInterval(addFruit, frequecy);
  }

  function subscribe(observrFunction) {
    observrs.push(observrFunction);
  }
  function notifyAll(command) {
    console.log(`notifyAll ${observrs.length} observrs`);

    for (const observrFunction of observrs) {
      observrFunction(command);
    }
  }

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX =
      "playerX" in command
        ? command.playerX
        : Math.floor(Math.random() * state.screen.width);
    const playerY =
      "playerY" in command
        ? command.playerY
        : Math.floor(Math.random() * state.screen.height);
    state.players[playerId] = { x: playerX, y: playerY };

    notifyAll({
      type: "add-player",
      playerId: playerId,
      playerX: playerX,
      playerY: playerY,
    });
  }
  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
    notifyAll({
      type: "remove-player",
      playerId: playerId,
    });
  }

  function addFruit(command) {
    const fruitId = command
      ? command.fruitId
      : Math.floor(Math.random() * 100000);
    const fruitX = command
      ? command.fruitX
      : Math.floor(Math.random() * state.screen.width);
    const fruitY = command
      ? command.fruitY
      : Math.floor(Math.random() * state.screen.height);
    state.fruits[fruitId] = { x: fruitX, y: fruitY };

    notifyAll({
      type: "add-fruit",
      fruitId: fruitId,
      fruitX: fruitX,
      fruitY: fruitY,
    });
  }
  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
    notifyAll({
      type: "remove-fruit",
      fruitId: fruitId,
    });
  }
  function setState(Nstete) {
    Object.assign(state, Nstete);
  }
  function checkForFruitColision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({
          fruitId: fruitId,
        });
      }
    }
  }
  function movePlayer(command) {
    console.log(`Moving ${command.player} with ${command.KeyPressed}`);
    notifyAll(command);

    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y -= 1;
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.height) {
          player.y += 1;
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < state.screen.width) {
          player.x += 1;
        }
      },
    };
    const KeyPressed = command.KeyPressed;
    const playerId = command.player;
    const player = state.players[playerId];
    const moveFunction = acceptedMoves[KeyPressed];
    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitColision(playerId);
    }
  }

  return {
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    movePlayer,
    setState,
    subscribe,
    start,
    state,
  };
}
