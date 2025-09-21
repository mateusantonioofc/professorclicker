const rankingElement = document.getElementById("ranking");

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

async function fetchRanking() {
  try {
    const response = await fetch("https://professorclicker-api.vercel.app/ranking");
    const data = await response.json();
    const ranking = data.ranking || [];

    let top10 = ranking.slice(0, 10);

    rankingElement.innerHTML = top10.map((player, index) => `
      <li>
        <span>${index + 1}. ${player.username}</span>
        <span>💰 ${player.score}</span>
      </li>
    `).join("");
  } catch (err) {
    console.log("Erro ao buscar ranking:", err);
    rankingElement.innerHTML = "<li>Erro ao carregar ranking</li>";
  }
}

fetchRanking();
