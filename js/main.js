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
  professores: JSON.parse(localStorage.getItem("professores_comprados") || "{}"),
};

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
    condicao: (game) => Object.values(game.professores).filter(v => v).length >= 5,
    recompensa: 5000
  },
  {
    id: "fanatico",
    nome: "Viciado em Pontos",
    descricao: "Você chegou em 50.000 pontos!",
    condicao: (game) => game.score >= 50000
  },
  {
    id: "background_mestre",
    nome: "Mestre das Salas",
    descricao: "Você trocou o background 3 vezes!",
    condicao: (game) => game.bonus >= 7
  },
  {
    id: "resetador",
    nome: "Reinício Estratégico",
    descricao: "Você reiniciou o jogo 1 vez!",
    condicao: (game) => Number(localStorage.getItem("resets")) >= 1
  },
  {
    id: "todo_poderoso",
    nome: "Bônus Máximo",
    descricao: "Você atingiu o maior bônus disponível!",
    condicao: (game) => game.bonus >= 37
  },
  {
    id: "lenda",
    nome: "Lenda do Clicker",
    descricao: "Você alcançou 1.000.000 pontos!",
    condicao: (game) => game.score >= 1000000
  },
  {
    id: "silvio_fan",
    nome: "Fã Número 1",
    descricao: "Você comprou Silvio Goat ou Silvio Furry!",
    condicao: (game) => game.professores.Silviogoat || game.professores.Silviofurry
  },
  // Conquistas secretas
  {
    id: "reset_mestre",
    nome: "Recomeço Infinito",
    descricao: "Você reiniciou o jogo 5 vezes!",
    condicao: (game) => Number(localStorage.getItem("resets")) >= 5
  },
  {
    id: "background_lover",
    nome: "Amante do Visual",
    descricao: "Você trocou o background 7 vezes!",
    condicao: (game) => game.bonus >= 16,
    recompensa: 1
  },
  {
    id: "click_666",
    nome: "Cuidado com o Click",
    descricao: "Você clicou exatamente 666 vezes!",
    condicao: (game) => game.score === 666,
    recompensa: 666
  },
  {
    id: "score_51",
    nome: "A Resposta",
    descricao: "Você chegou exatamente em 51 pontos!",
    condicao: (game) => game.score === 51
  },
  {
    id: "todos_os_professores",
    nome: "Colecionador Lendário",
    descricao: "Você comprou todos os professores!",
    condicao: (game) => game.bonus >= 37
  },
  {
    id: "musica_perfeita",
    nome: "DJ Cicero",
    descricao: "Você ouviu todas as músicas pelo menos uma vez!",
    condicao: (game) => {
      const musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
      return musicPlayed.length === 10;
    }
  },
  

  {
    id: "ghost_mode",
    nome: "Fantasma",
    descricao: "Entrou como convidado e alcançou 1000 pontos!",
    condicao: (game) => session === "convidado" && game.score >= 1000
  },
{
  id: "milionario",
  nome: "Milionário",
  descricao: "Você juntou 10.000.000 pontos!",
  condicao: (game) => game.score >= 10000000
},
{
  id: "click_monstro",
  nome: "Monstro do Clique",
  descricao: "Você clicou 10.000 vezes!",
  condicao: (game) => game.score >= 10000
},
{
  id: "professor_legendario",
  nome: "Professor Lendário",
  descricao: "Você comprou um professor que custa acima de 100.000 pontos!",
  condicao: (game) => {
    return game.professores.Silviofurry || game.professores.Rejane || game.professores.luanafilosofa || game.professores.luanasociologa;
  }
},
{
  id: "upgrade_master",
  nome: "Mestre dos Upgrades",
  descricao: "Você melhorou o auto click 5 vezes!",
  condicao: (game) => {
    const profsAuto = ["Tetimulher","FelipeBase","Sheyla","Glauco","Richardson","Silviogoat","Silviofurry","Rejane","luanafilosofa","luanasociologa"];
    return profsAuto.filter(p => game.professores[p]).length >= 5;
  }
},
{
  id: "sem_sono",
  nome: "Sem Sono",
  descricao: "Você jogou por mais de 1 hora sem fechar a página!",
  condicao: () => {
    const start = Number(localStorage.getItem("startTime")) || Date.now();
    return Date.now() - start >= 3600000; // 1 hora
  }
},
{
  id: "spam_click",
  nome: "Dedos de Aço",
  descricao: "Você clicou 50 vezes em menos de 10 segundos!",
  condicao: () => {
    const clicks = JSON.parse(localStorage.getItem("clicksLog") || "[]");
    const agora = Date.now();
    const recentes = clicks.filter(t => agora - t <= 10000);
    return recentes.length >= 50;
  }
},
{
  id: "convidado_pro",
  nome: "Turista Profissional",
  descricao: "Como convidado, você alcançou 50.000 pontos!",
  condicao: (game) => session === "convidado" && game.score >= 50000
},
{
  id: "reset_deus",
  nome: "O Reset é o Caminho",
  descricao: "Você reiniciou o jogo 10 vezes!",
  condicao: () => Number(localStorage.getItem("resets")) >= 10
}
];


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
let autoClickInterval = null;


function ativarAutoClick(intervaloMs = 500, mostrarNotificacao = true) {
    if (autoClickInterval) clearInterval(autoClickInterval);

    autoClickInterval = setInterval(() => {
        count(); 
    }, intervaloMs);

    if (mostrarNotificacao) {
        if(game.bonus === 5){
            notify("VOCÊ DESBLOQUEOU AUTO CLICK, COMPRE NOVOS PROFESSORES PARA DAR UPGRADE NELE");
        } else if(game.bonus > 5){
            notify("AUTO CLICK UPADO ✅");
        }
    }
}
   

//segurança 
function desativarAutoClick() {
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
        notify("Clique automático desativado! ⏱️");
    }
}
if (session === "login" && username) {
  fetch(`https://professorclicker-api.vercel.app/api/${username}`)
    .then(res => res.json())
    .then(data => {
      if (typeof data.score === "number") {
        i = data.score;
        game.score = i;
        localStorage.setItem('score', i);
      }
      if (data.professores_comprados && typeof data.professores_comprados === "object") {
        professoresComprados = data.professores_comprados;
        game.professores = professoresComprados;
        localStorage.setItem('professores_comprados', JSON.stringify(professoresComprados));
        const ultimosComprados = Object.keys(professoresComprados).filter(k => professoresComprados[k]);
        if (ultimosComprados.length > 0) {
          const ultimo = professores[ultimosComprados[ultimosComprados.length - 1]];
          if (ultimo) bonus = ultimo.bonus;
          game.bonus = bonus;
        }
      }
      if (data.conquistas) {
        conquistasDesbloqueadas = data.conquistas;
        localStorage.setItem('conquistas', JSON.stringify(conquistasDesbloqueadas));
      }
      load();
    })
    .catch(() => {
      load();
    });
} else {
  load();
}

if (!session || (session === "login" && !username)) {
  alert("Acesso negado! Faça login ou entre como convidado.");
  window.location.href = "index.html";
  throw new Error("Redirecionado para login");
}

if (session === "convidado") {
  const rankingBtn = document.getElementById("btnLeaderboard");
  if (rankingBtn) rankingBtn.style.display = "none";
  title.textContent = "Turista";
} else {
  title.textContent = localStorage.getItem("nickname") || "Ghost";
}

function load() {
  score.textContent = i;
  checarAnimacoes();
}

function saveScore() {
  localStorage.setItem('score', i);
}

function saveScoreInDB() {
  if (session === "login") {
    fetch(`https://professorclicker-api.vercel.app/api/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: i })
    });
  }
}

function saveProfessoresComprados() {
  localStorage.setItem('professores_comprados', JSON.stringify(professoresComprados));
  if (session === "login" && username) {
    fetch(`https://professorclicker-api.vercel.app/api/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ professores_comprados: professoresComprados })
    });
  }
}

function saveConquistas() {
  localStorage.setItem('conquistas', JSON.stringify(conquistasDesbloqueadas));
  if (session === "login" && username) {
    fetch(`https://professorclicker-api.vercel.app/api/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conquistas: conquistasDesbloqueadas })
    });
  }
}

const sounds = {
  click: "assets/sfx/click.mp3",
  buy: "assets/sfx/buy.mp3",
  reset: "assets/sfx/reset.mp3",
  ranking: "assets/sfx/ranking.mp3",
  menu: "assets/sfx/menu.mp3"
};

function playSound(type) {
  if (!sounds[type]) return;
  const audio = new Audio(sounds[type]);
  audio.play().catch(() => { });
}

let audioPlayer = new Audio();
audioPlayer.volume = 0.4;

const musicas = [
  "assets/sfx/musica1.mp3",
  "assets/sfx/musica2.mp3",
  "assets/sfx/musica3.mp3",
  "assets/sfx/musica4.mp3",
  "assets/sfx/musica5.mp3",
  "assets/sfx/musica6.mp3",
  "assets/sfx/musica7.mp3",
  "assets/sfx/musica8.mp3",
  "assets/sfx/musica10.mp3",
  "assets/sfx/musica11.mp3",
];

function tocarMusicaAleatoria() {
  const aleatoria = Math.floor(Math.random() * musicas.length);
  audioPlayer.src = musicas[aleatoria];
  audioPlayer.play().catch(err => console.log("Erro ao tocar música:", err));
}

audioPlayer.addEventListener("ended", () => {
  tocarMusicaAleatoria();
});

window.addEventListener("load", () => {
  tocarMusicaAleatoria();
});

document.addEventListener("click", () => {
  if (audioPlayer.paused) {
    tocarMusicaAleatoria();
  }
}, { once: true });

function count() {
  i += bonus;
  saveScore();

  game.score = i;
  game.bonus = bonus;

  checarConquistas(game);
  playSound("click");

  clickSound.currentTime = 0.5;
  clickSound.play();

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

  // 🔥 log de clique para conquistas tipo "spam_click"
  let clicks = JSON.parse(localStorage.getItem("clicksLog") || "[]");
  clicks.push(Date.now());
  // mantém só últimos 20s para não pesar
  clicks = clicks.filter(t => Date.now() - t <= 20000);
  localStorage.setItem("clicksLog", JSON.stringify(clicks));

  load();
}
function checarAnimacoes() {
  for (let id in professores) {
    const btn = document.getElementById(id);
    if (!professoresComprados[id] && i >= professores[id].preco) {
      btn?.classList.add("compravel");
    } else {
      btn?.classList.remove("compravel");
    }
  }
}

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
function resetGame() {
  const confirmReset = confirm("Tem certeza que deseja reiniciar o jogo? Todo progresso será perdido.");
  if (!confirmReset) return;

  playSound("reset");

  
  let resets = Number(localStorage.getItem("resets")) || 0;
  resets++;
  localStorage.setItem("resets", resets);

  i = 0;
  bonus = 1;

  for (let id in professores) {
    professoresComprados[id] = false;
    document.getElementById(id)?.classList.remove("comprado", "compravel");
  }

  saveScoreInDB();

  pointsButton.src = "assets/nave.png";
  document.body.style.backgroundImage = "none";
  document.getElementById("notification-container").innerHTML = "";

  
  const tempResets = resets;
  localStorage.clear();
  localStorage.setItem("resets", tempResets);

  window.location.href = "index.html";
  alert("Jogo reiniciado!");
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

const rankingBtn = document.getElementById("btnLeaderboard");
if (rankingBtn) {
  rankingBtn.addEventListener("click", () => {
    playSound("ranking");
  });
}

if (menuToggle && store) {
  menuToggle.addEventListener("click", () => {
    playSound("menu");

    store.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.style.transition = "transform 0.3s ease";
      icon.style.transform = "rotate(90deg)";

      setTimeout(() => {
        if (store.classList.contains("active")) {
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

for (let id in professores) {
  const prof = professores[id];
  const btn = document.createElement("button");
  btn.id = id;
  btn.onclick = () => comprarProfessor(id);
  btn.innerHTML = `<div class="prof-name">${prof.nome}</div><img class="icon" src="${prof.img}" alt="${prof.nome}"><span>${prof.preco}</span>`;
  storeContainer.appendChild(btn);
}

setInterval(() => {
  saveScore();
  saveScoreInDB();
  saveProfessoresComprados();
  saveConquistas();
}, 3000);

document.getElementById("btnLogout").onclick = function () {
  saveScoreInDB();
  saveProfessoresComprados();
  localStorage.clear();
  window.location.href = "index.html";
};

audioPlayer.addEventListener("ended", () => {
  let musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
  if (!musicPlayed.includes(audioPlayer.src)) {
    musicPlayed.push(audioPlayer.src);
    localStorage.setItem("musicPlayed", JSON.stringify(musicPlayed));
  }
  tocarMusicaAleatoria();
});
  
// Menu Toggle
const menuToggleBtn = document.getElementById("menu-toggle");
const store = document.getElementById("store");
const dropdownMenu = document.getElementById("dropdown-menu");
const menuItemsContainer = document.getElementById("menu-items");

// Itens do menu
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

// Toggle dropdown
menuToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === "flex" ? "none" : "flex";
});

// Fecha dropdown ao clicar fora
document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== menuToggleBtn) {
        dropdownMenu.style.display = "none";
    }
});

// Funções exemplo para abrir containers
function openConquistas() {
    // Coloque aqui seu código de abrir conquistas
    alert("Conquistas abertas!");
}

function openConfig() {
    // Coloque aqui seu código de abrir configurações
    alert("Configurações abertas!");
}

load();
