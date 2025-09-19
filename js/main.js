const score = document.getElementById("score");
const cabibara = document.getElementById("cabibara_img");
const tetimulher = document.getElementById("cabibara_1");
const tetianao = document.getElementById("cabibara_2");
const tetisupremo = document.getElementById("cabibara_3");

const VALOR_COMPRA_1 = 150;
const VALOR_COMPRA_2 = 300;
const VALOR_COMPRA_3 = 1500;

let tetimulher_comprado = false;
let tetianao_comprado = false;
let tetisupremo_comprado = false;

let bonus = 20;
let i = 0;

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
    if (!tetimulher_comprado && i >= VALOR_COMPRA_1) {
        tetimulher.classList.add("compravel");
    } else {
        tetimulher.classList.remove("compravel");
    }

    if (!tetianao_comprado && i >= VALOR_COMPRA_2) {
        tetianao.classList.add("compravel");
    } else {
        tetianao.classList.remove("compravel");
    }

    if (!tetisupremo_comprado && i >= VALOR_COMPRA_3) {
        tetisupremo.classList.add("compravel");
    } else {
        tetisupremo.classList.remove("compravel");
    }
}

function compra1() {
    if (!tetimulher_comprado) {
        if (i >= VALOR_COMPRA_1) {
            i -= VALOR_COMPRA_1;
            load();
            document.body.style.backgroundImage = "url(../assets/cozinha.webp)";
            cabibara.src = "../assets/cabibara_1.png";
            bonus = 2;
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
        bonus = 2;
    }
}

function compra2() {
    if (!tetianao_comprado) {
        if (i >= VALOR_COMPRA_2) {
            i -= VALOR_COMPRA_2;
            load();
            cabibara.src = "../assets/cabibara_2.png";
            document.body.style.backgroundImage = "url(../assets/anao.webp)";
            bonus = 3;
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
        bonus = 3;
    }
}

function compra3() {
    if (!tetisupremo_comprado) {
        if (i >= VALOR_COMPRA_3) {
            i -= VALOR_COMPRA_3;
            load();
            cabibara.src = "../assets/cabibara_3.jpg";
            document.body.style.backgroundImage = "url(../assets/sala.jpg)";
            bonus = 1000 * 10;
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
        bonus = 1000 * 10;
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
});

