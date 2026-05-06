console.log('resumo.js carregado');

const statsGols = JSON.parse(localStorage.getItem('estatisticasGols') || '[]');
const statsTime = JSON.parse(localStorage.getItem('estatisticasTimes') || '{}');

// ── Data de hoje ──────────────────────────────────────────────────────────────

const hoje = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
document.querySelector('.data-sessao').textContent = hoje;

// ── Campeão e ranking ─────────────────────────────────────────────────────────

const timesOrdenados = Object.entries(statsTime)
    .sort(([, a], [, b]) => b.vitorias - a.vitorias || b.gols - a.gols);

if (timesOrdenados.length > 0) {
    const [nomeCampeao, statsCampeao] = timesOrdenados[0];
    const sigla = nomeCampeao.split(' ').pop().substring(0, 2).toUpperCase();

    document.querySelector('.escudo-campeao').textContent = sigla;
    document.querySelector('.nome-campeao').textContent   = nomeCampeao;

    const statItems = document.querySelectorAll('.stat-item strong');
    statItems[0].textContent = statsCampeao.vitorias;
    statItems[1].textContent = statsCampeao.gols;

    // Tabela de ranking
    const tabela = document.querySelector('.tabela-vidro');
    tabela.innerHTML = timesOrdenados.map(([nome, s], idx) => `
        <div class="linha-ranking">
            <span class="pos">${idx + 1}º</span>
            <span class="time">${nome.replace('Time ', '')}</span>
            <span class="pts">${s.vitorias} vit</span>
        </div>
    `).join('');
} else {
    document.querySelector('.card-campeao').style.display   = 'none';
    document.querySelector('.secao-ranking').style.display = 'none';
}

// ── Artilheiro ────────────────────────────────────────────────────────────────

if (statsGols.length > 0) {
    const artilheiro = [...statsGols].sort((a, b) => b.gols - a.gols)[0];
    document.querySelector('.nome-jogador').textContent = artilheiro.nome;
    document.querySelector('.gols-count').textContent   =
        `${artilheiro.gols} Gol${artilheiro.gols !== 1 ? 's' : ''}`;
} else {
    document.querySelector('.card-artilheiro').style.display = 'none';
}

// ── Novo draft ────────────────────────────────────────────────────────────────

document.querySelector('.botao-novo-draft').addEventListener('click', () => {
    if (!confirm('Iniciar um novo draft? Todos os dados serão apagados.')) return;
    localStorage.clear();
    window.location.href = '../index.html';
});
