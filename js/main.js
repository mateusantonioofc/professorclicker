// ================================
// main.js - Professor Clicker
// ================================

const scoreEl = document.getElementById("score");
const clickButton = document.getElementById("click");
const storeContainer = document.getElementById("store-items");
const menuToggle = document.getElementById("menu-toggle");
const store = document.getElementById("store");

// ----------------------------
// ESTADO PRINCIPAL DO JOGO
// ----------------------------
let game = {
  score: Number(localStorage.getItem("score")) || 0,
  cliques: Number(localStorage.getItem("cliques")) || 0,
  bonus: Number(localStorage.getItem("bonus")) || 1,
  professores: JSON.parse(localStorage.getItem("professores") || "{}"),
  session: localStorage.getItem("tipo_usuario") || "convidado"
};

let conquistasDesbloqueadas = JSON.parse(localStorage.getItem("conquistas") || "[]");

// ----------------------------
// SALVAR JOGO
// ----------------------------
function salvarJogo() {
  localStorage.setItem("score", game.score);
  localStorage.setItem("cliques", game.cliques);
  localStorage.setItem("bonus", game.bonus);
  localStorage.setItem("professores", JSON.stringify(game.professores));
  localStorage.setItem("conquistas", JSON.stringify(conquistasDesbloqueadas));
}

// ----------------------------
// CLIQUE PRINCIPAL
// ----------------------------
clickButton.addEventListener("click", () => {
  game.cliques++;
  game.score += game.bonus;
  atualizarTela();
  registrarClique();
  checarConquistas();
  salvarJogo();
});

// ----------------------------
// ATUALIZAR INTERFACE
// ----------------------------
function atualizarTela() {
  scoreEl.textContent = game.score;
}

// ----------------------------
// COMPRAR PROFESSOR
// ----------------------------
function comprarProfessor(nome, custo, bonus) {
  if (game.score >= custo) {
    game.score -= custo;
    game.bonus += bonus;
    game.professores[nome] = true;
    atualizarTela();
    checarConquistas();
    salvarJogo();
  } else {
    alert("Pontos insuficientes!");
  }
}

// ----------------------------
// REGISTRAR CLIQUES NO TEMPO
// ----------------------------
function registrarClique() {
  const clicksLog = JSON.parse(localStorage.getItem("clicksLog") || "[]");
  clicksLog.push(Date.now());
  localStorage.setItem("clicksLog", JSON.stringify(clicksLog));
}

// ----------------------------
// RESETAR JOGO
// ----------------------------
function resetarJogo() {
  let resets = Number(localStorage.getItem("resets")) || 0;
  resets++;
  localStorage.setItem("resets", resets);
  localStorage.removeItem("score");
  localStorage.removeItem("cliques");
  localStorage.removeItem("bonus");
  localStorage.removeItem("professores");
  localStorage.removeItem("conquistas");
  window.location.reload();
}

// ----------------------------
// INICIALIZAÇÃO
// ----------------------------
window.addEventListener("load", () => {
  if (!localStorage.getItem("startTime")) {
    localStorage.setItem("startTime", Date.now());
  }
  atualizarTela();
  checarConquistas();
});
