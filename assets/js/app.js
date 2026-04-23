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

  //  console.log('Modo de sorteio: ' + configPartida.tipoSorteio)
});

// funcao pra zerar os jogadores caso tenha algum na lista, e adiciona os jogadores apos clicar no botao adicionar
function renderizarLista() {
    const container = document.querySelector('.lista-inscritos');

    container.innerHTML = '';

    
    configPartida.jogadores.forEach((jogador, index) => {
        container.innerHTML += `
        <div class="card-jogador animar-entrada">
                <span class="info">${jogador.nome} <mark>Nível ${jogador.nivel}</mark></span>
                <button class="remover-txt" onclick="removerJogador(${index})">Remover</button>
        </div>
        `;
    });
};

//Funcao para remover o jogador da lista 

function removerJogador(index) {
    configPartida.jogadores.splice(index, 1);

    renderizarLista();

}





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
    renderizarLista();
 //   console.log("Total de Jogadores Inscritos: ", configPartida.jogadores);
    //console.log('Jogador + nivel: ', novoJogador );
});

    renderizarLista();


// selecionando o nivel do jogador 


// selecionando a quantidade de jogadores

const quantidadeJogadores = document.getElementById('qtdJogadores');

quantidadeJogadores.addEventListener('change', (event) =>{
    const numeroJogadores = event.target.value;

 //   console.log("Quantidade de jogadores por partida: "+ numeroJogadores);
    configPartida.estrutura = numeroJogadores;
});

// Selecionando a quantidade de times

const quantidadeTimes = document.getElementById('qtdTimes');
    quantidadeTimes.addEventListener('change', (event) =>{
        const numeroTimes = event.target.value;

 //       console.log('Quantidade de Times:' + numeroTimes);
        configPartida.totalTime = numeroTimes;
    })


// coletando tempo de partida
const campoTempo = document.getElementById('tempo');

campoTempo.addEventListener('input', (event) => {
    configPartida.tempo = event.target.value;
});



// Pegando criterio da partida 
const criterioSelecionado = document.getElementById('criterioPartida');
    criterioSelecionado.addEventListener('change', (event) =>{
        const valorCriterio = event.target.value;

//       console.log('Criterio de partida:' + valorCriterio);
        configPartida.criterio = valorCriterio;
    });


// Botao sortear times com os dados geral de configuracao de partida
const botaoSortear = document.querySelector('.botao-sorteio-master');

botaoSortear.addEventListener('click', () =>{

   console.log('/////////////////////////////////////');
   console.log('DADOS GERAIS DA PARTIDA');
   console.log('/////////////////////////////////////');

   console.log(configPartida);

})