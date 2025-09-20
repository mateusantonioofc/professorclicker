const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/scores", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("scores.json", "utf8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro: ler scores" });
  }
});

app.post("/scores", (req, res) => {
  try {
    const { user, score } = req.body;
    if (!user || score === undefined) {
      return res.status(400).json({ error: "Dados invalidos" });
    }

    let data = {};
    if (fs.existsSync("scores.json")) {
      data = JSON.parse(fs.readFileSync("scores.json", "utf8"));
    }

    data[user] = score;
    
    fs.writeFileSync("scores.json", JSON.stringify(data, null, 2));

    res.json({ success: true, scores: data });
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar score" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
