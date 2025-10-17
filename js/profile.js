import { Storage } from "./modules/storage.js"

document.addEventListener("DOMContentLoaded", async () => {
  const usernameEl = document.getElementById("username")
  const avatarEl = document.getElementById("avatar")
  const scoreEl = document.getElementById("score")
  const rebirthsEl = document.getElementById("rebirths")
  const profsEl = document.getElementById("professores")
  const conquistasEl = document.getElementById("conquistas")
  const listaConquistasEl = document.getElementById("listaConquistas")
  const rankEl = document.getElementById("rank")

  const username = localStorage.getItem("nickname") || "Convidado"
  const session = localStorage.getItem("tipo_usuario") || "convidado"
  const token = localStorage.getItem("token")

  const score = Storage.loadScore()
  const rebirths = Storage.loadRebirths()
  const profs = Storage.loadProfessores()
  const conquistas = Storage.loadConquistas()

  usernameEl.textContent = username
  avatarEl.textContent = username.charAt(0).toUpperCase()
  scoreEl.textContent = score.toLocaleString("pt-BR") 
  rebirthsEl.textContent = `🎓 Repetições: ${rebirths}`
  profsEl.textContent = Object.keys(profs).length
  conquistasEl.textContent = conquistas.length

  listaConquistasEl.innerHTML = ""
  if (conquistas.length > 0) {
    conquistas.slice(0, 3).forEach(c => {
      const span = document.createElement("span")
      span.className = "insignia estrela"
      span.textContent = c
      listaConquistasEl.appendChild(span)
    })
  } else {
    listaConquistasEl.innerHTML = '<span class="insignia estrela">Nenhuma ainda</span>'
  }

  if (session === "login" && token) {
    try {
      const res = await fetch("https://professorclicker-api.vercel.app/ranking")
      const data = await res.json()
      const rankIndex = data.ranking.findIndex(u => u.username === username)
      rankEl.textContent = rankIndex >= 0 ? `${rankIndex + 1}º no ranking` : "-"
    } catch (err) {
      console.error("Erro ao buscar ranking:", err)
      rankEl.textContent = "-"
    }
  } else {
    rankEl.textContent = "-"
  }

  document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "game.html"
  })
})
