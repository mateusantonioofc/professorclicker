# Mapeamento de `localStorage` por arquivo

O objetivo é detalhar **todos os valores** do `localStorage` usados no projeto, indicando:

- Onde é **criado** (`setItem`) → Nome do arquivo ou função
- Onde é **lido** (`getItem`) → Nome do arquivo ou função
- Onde é **modificado** → Nome do arquivo ou função
- Exibição em **JSON para visualização**

---

## Valores detalhados

### nickname

- Criado:
  ```js
  form.js > dentro da função login()
  localStorage.setItem("nickname", nickname);
  ```
- Lido:
  ```js
  main.js > const username = localStorage.getItem("nickname");
  main.js > title.textContent = localStorage.getItem("nickname") || "Ghost";
  ```
- Modificado:
  ```js
  form.js > ao logar ou registrar novamente
  ```

### token

- Criado:

  ```js
  form.js > dentro da função login()
  localStorage.setItem("token", data.token);
  ```

- Lido:
  ```js
  API interna (não diretamente no front-end)
  ```
- Modificado:

  ```js
  form.js → ao logar novamente
  ```

### tipo_usuario

- Criado:

  ```js
  form.js > login();
  localStorage.setItem("tipo_usuario", "login");

  modo.js > convidado();
  localStorage.setItem("tipo_usuario", "convidado");
  ```

- Lido:
  ```js
  main.js > const session = localStorage.getItem("tipo_usuario");
  ```
- Modificado:

  ```js
  form.js / modo.js > alternância entre login e convidado
  ```

### score

- Criado:

  ```js
  main.js > ao iniciar o jogo (caso não exista)
  localStorage.setItem("score", i);
  ```

- Lido:
  ```js
  main.js > const session = localStorage.getItem("tipo_usuario");
  ```
- Modificado:

  ```js
  form.js / modo.js > alternância entre login e convidado
  ```

### professores_comprados

- Criado:

  ```js
  main.js > inicialização
  let professoresComprados = JSON.parse(localStorage.getItem("professores_comprados") || '{}');

  form.js > após login ou registro
  localStorage.setItem("professores_comprados", JSON.stringify(professoresComprados));
  ```

- Lido:
  ```js
  main.js > JSON.parse(localStorage.getItem("professores_comprados") || "{}");
  ```
- Modificado:
  ```js
  main.js > comprarProfessor(id);
  main.js > saveProfessoresComprados();
  main.js > resetGame();
  ```

### conquistas

- Criado:
  ```js
  main.js > JSON.parse(localStorage.getItem("conquistas") || "[]");
  form.js > após login ou registro
  ```
- Lido:
  ```js
  main.js > checarConquistas(game);
  ```
- Modificado:

  ```js
  main.js > checarConquistas();
  localStorage.setItem("conquistas", JSON.stringify(conquistasDesbloqueadas));

  main.js > saveConquistas();
  ```

### startTime

- Criado:
  ```js
  main.js > inicialização;
  if (!localStorage.getItem("startTime")) {
    localStorage.setItem("startTime", Date.now());
  }
  ```
- Lido:
  ```js
  main.js > checar conquistas "sem_sono"
  ```
- Modificado:
  ```js
  Não é modificado após criação
  ```

### clicksLog

- Criado:

  ```js
  main.js > inicialização;
  if (!localStorage.getItem("clicksLog")) {
    localStorage.setItem("clicksLog", JSON.stringify([]));
  }
  ```

- Lido:
  ```js
  main.js > função count()
  JSON.parse(localStorage.getItem("clicksLog") || "[]");
  ```
- Modificado:
  ```js
  main.js > função count()
  clicks.push(Date.now());
  clicks = clicks.filter(t => Date.now() - t <= 20000);
  localStorage.setItem("clicksLog", JSON.stringify(clicks));
  ```

### resets

- Criado:
  ```js
  main.js > função resetGame()
  let resets = Number(localStorage.getItem("resets")) || 0;
  resets++;
  localStorage.setItem("resets", resets);
  ```
- Lido:
  ```js
  main.js > conquistas "resetador", "reset_mestre", "reset_deus"
  ```
- Modificado:
  ```js
  main.js > função resetGame() → incrementa a cada reset
  ```

### musicPlayed

- Criado:
  ```js
  main.js > evento de música (audioPlayer)
  localStorage.setItem("musicPlayed", JSON.stringify(musicPlayed));
  ```
- Lido:
  ```js
  main.js > função tocarMusicaAleatoria()
  ```
- Modificado:
  ```js
  main.js > adiciona música tocada no array
  localStorage.setItem("musicPlayed", JSON.stringify(musicPlayed));
  ```
