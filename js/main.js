import { conquistas, checarConquistas } from "./achievements.js";

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

const professores = {
    Tetimulher: { nome: "Teti Mulher", preco: 50, bonus: 2, img: "assets/professores/teti_mulher.png", background: "url('assets/backgrounds/cozinha.jpg')" },
    Tetianao: { nome: "Teti Anão", preco: 300, bonus: 3, img: "assets/professores/teti_anao.png", background: "url('assets/backgrounds/montanha.jpg')" },
    Tetisupremo: { nome: "Teti Supremo", preco: 2500, bonus: 5, img: "assets/professores/teti.png", background: "url('assets/backgrounds/sala.jpg')" },
    FelipeBase: { nome: "Felipe O Grego τ", preco: 5000, bonus: 7, img: "assets/professores/felipe.png", background: "url('assets/backgrounds/fisica.jpg')" },
    Sheyla: { nome: "Dom Sheyla II", preco: 10000, bonus: 9, img: "assets/professores/sheyla.png", background: "url('assets/backgrounds/surrubanco.jpg')" },
    Glauco: { nome: "Mr.Glauco", preco: 20000, bonus: 11, img: "assets/professores/glauco.png", background: "url('assets/backgrounds/fenda.jpg')" },
    Richardson: { nome: "Master Rick", preco: 50000, bonus: 13, img: "assets/professores/richardson.png", background: "url('assets/backgrounds/programa.jpg')" },
    Silviogoat: { nome: "Silvio Goat", preco: 75000, bonus: 16, img: "assets/professores/silvio.png", background: "url('assets/backgrounds/ibura.jpg')" },
    Silviofurry: { nome: "Silvio Furry", preco: 100000, bonus: 19, img: "assets/professores/silvio_furry.png", background: "url('assets/backgrounds/academia.jpg')" },
    Rejane: { nome: "Rejane Latin", preco: 130000, bonus: 24, img: "assets/professores/rejane.png", background: "url('assets/backgrounds/biblioteca.jpg')" },
    luanafilosofa: { nome: "Luana Filosofa", preco: 155000, bonus: 32, img: "assets/professores/luana.png", background: "url('assets/background')" },
    luanasociologa: { nome: "Luana Sociologa", preco: 200000, bonus: 37, img: "assets/guest.png", background: "url('assets/background')" }
};

let i = Number(localStorage.getItem('score')) || 0;
let bonus = 1;
let professoresComprados = JSON.parse(localStorage.getItem('professores_comprados') || '{}');

const game = {
    score: Number(localStorage.getItem("score")) || 0,
    bonus: bonus,
    professores: JSON.parse(localStorage.getItem("professores_comprados") || "{}"),
}


if (session === "login" && username) {
    fetch(`https://professorclicker-api.vercel.app/api/${username}`)
        .then(res => res.json())
        .then(data => {
            if (typeof data.score === "number") {
                i = data.score;
                localStorage.setItem('score', i);
            }
            if (data.professores_comprados && typeof data.professores_comprados === "object") {
                professoresComprados = data.professores_comprados;
                localStorage.setItem('professores_comprados', JSON.stringify(professoresComprados));
            }
            load();
        })
        .catch(() => {
            load();
        });
} else {
    load();
}

if (!session ||
    (session === "login" && !username)) {
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

document.addEventListener("click", () => {
    if (audioPlayer.paused) {
        tocarMusicaAleatoria();
    }
}, { once: true });

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
audioPlayer.addEventListener("ended", () => {
    tocarMusicaAleatoria();
});


window.addEventListener("load", () => {
    tocarMusicaAleatoria();
});

function count() {
    i += bonus;
    load();
    saveScore();
    checarConquistas(game, notify);
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
    if (!professoresComprados[id]) {
        if (i >= prof.preco) {
            i -= prof.preco;
            bonus = prof.bonus;
            professoresComprados[id] = true;
            pointsButton.src = prof.img;
            document.body.style.backgroundImage = prof.background;
            document.getElementById(id)?.classList.remove("compravel");
            document.getElementById(id)?.classList.add("comprado");
            notify(`Você comprou ${prof.nome} ✅`);
            saveProfessoresComprados();
            checarConquistas(game, notify);
            
            load();
            playSound("buy");
        } else {
            notify('Erro: saldo insuficiente ❌', "error");
        }
    } else {
        pointsButton.src = prof.img;
        document.body.style.backgroundImage = prof.background;
        bonus = prof.bonus;
    }
}

function resetGame() {
    const confirmReset = confirm("Tem certeza que deseja reiniciar o jogo? Todo progresso será perdido.");
    if (!confirmReset) return;

    playSound("reset");

    i = 0;
    bonus = 1;
    for (let id in professores) {
        professoresComprados[id] = false;
        document.getElementById(id)?.classList.remove("comprado", "compravel");
    }
    pointsButton.src = "assets/nave.png";
    document.body.style.backgroundImage = "none";
    document.getElementById("notification-container").innerHTML = "";
    localStorage.clear();
    load();
    saveScore();
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

menuToggle.addEventListener("click", () => {
    playSound("menu");

    store.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

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
});

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

setInterval(() => {
    saveScore();
    saveScoreInDB();
    saveProfessoresComprados();
}, 3000);

load();

document.getElementById("btnLogout").onclick = function () {
    saveScoreInDB();
    saveProfessoresComprados();
    localStorage.clear();
    window.location.href = "index.html";
};
