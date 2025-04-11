export default function creategame() {
    const state = {
      players: {},
      fruits: {},
      screen: { width: 10, height: 10 },
    };

    function addPlayer(command) {
      const playerId = command.playerId;
      const playerX = command.playerX;
      const playerY = command.playerY;
      state.players[playerId] = { x: playerX, y: playerY };
    }
      function removePlayer(command) {
      const playerId = command.playerId;
      delete state.players[playerId];
    }


    function addFruit(command) {
      const fruitId = command.fruitId;
      const fruitX = command.fruitX;
      const fruitY = command.fruitY;
      state.fruits[fruitId] = { x: fruitX, y: fruitY };
    }
    function removeFruit(command) {
      const fruitId = command.fruitId;
      delete state.fruits[fruitId];
    }

  function  checkForFruitColision(playerId){
      const player = state.players[playerId];

        for (const fruitId in state.fruits) {
          const fruit = state.fruits[fruitId];
          if (player.x === fruit.x && player.y === fruit.y) {
            removeFruit({
              fruitId: fruitId,
            });
          }
        }
    };
  function movePlayer(command) {
      console.log(`Moving ${command.player} with ${command.KeyPressed}`);

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
      state,
    };
  }