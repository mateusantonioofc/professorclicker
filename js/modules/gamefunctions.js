import { Storage } from "./storage.js";
import { Sounds } from "./sounds.js";

export const GameFuncs = {
  score: Storage.loadScore() || 0,
  bonus: 1,
  professoresComprados: Storage.loadProfessores() || {},
  conquistasDesbloqueadas: Storage.loadConquistas() || [],
  rebirths: Storage.loadRebirths() || 0,

  musicaIniciada: false,
  clicksLog: Storage.loadClicksLog() || [],

  autoClickInterval: null,
  conquistaQueue: [],
  processingConquista: false,

  ativarAutoClick(intervaloMs = 500, countFn, mostrarNotif = true, bonus = 1) {
    if (this.autoClickInterval) clearInterval(this.autoClickInterval);
    this.autoClickInterval = setInterval(countFn, intervaloMs);

    if (mostrarNotif) {
      const msg = bonus === 5
        ? "VOCÊ DESBLOQUEOU AUTO CLICK! Compre novos professores para aprimorar."
        : "AUTO CLICK ATIVADO ✅";
      this.notify(msg);
    }
  },

  desativarAutoClick() {
    if (this.autoClickInterval) {
      clearInterval(this.autoClickInterval);
      this.autoClickInterval = null;
      this.notify("Clique automático desativado! ⏱️");
    }
  },

  notify(message, type = "normal") {
    const container = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.classList.add("notification");
    if (type === "error") notification.classList.add("error");
    notification.innerText = message;
    container.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 10);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 1500);
    }, 3000);
  },

  notifyConquista(message) {
    this.conquistaQueue.push(message);
    this.processConquistaQueue();
  },

  processConquistaQueue() {
    if (this.processingConquista || this.conquistaQueue.length === 0) return;
    this.processingConquista = true;

    const message = this.conquistaQueue.shift();
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
        this.processingConquista = false;
        this.processConquistaQueue();
      }, 500);
    }, 4000);
  },

  saveAll(username, session) {
    Storage.saveScore(this.score);
    Storage.saveProfessores(this.professoresComprados);
    Storage.saveConquistas(this.conquistasDesbloqueadas);
    Storage.saveRebirths(this.rebirths);

    if (session === "login" && username) {
      fetch(`https://professorclicker-api.vercel.app/api/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: this.score,
          professores_comprados: this.professoresComprados,
          conquistas: this.conquistasDesbloqueadas,
          rebirths: this.rebirths
        })
      }).catch(err => console.error("Erro ao salvar no servidor:", err));
    }
  },

  async loadUserData(username, session) {
    if (session === "login" && username) {
      try {
        const res = await fetch(`https://professorclicker-api.vercel.app/api/${username}`);
        if (!res.ok) throw new Error("Falha ao buscar dados do servidor");

        const serverData = await res.json();

        this.score = Math.max(this.score, serverData.score || 0);
        this.professoresComprados = { ...serverData.professores_comprados, ...this.professoresComprados };
        this.conquistasDesbloqueadas = Array.from(new Set([...(serverData.conquistas || []), ...this.conquistasDesbloqueadas]));
        this.rebirths = serverData.rebirths || 0;

        this.bonus = 1 + this.rebirths;

        this.saveAll(username, session);
      } catch (err) {
        console.error("Erro ao carregar dados do servidor:", err);
      }
    } else {
      this.rebirths = Storage.loadRebirths() || 0;
      this.bonus = 1 + this.rebirths;
    }
  },


  gerarNome() {
    const substantivos = ["Gabiru", "Miojo", "Coxinha", "Sagui", "Mamífero", "Sabugo", "Calabreso", "Chinelo"];
    const adjetivos = ["Labubônico", "Emburrado", "Carente", "Teimoso", "DaSilva", "Guloso", "Tabacudo", "Abestado", "Fofolete"];
    const numero = Math.floor(Math.random() * 1000);

    const sub = substantivos[Math.floor(Math.random() * substantivos.length)];
    const adj = adjetivos[Math.floor(Math.random() * adjetivos.length)];

    return `${sub}${adj}${numero}`;
  },

  async repetirDeAno(username, session, scoreAtual) {
    let rebirthsCount = this.rebirths || 0;
    const custo = 100000 * (rebirthsCount + 1);

    if (scoreAtual < custo) {
      this.notify(
        `Você precisa de ${custo.toLocaleString("pt-BR")} pontos para repetir de ano!`,
        "error"
      );
      return false;
    }

    this.rebirths = rebirthsCount + 1;
    this.bonus = 1 + this.rebirths;

    this.score = 0;
    this.professoresComprados = {};

    await fetch(`https://professorclicker-api.vercel.app/api/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: this.score,
        professores_comprados: {},
        conquistas: this.conquistasDesbloqueadas,
        rebirths: this.rebirths
      })
    }).catch(err => console.error("Erro ao salvar rebirth no servidor:", err));

    Storage.saveScore(0);
    Storage.saveProfessores({});
    Storage.saveRebirths(this.rebirths);

    this.notify(
      `🎓 Você repetiu de ano! Agora tem ${this.rebirths} repetição(ões) e seu bônus de clique é x${this.bonus}!`
    );

    return true;
  }

};
