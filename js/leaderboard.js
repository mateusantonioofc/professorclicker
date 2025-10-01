const rankingElement = document.getElementById("ranking");
const btnLeaderboard = document.getElementById("btnLeaderboard");
const leaderboardContainer = document.getElementById("leaderboardContainer");

// Exemplo para testar
// if (!localStorage.getItem("players")) {
//   localStorage.setItem("players", JSON.stringify([
//     { name: "Bruno", money: 5000 },
//     { name: "Caio", money: 1200 },
//     { name: "Ana", money: 950 },
//     { name: "Maria", money: 2000 },
//     { name: "João", money: 1500 },
//     { name: "Lara", money: 1700 },
//     { name: "Leo", money: 400 },
//     { name: "Pedro", money: 800 },
//     { name: "Sofia", money: 1000 },
//     { name: "Clara", money: 600 },
//     { name: "Rafa", money: 3000 }
//   ]));
// }
function formatScore(score) {
  if (score >= 10000000) {
    return (score / 1000000).toFixed(2) + "m";
  }
  return score.toLocaleString("pt-BR"); // formata com separador de milhar
}

async function fetchRanking() {
  try {
    const response = await fetch("https://professorclicker-api.vercel.app/ranking");
    const data = await response.json();

    const ranking = (data.ranking || []).filter(player => player.username !== "ADM");

    let top10 = ranking.slice(0, 10);

    rankingElement.innerHTML = top10.map((player, index) => `
      <li>
        <span>${index + 1}. ${player.username}</span>
        <span>💰 ${formatScore(player.score)}</span>
      </li>
    `).join("");
  } catch (err) {
    console.log("Erro ao buscar ranking:", err);
    rankingElement.innerHTML = "<li>Erro ao carregar ranking</li>";
  }
}


btnLeaderboard.addEventListener("click", () => {
  leaderboardContainer.classList.toggle("show");

  if (leaderboardContainer.classList.contains("show")) {
    const items = rankingElement.querySelectorAll("li");
    items.forEach((li, i) => {
      setTimeout(() => {
        li.style.opacity = "1";
        li.style.transform = "translateY(0)";
      }, i * 150);
    });
  } else {

    const items = rankingElement.querySelectorAll("li");
    items.forEach(li => {
      li.style.opacity = "0";
      li.style.transform = "translateY(-20px)";
    });
  }
});

fetchRanking();

setInterval(() => {
  fetchRanking();
  leaderboardContainer.classList.remove("show");
}, 15000);
