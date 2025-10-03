let conquistasDesbloqueadas = JSON.parse(localStorage.getItem("conquistas") || "[]");

const conquistas = [
  {
    id: "primeiro_clique",
    nome: "Primeiro Clique",
    descricao: "Welcome to Cicero!",
    condicao: (game) => game.score >= 1
  },
  {
    id: "cem_pontos",
    nome: "Clique Viciado",
    descricao: "Você chegou em 100 pontos!",
    condicao: (game) => game.score >= 100
  },
  {
    id: "dezmilhoes_pontos",
    nome: "Rumo ao topo",
    descricao: "Você chegou em 10.000.000 de pontos!",
    condicao: (game) => game.score >= 100
  },
  {
    id: "primeiro_professor",
    nome: "Primeira contratação",
    descricao: "Você comprou o seu primeiro professor!",
    condicao: (game) => Object.values(game.professores).some(p => p)
  }
];

function checarConquistas(game, notify) {
  conquistas.forEach(c => {
    if (!conquistasDesbloqueadas.includes(c.id) && c.condicao(game)) {
      conquistasDesbloqueadas.push(c.id);
      localStorage.setItem("conquistas", JSON.stringify(conquistasDesbloqueadas));
      notify(`🏆 Conquista desbloqueada: ${c.nome} - ${c.descricao}`);
    }
  });
}

export {
  conquistas,
  conquistasDesbloqueadas,
  checarConquistas
};
