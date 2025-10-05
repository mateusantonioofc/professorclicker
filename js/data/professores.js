export const PROFESSORES = {
  teti_anao: {
    id: "teti_anao",
    nome: "Teti Anão",
    preco: 50,
    bonus: 2,
    img: "assets/professores/teti_anao.png",
    background: "url('assets/backgrounds/montanha.jpg')",

  },
  teti_supremo: {
    id: "teti_supremo",
    nome: "Teti Supremo",
    preco: 300,
    bonus: 3,
    img: "assets/professores/teti.png",
    background: "url('assets/backgrounds/sala.jpg')"
  },
  teti_mulher: {
    id: "teti_mulher",
    nome: "Teti Mulher",
    preco: 2500,
    bonus: 5,
    img: "assets/professores/teti_mulher.png",
    background: "url('assets/backgrounds/cozinha.jpg')",
    autoClickIntervalo: -1
  },
  felipe_grego: {
    id: "felipe_grego",
    nome: "Felipe O Grego τ",
    preco: 5000,
    bonus: 7,
    img: "assets/professores/felipe.png",
    background: "url('assets/backgrounds/fisica.jpg')",
    autoClickIntervalo: 4500
  },
  dom_sheyla_ii: {
    id: "dom_sheyla_ii",
    nome: "Dom Sheyla II",
    preco: 10000,
    bonus: 9,
    img: "assets/professores/sheyla.png",
    background: "url('assets/backgrounds/surubanco.jpg')",
    autoClickIntervalo: 4000
  },
  mr_glauco: {
    id: "mr_glauco",
    nome: "Mr. Glauco",
    preco: 20000,
    bonus: 11,
    img: "assets/professores/glauco.png",
    background: "url('assets/backgrounds/fenda.jpg')",
    autoClickIntervalo: 3500
  },
  master_rick: {
    id: "master_rick",
    nome: "Master Rick",
    preco: 50000,
    bonus: 13,
    img: "assets/professores/richardson.png",
    background: "url('assets/backgrounds/programa.jpg')",
    autoClickIntervalo: 3250
  },
  silvio_goat: {
    id: "silvio_goat",
    nome: "Silvio Goat",
    preco: 75000,
    bonus: 16,
    img: "assets/professores/silvio.png",
    background: "url('assets/backgrounds/ibura.jpg')",
    autoClickIntervalo: 3000
  },
  silvio_furry: {
    id: "silvio_furry",
    nome: "Silvio Furry",
    preco: 100000,
    bonus: 19,
    img: "assets/professores/silvio_furry.png",
    background: "url('assets/backgrounds/academia.jpg')",
    autoClickIntervalo: 2750
  },
  rejane_latin: {
    id: "rejane_latin",
    nome: "Rejane Latin",
    preco: 130000,
    bonus: 24,
    img: "assets/professores/rejane.png",
    background: "url('assets/backgrounds/biblioteca.jpg')",
    autoClickIntervalo: 2000
  },
  luana_filosofa: {
    id: "luana_filosofa",
    nome: "Luana Filosofa",
    preco: 155000,
    bonus: 32,
    img: "assets/professores/luana.jpeg",
    background: "url('assets/backgrounds/pontanegra.webp')",
    autoClickIntervalo: 1000
  },
  luana_sociologa: {
    id: "luana_sociologa",
    nome: "Luana Sociologa",
    preco: 200000,
    bonus: 37,
    img: "assets/professores/luanasocio.jpeg",
    background: "url('assets/backgrounds/pontanegra.webp')",
    autoClickIntervalo: 300
  }
};

export function getProfessor(id) {
  return PROFESSORES[id];
}
