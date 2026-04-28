console.log('Sorteio Js aplicado!');


// resgatando dados do local e exibindo no console 

const dadosMemoria = localStorage.getItem('dadosPartida');

if (dadosMemoria) {
    const configPartida = JSON.parse(dadosMemoria);

    console.log('DADOS RECUPERADOS COM SUCESSO');
    console.log('Lista de jogadores: ', configPartida.jogadores);
}else {
    alert("Desculpe, nenhuma partida foi configurada, vou te redirecionar a pagina de configuracao.");
    window.location.href =  "index.html";
}

