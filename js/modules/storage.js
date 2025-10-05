export const Storage = {
  // salva e carrega a pontuação do usuario
  saveScore(score) { localStorage.setItem('score', score); },
  loadScore() { return Number(localStorage.getItem('score')) || 0; },
  
  // salva e carrega professores
  saveProfessores(profs) { localStorage.setItem('professores_comprados', JSON.stringify(profs)); },
  loadProfessores() { return JSON.parse(localStorage.getItem('professores_comprados') || '{}'); },
  
  // salva e carrega as conqistas
  saveConquistas(cons) { localStorage.setItem('conquistas', JSON.stringify(cons)); },
  loadConquistas() { return JSON.parse(localStorage.getItem('conquistas') || '[]'); },

  loadStartTime() {
    if (!localStorage.getItem('startTime')) localStorage.setItem('startTime', Date.now());
    return Number(localStorage.getItem('startTime'));
  },

  loadClicksLog() {
    if (!localStorage.getItem('clicksLog')) localStorage.setItem('clicksLog', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('clicksLog'));
  }
};
