import { PROFESSORES, getProfessor} from "./data/professores.js";
import { CONQUISTAS } from "./data/conquistas.js";
import { Sounds } from "./modules/sounds.js";
import { Storage } from "./modules/storage.js";
import { GameFuncs } from "./modules/gamefunctions.js";

// DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoooooooooooooooooooooooooooooooooooooOOOOOOOOOOOOOOOOOOOOOOOOOM
const scoreEl = document.getElementById("score");
const pointsButton = document.getElementById("points_button");
const titleEl = document.querySelector(".h1");
const clickEl = document.querySelector("#click");
const storeContainer = document.getElementById("store-items");
const menuToggle = document.getElementById("menu-toggle");
const storeEl = document.getElementById("store");

// user
const session = localStorage.getItem("tipo_usuario");
const username = localStorage.getItem("nickname");

// variaveis do jogo
let score = Storage.loadScore();
let bonus = 1; 
let professoresComprados = Storage.loadProfessores();
let conquistasDesbloqueadas = Storage.loadConquistas();
let musicaIniciada = false;

const startTime = Storage.loadStartTime();
let clicksLog = Storage.loadClicksLog();

// settings da msc
Sounds.audioPlayer.volume = 0.4;
Sounds.audioPlayer.addEventListener("ended", () => {
  let musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
  if (!musicPlayed.includes(Sounds.audioPlayer.src)) {
    musicPlayed.push(Sounds.audioPlayer.src);
    localStorage.setItem("musicPlayed", JSON.stringify(musicPlayed));
  }
  Sounds.tocarAleatoria();
});

window.addEventListener("load", () => Sounds.tocarAleatoria());

document.addEventListener("click", () => {
  if (Sounds.audioPlayer.paused) Sounds.tocarAleatoria();
}, { once: true });

// Atualiza os elementos do DOOOOOOOOOOOOOOOOOOOOOOOOOOOOM
function load() {
  scoreEl.textContent = score;
  checarAnimacoes();
}

// Salva tudo tlgd
function saveAll() {
  Storage.saveScore(score);
  Storage.saveProfessores(professoresComprados);
  Storage.saveConquistas(conquistasDesbloqueadas);

  if (session === "login" && username) {
    fetch(`https://professorclicker-api.vercel.app/api/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score,
        professores_comprados: professoresComprados,
        conquistas: conquistasDesbloqueadas
      })
    });
  }
}

/**
 * Função d clique
 * aomenta score, salva, checa conquistas e anima elementos
 */
function count() {
  score += bonus;
  Storage.saveScore(score);

  checarConquistas();
  Sounds.play("click");

  if (clickEl) {
    clickEl.classList.remove("popp");
    void clickEl.offsetWidth;
    clickEl.classList.add("popp");
  }
  if (scoreEl) {
    scoreEl.classList.remove("pop");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("pop");
  }

  if (!musicaIniciada) {
    musicaIniciada = true;
    Sounds.tocarAleatoria();
  }

  // Log de cliques recentes (20s) para conquistas
  clicksLog.push(Date.now());
  clicksLog = clicksLog.filter(t => Date.now() - t <= 20000);
  localStorage.setItem("clicksLog", JSON.stringify(clicksLog));

  load();
}

/**
 * conquistas desbloqueáveis e aplica recompensas
 */
function checarConquistas() {
  const novas = CONQUISTAS.checar({ score, bonus, professores: professoresComprados, session }, conquistasDesbloqueadas);
  novas.forEach(c => {
    conquistasDesbloqueadas.push(c.id);
    Storage.saveConquistas(conquistasDesbloqueadas);
    GameFuncs.notify(`🏆 Conquista desbloqueada: ${c.nome} -> ${c.descricao}`);

    if (c.recompensa && typeof c.recompensa === "number") {
      score += c.recompensa;
      Storage.saveScore(score);
      load();
      GameFuncs.notify(`Você ganhou ${c.recompensa} pontos! 🎉`);
    } else if (typeof c.recompensa === "function") {
      c.recompensa();
    }
  });
}

// se professores podem ser comprados e atualiza classes do DOM
function checarAnimacoes() {
  for (let id in PROFESSORES) {
    const btn = document.getElementById(id);
    if (!professoresComprados[id] && score >= PROFESSORES[id].preco) {
      btn?.classList.add("compravel");
    } else {
      btn?.classList.remove("compravel");
    }
  }
}

// um professor se possível e aplica efeitos
function comprarProfessor(id) {
  const prof = getProfessor(id);
  if (!prof) return;

  const jaComprado = professoresComprados[id];

  if (!jaComprado) {
    if (score >= prof.preco) {
      score -= prof.preco;
      bonus = prof.bonus;
      professoresComprados[id] = true;

      pointsButton.src = prof.img;
      document.body.style.backgroundImage = prof.background;

      document.getElementById(id)?.classList.remove("compravel");
      document.getElementById(id)?.classList.add("comprado");

      GameFuncs.notify(`Você comprou ${prof.nome} ✅`);
      saveAll();

      checarConquistas();

      if (prof.autoClickIntervalo) {
        GameFuncs.ativarAutoClick(prof.autoClickIntervalo, count, true, bonus);
      }

      load();
      Sounds.play("buy");
    } else {
      GameFuncs.notify('Erro: saldo insuficiente ❌', "error");
    }
  } else {
    pointsButton.src = prof.img;
    document.body.style.backgroundImage = prof.background;
    bonus = prof.bonus;
    if (prof.autoClickIntervalo) {
      GameFuncs.ativarAutoClick(prof.autoClickIntervalo, count, false, bonus);
    }
  }
}

// reseta o jogo limpa progresso e redireciona para a tela inicial
function resetGame() {
  const confirmReset = confirm("Tem certeza que deseja reiniciar o jogo? Todo progresso será perdido.");
  if (!confirmReset) return;

  Sounds.play("reset");

  let resets = Number(localStorage.getItem("resets")) || 0;
  resets++;
  localStorage.setItem("resets", resets);

  score = 0;
  bonus = 1;

  for (let id in PROFESSORES) {
    professoresComprados[id] = false;
    document.getElementById(id)?.classList.remove("comprado", "compravel");
  }

  pointsButton.src = "assets/nave.png";
  document.body.style.backgroundImage = "none";
  document.getElementById("notification-container").innerHTML = "";

  const tempResets = resets;
  localStorage.clear();
  localStorage.setItem("resets", tempResets);

  window.location.href = "index.html";
  alert("Jogo reiniciado!");
}

// UI Inicial
if (!session || (session === "login" && !username)) {
  alert("Acesso negado! Faça login ou entre como convidado.");
  window.location.href = "index.html";
  throw new Error("Redirecionado para login");
}

if (session === "convidado") {
  const rankingBtn = document.getElementById("btnLeaderboard");
  if (rankingBtn) rankingBtn.style.display = "none";

  titleEl.textContent = GameFuncs.gerarNome();// GabiruGuloso643
} else {
  titleEl.textContent = username || "Ghost";
}


// botões da store
for (let id in PROFESSORES) {
  const prof = PROFESSORES[id];
  const btn = document.createElement("button");
  btn.id = id;
  btn.addEventListener("click", () => comprarProfessor(id));
  btn.innerHTML = `<div class="prof-name">${prof.nome}</div><img class="icon" src="${prof.img}" alt="${prof.nome}"><span>${prof.preco}</span>`;
  storeContainer.appendChild(btn);
}

// toggle menu da store
if (menuToggle && storeEl) {
  menuToggle.addEventListener("click", () => {
    Sounds.play("menu");
    storeEl.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.style.transition = "transform 0.3s ease";
      icon.style.transform = "rotate(90deg)";

      setTimeout(() => {
        if (storeEl.classList.contains("active")) {
          icon.classList.remove("fa-store");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-store");
        }
        icon.style.transform = "rotate(0deg)";
      }, 200);
    }
  });
}

// logout
document.getElementById("btnLogout").addEventListener("click", () => {
  saveAll();
  window.location.href = "index.html";
});

// save a cada 3 segundos
setInterval(saveAll, 3000);

// clicque principal
clickEl.addEventListener("click", count);

load();