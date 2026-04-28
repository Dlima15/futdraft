console.log('Sorteio Js aplicado!');

// resgatando dados do local e exibindo no console 

const dadosMemoria = localStorage.getItem('dadosPartida');

if (dadosMemoria) {
    const configPartida = JSON.parse(dadosMemoria);

    console.log('DADOS RECUPERADOS COM SUCESSO');
    console.log('Lista de jogadores: ', configPartida);
}else {
    alert("Desculpe, nenhuma partida foi configurada, vou te redirecionar a pagina de configuracao.");
    window.location.href =  "index.html";
}


// funcao do sorteio 

function executarLogicaSorteio(config){
    let timesMontados = [];


    // aqui definimos qual vai ser o tipo do sorteio dependendo do que foi colocado no config
    if (config.tipoSorteio === "aleatorio") {
        timesMontados = sorteioAleatorio(config);
    } else {
        timesMontados = sorteioBalanceado(config);
    }
}