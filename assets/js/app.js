// Main JS file

console.log("Js aplicado")

// secao configuracao da partida xxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


const configPartida = {
    tipoSorteio: "aleatorio",
    jogadores: [],
    estrutura: [],
    totalTime: [],
    tempo: [],
    criterio: []
}

// selecionando valor do sorteio:

const sorteio = document.getElementById("seletor");

sorteio.addEventListener('change', (event) =>{

    const opcaovalor = event.target.value;

    console.log("sorteio escolhido " + opcaovalor)
});

