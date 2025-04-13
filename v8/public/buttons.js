function move(direction) {
  let eventkey = new KeyboardEvent("keydown", { code: direction });
  document.dispatchEvent(eventkey);
  return direction;
}

// Movement controls
document.getElementById("up-btn").addEventListener("click", () => {
  move("ArrowUp");
});

document.getElementById("down-btn").addEventListener("click", () => {
  move("ArrowDown");
});

document.getElementById("left-btn").addEventListener("click", () => {
  move("ArrowLeft");
});

document.getElementById("right-btn").addEventListener("click", () => {
  move("ArrowRight");
});

/**
 * >>> if (isMobileDevice()) {
 * >>>   console.log("Usuário está em um dispositivo móvel");
 * >>> você pode fazer algo aqui, tipo redirecionar ou alterar o layout
 * >>> } else {
 *  >>>  console.log("Usuário está em um desktop");
 * >>> }
 * @returns
 */
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

if (!isMobileDevice()) {
  console.log("pc");
  document.querySelector(".controls").style.display = "none";
}
