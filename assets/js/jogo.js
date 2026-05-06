console.log('jogo.js aplicado a página');

// Selecionando itens do html 

const displayCronometro = document.querySelector(".cronometro-display");
const btnPausar = document.querySelector(".btn-controle.secundario");
const btnReset = document.querySelector(".btn-controle:not(.secundario)");

let tempoRestante;
let intervalo;
let pausado = true

//pegando dados do local 

function inicializarPartida() {
    const dadosPartida = JSON.parse(localStorage.getItem("dadosPartida"));

    if(dadosPartida && dadosPartida.tempo){
        tempoRestante = parseInt(dadosPartida.tempo) * 60;   
    } else{
        tempoRestante = 10 * 60;
    }

    atualizarDisplay();
};

function atualizarDisplay(){
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante %60;

    displayCronometro.innerText = 
        `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

};

function iniciarContagem(){
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(intervalo);
            alert("Fim de partida!");
        }
    }, 1000);

}

btnPausar.addEventListener ("click", () =>{
    if(pausado){
        iniciarContagem();
        btnPausar.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            Pausar
        `;
    }else{
        clearInterval(intervalo);
        btnPausar.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Continuar
        `;
    }
    pausado = !pausado;
});

btnReset.addEventListener("click", () =>{
    clearInterval(intervalo);
    pausado = true;
    btnPausar.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        Iniciar
    `
    inicializarPartida();
});

inicializarPartida();

