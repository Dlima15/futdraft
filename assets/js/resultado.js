console.log('resultado.js carregado');

const ultimaPartida = JSON.parse(localStorage.getItem('ultimaPartida'));
const partidaAtual  = JSON.parse(localStorage.getItem('partidaAtual'));

const mapaCores = {
    'Time Amarelo':  { fundo: 'fundo-amarelo',  ponto: 'amarelo',  borda: 'borda-neon-amarela' },
    'Time Azul':     { fundo: 'fundo-azul',     ponto: 'azul',     borda: 'borda-neon-azul' },
    'Time Verde':    { fundo: 'fundo-verde',     ponto: 'verde',    borda: 'borda-neon-verde' },
    'Time Vermelho': { fundo: 'fundo-vermelho',  ponto: 'vermelho', borda: 'borda-neon-vermelha' }
};

function sigla(nome) {
    return nome.split(' ').pop().substring(0, 2).toUpperCase();
}

// ── Resultado da última partida ───────────────────────────────────────────────

if (ultimaPartida) {
    const eM = mapaCores[ultimaPartida.mandante]  || { fundo: 'fundo-amarelo' };
    const eV = mapaCores[ultimaPartida.visitante] || { fundo: 'fundo-azul' };

    const times  = document.querySelectorAll('.time-resultado');
    const scores = document.querySelectorAll('.placar-final .num');

    times[0].querySelector('.cor-time').className = `cor-time ${eM.fundo}`;
    times[0].querySelector('.nome').textContent   = ultimaPartida.mandante.replace('Time ', '');

    times[1].querySelector('.cor-time').className = `cor-time ${eV.fundo}`;
    times[1].querySelector('.nome').textContent   = ultimaPartida.visitante.replace('Time ', '');

    scores[0].textContent = ultimaPartida.golsMandante;
    scores[1].textContent = ultimaPartida.golsVisitante;

    // Destaca o vencedor
    if (!ultimaPartida.empate) {
        const idxVencedor = ultimaPartida.vencedor === ultimaPartida.mandante ? 0 : 1;
        times[idxVencedor].querySelector('.nome').style.color = '#4ADE80';
    }
}

// ── Próximo jogo ──────────────────────────────────────────────────────────────

if (partidaAtual) {
    const eM = mapaCores[partidaAtual.mandante]  || { borda: 'borda-neon-amarela' };
    const eV = mapaCores[partidaAtual.visitante] || { borda: 'borda-neon-azul' };

    const blocos = document.querySelectorAll('.bloco-duelo');
    const siglas = document.querySelectorAll('.sigla-duelo');
    const txts   = document.querySelectorAll('.txt-time');

    blocos[0].className   = `bloco-duelo ${eM.borda}`;
    siglas[0].textContent = sigla(partidaAtual.mandante);
    txts[0].textContent   = partidaAtual.mandante;

    blocos[1].className   = `bloco-duelo ${eV.borda}`;
    siglas[1].textContent = sigla(partidaAtual.visitante);
    txts[1].textContent   = partidaAtual.visitante;

    // Fila (ficam de fora)
    const gradeEspera = document.querySelector('.grade-espera');
    const secaoEspera = document.querySelector('.secao-espera');

    if (partidaAtual.fila?.length > 0) {
        gradeEspera.innerHTML = partidaAtual.fila.map(t => {
            const cor = (mapaCores[t] || { ponto: 'amarelo' }).ponto;
            return `<div class="item-espera"><span class="ponto ${cor}"></span>${t.replace('Time ', '')}</div>`;
        }).join('');
        secaoEspera.style.display = 'block';
    } else {
        secaoEspera.style.display = 'none';
    }
}

// ── Navegação ─────────────────────────────────────────────────────────────────

document.querySelector('.botao-proxima-partida').addEventListener('click', () => {
    window.location.href = './jogo.html';
});

const btnFinalizar = document.querySelector('.btn-finalizar-torneio');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        window.location.href = './resumo.html';
    });
}
