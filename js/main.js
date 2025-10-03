const score = document.getElementById("score");
const pointsButton = document.getElementById("points_button");
const title = document.querySelector(".h1");
const click = document.querySelector("#click");
const storeContainer = document.getElementById("store-items");
const menuToggle = document.getElementById("menu-toggle");
const store = document.getElementById("store");
const notificationContainer = document.getElementById("notification-container");
const rankingBtn = document.getElementById("btnLeaderboard");
const btnLogout = document.getElementById("btnLogout");

// Sons 
const sounds = {
    click: new Audio("assets/sfx/click.mp3"),
    buy: new Audio("assets/sfx/buy.mp3"),
    reset: new Audio("assets/sfx/reset.mp3"),
    ranking: new Audio("assets/sfx/ranking.mp3"),
    menu: new Audio("assets/sfx/menu.mp3")
};

let i = Number(localStorage.getItem('score')) || 0;
let bonus = 1;
let musicaIniciada = false;

let professoresComprados = JSON.parse(localStorage.getItem('professores_comprados') || '{}');
let conquistasDesbloqueadas = JSON.parse(localStorage.getItem("conquistas") || "[]");

const game = {
    score: i,
    bonus: bonus,
    professores: JSON.parse(localStorage.getItem("professores_comprados") || "{}"),
};

function updateScoreDisplay() {
    if (score) score.textContent = i;
}

function count() {
    i += bonus;
    game.score = i;
    game.bonus = bonus;

   
    requestAnimationFrame(updateScoreDisplay);

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
}

//  Função de tocar som 
function playSound(type) {
    if (!sounds[type]) return;
    const audio = sounds[type];
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

//  Música 
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

let audioPlayer = new Audio();
audioPlayer.volume = 0.4;

function tocarMusicaAleatoria() {
    const aleatoria = Math.floor(Math.random() * musicas.length);
    audioPlayer.src = musicas[aleatoria];
    audioPlayer.play().catch(err => console.log("Erro ao tocar música:", err));
}

audioPlayer.addEventListener("ended", tocarMusicaAleatoria);
document.addEventListener("click", () => { if (audioPlayer.paused) tocarMusicaAleatoria(); }, { once: true });


for (let id in professores) {
    const prof = professores[id];
    const btn = document.createElement("button");
    btn.id = id;
    btn.onclick = () => comprarProfessor(id);
    btn.innerHTML = `
        <div class="prof-name">${prof.nome}</div>
        <img class="icon" src="${prof.img}" alt="${prof.nome}">
        <span>${prof.preco}</span>
    `;
    storeContainer.appendChild(btn);
}

function checarAnimacoes() {
    requestAnimationFrame(() => {
        for (let id in professores) {
            const btn = document.getElementById(id);
            if (!professoresComprados[id] && i >= professores[id].preco) {
                btn?.classList.add("compravel");
            } else {
                btn?.classList.remove("compravel");
            }
        }
    });
}


setInterval(() => {
    saveScore();
    saveScoreInDB();
    saveProfessoresComprados();
    saveConquistas();
}, 3000);