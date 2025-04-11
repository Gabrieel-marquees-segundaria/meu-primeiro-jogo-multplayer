
export default function createKeybordListener() {
    const state = {
      observrs: [],
    };
    function subscribe(observrFunction) {
      state.observrs.push(observrFunction);
    }
    function notifyAll(command) {
      console.log(`notifyAll ${state.observrs.length} observrs`);

      for (const observrFunction of state.observrs) {
        observrFunction(command);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    function handleKeydown(event) {
      let KeyPressed = event.code;
      const command = {
        type: "move-player",
        player: "player1",
        KeyPressed: KeyPressed,
      };
      notifyAll(command);
    }
    return {
      subscribe,
    };
  }