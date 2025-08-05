let listaNumerosSorteados = [0];
let maximo = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let chute;


exibirTextoInicial();

function verificarChute() {
    chute = document.querySelector('input').value;
    
    let palavraTentativa = tentativas > 1 ? ' tentativas!' : ' tentativa!';

    let mensagem = 'Você descobriu o número secreto em: ' + tentativas + palavraTentativa;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'O número Secreto é menor');
        } else {
            exibirTextoNaTela('h1', 'O número Secreto é maior');
      }
    
    tentativas++;
    limparCampo();
    }
}

function reiniciarJogo(){
    exibirTextoInicial();
    limparCampo();
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * maximo + 1);
    let quantElementos = listaNumerosSorteados.length - 1;

    if (quantElementos == maximo){
        listaNumerosSorteados = [0];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
       return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
    
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ''
}

function exibirTextoInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número inteiro de 1 a ' + maximo);
}