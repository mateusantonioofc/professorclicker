function convidado() {
    localStorage.clear();
    localStorage.setItem("tipo_usuario", "convidado");
    window.location.href = "../game.html";
}
// isso aq ta bem inutil ne, depois vou mover pro form.js