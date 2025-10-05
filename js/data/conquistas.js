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
    lista: [
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
            condicao: (game) => game.session === "convidado" && game.score >= 1000
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
            condicao: (game) => game.session === "convidado" && game.score >= 50000
        },
        {
            id: "reset_deus",
            nome: "O Reset é o Caminho",
            descricao: "Você reiniciou o jogo 10 vezes!",
            condicao: () => Number(localStorage.getItem("resets")) >= 10
        },
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
function checarConquistas() {
  const novas = CONQUISTAS.checar({ score, bonus, professores: professoresComprados, session }, conquistasDesbloqueadas);

  novas.forEach(c => {
    
    conquistasDesbloqueadas.push(c.id);
    Storage.saveConquistas(conquistasDesbloqueadas);

    
    notifyConquista(`🏆 Conquista desbloqueada: ${c.nome} -> ${c.descricao}`);

    
    if (typeof c.recompensa === "number") {
      score += c.recompensa;
      Storage.saveScore(score);
      load();

      
      notifyConquista(`🎁 Você ganhou ${c.recompensa} pontos!`);
    } else if (typeof c.recompensa === "function") {
      c.recompensa();
    }
  });
}



function count() {
  score += bonus;
  Storage.saveScore(score);

  checarConquistas(); 

  Sounds.play("click");

  if (clickEl) {
    clickEl.classList.remove("popp");
    void clickEl.offsetWidth;
    clickEl.classList.add("popp");
  }
  if (scoreEl) {
    scoreEl.classList.remove("pop");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("pop");
  }

  if (!musicaIniciada) {
    musicaIniciada = true;
    Sounds.tocarAleatoria();
  }

  clicksLog.push(Date.now());
  clicksLog = clicksLog.filter(t => Date.now() - t <= 20000);
  localStorage.setItem("clicksLog", JSON.stringify(clicksLog));

  load();
}

function comprarProfessor(id) {
  const prof = getProfessor(id);
  if (!prof) return;

  const jaComprado = professoresComprados[id];

  if (!jaComprado) {
    if (score >= prof.preco) {
      score -= prof.preco;
      bonus += prof.bonus;
      professoresComprados[id] = true;

      pointsButton.src = prof.img;
      document.body.style.backgroundImage = prof.background;

      document.getElementById(id)?.classList.remove("compravel");
      document.getElementById(id)?.classList.add("comprado");

      notifyConquista(`Você comprou ${prof.nome} ✅`); // notificação via fila
      saveAll();

      checarConquistas();

      if (prof.autoClickIntervalo) {
        GameFuncs.ativarAutoClick(prof.autoClickIntervalo, count, false, bonus);
      }

      load();
      Sounds.play("buy");
    } else {
      notifyConquista('Erro: saldo insuficiente ❌'); // também fila
    }
  } else {
    pointsButton.src = prof.img;
    document.body.style.backgroundImage = prof.background;
    bonus = prof.bonus;
    if (prof.autoClickIntervalo) {
      GameFuncs.ativarAutoClick(prof.autoClickIntervalo, count, false, bonus);
    }
  }
}


