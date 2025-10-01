const session = localStorage.getItem('score');

function redirectToGame() {
    window.location.href = "game.html";
}

function loginOrCreateUser() {
    const nickname = document.getElementById("nicknameInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    const display = document.getElementById("nicknameDisplay");

    if (!nickname || !password) {
        display.innerText = "Preencha todos os campos!";
        display.style.display = "block";
        return;
    }

    fetch("https://professorclicker-api.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: nickname, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            display.innerText = data.error;
            display.style.display = "block";
        } else {
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("tipo_usuario", "login");
            localStorage.setItem("token", data.token);
            display.innerText = "Bem-vindo, " + nickname + "!";
            display.style.display = "block";
            setTimeout(redirectToGame, 1000);
        }
    })
    .catch(() => {
        display.innerText = "Erro de conexão com a API!";
        display.style.display = "block";
    });
}

function saveUser(nickname, password) {
    return fetch("https://professorclicker-api.vercel.app/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: nickname, password })
    });
}
