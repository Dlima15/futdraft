console.log('Sorteio Js aplicado!');

const dadosMemoria = localStorage.getItem('dadosPartida');

if (dadosMemoria){
    const config = JSON.parse(dadosMemoria);
    const totalTimes = JSON.parseInt(config.totalTime);
    const limitePorTime = parseInt(config.estrutura);
}

let times = Array.from({length: totalTimes}, () => []);

let lista = [...config.jogadores];


