import { PROFESSORES, getProfessor } from "./data/professores.js";
import { CONQUISTAS } from "./data/conquistas.js";
import { Sounds } from "./modules/sounds.js";
import { Storage } from "./modules/storage.js";
import { GameFuncs } from "./modules/gamefunctions.js";

// ==================== VARIÁVEIS ====================
const scoreEl = document.getElementById("score");
const pointsButton = document.getElementById("points_button");
const titleEl = document.querySelector(".h1");
const clickEl = document.querySelector("#click");
const storeContainer = document.getElementById("store-items");
const menuToggle = document.getElementById("menu-toggle");
const storeEl = document.getElementById("store");
const logoutBtn = document.getElementById("btnLogout");

const session = localStorage.getItem("tipo_usuario");
const username = localStorage.getItem("nickname");

let score = Storage.loadScore() || 0;
let bonus = 1;
let professoresComprados = Storage.loadProfessores() || {};
let conquistasDesbloqueadas = Storage.loadConquistas() || [];
let musicaIniciada = false;
let clicksLog = Storage.loadClicksLog() || [];

// ==================== SISTEMA DE NOTIFICAÇÕES (FILA) ====================
let conquistaQueue = [];
let processingConquista = false;

function notifyConquista(message) {
  conquistaQueue.push(message);
  processConquistaQueue();
}

function processConquistaQueue() {
  if (processingConquista || conquistaQueue.length === 0) return;
  processingConquista = true;

  const message = conquistaQueue.shift();
  const container = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.classList.add("notification", "conquista");
  notification.innerText = message;
  container.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
      processingConquista = false;
      processConquistaQueue();
    }, 500);
  }, 2500);
}


function load() {
  if (scoreEl) scoreEl.textContent = score;
  checarAnimacoes();
}

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
    }).catch(err => console.error("Erro ao salvar no servidor:", err));
  }
}

async function loadUserData() {
  if (session === "login" && username) {
    try {
      const res = await fetch(`https://professorclicker-api.vercel.app/api/${username}`);
      if (!res.ok) throw new Error("Falha ao buscar dados do servidor");

      const serverData = await res.json();

      score = Math.max(score, serverData.score || 0);
      professoresComprados = { ...serverData.professores_comprados, ...professoresComprados };
      conquistasDesbloqueadas = Array.from(new Set([...(serverData.conquistas || []), ...conquistasDesbloqueadas]));

      Storage.saveScore(score);
      Storage.saveProfessores(professoresComprados);
      Storage.saveConquistas(conquistasDesbloqueadas);
    } catch (err) {
      console.error("Erro ao carregar dados do servidor:", err);
    }
  }
}


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

  clicksLog.push(Date.now());
  clicksLog = clicksLog.filter(t => Date.now() - t <= 20000);
  localStorage.setItem("clicksLog", JSON.stringify(clicksLog));

  load();
}


function checarConquistas() {
  const novas = CONQUISTAS.checar({ score, bonus, professores: professoresComprados, session }, conquistasDesbloqueadas);

  novas.forEach(c => {
    conquistasDesbloqueadas.push(c.id);
    Storage.saveConquistas(conquistasDesbloqueadas);

    notifyConquista(`🏆 Conquista desbloqueada: ${c.nome} -> ${c.descricao}`);

    if (typeof c.recompensa === "number") {
      score += c.recompensa;
      Storage.saveScore(score);
      load();
      notifyConquista(`Você ganhou ${c.recompensa} pontos! 🎉`);
    } else if (typeof c.recompensa === "function") {
      c.recompensa();
    }
  });
}


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

function comprarProfessor(id) {
  const prof = getProfessor(id);
  if (!prof) return;

  const jaComprado = professoresComprados[id];

  if (!jaComprado) {
    if (score >= prof.preco) {
      score -= prof.preco;
      bonus += prof.bonus;
      professoresComprados[id] = true;

      pointsButton.src = prof.img;
      document.body.style.backgroundImage = prof.background;

      document.getElementById(id)?.classList.remove("compravel");
      document.getElementById(id)?.classList.add("comprado");

      notifyConquista(`Você comprou ${prof.nome} ✅`);
      saveAll();

      checarConquistas();

      if (prof.autoClickIntervalo) {
        GameFuncs.ativarAutoClick(prof.autoClickIntervalo, count, true, bonus);
      }

      load();
      Sounds.play("buy");
    } else {
      GameFuncs.notify("Erro: saldo insuficiente ❌", "error");
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


if (!session || (session === "login" && !username)) {
  alert("Acesso negado! Faça login ou entre como convidado.");
  window.location.href = "index.html";
  throw new Error("Redirecionado para login");
}

if (session === "convidado") {
  const rankingBtn = document.getElementById("btnLeaderboard");
  if (rankingBtn) {
    rankingBtn.style.display = "none";
    rankingBtn.onclick = () => playSound("ranking");
  }

  titleEl.textContent = GameFuncs.gerarNome();
} else {
  titleEl.textContent = username || "Ghost";
}


for (let id in PROFESSORES) {
  const prof = PROFESSORES[id];
  const btn = document.createElement("button");
  btn.id = id;
  btn.addEventListener("click", () => comprarProfessor(id));
  btn.innerHTML = `<div class="prof-name">${prof.nome}</div><img class="icon" src="${prof.img}" alt="${prof.nome}"><span>${prof.preco}</span>`;
  storeContainer.appendChild(btn);
}

menuToggle?.addEventListener("click", () => {
  Sounds.play("menu");
  storeEl.classList.toggle("active");
  menuToggle.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  if (icon) {
    icon.style.transition = "transform 0.3s ease";
    icon.style.transform = "rotate(90deg)";

    setTimeout(() => {
      if (storeEl.classList.contains("active")) {
        icon.classList.replace("fa-store", "fa-xmark");
      } else {
        icon.classList.replace("fa-xmark", "fa-store");
      }
      icon.style.transform = "rotate(0deg)";
    }, 200);
  }
});

if (logoutBtn) {
  logoutBtn.onclick = () => {
    saveAll();
    window.location.href = "index.html";
  };
}

window.addEventListener("load", async () => {
  await loadUserData();
  load();
  checarConquistas(); 
});

clickEl?.addEventListener("click", count);

setInterval(saveAll, 3000);