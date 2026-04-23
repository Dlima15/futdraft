// Main JS file

console.log("Js aplicado")

// secao configuracao da partida xxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const configPartida = {
    tipoSorteio: "aleatorio",
    jogadores: [],
    estrutura: 5,
    totalTime: 3,
    tempo: 10,
    criterio: "Tempo"
}

// selecionando o tipo do sorteio e ja bloqueando caso o sorteio escolhido for aleatorio

const sorteio = document.getElementById("seletor");

sorteio.addEventListener('change', (event) =>{
    configPartida.tipoSorteio = event.target.value;

    const containerNivel = document.getElementById('nivelJogador');

    if (configPartida.tipoSorteio == 'aleatorio'){
        containerNivel.style.opacity ='0.5';
        containerNivel.style.pointerEvents = "none";
    } else{
        containerNivel.style.opacity = '1'
        containerNivel.style.pointerEvents = "auto";
    }

    console.log('Modo de sorteio: ' + configPartida.tipoSorteio)
});

// selecionando os nomes dos jogadores

const botaoAdicionar = document.querySelector('.botao-inserir');

botaoAdicionar.addEventListener('click', () => {
    const nomeCapturado =  document.getElementById('nomeJogador').value;
    const nivelMarcado = document.querySelector('input[name="nv"]:checked');


    if (nomeCapturado == ""){
        alert('Por favor digite o nome do jogador')
        return;
    }

    const nivelSelecionado = nivelMarcado ? nivelMarcado.value : "N/A";

    const novoJogador = { 
        nome: nomeCapturado, 
        nivel: nivelSelecionado
    };

    configPartida.jogadores.push(novoJogador);
    console.log("Total de Jogadores Inscritos: ", configPartida.jogadores);
    //console.log('Jogador + nivel: ', novoJogador );


});

// selecionando o nivel do jogador 


// selecionando a quantidade de jogadores

const quantidadeJogadores = document.getElementById('qtdJogadores');

quantidadeJogadores.addEventListener('change', (event) =>{
    const numeroJogadores = event.target.value;

    console.log("Quantidade de jogadores por partida: "+ numeroJogadores);
    configPartida.estrutura = numeroJogadores;
});

// Selecionando a quantidade de times

const quantidadeTimes = document.getElementById('qtdTimes');
    quantidadeTimes.addEventListener('change', (event) =>{
        const numeroTimes = event.target.value;

        console.log('Quantidade de Times:' + numeroTimes);
        configPartida.totalTime = numeroTimes;
    })

// Botao sortear times com os dados geral de configuracao de partida


const botaoSortear = document.querySelector('.botao-sorteio-master');

botaoSortear.addEventListener('click', () =>{
   const tempoCapturado = document.getElementById('tempo').value;

   console.log('Tempo:  ' + tempoCapturado + ' minutos');
   configPartida.tempo = tempoCapturado;

   console.log('/////////////////////////////////////');
   console.log('DADOS GERAIS DA PARTIDA');
   console.log('/////////////////////////////////////');

   console.log(configPartida);

})




