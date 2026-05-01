console.log('Sorteio Js aplicado!');

const dadosMemoria = localStorage.getItem('dadosPartida');

if (dadosMemoria) {
    const config = JSON.parse(dadosMemoria);


    const pesoNivel = {
        'A':1,
        'B':2,
        'C':3
    };

    let lista = [...config.jogadores];

    if (config.tipoSorteio === "aleatorio") { // modo aleatorio abixo
        lista.sort(() => Math.random() - 0.5);
    }else{
        // modo balanceado abaixo
        lista.sort((a, b) => {
            const nivelA = pesoNivel[a.nivel] || 0;
            const nivelB = pesoNivel[b.nivel] || 0;
            
            // Ordena do maior peso para o menor
            return (nivelB - nivelA) || (Math.random() - 0.5);
        });
    };

    console.log('lista de jogadores', lista);


    // PARTE RESPONSAVEL POR DISTRIBUIR JOGADORES AOS TIMES 

    const todosTimes = parseInt(config.totalTime);
    const limitePorTime = parseInt(config.estrutura);
    let times = Array.from({ length: todosTimes}, () => []);    

    lista.forEach((jogador, index) => {
        let qualTime = index % todosTimes;
        if (times[qualTime].length < limitePorTime){
            times[qualTime].push(jogador);
        }
    });


    console.log("Sorteio finalizado ", times);


    console.table(times);

// Salvar resultados 

    const cores = ["Amarelo", "Verde", "Azul", "Vermelho"];
    const resultadoFinal = times.map((jogadores, i) => ({
        nomeTime: `Time ${cores[i]}`,
        jogadores: jogadores
    }))

    localStorage.setItem('resultadoSorteio', JSON.stringify(resultadoFinal));
    console.log('Sorteio concluido e salvo com sucesso no local Storage')

}else{
    alert("Sua partida não foi configurada ainda");

    window.location.href = "index.html";
}

// Renderizar os times para que o usuario veja 

function renderizarTimes() {

    const gradeTimes = document.querySelector(".grade-times-sorteados");
    const dadosSalvos = localStorage.getItem('resultadoSorteio');

    if (!dadosSalvos) {
        console.log("Nenhum dado de sorteio encontrado");
        return
    }

    const times = JSON.parse(dadosSalvos);

    gradeTimes.innerHTML = '';

    const estiloCores = {
        "Time Amarelo": { borda: "borda-amarela", fundo: "fundo-amarelo" },
        "Time Azul": {borda: "borda-azul", fundo: "fundo-azul"},
        "Time Verde": {borda: "borda-verde", fundo: "fundo-verde"},
        "Time Vermelho": {borda: "borda-vermelha", fundo: "fundo-vermelho"}
    };

    times.forEach(time => {


        let listaItensHTML ="";
        time.jogadores.forEach(jogador => {
            listaItensHTML += `<li>${jogador.nome}</li>`;
        });

        const estilo = estiloCores[time.nomeTime] || {borda: "", fundo:"" };

        // aplicar agora no html

        const cartaoHTML = `
            <div class="cartao-time ${estilo.borda} animar-subir">
                <div class="cabecalho-card">
                    <span class="ponto-cor ${estilo.fundo}"></span>
                    <h3>${time.nomeTime}</h3>
                </div>
                <ul class="lista-nomes">
                    ${listaItensHTML}
                </ul>
            </div>
        `;

        gradeTimes.innerHTML += cartaoHTML;
        
    });

}

 // aplicando no html a função que criamos acima
renderizarTimes();

// sorteando os primeiros confrontos

const btnSortearAdv = document.querySelector(".botao-secundario-sorteio");

btnSortearAdv.addEventListener("click", (event) => {

    const dadosPartida = localStorage.getItem("resultadoSorteio");
    const jogoSorteio =  JSON.parse(dadosPartida);
    console.log(jogoSorteio);

});



