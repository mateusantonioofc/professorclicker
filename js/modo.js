function convidado() {
    localStorage.clear();
    localStorage.setItem("tipo_usuario", "convidado");
    window.location.href = "../game.html";
}
