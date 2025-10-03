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

const professores = {
    Tetianao: { nome: "Teti Anão", preco: 50, bonus: 2, img: "assets/professores/teti_anao.png", background: "url('assets/backgrounds/montanha.jpg')" },
    Tetisupremo: { nome: "Teti Supremo", preco: 300, bonus: 3, img: "assets/professores/teti.png", background: "url('assets/backgrounds/sala.jpg')" },
    Tetimulher: { nome: "Teti Mulher", preco: 2500, bonus: 5, img: "assets/professores/teti_mulher.png", background: "url('assets/backgrounds/cozinha.jpg')" },
    FelipeBase: { nome: "Felipe O Grego τ", preco: 5000, bonus: 7, img: "assets/professores/felipe.png", background: "url('assets/backgrounds/fisica.jpg')" },
    Sheyla: { nome: "Dom Sheyla II", preco: 10000, bonus: 9, img: "assets/professores/sheyla.png", background: "url('assets/backgrounds/surubanco.jpg')" },
    Glauco: { nome: "Mr.Glauco", preco: 20000, bonus: 11, img: "assets/professores/glauco.png", background: "url('assets/backgrounds/fenda.jpg')" },
    Richardson: { nome: "Master Rick", preco: 50000, bonus: 13, img: "assets/professores/richardson.png", background: "url('assets/backgrounds/programa.jpg')" },
    Silviogoat: { nome: "Silvio Goat", preco: 75000, bonus: 16, img: "assets/professores/silvio.png", background: "url('assets/backgrounds/ibura.jpg')" },
    Silviofurry: { nome: "Silvio Furry", preco: 100000, bonus: 19, img: "assets/professores/silvio_furry.png", background: "url('assets/backgrounds/academia.jpg')" },
    Rejane: { nome: "Rejane Latin", preco: 130000, bonus: 24, img: "assets/professores/rejane.png", background: "url('assets/backgrounds/biblioteca.jpg')" },
    luanafilosofa: { nome: "Luana Filosofa", preco: 155000, bonus: 32, img: "assets/professores/luana.jpeg", background: "url('assets/backgrounds/pontanegra.webp')" },
    luanasociologa: { nome: "Luana Sociologa", preco: 200000, bonus: 37, img: "assets/professores/luanasocio.jpeg", background: "url('assets/backgrounds/pontanegra.webp')" }
};


let i = 0;
let bonus = 1;
let professoresComprados = {};
let conquistasDesbloqueadas = [];

const game = {
    score: i,
    bonus: bonus,
    professores: {}
};

function carregarScore() {
    if (session === "login" && username) {
        fetch(`https://professorclicker-api.vercel.app/api/${username}`)
            .then(res => res.json())
            .then(data => {
                if (typeof data.score === "number") i = data.score;
                if (data.professores_comprados && typeof data.professores_comprados === "object") {
                    professoresComprados = data.professores_comprados;
                }
                if (data.conquistas) conquistasDesbloqueadas = data.conquistas;

                game.score = i;
                game.bonus = bonus;
                game.professores = professoresComprados;

                localStorage.setItem('score', i);
                localStorage.setItem('professores_comprados', JSON.stringify(professoresComprados));
                localStorage.setItem('conquistas', JSON.stringify(conquistasDesbloqueadas));

                load();
            })
            .catch(() => {
                i = Number(localStorage.getItem('score')) || 0;
                professoresComprados = JSON.parse(localStorage.getItem('professores_comprados') || '{}');
                conquistasDesbloqueadas = JSON.parse(localStorage.getItem('conquistas') || '[]');

                game.score = i;
                game.bonus = bonus;
                game.professores = professoresComprados;

                load();
            });
    } else {
        i = Number(localStorage.getItem('score')) || 0;
        professoresComprados = JSON.parse(localStorage.getItem('professores_comprados') || '{}');
        conquistasDesbloqueadas = JSON.parse(localStorage.getItem('conquistas') || '[]');

        game.score = i;
        game.bonus = bonus;
        game.professores = professoresComprados;

        load();
    }
}

//  CONQUISTAS 
const conquistas = [
  {
    id: "primeiro_professor",
    nome: "Primeira Compra",
    descricao: "Você comprou seu primeiro professor!",
    condicao: (game) => game.bonus >= 2,
    recompensa: 100
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
    condicao: (game) =>
      Object.values(game.professores).filter(v => v).length >= 5
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
    condicao: (game) => game.bonus >= 16
  },
  {
    id: "click_666",
    nome: "Cuidado com o Click",
    descricao: "Você clicou exatamente 666 vezes!",
    condicao: (game) => game.score === 666
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
    id: "minotauro",
    nome: "Amigo do Minotauro",
    descricao: "Você clicou mais de 1000 vezes sem comprar nenhum professor!",
    condicao: (game) => game.score >= 1000 && Object.values(game.professores).every(v => !v)
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
  }
];

function checarConquistas(game) {
    conquistas.forEach(c => {
        if (!conquistasDesbloqueadas.includes(c.id) && c.condicao(game)) {
            conquistasDesbloqueadas.push(c.id);
            localStorage.setItem("conquistas", JSON.stringify(conquistasDesbloqueadas));
            notify(`🏆 Conquista desbloqueada: ${c.nome} - ${c.descricao}`);

            let bonusPontos = c.recompensa || 0; 
            if (bonusPontos > 0) {
                i += bonusPontos;
                game.score = i;
                saveScore();
                load();
                notify(`Você ganhou ${bonusPontos} pontos! 🎉`);
            }
        }
    });
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

carregarScore();

