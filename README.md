# Professor Clicker - Documentação do Projeto

**Descrição:**  
Professor Clicker é um jogo de clicker incremental onde o jogador clica para acumular pontos, compra professores que aumentam o bônus e desbloqueia conquistas. Possui sistema de login ou modo convidado, efeitos sonoros e música de fundo aleatória, além de registro de progresso usando `localStorage`.

---

## Estrutura do Projeto

### Módulos JavaScript

1. **`data/conquistas.js`**
   - Contém todas as conquistas do jogo (`CONQUISTAS`) e funções para verificar e obter conquistas.
   - **Propriedades e Métodos:**
     - `lista`: array de conquistas com:
       - `id`: string, identificador único.
       - `nome`: string, título da conquista.
       - `descricao`: string, descrição.
       - `condicao(game)`: função que retorna `true` se a conquista foi atingida.
       - `recompensa` (opcional): número de pontos ou função executada.
     - `checar(game, desbloqueadas)`: retorna array de conquistas novas baseadas no estado do jogo.
       - **Parâmetros:**
         - `game`: objeto com `score`, `bonus`, `professores` e `session`.
         - `desbloqueadas`: array de IDs de conquistas já desbloqueadas.
       - **Retorno:** array de conquistas recém-desbloqueadas.
     - `getPorId(id)`: retorna uma conquista específica pelo ID.

2. **`data/professores.js`**
   - Contém todos os professores (`PROFESSORES`) e função auxiliar `getProfessor`.
   - **Exemplo de objeto professor:**
     ```js
     teti_anao: {
       id: "teti_anao",
       nome: "Teti Anão",
       preco: 50,
       bonus: 999999,
       img: "assets/professores/teti_anao.png",
       background: "url('assets/backgrounds/montanha.jpg')"
     }
     ```
   - `autoClickIntervalo` opcional: intervalo para ativar clique automático ao comprar.
   - `getProfessor(id)`: retorna o objeto do professor pelo ID.

3. **`modules/storage.js`**
   - Responsável por salvar e carregar dados no `localStorage`.
   - **Funções:**
     - `saveScore(score) / loadScore()`: salvar/carregar pontuação.
     - `saveProfessores(profs) / loadProfessores()`: salvar/carregar professores comprados.
     - `saveRebirths(rebirths) / loadRebirths()`: salvar/carregar rebirths.
     - `saveConquistas(cons) / loadConquistas()`: salvar/carregar conquistas desbloqueadas.
     - `loadStartTime()`: retorna timestamp de início do jogo (inicia se não existir).
     - `loadClicksLog()`: retorna array de timestamps dos cliques recentes (20s).

4. **`modules/sounds.js`**
   - Gerencia efeitos sonoros e música de fundo.
   - **Propriedades:**
     - `audioPlayer`: elemento `Audio` para música.
     - `sounds`: objeto com efeitos (`click`, `buy`, `reset`, `ranking`, `menu`).
   - **Funções:**
     - `play(type)`: toca efeito específico.
     - `tocarAleatoria()`: toca música de fundo aleatória da lista.

5. **`modules/gamefunctions.js`**
   - Funções utilitárias do jogo.
   - **Propriedades:**
     - `autoClickInterval`: guarda ID do setInterval do auto click.
   - **Funções:**
     - `ativarAutoClick(intervaloMs = 500, countFn, mostrarNotif = true, bonus = 1)`: ativa clique automático.
     - `desativarAutoClick()`: desativa clique automático.
     - `notify(message, type = "normal")`: exibe notificação na tela.
       - `type = "error"` para notificação vermelha.
     - `gerarNome()`: retorna nome aleatório de turista, combinando substantivo, adjetivo e número.
       - Ex: `"GabiruGuloso643"`.
    - `repetirDeAno(username, session)`: reseta os dados e incrementa +1 no rebirth

6. **`main.js`**
   - Lida com o comportamento principal do jogo, UI e eventos.
   - **Principais variáveis:**
     - `score`, `bonus`: pontuação atual e multiplicador.
     - `professoresComprados`: objeto com IDs de professores comprados.
     - `conquistasDesbloqueadas`: array de conquistas desbloqueadas.
     - `musicaIniciada`: boolean para música.
     - `clicksLog`: array com timestamps de cliques recentes.
   - **Funções principais:**
     - `load()`: atualiza elementos do DOM (score e animações da store).
     - `saveAll()`: salva pontuação, professores e conquistas no `localStorage` e API.
     - `count()`: incrementa score ao clicar, salva, checa conquistas e anima elementos.
     - `checarConquistas()`: checa novas conquistas e aplica recompensas.
     - `checarAnimacoes()`: atualiza classes dos botões da store (`compravel` / `comprado`).
     - `comprarProfessor(id)`: compra professor se possível, aplica efeitos visuais e auto click.
     - `resetGame()`: reinicia jogo, limpa progresso e redireciona para `index.html`.
   - **Eventos:**
     - `clickEl.addEventListener("click", count)`: clique principal.
     - Toggle da store (`menuToggle`).
     - Logout (`btnLogout`).
     - Auto-save a cada 3s (`setInterval(saveAll, 3000)`).
     - Rebirth (`rebirthBtn`).

---

## Regras e Mecânicas do Jogo

- Cada clique aumenta a pontuação baseada no `bonus`.
- Professores aumentam o `bonus` e podem ativar `autoClick`.
- Conquistas são desbloqueadas automaticamente ao atingir condições.
- Música de fundo é aleatória e registrada para conquistas.
- Jogador pode estar no modo:
  - `login` (com nickname)
  - `convidado` (nome gerado aleatoriamente via `GameFuncs.gerarNome()`)

---

## Estrutura do DOM Necessária

- Elementos principais:
  - `#score`: exibe pontuação.
  - `#points_button`: imagem do professor atual.
  - `.h1`: nome do jogador.
  - `#click`: botão principal de clique.
  - `#store-items`: container dos professores.
  - `#store`: container da loja.
  - `#menu-toggle`: botão de toggle da loja.
  - `#btnLogout`: botão para logout.
  - `#notification-container`: container para notificações.

---

## Exemplo de Uso (Modo Convidado)

```js
localStorage.setItem("tipo_usuario", "convidado");
localStorage.setItem("nickname", GameFuncs.gerarNome());

load(); // atualiza UI
```

- Professores podem ser comprados clicando nos botões gerados.
- Conquistas são desbloqueadas automaticamente e notificadas.

---

## Observações

- Auto-save garante persistência mesmo em caso de fechamento acidental.
- Todas as ações do jogador são registradas em `localStorage` para manter progresso.
- A API externa (`professorclicker-api`) é usada apenas para salvar progresso do usuário logado.

---

## Licença

Projeto pessoal para estudo e diversão. Não comercial.
