const score = document.getElementById("score");
const cabibara = document.getElementById("cabibara_img");
const tetimulher = document.getElementById("tetimulher");
const tetianao = document.getElementById("tetianao");
const tetisupremo = document.getElementById("tetisupremo");
const silviofurry = document.getElementById("silviofurry");
const silviogoat = document.getElementById("silviogoat");
const silviofurryshiny = document.getElementById("silviofurryshiny");

const VALOR_COMPRA_TETIMULHER = 50;
const VALOR_COMPRA_TETIANAO = 300;
const VALOR_COMPRA_TETISUPREMO = 1500;
const VALOR_COMPRA_SILVIOFURRY = 10000;
const VALOR_COMPRA_SILVIO =  5000;
const VALOR_COMPRA_SILVIOFURRYSHINY = 1000000000000;

const BONUS_TETIMULHER = 2;
const BONUS_TETIANAO = 3;
const BONUS_TETISUPREMO = 6;
const BONUS_SILVIOGOAT = 9;
const BONUS_SILVIOFURRY = 14;
const BONUS_SILVIOFURRYSHINY = 21;

let tetimulher_comprado = false;
let tetianao_comprado = false;
let tetisupremo_comprado = false;
let silviofurry_comprado = false;
let silviogoat_comprado = false;
let silviofurryshiny_comprado = false;

let i = Number(localStorage.getItem('score')) || 0;
let bonus = 1;

function load() {
    score.textContent = i;
    checarAnimacoes();
}

function saveScore() {
    localStorage.setItem('score', i);
}

setInterval(saveScore(), 5000);

function count() {
    i += bonus;
    load();
    saveScore();
    score.classList.remove("pop");
    cabibara.classList.remove("pop");
    void score.offsetWidth;
    score.classList.add("pop");
    cabibara.classList.add("pop");
}

load();

function checarAnimacoes() {
    if (!tetimulher_comprado && i >= VALOR_COMPRA_TETIMULHER) {
        tetimulher.classList.add("compravel");
    } else {
        tetimulher.classList.remove("compravel");
    }

    if (!tetianao_comprado && i >= VALOR_COMPRA_TETIANAO) {
        tetianao.classList.add("compravel");
    } else {
        tetianao.classList.remove("compravel");
    }

    if (!tetisupremo_comprado && i >= VALOR_COMPRA_TETISUPREMO) {
        tetisupremo.classList.add("compravel");
    } else {
        tetisupremo.classList.remove("compravel");
    }

    if (!silviofurry_comprado && i >= VALOR_COMPRA_SILVIOFURRY) {
        silviofurry.classList.add("compravel");
    } else {
        silviofurry.classList.remove("compravel");
    }

    if (!silviogoat_comprado && i >= VALOR_COMPRA_SILVIO) {
        silviogoat.classList.add("compravel");
    } else {
        silviogoat.classList.remove("compravel");
    }

    if (!silviofurryshiny_comprado && i >= VALOR_COMPRA_SILVIOFURRYSHINY) {
        silviofurryshiny.classList.add("compravel");
    } else {
        silviofurryshiny.classList.remove("compravel");
    }
}

function processarTetiMulher() {
    if (!tetimulher_comprado) {
        if (i >= VALOR_COMPRA_TETIMULHER) {
            i -= VALOR_COMPRA_TETIMULHER;
            load();
            document.body.style.backgroundImage = "url(../assets/cozinha.webp)";
            cabibara.src = "../assets/cabibara_1.png";
            bonus = BONUS_TETIMULHER;
            notify('Voce comprou TeTa Mulher ✅');
            tetimulher_comprado = true;
            tetimulher.classList.remove("compravel");
            tetimulher.classList.add("comprado");
            loadScores();
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        document.body.style.backgroundImage = "url(../assets/cozinha.webp)";
        cabibara.src = "../assets/cabibara_1.png";
        bonus = BONUS_TETIMULHER;
    }
}

function processarTetiAnao() {
    if (!tetianao_comprado) {
        if (i >= VALOR_COMPRA_TETIANAO) {
            i -= VALOR_COMPRA_TETIANAO;
            load();
            cabibara.src = "../assets/cabibara_2.png";
            document.body.style.backgroundImage = "url(../assets/anao.webp)";
            bonus = BONUS_TETIANAO;
            notify('Voce comprou TeTi Anao ✅');
            tetianao_comprado = true;
            tetianao.classList.remove("compravel");
            tetianao.classList.add("comprado");
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        cabibara.src = "../assets/cabibara_2.png";
        document.body.style.backgroundImage = "url(../assets/anao.webp)";
        bonus = BONUS_TETIANAO;
    }
}

function processarTetiSupremo() {
    if (!tetisupremo_comprado) {
        if (i >= VALOR_COMPRA_TETISUPREMO) {
            i -= VALOR_COMPRA_TETISUPREMO;
            load();
            cabibara.src = "../assets/cabibara_3.jpg";
            document.body.style.backgroundImage = "url(../assets/sala.jpg)";
            bonus = BONUS_TETISUPREMO;
            tetisupremo_comprado = true;
            notify('Voce comprou TETI SUPREMOOOO ✅');
            tetisupremo.classList.remove("compravel");
            tetisupremo.classList.add("comprado");
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        cabibara.src = "../assets/cabibara_3.jpg";
        document.body.style.backgroundImage = "url(../assets/sala.jpg)";
        bonus = BONUS_TETISUPREMO;
    }
}

function processarSilvioGoat() {
    if (!silviogoat_comprado) {
        if (i >= VALOR_COMPRA_SILVIO) {
            i -= VALOR_COMPRA_SILVIO;
            load();
            cabibara.src = "../assets/Silviogoat.jpeg";
            document.body.style.backgroundImage = "url(../assets/ibura.jpg)";
            bonus = BONUS_SILVIOGOAT;
            silviogoat_comprado = true;
            notify('Voce comprou SILVIO GOAT ✅');
            alert("VOCÊ COMPROU SILVO GOAT")
            silviogoat.classList.remove("compravel");
            silviogoat.classList.add("comprado");
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        cabibara.src = "../assets/Silviogoat.jpeg";
        document.body.style.backgroundImage = "url(../assets/ibura.jpg)";
        bonus = BONUS_SILVIOGOAT;
    }
}

function processarSilvioFurry() {
    if (!silviofurry_comprado) {
        if (i >= VALOR_COMPRA_SILVIOFURRY) {
            i -= VALOR_COMPRA_SILVIOFURRY;
            load();
            cabibara.src = "../assets/silviogoatfurry.png";
            document.body.style.backgroundImage = "url(../assets/academia.jpg)";
            bonus = BONUS_SILVIOFURRY;
            silviofurry_comprado = true;
            notify('Voce comprou SILVIO GOAT versão furry ✅');
       alert("VOCÊ COMPROU SILVO GOAT VERSÃO FURRY")
            silviofurry.classList.remove("compravel");
            silviofurry.classList.add("comprado");
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        cabibara.src = "../assets/silviogoatfurry.png";
        document.body.style.backgroundImage = "url(../assets/academia.jpg)";
        bonus = BONUS_SILVIOFURRY;
    }
}

function processarSilvioFurryShiny() {
    if (!silviofurryshiny_comprado) {
        if (i >= VALOR_COMPRA_SILVIOFURRYSHINY) {
            i -= VALOR_COMPRA_SILVIOFURRYSHINY;
            load();
            cabibara.src = "../assets/silviofurryshiny.png";
            document.body.style.backgroundImage = "url(../assets/silviofurryshiny.png)";
            bonus = BONUS_SILVIOFURRYSHINY;
            silviofurryshiny_comprado = true;
            notify('Voce comprou SILVIO GOAT VERSÃO SHINY ✅');
            alert("VOCÊ COMPROU SILVO GOAT VERSÃO SHINY");
            silviofurryshiny.classList.remove("compravel");
            silviofurryshiny.classList.add("comprado");
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        cabibara.src = "../assets/silviofurryshiny.png";
        document.body.style.backgroundImage = "url(../assets/silviofurryshiny.png)";
        bonus = BONUS_SILVIOFURRYSHINY;
    }
}

function notify(message, type = "normal") {
    const container = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.classList.add("notification");
    if (type === "error") notification.classList.add("error");
    notification.innerText = message;
    container.appendChild(notification);
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }, 3000);
}

const menuToggle = document.getElementById("menu-toggle");
const store = document.querySelector(".store");

menuToggle.addEventListener("click", () => {
    store.classList.toggle("active");
    menuToggle.classList.toggle("active");
});


// function nomeCompra() {
//     if (!variavelBool) {
//         if (i >= VALORCOMPRA) {
//             i -= VALORCOMPRA;
//             load();
//             cabibara.src = "imagem";
//             document.body.style.backgroundImage = "url(fundo)";
//             bonus = BONUS;
//             variavelBool = true;
//             notify('Voce comprou NOME ✅');
//             tetisupremo.classList.remove("compravel");
//             tetisupremo.classList.add("comprado");
//         } else {
//             notify('Erro: saldo insuficiente ❌');
//         }
//     } else {
//         cabibara.src = "imagem";
//         document.body.style.backgroundImage = "url(fundo)";
//         bonus = BONUS;
//     }
// }
