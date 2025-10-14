const ASSETS_PROFESSORES_PATH = "assets/professores/";
const ASSETS_BACKGROUNDS_PATH = "assets/backgrounds/";

export const PROFESSORES = {
  teti_anao: {
    id: "teti_anao",
    nome: "Teti Anão",
    preco: 50,
    bonus: 1,
    img: ASSETS_PROFESSORES_PATH + "teti_anao.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}montanha.jpg')`,
  },
  teti_supremo: {
    id: "teti_supremo",
    nome: "Teti Supremo",
    preco: 250,
    bonus: 2,
    img: ASSETS_PROFESSORES_PATH + "teti.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}sala.jpg')`
  },
  teti_mulher: {
    id: "teti_mulher",
    nome: "Teti Mulher",
    preco: 1500,
    bonus: 4,
    img: ASSETS_PROFESSORES_PATH + "teti_mulher.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}cozinha.jpg')`,
    autoClickIntervalo: 5000
  },
  felipe_grego: {
    id: "felipe_grego",
    nome: "Felipe O Grego τ",
    preco: 4000,
    bonus: 7,
    img: ASSETS_PROFESSORES_PATH + "felipe.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}fisica.jpg')`,
    autoClickIntervalo: 4500
  },
  dom_sheyla_ii: {
    id: "dom_sheyla_ii",
    nome: "Dom Sheyla II",
    preco: 9000,
    bonus: 10,
    img: ASSETS_PROFESSORES_PATH + "sheyla.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}surubanco.jpg')`,
    autoClickIntervalo: 4000
  },
  mr_glauco: {
    id: "mr_glauco",
    nome: "Mr. Glauco",
    preco: 18000,
    bonus: 12,
    img: ASSETS_PROFESSORES_PATH + "glauco.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}fenda.jpg')`,
    autoClickIntervalo: 3500
  },
  master_rick: {
    id: "master_rick",
    nome: "Master Rick",
    preco: 40000,
    bonus: 15,
    img: ASSETS_PROFESSORES_PATH + "richardson.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}programa.jpg')`,
    autoClickIntervalo: 3000
  },
  silvio_goat: {
    id: "silvio_goat",
    nome: "Silvio Goat",
    preco: 60000,
    bonus: 18,
    img: ASSETS_PROFESSORES_PATH + "silvio.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}ibura.jpg')`,
    autoClickIntervalo: 2500
  },
  silvio_furry: {
    id: "silvio_furry",
    nome: "Silvio Furry",
    preco: 80000,
    bonus: 22,
    img: ASSETS_PROFESSORES_PATH + "silvio_furry.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}academia.jpg')`,
    autoClickIntervalo: 2250
  },
  rejane_latin: {
    id: "rejane_latin",
    nome: "Rejane Latin",
    preco: 120000,
    bonus: 26,
    img: ASSETS_PROFESSORES_PATH + "rejane.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}biblioteca.jpg')`,
    autoClickIntervalo: 2000
  },
  luana_filosofa: {
    id: "luana_filosofa",
    nome: "Luana Filosofa",
    preco: 150000,
    bonus: 30,
    img: ASSETS_PROFESSORES_PATH + "luana.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}pontanegra.webp')`,
    autoClickIntervalo: 1500
  },
  luana_sociologa: {
    id: "luana_sociologa",
    nome: "Luana Sociologa",
    preco: 180000,
    bonus: 34,
    img: ASSETS_PROFESSORES_PATH + "luanasocio.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}pontanegra.webp')`,
    autoClickIntervalo: 500
  },
  gabriel: {
    id: "gabriel",
    nome: "Gabriel, o Maromba",
    preco: 250000,
    bonus: 38,
    img: ASSETS_PROFESSORES_PATH + "gabriel.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}academiagta.webp')`,
    autoClickIntervalo: 400,
  },
  xandinho: {
    id: "xandinho",
    nome: "White Xandinho",
    preco: 300000,
    bonus: 42,
    img: ASSETS_PROFESSORES_PATH + "xandinho.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}deserto.png')`,
    autoClickIntervalo: 350
  },
  dani: {
    id: "dani",
    nome: "Dani",
    preco: 350000,
    bonus: 45,
    img: ASSETS_PROFESSORES_PATH + "dani.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}mapa.webp')`,
    autoClickIntervalo: 300
  },
  albino: {
    id: "albino",
    nome: "Albino Albino",
    preco: 400000,
    bonus: 50,
    img: ASSETS_PROFESSORES_PATH + "albino.jpg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}caverna.png')`,
    autoClickIntervalo: 270
  },
  amaro: {
    id: "amaro",
    nome: "Amaro",
    preco: 450000,
    bonus: 55,
    img: ASSETS_PROFESSORES_PATH + "amaronormal.jpeg",
    background: `url('${ASSETS_BACKGROUNDS_PATH}natureza.jpeg')`,
    autoClickIntervalo: 260
  },
  amaro_prime: {
    id: "amaro_prime",
    nome: "Amaro Prime",
    preco: 475000,
    bonus: 60,
    img: ASSETS_PROFESSORES_PATH + "amaro.png",
    background: `url('${ASSETS_BACKGROUNDS_PATH}prime.jpeg')`,
    autoClickIntervalo: 250
  }
};

export function getProfessor(id) {
  return PROFESSORES[id];
}
