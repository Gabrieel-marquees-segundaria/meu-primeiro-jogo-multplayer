
export default function createKeybordListener(document) {
    const state = {
      playerId: null,
      observrs: [],
      
    };

function registerPlayerId(playerId){
  // console.log(`registering player ${playerId}`);
  state.playerId = playerId;
}

    function subscribe(observrFunction) {
      state.observrs.push(observrFunction);
    }
    function notifyAll(command) {
      // console.log(`notifyAll ${state.observrs.length} observrs`);

      for (const observrFunction of state.observrs) {
        observrFunction(command);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    function handleKeydown(event) {
      let KeyPressed = event.code;
      const command = {
        type: "move-player",
        player: state.playerId,
        KeyPressed: KeyPressed,
      };
      notifyAll(command);
    }
    return {
      registerPlayerId,
      subscribe,
    };
  }