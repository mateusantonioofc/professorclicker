import { GameFuncs } from "./modules/gamefunctions.js";

document.addEventListener("DOMContentLoaded", () => {

  const toggleSound = document.getElementById("toggleSons");
  const toggleAutoclick = document.getElementById("toggleAutoClicker");
  const btnVoltar = document.getElementById("btnVoltar");

  const soundDisabled = localStorage.getItem("soundEnabled") === "false";
  toggleSound.checked = soundDisabled;

  toggleSound.addEventListener("change", () => {
    const disabled = toggleSound.checked;
    localStorage.setItem("soundEnabled", disabled ? "false" : "true");
  });

  btnVoltar.addEventListener("click", () => {
    window.location.href = "game.html";
  });

});
