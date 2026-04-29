console.log('Sorteio Js aplicado!');

const dadosMemoria = localStorage.getItem('dadosPartida');

if (dadosMemoria){
    const config = JSON.parse(dadosMemoria);
    const totalTimes = parseInt(config.totalTime);
    const limitePorTime = parseInt(config.estrutura);

let times = Array.from({length: totalTimes}, () => []);

console.log(times);

let lista = [...config.jogadores];

console.log(lista);


}

