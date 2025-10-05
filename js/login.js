// pode ser tipo conta e convidado
async function login(tipo = "conta") {
  const nicknameInput = document.getElementById("nicknameInput");
  const passwordInput = document.getElementById("passwordInput");
  const display = document.getElementById("nicknameDisplay");

  if (tipo === "convidado") {
    localStorage.clear();
    localStorage.setItem("tipo_usuario", "convidado");
    window.location.href = "game.html";
    return;
  }

  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!nickname || !password) {
    alert("Digite seu nome e senha antes de continuar!");
    return;
  }

  display.style.display = "none";
  const apiBase = "https://professorclicker-api.vercel.app/api";

  try {
    const loginResponse = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: nickname, password })
    });

    const loginData = await loginResponse.json();

    // usuário nõ existe: cria conta
    if (loginData.error === "Usuário não encontrado") {
      const registerResponse = await fetch(`${apiBase}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: nickname, password })
      });

      const registerData = await registerResponse.json();

      if (registerData.user) {
        salvarSessao(nickname, registerData.token);
        mostrarMensagem(display, `Bem-vindo, ${nickname}!`);
        window.location.href = "game.html";
      } else {
        mostrarMensagem(display, "Erro ao criar usuário!");
      }
      return;
    }

    if (loginData.token) {
      salvarSessao(nickname, loginData.token);
      mostrarMensagem(display, `Bem-vindo, ${nickname}!`);
      window.location.href = "game.html";
      return;
    }

    mostrarMensagem(display, "Senha incorreta!");

  } catch (error) {
    console.error("Erro de conexão com a API:", error);
    mostrarMensagem(display, "Erro de conexão com a API!");
  }
}

function salvarSessao(username, token) {
  localStorage.setItem("nickname", username);
  localStorage.setItem("token", token);
  localStorage.setItem("tipo_usuario", "login");
}

function mostrarMensagem(element, mensagem) {
  element.textContent = mensagem;
  element.style.display = "block";
}