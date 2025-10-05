export const CONQUISTAS = {
    /**
     * Lista de todas as conquistas do jogo
     * Cada conquista possui:
     * - id: identificador único
     * - nome: título da conquista
     * - descricao: descrição da conquista
     * - condicao: função que retorna true se a conquista foi atingida
     * - recompensa (opcional): pontos ou função como recompensa
     */
    export const CONQUISTAS = {
  lista: [
    //  CLIQUES (contagem de CLIQUES não dinheiro)
    { id: "clique_1", nome: "Primeiro Clique", descricao: "Você clicou 1 vez!", condicao: (game) => game.totalClicks >= 1 },
    { id: "clique_10", nome: "Dez Toques", descricao: "Você clicou 10 vezes!", condicao: (game) => game.totalClicks >= 10 },
    { id: "clique_25", nome: "Dedos Ágeis", descricao: "Você clicou 25 vezes!", condicao: (game) => game.totalClicks >= 25 },
    { id: "clique_50", nome: "Aquecendo", descricao: "Você clicou 50 vezes!", condicao: (game) => game.totalClicks >= 50 },
    { id: "clique_75", nome: "Ritmo Crescente", descricao: "Você clicou 75 vezes!", condicao: (game) => game.totalClicks >= 75 },
    { id: "clique_100", nome: "Clique Frenético", descricao: "Você clicou 100 vezes!", condicao: (game) => game.totalClicks >= 100 },
    { id: "clique_250", nome: "Treinando o Dedo", descricao: "Você clicou 250 vezes!", condicao: (game) => game.totalClicks >= 250 },
    { id: "clique_500", nome: "Meio Milhar", descricao: "Você clicou 500 vezes!", condicao: (game) => game.totalClicks >= 500 },
    { id: "clique_666", nome: "Número da Besta", descricao: "Você clicou exatamente 666 vezes!", condicao: (game) => game.totalClicks === 666 },
    { id: "clique_777", nome: "Número da Sorte", descricao: "Você clicou exatamente 777 vezes!", condicao: (game) => game.totalClicks === 777 },
    { id: "clique_1000", nome: "Clique Supremo", descricao: "Você clicou 1.000 vezes!", condicao: (game) => game.totalClicks >= 1000 },
    { id: "clique_2000", nome: "Maratona de Cliques", descricao: "Você clicou 2.000 vezes!", condicao: (game) => game.totalClicks >= 2000 },
    { id: "clique_3000", nome: "Três Mil Toques", descricao: "Você clicou 3.000 vezes!", condicao: (game) => game.totalClicks >= 3000 },
    { id: "clique_4000", nome: "Dedos de Ferro", descricao: "Você clicou 4.000 vezes!", condicao: (game) => game.totalClicks >= 4000 },
    { id: "clique_5000", nome: "Não Consigo Parar", descricao: "Você clicou 5.000 vezes!", condicao: (game) => game.totalClicks >= 5000 },
    { id: "clique_7500", nome: "Insanidade", descricao: "Você clicou 7.500 vezes!", condicao: (game) => game.totalClicks >= 7500 },
    { id: "clique_10000", nome: "Monstro do Clique", descricao: "Você clicou 10.000 vezes!", condicao: (game) => game.totalClicks >= 10000 },
    { id: "clique_20000", nome: "Devorador de Mouse", descricao: "Você clicou 20.000 vezes!", condicao: (game) => game.totalClicks >= 20000 },
    { id: "clique_50000", nome: "Clique Infinito", descricao: "Você clicou 50.000 vezes!", condicao: (game) => game.totalClicks >= 50000 },
    { id: "clique_100000", nome: "Robô do Clique", descricao: "Você clicou 100.000 vezes!", condicao: (game) => game.totalClicks >= 100000 },
    { id: "clique_500000", nome: "Máquina de Cliques", descricao: "Você clicou 500.000 vezes!", condicao: (game) => game.totalClicks >= 500000 },
    { id: "clique_1000000", nome: "Um Milhão de Cliques", descricao: "Você clicou 1.000.000 vezes!", condicao: (game) => game.totalClicks >= 1000000 },
    { id: "clique_5000000", nome: "Clique Lendário", descricao: "Você clicou 5.000.000 vezes!", condicao: (game) => game.totalClicks >= 5000000 },
    { id: "clique_10000000", nome: "Dez Milhões de Cliques", descricao: "Você clicou 10.000.000 vezes!", condicao: (game) => game.totalClicks >= 10000000 },
    { id: "clique_50000000", nome: "Cinquenta Milhões", descricao: "Você clicou 50.000.000 vezes!", condicao: (game) => game.totalClicks >= 50000000 },

    // PONTOS
    { id: "score_1", nome: "Primeiro Ponto", descricao: "Você conseguiu 1 ponto!", condicao: (game) => game.score >= 1 },
    { id: "score_50", nome: "A Resposta?", descricao: "Você chegou a 50 pontos!", condicao: (game) => game.score >= 50 },
    { id: "score_100", nome: "Começando Forte", descricao: "Você chegou a 100 pontos!", condicao: (game) => game.score >= 100 },
    { id: "score_500", nome: "Meio Milhar", descricao: "Você chegou a 500 pontos!", condicao: (game) => game.score >= 500 },
    { id: "score_1000", nome: "Milagre do Milhar", descricao: "Você chegou a 1.000 pontos!", condicao: (game) => game.score >= 1000 },
    { id: "score_5000", nome: "Primeiros Milhares", descricao: "Você chegou a 5.000 pontos!", condicao: (game) => game.score >= 5000 },
    { id: "score_10000", nome: "Dez Mil!", descricao: "Você chegou a 10.000 pontos!", condicao: (game) => game.score >= 10000 },
    { id: "score_25000", nome: "Vinte e Cinco Mil", descricao: "Você chegou a 25.000 pontos!", condicao: (game) => game.score >= 25000 },
    { id: "score_50000", nome: "Cinquenta Mil", descricao: "Você chegou a 50.000 pontos!", condicao: (game) => game.score >= 50000 },
    { id: "score_100000", nome: "Cem Mil", descricao: "Você chegou a 100.000 pontos!", condicao: (game) => game.score >= 100000 },
    { id: "score_250000", nome: "Quarto de Milhão", descricao: "Você chegou a 250.000 pontos!", condicao: (game) => game.score >= 250000 },
    { id: "score_500000", nome: "Meio Milhão", descricao: "Você chegou a 500.000 pontos!", condicao: (game) => game.score >= 500000 },
    { id: "score_1000000", nome: "Lenda do Clicker", descricao: "Você chegou a 1.000.000 pontos!", condicao: (game) => game.score >= 1000000 },
    { id: "score_5000000", nome: "Cinco Milhões", descricao: "Você chegou a 5.000.000 pontos!", condicao: (game) => game.score >= 5000000 },
    { id: "score_10000000", nome: "Dez Milhões", descricao: "Você chegou a 10.000.000 pontos!", condicao: (game) => game.score >= 10000000 },
    { id: "score_50000000", nome: "Cinquenta Milhões", descricao: "Você chegou a 50.000.000 pontos!", condicao: (game) => game.score >= 50000000 },
    { id: "score_100000000", nome: "Cem Milhões", descricao: "Você chegou a 100.000.000 pontos!", condicao: (game) => game.score >= 100000000 },
    { id: "score_500000000", nome: "Meio Bilhão", descricao: "Você chegou a 500.000.000 pontos!", condicao: (game) => game.score >= 500000000 },
    { id: "score_1000000000", nome: "Um Bilhão", descricao: "Você chegou a 1.000.000.000 pontos!", condicao: (game) => game.score >= 1000000000 },
    { id: "score_9999999999", nome: "Fim do Jogo?", descricao: "Você chegou a 9.999.999.999 pontos!", condicao: (game) => game.score >= 9999999999 },
    { id: "score_123456789", nome: "Sequência Épica", descricao: "Você chegou a 123.456.789 pontos!", condicao: (game) => game.score >= 123456789 },
    { id: "score_31415926", nome: "Pi do Click", descricao: "Você chegou a 31.415.926 pontos!", condicao: (game) => game.score >= 31415926 },
    { id: "score_27182818", nome: "Número de Ouro", descricao: "Você chegou a 27.182.818 pontos!", condicao: (game) => game.score >= 27182818 },
    { id: "score_8675309", nome: "Jenny!", descricao: "Você chegou a 8.675.309 pontos!", condicao: (game) => game.score >= 8675309 },

    // PROFESSORES 
    { id: "tres_professores", nome: "Aprendiz", descricao: "Você comprou 3 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 3 },
    { id: "quatro_professores", nome: "Colecionador Iniciante", descricao: "Você comprou 4 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 4 },
    { id: "cinco_professores", nome: "Colecionador de Professores", descricao: "Você comprou 5 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 5 },
    { id: "seis_professores", nome: "Professor Fanático", descricao: "Você comprou 6 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 6 },
    { id: "sete_professores", nome: "Guru do Click", descricao: "Você comprou 7 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 7 },
    { id: "oito_professores", nome: "Mestre do Saber", descricao: "Você comprou 8 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 8 },
    { id: "nove_professores", nome: "Lenda do Ensino", descricao: "Você comprou 9 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 9 },
    { id: "dez_professores", nome: "Colecionador Supremo", descricao: "Você comprou 10 professores!", condicao: (game) => Object.values(game.professoresComprados).length >= 10 },
    { id: "todos_professores", nome: "Colecionador Lendário", descricao: "Você comprou todos os professores!", condicao: (game) => Object.values(game.professoresComprados).length === Object.keys(game.professoresComprados).length },

    // RESETS
    { id: "reset_1", nome: "Reinício Estratégico", descricao: "Você reiniciou o jogo 1 vez!", condicao: () => Number(localStorage.getItem("resets")) >= 1 },
    { id: "reset_3", nome: "Recomeço Experiente", descricao: "Você reiniciou o jogo 3 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 3 },
    { id: "reset_5", nome: "Recomeço Infinito", descricao: "Você reiniciou o jogo 5 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 5 },
    { id: "reset_7", nome: "Resetador", descricao: "Você reiniciou o jogo 7 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 7 },
    { id: "reset_10", nome: "O Reset é o Caminho", descricao: "Você reiniciou o jogo 10 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 10 },
    { id: "reset_20", nome: "Reset Mestre", descricao: "Você reiniciou o jogo 20 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 20 },
    { id: "reset_50", nome: "Reset Lendário", descricao: "Você reiniciou o jogo 50 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 50 },
    { id: "reset_100", nome: "Reset Épico", descricao: "Você reiniciou o jogo 100 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 100 },
    { id: "reset_500", nome: "Reset Monstro", descricao: "Você reiniciou o jogo 500 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 500 },
    { id: "reset_1000", nome: "Reset Deus", descricao: "Você reiniciou o jogo 1000 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 1000 },

    // BACKGROUND / VISUAIS 
    { id: "bg_1", nome: "Mestre das Salas", descricao: "Você trocou o background 3 vezes!", condicao: (game) => game.bonus >= 7 },
    { id: "bg_3", nome: "Amante do Visual", descricao: "Você trocou o background 7 vezes!", condicao: (game) => game.bonus >= 16 },
    { id: "bg_5", nome: "Decorador", descricao: "Você trocou o background 10 vezes!", condicao: (game) => game.bonus >= 25 },
    { id: "bg_7", nome: "Artista do Click", descricao: "Você trocou o background 15 vezes!", condicao: (game) => game.bonus >= 30 },
    { id: "bg_10", nome: "DJ Cicero", descricao: "Você ouviu todas as músicas pelo menos uma vez!", condicao: (game) => {
      const musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
      return musicPlayed.length >= 10;
    }},

    //  TEMPO DE JOGO 
    { id: "sem_sono", nome: "Sem Sono", descricao: "Você jogou por mais de 1 hora sem fechar a página!", condicao: () => {
      const start = Number(localStorage.getItem("startTime")) || Date.now();
      return Date.now() - start >= 3600000;
    }},
    { id: "maratona_2h", nome: "Maratona de 2h", descricao: "Você jogou por 2 horas sem fechar!", condicao: () => {
      const start = Number(localStorage.getItem("startTime")) || Date.now();
      return Date.now() - start >= 7200000;
    }},
    { id: "maratona_4h", nome: "Maratona Extrema", descricao: "Você jogou por 4 horas sem fechar!", condicao: () => {
      const start = Number(localStorage.getItem("startTime")) || Date.now();
      return Date.now() - start >= 14400000;
    }},
    { id: "maratona_8h", nome: "Clicker Insano", descricao: "Você jogou 8 horas seguidas!", condicao: () => {
      const start = Number(localStorage.getItem("startTime")) || Date.now();
      return Date.now() - start >= 28800000;
    }},
    { id: "maratona_24h", nome: "Maratona Épica", descricao: "Você jogou 24 horas seguidas!", condicao: () => {
      const start = Number(localStorage.getItem("startTime")) || Date.now();
      return Date.now() - start >= 86400000;
    }},

    //  SECRETAS
    { id: "ghost_mode", nome: "Fantasma", descricao: "Entrou como convidado e alcançou 1000 pontos!", condicao: (game) => game.session === "convidado" && game.score >= 1000 },
    { id: "convidado_pro", nome: "Turista Profissional", descricao: "Como convidado, você alcançou 50.000 pontos!", condicao: (game) => game.session === "convidado" && game.score >= 50000 },
    { id: "click_hell", nome: "Inferno do Clique", descricao: "Você clicou 6666 vezes!", condicao: (game) => game.totalClicks >= 6666 },
    { id: "easter_egg_1", nome: "Easter Egg #1", descricao: "Você achou um segredo!", condicao: (game) => false },
    { id: "easter_egg_2", nome: "Easter Egg #2", descricao: "Segredo escondido!", condicao: (game) => false },
    { id: "easter_egg_3", nome: "Easter Egg #3", descricao: "Segredo escondido!", condicao: (game) => false },
    { id: "easter_egg_4", nome: "Easter Egg #4", descricao: "Segredo escondido!", condicao: (game) => false },
    { id: "easter_egg_5", nome: "Easter Egg #5", descricao: "Segredo escondido!", condicao: (game) => false }
  ],

  checar(game, desbloqueadas) {
    const novas = [];
    for (let i = 0; i < this.lista.length; i++) {
      const c = this.lista[i];
      if (!desbloqueadas.includes(c.id) && c.condicao(game)) {
        novas.push(c);
      }
    }
    return novas;
  },

  getPorId(id) {
    return this.lista.find(c => c.id === id);
  }
};