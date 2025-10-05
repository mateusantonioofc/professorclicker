
const CONQUISTAS = [
  // 🖱️ CLIQUE
  { id: "primeiro_clique", nome: "Primeiro Clique", descricao: "Você clicou 1 vez!", condicao: (game) => game.cliques >= 1 },
  { id: "dez_toques", nome: "Dez Toques", descricao: "Você clicou 10 vezes!", condicao: (game) => game.cliques >= 10 },
  { id: "dedos_ageis", nome: "Dedos Ágeis", descricao: "Você clicou 100 vezes!", condicao: (game) => game.cliques >= 100 },

  // 💰 PONTOS
  { id: "rico", nome: "Rico!", descricao: "Você alcançou 1000 pontos!", condicao: (game) => game.score >= 1000 },
  { id: "magnata", nome: "Magnata!", descricao: "Você alcançou 10000 pontos!", condicao: (game) => game.score >= 10000 },

  // 👨‍🏫 PROFESSORES
  { id: "prof_silvio", nome: "Silviogoat", descricao: "Você contratou o Silviogoat!", condicao: (game) => game.professores["Silviogoat"] },
  { id: "prof_maria", nome: "Profª Maria", descricao: "Você contratou a Profª Maria!", condicao: (game) => game.professores["Maria"] },

  // ⏱️ TEMPO DE JOGO
  { id: "persistente", nome: "Persistente", descricao: "Você jogou por 1 hora!", condicao: () => Date.now() - Number(localStorage.getItem("startTime")) >= 10000 },

  // 🔁 RESETS
  { id: "recomeçar", nome: "Recomeçar", descricao: "Você resetou o jogo!", condicao: () => Number(localStorage.getItem("resets")) >= 1 },

  // 🎵 MÚSICAS
  { id: "dj", nome: "DJ", descricao: "Você ouviu uma música!", condicao: () => {
      const musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
      return musicPlayed.length > 0;
    } 
  },

  // 🖱️ CLIQUES EM 5 SEGUNDOS
  { id: "clicador_furioso", nome: "Clicador Furioso", descricao: "10 cliques em 5s!", condicao: () => {
      const clicksLog = JSON.parse(localStorage.getItem("clicksLog") || "[]");
      const agora = Date.now();
      const recentes = clicksLog.filter(t => agora - t <= 5000);
      return recentes.length >= 10;
    } 
  }
];


function checarConquistas() {
  CONQUISTAS.forEach(c => {
    if (!conquistasDesbloqueadas.includes(c.id) && c.condicao(game)) {
      conquistasDesbloqueadas.push(c.id);
      mostrarNotificacao(c.nome, c.descricao);
    }
  });
  localStorage.setItem("conquistas", JSON.stringify(conquistasDesbloqueadas));
}


function mostrarNotificacao(nome, descricao) {
  const notif = document.createElement("div");
  notif.className = "notificacao-conquista";
  notif.innerHTML = `<h3>🏆 ${nome}</h3><p>${descricao}</p>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}
