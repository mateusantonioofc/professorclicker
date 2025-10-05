/* Lista de todas as conquistas do jogo  
 * Cada conquista possui:  
 * - id: identificador único  
 * - nome: título da conquista  
 * - descricao: descrição da conquista  
 * - condicao: função que retorna true se a conquista foi atingida  
 * - recompensa (opcional): pontos ou função como recompensa  
 */
export const CONQUISTAS = {

  lista: [
    { id: "primeiro_ponto", nome: "Primeiro Ponto", descricao: "Você alcançou 1 ponto!", condicao: (game) => game.score >= 1 },
    { id: "dez_pontos", nome: "Dez Pontos", descricao: "Você alcançou 10 pontos!", condicao: (game) => game.score >= 10 },
    { id: "cem_pontos", nome: "Cem Pontos", descricao: "Você alcançou 100 pontos!", condicao: (game) => game.score >= 100 },
    { id: "quinhentos_pontos", nome: "Quinhentos Pontos", descricao: "Você alcançou 500 pontos!", condicao: (game) => game.score >= 500 },
    { id: "mil_pontos", nome: "Mil Pontos", descricao: "Você alcançou 1.000 pontos!", condicao: (game) => game.score >= 1000 },
    { id: "cinco_mil_pontos", nome: "Cinco Mil Pontos", descricao: "Você alcançou 5.000 pontos!", condicao: (game) => game.score >= 5000 },
    { id: "dez_mil_pontos", nome: "Dez Mil Pontos", descricao: "Você alcançou 10.000 pontos!", condicao: (game) => game.score >= 10000 },
    { id: "cinquenta_mil_pontos", nome: "Cinquenta Mil Pontos", descricao: "Você alcançou 50.000 pontos!", condicao: (game) => game.score >= 50000 },
    { id: "cem_mil_pontos", nome: "Cem Mil Pontos", descricao: "Você alcançou 100.000 pontos!", condicao: (game) => game.score >= 100000 },
    { id: "meio_milhao_pontos", nome: "Meio Milhão de Pontos", descricao: "Você alcançou 500.000 pontos!", condicao: (game) => game.score >= 500000 },
    { id: "um_milhao_pontos", nome: "Um Milhão de Pontos", descricao: "Você alcançou 1.000.000 pontos!", condicao: (game) => game.score >= 1000000 },
    { id: "cinco_milhoes_pontos", nome: "Cinco Milhões de Pontos", descricao: "Você alcançou 5.000.000 pontos!", condicao: (game) => game.score >= 5000000 },
    { id: "dez_milhoes_pontos", nome: "Dez Milhões de Pontos", descricao: "Você alcançou 10.000.000 pontos!", condicao: (game) => game.score >= 10000000 },
    { id: "cinquenta_milhoes_pontos", nome: "Cinquenta Milhões de Pontos", descricao: "Você alcançou 50.000.000 pontos!", condicao: (game) => game.score >= 50000000 },
    { id: "cem_milhoes_pontos", nome: "Cem Milhões de Pontos", descricao: "Você alcançou 100.000.000 pontos!", condicao: (game) => game.score >= 100000000 },


    { id: "primeiro_professor", nome: "Primeiro Professor", descricao: "Você comprou seu primeiro professor!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 1 },
    { id: "aprendiz", nome: "Aprendiz", descricao: "Você comprou 2 professores!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 2 },
    { id: "colecionador", nome: "Colecionador", descricao: "Você comprou 3 professores!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 3 },
    { id: "especialista", nome: "Especialista", descricao: "Você comprou 4 professores!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 4 },
    { id: "mestre", nome: "Mestre", descricao: "Você comprou 5 professores!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 5 },
    { id: "guru", nome: "Guru", descricao: "Você comprou 6 professores!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 6 },
    { id: "Todos", nome: "The legend", descricao: "Você comprou todos professores!", condicao: (game) => Object.values(game.professores).filter(v => v).length >= 12 },
    

    { id: "reset_1", nome: "Reinício Estratégico", descricao: "Você reiniciou o jogo 1 vez!", condicao: () => Number(localStorage.getItem("resets")) >= 1 },
    { id: "reset_5", nome: "Recomeço Infinito", descricao: "Você reiniciou o jogo 5 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 5 },
    { id: "reset_10", nome: "O Reset é o Caminho", descricao: "Você reiniciou o jogo 10 vezes!", condicao: () => Number(localStorage.getItem("resets")) >= 10 },

    { id: "background_3", nome: "Mestre das Salas", descricao: "Você trocou o background 3 vezes!", condicao: (game) => game.bonus >= 7 },
    { id: "background_7", nome: "Amante do Visual", descricao: "Você trocou o background 7 vezes!", condicao: (game) => game.bonus >= 16 },

    {
      id: "musica_perfeita", nome: "DJ Cicero", descricao: "Você ouviu todas as músicas pelo menos uma vez!", condicao: () => {
        const musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
        return musicPlayed.length >= 10;
      }
    },

    {
      id: "sem_sono", nome: "Sem Sono", descricao: "Você jogou por mais de 1 hora sem fechar a página!", condicao: () => {
        const start = Number(localStorage.getItem("startTime")) || Date.now();
        return Date.now() - start >= 3600000;
      }
    },

    {
      id: "spam_click", nome: "Dedos de Aço", descricao: "Você clicou 50 vezes em menos de 10 segundos!", condicao: () => {
        const clicks = JSON.parse(localStorage.getItem("clicksLog") || "[]");
        const agora = Date.now();
        const recentes = clicks.filter(t => agora - t <= 10000);
        return recentes.length >= 50;
      }
    },

    { id: "convidado_50k", nome: "Turista Profissional", descricao: "Como convidado, você alcançou 50.000 pontos!", condicao: (game) => game.session === "convidado" && game.score >= 50000 },

    { id: "silvio_fan", nome: "Fã Número 1", descricao: "Você comprou Silvio Goat ou Silvio Furry!", condicao: (game) => game.professores.Silviogoat || game.professores.Silviofurry },
    { id: "professor_legendario", nome: "Professor Lendário", descricao: "Você comprou um professor que custa acima de 100.000 pontos!", condicao: (game) => game.professores.Silviofurry || game.professores.Rejane || game.professores.luanafilosofa || game.professores.luanasociologa },
    {
      id: "todos_os_musicos", nome: "DJ Master", descricao: "Você ouviu todas as músicas do jogo!", condicao: () => {
        const musicPlayed = JSON.parse(localStorage.getItem("musicPlayed") || "[]");
        return musicPlayed.length >= 20;
      }
    },
    { id: "fantasma", nome: "Fantasma", descricao: "Entrou como convidado e alcançou 1.000 pontos!", condicao: (game) => game.session === "convidado" && game.score >= 1000 }

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


