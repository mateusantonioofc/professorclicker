const score = document.getElementById("score");
const cabibara = document.getElementById("cabibara_img");
const tetimulher = document.getElementById("cabibara_1");
const tetianao = document.getElementById("cabibara_2");
const tetisupremo = document.getElementById("cabibara_3");

const VALOR_COMPRA_TETIMULHER = 150;
const VALOR_COMPRA_TETIANAO = 300;
const VALOR_COMPRA_TETISUPREMO = 1500;

const BONUS_TETIMULHER = 2;
const BONUS_TETIANAO = 3;
const BONUS_TETISUPREMO = 6;

let tetimulher_comprado = false;
let tetianao_comprado = false;
let tetisupremo_comprado = false;

let bonus = 1;
let i = 10000;

function load() {
    score.textContent = i;
    checarAnimacoes();
}

function count() {
    i += bonus;
    load();
    score.classList.remove("pop");
    void score.offsetWidth;
    score.classList.add("pop");
}

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
}

function compra1() {
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
        } else {
            notify('Erro: saldo insuficiente ❌');
        }
    } else {
        document.body.style.backgroundImage = "url(../assets/cozinha.webp)";
        cabibara.src = "../assets/cabibara_1.png";
        bonus = BONUS_TETIMULHER;
    }
}

function compra2() {
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

function compra3() {
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
