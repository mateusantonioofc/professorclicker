function redirectToGame() {
    window.location.href = "game.html";
}

function saveNickname() {
    const nickname = document.getElementById("nicknameInput").value.trim();
    const display = document.getElementById("nicknameDisplay");

    if (nickname === "") {
        alert("Digite um nickname antes de continuar!");
        return;
    }

    localStorage.setItem("nickname", nickname);

    display.innerText = "Bem-vindo, " + nickname + "!";
    display.style.display = "block";

    redirectToGame();

    // setTimeout(() => window.location.href = "#l", 1500);
}