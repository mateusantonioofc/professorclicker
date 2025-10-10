    
const API_URL = 'https://professorclicker-api.vercel.app/api';

let todasConquistas = [];
let conquistasDesbloqueadas = [];
let dadosUsuario = null;

const categorias = {
    pontos: "Conquistas de Pontos",
    professores: "Conquistas de Professores", 
    reset: "Conquistas de Reset",
    musica: "Conquistas de Música",
    misc: "Conquistas Diversas"
};

async function buscarDadosUsuario() {
    const username = localStorage.getItem('nickname');
    const session = localStorage.getItem('tipo_usuario');

    if (session === 'login' && username) {
        try {
            const response = await fetch(`${API_URL}/${username}`);
            if (!response.ok) throw new Error('Erro ao buscar dados do usuário');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            return {
                score: Storage.loadScore(),
                professores_comprados: Storage.loadProfessores(),
                conquistas: Storage.loadConquistas()
            };
        }
    } else {
        return {
            score: Storage.loadScore(),
            professores_comprados: Storage.loadProfessores(),
            conquistas: Storage.loadConquistas(),
            session: "convidado"
        };
    }
}

// Função para carregar conquistas
async function carregarConquistas() {
    try {
        const { CONQUISTAS } = await import('./data/conquistas.js');
        return CONQUISTAS.lista;
    } catch (error) {
        console.error('Erro ao carregar conquistas:', error);
        return [];
    }
}

function categorizarConquista(conquista) {
    return categorias[conquista.tipo] || categorias.misc;
}

function obterIconeConquista(conquista) {
    const icones = {
        pontos: "fa-star",
        professores: "fa-user-tie",
        reset: "fa-rotate",
        musica: "fa-music",
        misc: "fa-trophy"
    };
    return icones[conquista.tipo] || "fa-trophy";
}

function conquistaDesbloqueada(id) {
    return conquistasDesbloqueadas.includes(id);
}

function calcularProgresso(conquista) {
    if (conquistaDesbloqueada(conquista.id)) {
        return 100;
    }

    const gameState = {
        score: dadosUsuario.score,
        professores: dadosUsuario.professores_comprados,
        session: dadosUsuario.session || "convidado",
        bonus: 1
    };

    try {
        if (conquista.condicao(gameState)) {
            return 100;
        }
    } catch (error) {
        console.error(`Erro ao verificar condição da conquista ${conquista.id}:`, error);
    }

    if (conquista.tipo === "pontos") {
        const pontosMatch = conquista.descricao.match(/(\d+(?:\.\d+)?)\s*pontos/);
        if (pontosMatch) {
            let pontosNecessarios = parseFloat(pontosMatch[1]);
            if (conquista.descricao.includes("Mil") && !conquista.descricao.includes("Milhão")) {
                pontosNecessarios *= 1000;
            } else if (conquista.descricao.includes("Milhão")) {
                pontosNecessarios *= 1000000;
            }
            return Math.min(100, (dadosUsuario.score / pontosNecessarios) * 100);
        }
    } else if (conquista.tipo === "professores") {
        const numMatch = conquista.descricao.match(/(\d+)\s*professores/);
        if (numMatch) {
            const professoresNecessarios = parseInt(numMatch[1]);
            const numProfessores = Object.values(dadosUsuario.professores_comprados).filter(v => v).length;
            return Math.min(100, (numProfessores / professoresNecessarios) * 100);
        }
    } else if (conquista.tipo === "reset") {
        const resets = parseInt(localStorage.getItem("resets") || "0");
        const resetMatch = conquista.descricao.match(/(\d+)\s*vezes/);
        if (resetMatch) {
            const resetsNecessarios = parseInt(resetMatch[1]);
            return Math.min(100, (resets / resetsNecessarios) * 100);
        }
    }

    return 0;
}

function atualizarEstatisticas() {
    const totalConquistas = todasConquistas.length;
    const conquistasDesbloqueadasCount = conquistasDesbloqueadas.length;
    const taxaConclusao = totalConquistas > 0 ? Math.round((conquistasDesbloqueadasCount / totalConquistas) * 100) : 0;
    const pontosConquistas = conquistasDesbloqueadasCount * 100;

    document.getElementById('total-achievements').textContent = `${conquistasDesbloqueadasCount}/${totalConquistas}`;
    document.getElementById('completion-rate').textContent = `${taxaConclusao}%`;
    document.getElementById('total-points').textContent = pontosConquistas.toLocaleString();
}

function renderizarConquistas(filtro = 'all', termoPesquisa = '') {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';

    const conquistasPorCategoria = {};
    
    todasConquistas.forEach(conquista => {
        if (filtro === 'unlocked' && !conquistaDesbloqueada(conquista.id)) return;
        if (filtro === 'locked' && conquistaDesbloqueada(conquista.id)) return;
        
        if (termoPesquisa && 
            !conquista.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) && 
            !conquista.descricao.toLowerCase().includes(termoPesquisa.toLowerCase())) {
            return;
        }
        
        const categoria = categorizarConquista(conquista);
        if (!conquistasPorCategoria[categoria]) {
            conquistasPorCategoria[categoria] = [];
        }
        conquistasPorCategoria[categoria].push(conquista);
    });

    const totalConquistasFiltradas = Object.values(conquistasPorCategoria).reduce((total, arr) => total + arr.length, 0);
    
    if (totalConquistasFiltradas === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px;"></i>
            <h3>Nenhuma conquista encontrada</h3>
            <p>Tente alterar os filtros ou continuar jogando para desbloquear mais conquistas!</p>
        `;
        container.appendChild(emptyState);
        return;
    }

    Object.keys(categorias).forEach(categoriaKey => {
        const categoria = categorias[categoriaKey];
        const conquistasCategoria = conquistasPorCategoria[categoria];
        
        if (conquistasCategoria && conquistasCategoria.length > 0) {
            const categoriaTitle = document.createElement('h2');
            categoriaTitle.className = 'category-title';
            categoriaTitle.textContent = categoria;
            container.appendChild(categoriaTitle);
            
            const grid = document.createElement('div');
            grid.className = 'achievements-grid';
            
            conquistasCategoria.forEach(conquista => {
                const desbloqueada = conquistaDesbloqueada(conquista.id);
                const progresso = calcularProgresso(conquista);
                const icone = obterIconeConquista(conquista);
                
                const card = document.createElement('div');
                card.className = `achievement-card ${desbloqueada ? '' : 'locked'}`;
                
                card.innerHTML = `
                    <div class="achievement-icon ${desbloqueada ? 'unlocked' : 'locked'}">
                        <i class="fas ${icone}"></i>
                    </div>
                    <div class="achievement-info">
                        <div class="achievement-name">${conquista.nome}</div>
                        <div class="achievement-description">${conquista.descricao}</div>
                        ${!desbloqueada ? `
                            <div class="achievement-progress">
                                <div class="progress-bar" style="width: ${progresso}%"></div>
                            </div>
                            <div class="achievement-reward">
                                <i class="fas fa-gem"></i>
                                <span>Recompensa: 100 pontos</span>
                            </div>
                        ` : `
                            <div class="achievement-reward">
                                <i class="fas fa-check-circle"></i>
                                <span>Concluída!</span>
                            </div>
                        `}
                    </div>
                `;
                
                grid.appendChild(card);
            });
            
            container.appendChild(grid);
        }
    });
}

async function inicializar() {
    try {
        todasConquistas = await carregarConquistas();
        
        dadosUsuario = await buscarDadosUsuario();
        
        conquistasDesbloqueadas = dadosUsuario.conquistas || [];
        
        atualizarEstatisticas();
        renderizarConquistas();

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                renderizarConquistas(this.dataset.tab);
            });
        });

        document.getElementById('search-achievements').addEventListener('input', function() {
            const filtroAtivo = document.querySelector('.tab.active').dataset.tab;
            renderizarConquistas(filtroAtivo, this.value);
        });

    } catch (error) {
        console.error('Erro ao inicializar página de conquistas:', error);
        document.getElementById('achievements-container').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <h3>Erro ao carregar conquistas</h3>
                <p>Recarregue a página ou tente novamente mais tarde.</p>
            </div>
        `;
    }
}

const Storage = {
    loadScore() { return Number(localStorage.getItem('score')) || 0; },
    loadProfessores() { return JSON.parse(localStorage.getItem('professores_comprados') || '{}'); },
    loadConquistas() { return JSON.parse(localStorage.getItem('conquistas') || '[]'); }
};

document.addEventListener('DOMContentLoaded', inicializar);