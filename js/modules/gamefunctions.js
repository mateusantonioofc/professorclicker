import { Storage } from "./storage.js";
import { Sounds } from "./sounds.js";

export const GameFuncs = {
  autoClickInterval: null,

  // ta no nome da funçaõ né tropa p l m d s
  ativarAutoClick(intervaloMs = 500, countFn, mostrarNotif = true, bonus = 1) {
    if (this.autoClickInterval) clearInterval(this.autoClickInterval);
    this.autoClickInterval = setInterval(countFn, intervaloMs);

    if (mostrarNotif) {
      const msg = bonus === 5 ? 
        "VOCÊ DESBLOQUEOU AUTO CLICK, COMPRE NOVOS PROFESSORES PARA DAR UPGRADE NELE" : 
        "AUTO CLICK UPADO ✅";
      this.notify(msg);
    }
  },

  // aq tb
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
      setTimeout(() => notification.remove(), 1000);
    }, 3000);
  },

  // sorteia um ajdetivo e substantivo e poe um numero tlg
  gerarNome() {
    const substantivos = ["Gabiru", "Miojo", "Coxinha", "Sagui", "Mamífero", "Sabugo", "Calabreso", "Chinelo"];
    const adjetivos = ["Labubônico", "Emburrado", "Carente", "Teimoso", "DaSilva", "Guloso", "Tabacudo","Abestado", "Fofolete"];
    const numero = Math.floor(Math.random() * 1000); // 0 a 999

    const sub = substantivos[Math.floor(Math.random() * substantivos.length)];
    const adj = adjetivos[Math.floor(Math.random() * adjetivos.length)];

    return `${sub}${adj}${numero}`;
  }
};
