function redirectToGame() {
    window.location.href = "game.html";
}

async function login() {
    const nickname = document.getElementById("nicknameInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    const display = document.getElementById("nicknameDisplay");

    if (!nickname || !password) {
        alert("Digite seu nome e senha antes de continuar!");
        return;
    }

    display.style.display = "none";

    try {
        let response = await fetch("https://professorclicker-api.vercel.app/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: nickname, password })
        });

        let data = await response.json();

        if (data.error && data.error === "Usuário não encontrado") {
            response = await fetch("https://professorclicker-api.vercel.app/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: nickname, password })
            });
            data = await response.json();

            if (data.user) {
                localStorage.setItem("nickname", nickname);
                localStorage.setItem("token", data.token);
                localStorage.setItem("tipo_usuario", "login");
                display.innerText = `Bem-vindo, ${nickname}!`;
                display.style.display = "block";
                redirectToGame();
            } else {
                display.innerText = "Erro ao criar usuário!";
                display.style.display = "block";
            }
        } else if (data.token) {
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("token", data.token);
            localStorage.setItem("tipo_usuario", "login");
            display.innerText = `Bem-vindo, ${nickname}!`;
            display.style.display = "block";
            redirectToGame();
        } else {
            display.innerText = "Senha incorreta!";
            display.style.display = "block";
        }

    } catch (err) {
        display.innerText = "Erro de conexão com a API!";
        display.style.display = "block";
        console.error(err);
    }
}

function convidado() {
    localStorage.clear();
    localStorage.setItem("tipo_usuario", "convidado");
    window.location.href = "../game.html";
}