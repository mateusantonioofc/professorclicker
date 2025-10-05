const ASSETS_PROFESSORES_PATH = "assets/professores/";
const ASSETS_BACKGROUNDS_PATH = "assets/backgrounds/";

export const PROFESSORES = {
  teti_anao: {
    id: "teti_anao",
    nome: "Teti Anão",
    preco: 50,
    bonus: 2,
    img: ASSETS_PROFESSORES_PATH + "teti_anao.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}montanha.jpg')`,
  },
  teti_supremo: {
    id: "teti_supremo",
    nome: "Teti Supremo",
    preco: 300,
    bonus: 3,
    img: ASSETS_PROFESSORES_PATH + "teti.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}sala.jpg')`
  },
  teti_mulher: {
    id: "teti_mulher",
    nome: "Teti Mulher",
    preco: 2500,
    bonus: 5,
    img: ASSETS_PROFESSORES_PATH + "teti_mulher.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}cozinha.jpg')`,
    autoClickIntervalo: -1
  },
  felipe_grego: {
    id: "felipe_grego",
    nome: "Felipe O Grego τ",
    preco: 5000,
    bonus: 7,
    img: ASSETS_PROFESSORES_PATH + "felipe.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}fisica.jpg')`,
    autoClickIntervalo: 4500
  },
  dom_sheyla_ii: {
    id: "dom_sheyla_ii",
    nome: "Dom Sheyla II",
    preco: 10000,
    bonus: 9,
    img: ASSETS_PROFESSORES_PATH + "sheyla.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}surubanco.jpg')`,
    autoClickIntervalo: 4000
  },
  mr_glauco: {
    id: "mr_glauco",
    nome: "Mr. Glauco",
    preco: 20000,
    bonus: 11,
    img: ASSETS_PROFESSORES_PATH + "glauco.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}fenda.jpg')`,
    autoClickIntervalo: 3500
  },
  master_rick: {
    id: "master_rick",
    nome: "Master Rick",
    preco: 50000,
    bonus: 13,
    img: ASSETS_PROFESSORES_PATH + "richardson.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}programa.jpg')`,
    autoClickIntervalo: 3250
  },
  silvio_goat: {
    id: "silvio_goat",
    nome: "Silvio Goat",
    preco: 75000,
    bonus: 16,
    img: ASSETS_PROFESSORES_PATH + "silvio.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}ibura.jpg')`,
    autoClickIntervalo: 3000
  },
  silvio_furry: {
    id: "silvio_furry",
    nome: "Silvio Furry",
    preco: 100000,
    bonus: 19,
    img: ASSETS_PROFESSORES_PATH + "silvio_furry.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}academia.jpg')`,
    autoClickIntervalo: 2750
  },
  rejane_latin: {
    id: "rejane_latin",
    nome: "Rejane Latin",
    preco: 130000,
    bonus: 24,
    img: ASSETS_PROFESSORES_PATH + "rejane.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}biblioteca.jpg')`,
    autoClickIntervalo: 2000
  },
  luana_filosofa: {
    id: "luana_filosofa",
    nome: "Luana Filosofa",
    preco: 155000,
    bonus: 32,
    img: ASSETS_PROFESSORES_PATH + "luana.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}pontanegra.webp')`,
    autoClickIntervalo: 1000
  },
  luana_sociologa: {
    id: "luana_sociologa",
    nome: "Luana Sociologa",
    preco: 200000,
    bonus: 37,
    img: ASSETS_PROFESSORES_PATH + "luanasocio.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}pontanegra.webp')`,
    autoClickIntervalo: 300
  }
};

export function getProfessor(id) {
  return PROFESSORES[id];
}