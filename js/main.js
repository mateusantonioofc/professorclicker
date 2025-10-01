const score = document.getElementById("score");
const cabibara = document.getElementById("cabibara_img");
const title = document.querySelector(".h1");
const click = document.querySelector("#click");
const storeContainer = document.getElementById("store-items");
const menuToggle = document.getElementById("menu-toggle");
const store = document.getElementById("store");

const session = localStorage.getItem("tipo_usuario");
const username = localStorage.getItem("nickname");

const professores = {
    Tetimulher: { nome: "Teti Mulher", preco: 50, bonus: 2, img: "assets/cabibara_1.png", background: "url('assets/cozinha.webp')" },
    Tetianao: { nome: "Teti Anão", preco: 300, bonus: 3, img: "assets/cabibara_2.png", background: "url('assets/anao.webp')" },
    Tetisupremo: { nome: "Teti Supremo", preco: 2500, bonus: 5, img: "assets/cabibara_3.jpg", background: "url('assets/sala.jpg')" },
    FelipeBase: { nome: "Felipe O Grego τ", preco: 5000, bonus: 7, img: "assets/FelipeBase.jpeg", background: "url('assets/Fisica.jpg')" },
    Sheyla: { nome: "Dom Sheyla II", preco: 10000, bonus: 9, img: "assets/Sheyla.png", background: "url('assets/CD.jpg')" },
    Glauco: { nome: "Mr.Glauco", preco: 20000, bonus: 11, img: "assets/Glauco.jpeg", background: "url('assets/The End.webp')" },
    Richardson: { nome: "Master Rick", preco: 50000, bonus: 13, img: "assets/Richardson.png", background: "url('assets/Program.jpeg')" },
    Silviogoat: { nome: "Silvio Goat", preco: 75000, bonus: 16, img: "assets/Silviogoat.jpeg", background: "url('assets/ibura.jpg')" },
    Silviofurry: { nome: "Silvio Furry", preco: 100000, bonus: 19, img: "assets/silviogoatfurry.png", background: "url('assets/academia.jpg')" },
    Rejane: { nome: "Rejane Latin", preco: 130000, bonus: 24, img: "assets/Rejane.png", background: "url('assets/biblioteca.webp')" },
    luanafilosofa: { nome: "Luana Filosofa", preco: 155000, bonus: 32, img: "assets/IMG-20251001-WA0007.jpg", background: "url()" },
    luanasociologa: { nome: "Luana Sociologa", preco: 200000, bonus: 37, img: "assets/New.webp", background: "url()" }
};


const sounds = {
    click: "assets/click.mp3",
    buy: "assets/buy.mp3",
    reset: "assets/reset.mp3",
    ranking: "assets/ranking.mp3",
    menu: "assets/menu.mp3"
};

function playSound(type) {
    if (!sounds[type]) return;
    const audio = new Audio(sounds[type]);
    audio.play().catch(() => {});
}

let i = Number(localStorage.getItem('score')) || 0;
let bonus = 1;
let professoresComprados = JSON.parse(localStorage.getItem('professores_comprados') || '{}');

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
}

function count() {
    i += bonus;
    load();
    saveScore();
    clickSound.currentTime = 0.5;
    clickSound.play();
    click.classList.remove("popp");
    score.classList.remove("pop");
    void score.offsetWidth;
    score.classList.add("pop");
    click.classList.add("popp");
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
            cabibara.src = prof.img;
            document.body.style.backgroundImage = prof.background;
            document.getElementById(id)?.classList.remove("compravel");
            document.getElementById(id)?.classList.add("comprado");
            notify(`Você comprou ${prof.nome} ✅`);
            saveProfessoresComprados();
            load();

            playSound("buy");
        } else {
            notify('Erro: saldo insuficiente ❌', "error");
        }
    } else {
        cabibara.src = prof.img;
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
    cabibara.src = "assets/cabibara.png";
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
