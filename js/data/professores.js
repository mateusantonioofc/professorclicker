const ASSETS_PROFESSORES_PATH = "assets/professores/";
const ASSETS_BACKGROUNDS_PATH = "assets/backgrounds/";

export const PROFESSORES = {
  dom_sheyla_ii: {
    id: "dom_sheyla_ii",
    nome: "Dom Sheyla II",
    preco: 50,
    bonus: 2,
    img: ASSETS_PROFESSORES_PATH + "sheyla.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}surubanco.jpg')`,
  },
  mr_glauco: {
    id: "mr_glauco",
    nome: "Mr. Glauco",
    preco: 250,
    bonus: 3,
    img: ASSETS_PROFESSORES_PATH + "glauco.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}fenda.jpg')`,
  },
  master_rick: {
    id: "master_rick",
    nome: "Master Rick",
    preco: 1500,
    bonus: 4,
    img: ASSETS_PROFESSORES_PATH + "richardson.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}programa.jpg')`,
    autoClickIntervalo: 4000
  },
  felipe_grego: {
    id: "felipe_grego",
    nome: "Felipe O Grego τ",
    preco: 4000,
    bonus: 7,
    img: ASSETS_PROFESSORES_PATH + "felipe.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}fisica.jpg')`,
    autoClickIntervalo: 3750
  },
  teti_anao: {
    id: "teti_anao",
    nome: "Teti Anão",
    preco: 9000,
    bonus: 10,
    img: ASSETS_PROFESSORES_PATH + "teti_anao.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}montanha.jpg')`,
    autoClickIntervalo: 3500
  },
  teti_supremo: {
    id: "teti_supremo",
    nome: "Teti Supremo",
    preco: 18000,
    bonus: 12,
    img: ASSETS_PROFESSORES_PATH + "teti.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}sala.jpg')`,
    autoClickIntervalo: 3200
  },
  teti_mulher: {
    id: "teti_mulher",
    nome: "Teti Mulher",
    preco: 40000,
    bonus: 15,
    img: ASSETS_PROFESSORES_PATH + "teti_mulher.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}cozinha.jpg')`,
    autoClickIntervalo: 2800
  },
  amaro: {
    id: "amaro",
    nome: "Amaro Bezerra",
    preco: 60000,
    bonus: 17,
    img: ASSETS_PROFESSORES_PATH + "amaronormal.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}natureza.jpeg')`,
    autoClickIntervalo: 2000
  },
  amaro_prime: {
    id: "amaro_prime",
    nome: "Amaro Prime",
    preco: 80000,
    bonus: 20,
    img: ASSETS_PROFESSORES_PATH + "amaro.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}prime.jpeg')`,
    autoClickIntervalo: 1780
  },
  dani: {
    id: "dani",
    nome: "Dani",
    preco: 120000,
    bonus: 26,
    img: ASSETS_PROFESSORES_PATH + "dani.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}mapa.webp')`,
    autoClickIntervalo: 1600
  },
  luana_filosofa: {
    id: "luana_filosofa",
    nome: "Luana Filosofa",
    preco: 150000,
    bonus: 30,
    img: ASSETS_PROFESSORES_PATH + "luana.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}pontanegra.webp')`,
    autoClickIntervalo: 1550
  },
  luana_sociologa: {
    id: "luana_sociologa",
    nome: "Luana Sociologa",
    preco: 180000,
    bonus: 34,
    img: ASSETS_PROFESSORES_PATH + "luanasocio.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}pontanegra.webp')`,
    autoClickIntervalo: 1300
  },
  gabriel: {
    id: "gabriel",
    nome: "Gabriel, o Maromba",
    preco: 250000,
    bonus: 38,
    img: ASSETS_PROFESSORES_PATH + "gabriel.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}academiagta.webp')`,
    autoClickIntervalo: 1000,
  },
  xandinho: {
    id: "xandinho",
    nome: "White Xandinho",
    preco: 300000,
    bonus: 42,
    img: ASSETS_PROFESSORES_PATH + "xandinho.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}deserto.png')`,
    autoClickIntervalo: 800
  },
  rejane_latin: {
    id: "rejane_latin",
    nome: "Rejane Latin",
    preco: 350000,
    bonus: 45,
    img: ASSETS_PROFESSORES_PATH + "rejane.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}biblioteca.jpg')`,
    autoClickIntervalo: 600
  },
  albino: {
    id: "albino",
    nome: "Albino Albino",
    preco: 400000,
    bonus: 50,
    img: ASSETS_PROFESSORES_PATH + "albino.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}caverna.png')`,
    autoClickIntervalo: 400
  },
  silvio_goat: {
    id: "silvio_goat",
    nome: "Silvio Goat",
    preco: 450000,
    bonus: 50,
    img: ASSETS_PROFESSORES_PATH + "silvio.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}ibura.jpg')`,
    autoClickIntervalo: 300
  },
  silvio_furry: {
    id: "silvio_furry",
    nome: "Silvio Furry",
    preco: 475000,
    bonus: 60,
    img: ASSETS_PROFESSORES_PATH + "silvio_furry.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}academia.jpg')`,
    autoClickIntervalo: 200
  },
};

export function getProfessor(id) {
  return PROFESSORES[id];
}
