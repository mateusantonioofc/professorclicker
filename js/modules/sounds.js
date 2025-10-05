export const Sounds = {
  audioPlayer: new Audio(),
  sounds: {
    click: "assets/sfx/click.mp3",
    buy: "assets/sfx/buy.mp3",
    reset: "assets/sfx/reset.mp3",
    ranking: "assets/sfx/ranking.mp3",
    menu: "assets/sfx/menu.mp3"
  },

  play(type) {
    if (!this.sounds[type]) return;
    const audio = new Audio(this.sounds[type]);
    audio.play().catch(() => { });
  },

  tocarAleatoria() {
    const musicas = [
      "assets/sfx/musica1.mp3",
      "assets/sfx/musica2.mp3",
      "assets/sfx/musica3.mp3",
      "assets/sfx/musica4.mp3",
      "assets/sfx/musica5.mp3",
      "assets/sfx/musica6.mp3",
      "assets/sfx/musica7.mp3",
      "assets/sfx/musica8.mp3",
      "assets/sfx/musica10.mp3",
      "assets/sfx/musica11.mp3"
    ];
    const aleatoria = Math.floor(Math.random() * musicas.length);
    this.audioPlayer.src = musicas[aleatoria];
    this.audioPlayer.play().catch(err => console.log("Erro ao tocar música:", err));
  }
};
