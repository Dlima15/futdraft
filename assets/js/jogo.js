console.log('jogo.js carregado');

const dadosPartida     = JSON.parse(localStorage.getItem('dadosPartida'))     || {};
const resultadoSorteio = JSON.parse(localStorage.getItem('resultadoSorteio')) || [];
const partidaAtual     = JSON.parse(localStorage.getItem('partidaAtual'));

if (!partidaAtual) {
    window.location.href = './sorteio.html';
    throw new Error('Sem partida configurada');
}

const mandante  = partidaAtual.mandante;
const visitante = partidaAtual.visitante;

let golsMandante  = 0;
let golsVisitante = 0;
let tempoRestante;
let intervalo;
let pausado = true;

const mapaCores = {
    'Time Amarelo':  'amarelo',
    'Time Azul':     'azul',
    'Time Verde':    'verde',
    'Time Vermelho': 'vermelho'
};

const svgPlay  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const svgPause = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

function sigla(nome) {
    return nome.split(' ').pop().substring(0, 2).toUpperCase();
}

function getTime(nomeTime) {
    return resultadoSorteio.find(t => t.nomeTime === nomeTime);
}

// ── Placar ───────────────────────────────────────────────────────────────────

function atualizarPlacar() {
    document.getElementById('gol-mandante').textContent  = golsMandante;
    document.getElementById('gol-visitante').textContent = golsVisitante;
}

function flash(id) {
    const el = document.getElementById(id);
    el.style.transform = 'scale(1.6)';
    el.style.color = '#4ADE80';
    setTimeout(() => {
        el.style.transform = '';
        el.style.color = '';
    }, 300);
}

// ── Render ───────────────────────────────────────────────────────────────────

function renderizarPartida() {
    const corM = mapaCores[mandante]  || 'amarelo';
    const corV = mapaCores[visitante] || 'azul';

    const escudoM = document.getElementById('escudo-mandante');
    escudoM.className   = `escudo-neon ${corM}`;
    escudoM.textContent = sigla(mandante);

    const escudoV = document.getElementById('escudo-visitante');
    escudoV.className   = `escudo-neon ${corV}`;
    escudoV.textContent = sigla(visitante);

    document.getElementById('nome-mandante').textContent  = mandante.replace('Time ', '');
    document.getElementById('nome-visitante').textContent = visitante.replace('Time ', '');

    atualizarPlacar();
    preencherSelectTime();
}

// ── Selects ──────────────────────────────────────────────────────────────────

function preencherSelectTime() {
    const sel = document.getElementById('select-time');
    sel.innerHTML = [mandante, visitante]
        .map(t => `<option value="${t}">${t}</option>`)
        .join('');
    atualizarSelectJogadores();
    sel.addEventListener('change', atualizarSelectJogadores);
}

function atualizarSelectJogadores() {
    const timeSelecionado = document.getElementById('select-time').value;
    const timeData = getTime(timeSelecionado);
    const sel = document.getElementById('select-jogador');

    sel.innerHTML = '<option value="">Selecionar jogador</option>';
    (timeData?.jogadores || []).forEach(j => {
        const opt = document.createElement('option');
        opt.value       = j.nome;
        opt.textContent = j.nome;
        sel.appendChild(opt);
    });
}

// ── Cronômetro ───────────────────────────────────────────────────────────────

function inicializarCronometro() {
    tempoRestante = (parseInt(dadosPartida.tempo) || 10) * 60;
    atualizarDisplayCronometro();
}

function atualizarDisplayCronometro() {
    const min = Math.floor(tempoRestante / 60);
    const seg = tempoRestante % 60;
    document.querySelector('.cronometro-display').textContent =
        `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}

function iniciarContagem() {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplayCronometro();
        } else {
            clearInterval(intervalo);
            pausado = true;
            btnIniciarPausar.innerHTML = `${svgPlay} Iniciar`;
        }
    }, 1000);
}

const btnIniciarPausar = document.querySelector('.btn-controle.secundario');
const btnReset         = document.querySelector('.btn-controle:not(.secundario)');

btnIniciarPausar.addEventListener('click', () => {
    if (pausado) {
        iniciarContagem();
        btnIniciarPausar.innerHTML = `${svgPause} Pausar`;
    } else {
        clearInterval(intervalo);
        btnIniciarPausar.innerHTML = `${svgPlay} Continuar`;
    }
    pausado = !pausado;
});

btnReset.addEventListener('click', () => {
    clearInterval(intervalo);
    pausado = true;
    btnIniciarPausar.innerHTML = `${svgPlay} Iniciar`;
    inicializarCronometro();
});

// ── Registrar Gol ────────────────────────────────────────────────────────────

document.querySelector('.botao-gol-master').addEventListener('click', () => {
    const time    = document.getElementById('select-time').value;
    const jogador = document.getElementById('select-jogador').value;

    if (!jogador) {
        const sel = document.getElementById('select-jogador');
        sel.style.borderColor = '#ef4444';
        setTimeout(() => { sel.style.borderColor = ''; }, 1000);
        return;
    }

    if (time === mandante) {
        golsMandante++;
        flash('gol-mandante');
    } else {
        golsVisitante++;
        flash('gol-visitante');
    }
    atualizarPlacar();

    const stats = JSON.parse(localStorage.getItem('estatisticasGols') || '[]');
    const entry = stats.find(s => s.nome === jogador && s.time === time);
    if (entry) {
        entry.gols++;
    } else {
        stats.push({ nome: jogador, time, gols: 1 });
    }
    localStorage.setItem('estatisticasGols', JSON.stringify(stats));
});

// ── Encerrar Partida ─────────────────────────────────────────────────────────

document.querySelector('.btn-encerrar').addEventListener('click', () => {
    if (!confirm('Encerrar a partida agora?')) return;

    clearInterval(intervalo);

    const empate   = golsMandante === golsVisitante;
    const vencedor = !empate ? (golsVisitante > golsMandante ? visitante : mandante) : null;
    const perdedor = !empate ? (vencedor === mandante ? visitante : mandante) : null;

    // Resultado da partida atual
    const ultimaPartida = {
        mandante, visitante,
        golsMandante, golsVisitante,
        vencedor, perdedor, empate,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('ultimaPartida', JSON.stringify(ultimaPartida));

    // Histórico completo
    const historico = JSON.parse(localStorage.getItem('historicoPartidas') || '[]');
    historico.push(ultimaPartida);
    localStorage.setItem('historicoPartidas', JSON.stringify(historico));

    // Estatísticas por time (para dashboard)
    const statsTime = JSON.parse(localStorage.getItem('estatisticasTimes') || '{}');
    [mandante, visitante].forEach(t => {
        if (!statsTime[t]) statsTime[t] = { vitorias: 0, derrotas: 0, gols: 0 };
    });
    if (!empate) {
        statsTime[vencedor].vitorias++;
        statsTime[perdedor].derrotas++;
    }
    statsTime[mandante].gols  += golsMandante;
    statsTime[visitante].gols += golsVisitante;
    localStorage.setItem('estatisticasTimes', JSON.stringify(statsTime));

    // Próxima partida
    const fila = [...partidaAtual.fila];
    let novaPartida;

    if (empate && fila.length > 0) {
        // Empate com times esperando: ambos saem, próximos dois da fila jogam
        const filaCompleta = [...fila, mandante, visitante];
        const novoMandante  = filaCompleta.shift();
        const novoVisitante = filaCompleta.shift();
        novaPartida = {
            mandante: novoMandante,
            visitante: novoVisitante,
            fila: filaCompleta,
            vitoriaConsecutiva: 0
        };
    } else if (!empate) {
        // Vitória: vencedor fica, perdedor vai para o fim da fila
        let proximo;
        if (fila.length > 0) {
            proximo = fila.shift();
            fila.push(perdedor);
        } else {
            proximo = perdedor; // só 2 times: perdedor volta
        }
        novaPartida = {
            mandante: vencedor,
            visitante: proximo,
            fila,
            vitoriaConsecutiva: vencedor === mandante
                ? (partidaAtual.vitoriaConsecutiva || 0) + 1
                : 1
        };
    } else {
        // Empate sem fila (2 times): revanche
        novaPartida = { mandante, visitante, fila: [], vitoriaConsecutiva: 0 };
    }

    localStorage.setItem('partidaAtual', JSON.stringify(novaPartida));

    window.location.href = './resultado.html';
});

// ── Init ─────────────────────────────────────────────────────────────────────

inicializarCronometro();
renderizarPartida();
