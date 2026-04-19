// Main JS file

console.log("Js aplicado")

// secao configuracao da partida xxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


const configPartida = {
    tipoSorteio: "aleatorio",
    jogadores: [],
    nivel:[],
    estrutura: [],
    totalTime: [],
    tempo: [],
    criterio: []
}

let listaJogadores = [

]

// selecionando o tipo do sorteio e ja bloqueando caso o sorteio escolhido for aleatorio

const sorteio = document.getElementById("seletor");

sorteio.addEventListener('change', (event) =>{
    const opcaovalor = event.target.value;
    const containerNivel = document.getElementById('nivelJogador');

    if (opcaovalor == 'aleatorio'){
        containerNivel.style.opacity ='0.5';
        containerNivel.style.pointerEvents = "none";
    } else{
        containerNivel.style.opacity = '1'
        containerNivel.style.pointerEvents = "auto";
    }

    console.log('Modo de sorteio: ' + opcaovalor)
});

// selecionando os jogadores

const botaoAdicionar = document.querySelector('.botao-inserir');

botaoAdicionar.addEventListener('click', () => {
    const nomeCapturado =  document.getElementById('nomeJogador').value;

    if (nomeCapturado == ""){
        alert('Por favor digite o nome do jogador')
        return;
    }
    console.log('Novo jogador: ' + nomeCapturado )

});

// selecionando o nivel do jogador 

const escolhaNivel = document.querySelector('.escolha-nivel');

escolhaNivel.addEventListener('change', (event) =>{
    const nivelSelecionado = event.target.value;

    console.log("Nivel do jogador: " + nivelSelecionado);
})

// selecionando a quantidade de jogadores

const quantidadeJogadores = document.getElementById('qtdJogadores');

quantidadeJogadores.addEventListener('change', (event) =>{
    const numeroJogadores = event.target.value;

    console.log("Quantidade de jogadores por partida: "+ numeroJogadores)
})

// Selecionando a quantidade de times

const quantidadeTimes = document.getElementById('qtdTimes');
    quantidadeTimes.addEventListener('change', (event) =>{
        const numeroTimes = event.target.value;

        console.log('Quantidade de Times:' + numeroTimes);
    })




