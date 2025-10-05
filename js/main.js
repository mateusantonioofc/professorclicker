const score = document.getElementById("score");
const pointsButton = document.getElementById("points_button");
const title = document.querySelector(".h1");
const click = document.querySelector("#click");
const storeContainer = document.getElementById("store-items");
const menuToggle = document.getElementById("menu-toggle");
const store = document.getElementById("store");
const clickSound = new Audio("assets/sfx/click.mp3");

const session = localStorage.getItem("tipo_usuario");
const username = localStorage.getItem("nickname");

let musicaIniciada = false;

if (!localStorage.getItem("startTime")) {
  localStorage.setItem("startTime", Date.now());
}

if (!localStorage.getItem("clicksLog")) {
  localStorage.setItem("clicksLog", JSON.stringify([]));
}

const professores = {
  Tetianao: { nome: "Teti Anão", preco: 50, bonus: 2, img: "assets/professores/teti_anao.png", background: "url('assets/backgrounds/montanha.jpg')"  },
  Tetisupremo: { nome: "Teti Supremo", preco: 300, bonus: 3, img: "assets/professores/teti.png", background: "url('assets/backgrounds/sala.jpg')"},
  Tetimulher: { nome: "Teti Mulher", preco: 2500, bonus: 5, img: "assets/professores/teti_mulher.png", background: "url('assets/backgrounds/cozinha.jpg')",autoClickIntervalo: 5000 },
  FelipeBase: { nome: "Felipe O Grego τ", preco: 5000, bonus: 7, img: "assets/professores/felipe.png", background: "url('assets/backgrounds/fisica.jpg')" ,autoClickIntervalo: 4500},
  Sheyla: { nome: "Dom Sheyla II", preco: 10000, bonus: 9, img: "assets/professores/sheyla.png", background: "url('assets/backgrounds/surubanco.jpg')",autoClickIntervalo: 4000 },
  Glauco: { nome: "Mr.Glauco", preco: 20000, bonus: 11, img: "assets/professores/glauco.png", background: "url('assets/backgrounds/fenda.jpg')" ,autoClickIntervalo: 3500 },
  Richardson: { nome: "Master Rick", preco: 50000, bonus: 13, img: "assets/professores/richardson.png", background: "url('assets/backgrounds/programa.jpg')",autoClickIntervalo: 3250},
  Silviogoat: { nome: "Silvio Goat", preco: 75000, bonus: 16, img: "assets/professores/silvio.png", background: "url('assets/backgrounds/ibura.jpg')",autoClickIntervalo: 3000 },
  Silviofurry: { nome: "Silvio Furry", preco: 100000, bonus: 19, img: "assets/professores/silvio_furry.png", background: "url('assets/backgrounds/academia.jpg')" ,autoClickIntervalo: 2750},
  Rejane: { nome: "Rejane Latin", preco: 130000, bonus: 24, img: "assets/professores/rejane.png", background: "url('assets/backgrounds/biblioteca.jpg')",autoClickIntervalo: 2000},
  luanafilosofa: { nome: "Luana Filosofa", preco: 155000, bonus: 32, img: "assets/professores/luana.jpeg", background: "url('assets/backgrounds/pontanegra.webp')" ,autoClickIntervalo: 1000 },
  luanasociologa: { nome: "Luana Sociologa", preco: 200000, bonus: 37, img: "assets/professores/luanasocio.jpeg", background: "url('assets/backgrounds/pontanegra.webp')" ,autoClickIntervalo: 300 }
};

let i = Number(localStorage.getItem('score')) || 0;
let bonus = 1;
let professoresComprados = JSON.parse(localStorage.getItem('professores_comprados') || '{}');
let conquistasDesbloqueadas = JSON.parse(localStorage.getItem("conquistas") || "[]");

const game = {
  score: i,
  bonus: bonus,
  professores: professoresComprados
};

// ==========================
// Conquistas
// ==========================
const conquistas = [
  {
    id: "primeiro_professor",
    nome: "Primeira Compra",
    descricao: "Você comprou seu primeiro professor!",
    condicao: (game) => game.bonus >= 2
  },
  {
    id: "super_clique",
    nome: "Clique Frenético",
    descricao: "Você clicou 100 vezes!",
    condicao: (game) => game.score >= 100
  },
  {
    id: "primeiro_clique",
    nome: "Primeiro Clique",
    descricao: "Welcome to Cicero!",
    condicao: (game) => game.score >= 1
  },
  {
    id: "mega_clique",
    nome: "Clique Supremo",
    descricao: "Você chegou em 1.000 pontos!",
    condicao: (game) => game.score >= 1000
  },
  {
    id: "colecionador",
    nome: "Colecionador de Professores",
    descricao: "Você comprou 5 professores diferentes!",
    condicao: (game) => Object.keys(game.professores).filter(id => game.professores[id]).length >= 5,
    recompensa: 5000
  },
  {
    id: "fanatico",
    nome: "Viciado em Pontos",
    descricao: "Você chegou em 50.000 pontos!",
    condicao: (game) => game.score >= 50000
  },
  // ... restante das conquistas
];

// ==========================
// Sistema de notificações
// ==========================
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
  }, 4000);
}

function notify(message, type = "normal") {
  const container = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.classList.add("notification");
  if (type === "error") notification.classList.add("error");
  notification.innerText = message;
  container.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 10);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 1000);
  }, 3000);
}

// ==========================
// Conquistas
// ==========================
function checarConquistas(game) {
  conquistas.forEach(c => {
    if (!conquistasDesbloqueadas.includes(c.id) && c.condicao(game)) {
      conquistasDesbloqueadas.push(c.id);
      localStorage.setItem("conquistas", JSON.stringify(conquistasDesbloqueadas));
      notifyConquista(`🏆 Conquista desbloqueada: ${c.nome} -> ${c.descricao}`);

      if (typeof c.recompensa === "number" && c.recompensa > 0) {
        i += c.recompensa;
        game.score = i;
        saveScore();
        load();
        notify(`Você ganhou ${c.recompensa} pontos! 🎉`);
      } else if (typeof c.recompensa === "function") {
        c.recompensa();
      }
    }
  });
}

// ==========================
// Auto Click
// ==========================
function ativarAutoClick(intervaloMs = 500, mostrarNotificacao = true) {
    if (autoClickInterval) clearInterval(autoClickInterval);

    autoClickInterval = setInterval(() => count(), intervaloMs);

    if (mostrarNotificacao && intervaloMs > 0) {
        if(game.bonus === 5){
            notify("VOCÊ DESBLOQUEOU AUTO CLICK, COMPRE NOVOS PROFESSORES PARA DAR UPGRADE NELE");
        } else if(game.bonus > 5){
            notify("AUTO CLICK UPADO ✅");
        }
    }
}

function desativarAutoClick() {
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
        notify("Clique automático desativado! ⏱️");
    }
}

// ==========================
// Contagem e clique
// ==========================
function count() {
  i += bonus;
  saveScore();

  game.score = i;
  game.bonus = bonus;

  checarConquistas(game);
  playSound("click");

  if (click) {
    click.classList.remove("popp");
    void click.offsetWidth;
    click.classList.add("popp");
  }
  if (score) {
    score.classList.remove("pop");
    void score.offsetWidth;
    score.classList.add("pop");
  }

  if (!musicaIniciada) {
    musicaIniciada = true;
    tocarMusicaAleatoria();
  }

  // 🔥 log de clique
  let clicks = JSON.parse(localStorage.getItem("clicksLog") || "[]");
  clicks.push(Date.now());
  clicks = clicks.filter(t => Date.now() - t <= 20000);
  localStorage.setItem("clicksLog", JSON.stringify(clicks));

  load();
}

// ==========================
// Compra de professores
// ==========================
function comprarProfessor(id) {
    const prof = professores[id];
    if (!prof) return;

    const jaComprado = professoresComprados[id];

    if (!jaComprado) {
        if (i >= prof.preco) {
            i -= prof.preco;
            bonus = prof.bonus;
            game.bonus = bonus; 
            professoresComprados[id] = true;

            pointsButton.src = prof.img;
            document.body.style.backgroundImage = prof.background;
            document.getElementById(id)?.classList.remove("compravel");
            document.getElementById(id)?.classList.add("comprado");

            notify(`Você comprou ${prof.nome} ✅`);
            saveProfessoresComprados();

            checarConquistas(game);

            if (prof.autoClickIntervalo) {
                ativarAutoClick(prof.autoClickIntervalo, true);
            }

            load();
            playSound("buy");
        } else {
            notify('Erro: saldo insuficiente ❌', "error");
        }
    } else {
        pointsButton.src = prof.img;
        document.body.style.backgroundImage = prof.background;
        bonus = prof.bonus;
        game.bonus = bonus;

        if (prof.autoClickIntervalo) {
            ativarAutoClick(prof.autoClickIntervalo, false);
        }
    }
}

// ==========================
// Reset seguro
// ==========================
function resetGame() {
  if (!confirm("Tem certeza que deseja reiniciar o jogo? Todo progresso será perdido.")) return;

  playSound("reset");

  let resets = Number(localStorage.getItem("resets")) || 0;
  resets++;

  i = 0;
  bonus = 1;
  professoresComprados = {};

  localStorage.setItem("score", i);
  localStorage.setItem("professores_comprados", JSON.stringify(professoresComprados));
  localStorage.setItem("resets", resets);

  pointsButton.src = "assets/nave.png";
  document.body.style.backgroundImage = "none";
  document.getElementById("notification-container").innerHTML = "";

  window.location.href = "index.html";
  alert("Jogo reiniciado!");
}

// ==========================
// Menu Hambúrguer e Dropdown
// ==========================
const menuToggleBtn = document.getElementById("menu-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");
const menuItemsContainer = document.getElementById("menu-items");

const dynamicMenuItems = [
    { name: "Loja", action: () => store.classList.toggle("active") },
    { name: "Conquistas", action: () => openConquistas() },
    { name: "Configurações", action: () => openConfig() },
];

dynamicMenuItems.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.name;
    btn.addEventListener("click", item.action);
    menuItemsContainer.appendChild(btn);
});

menuToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== menuToggleBtn) {
        dropdownMenu.style.display = "none";
    }
});

function openConquistas() { alert("Conquistas abertas!"); }
function openConfig() { alert("Configurações abertas!"); }

// ==========================
// Inicialização
// ==========================
load();