const tabuleiroElement = document.getElementById('tabuleiro');
var numeroJogadas = [];

var VAZIO = {
    simbolo: '-',
    valor: 0,
};

var jogadorX = {
    simbolo: 'X',
    valor: 1
};

var jogadorO = {
    simbolo: 'O',
    valor: -1
};

var tabuleiro;

var jogadorAtual

// 
var opcaoSegundoJogadorEhComputador

function escolheSegundoJogador(opcao) {
    opcaoSegundoJogadorEhComputador = opcao === 'computador';
    iniciaJogo();
}

function criaCampoJogada(linha, coluna) {
    const campoJogada = document.createElement('p');
    campoJogada.innerHTML = tabuleiro[linha][coluna].simbolo;
    campoJogada.onclick = function jogada() {
        fazerJogada(linha, coluna);
    }
    tabuleiroElement.appendChild(campoJogada);
}

function limpaTabuleiro () {
    tabuleiroElement.innerHTML = '';
}

function desenhaTabuleiro() {

    limpaTabuleiro();

    for (let linha = 0; linha < tabuleiro.length ; linha++) {
        for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
           criaCampoJogada(linha, coluna);
        }
    }
}

function jogadaComputador() {

    const jogada = Math.round(Math.random() * 10);
    let contador = 0
    for (let linha = 0; linha < tabuleiro.length ; linha++) {
        for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
            if (contador === jogada) {
                fazerJogada(linha, coluna);
                return;
            }
            contador++;
        }
    }
}

function proximoJogador() {
    if (jogadorAtual === jogadorX) {
        jogadorAtual = jogadorO;
        if (opcaoSegundoJogadorEhComputador) { setTimeout(() => jogadaComputador(), 100) }
    } else {
        jogadorAtual = jogadorX;
    }
}

function fazerJogada(linha, coluna) {
    if (tabuleiro[linha][coluna] === VAZIO) {
        tabuleiro[linha][coluna] = jogadorAtual;
        numeroJogadas++;
        desenhaTabuleiro();
        if (checarVitoria()) { return; }
        proximoJogador()
    } else {
        if (opcaoSegundoJogadorEhComputador) { jogadaComputador(); return; }
        alert('Jogada Inválida');
    }
}

function checarSequencia(sequencia) {
    return ((sequencia[0].valor + sequencia[1].valor + sequencia[2].valor) === jogadorAtual.valor * 3)
}

function checarLinha() {
    return checarSequencia(tabuleiro[0]) || checarSequencia(tabuleiro[1]) || checarSequencia(tabuleiro[2])
}

function checarColuna() {
    var linhaUm = [
        tabuleiro[0][0],
        tabuleiro[1][0],
        tabuleiro[2][0],
    ]
    var linhaDois = [
        tabuleiro[0][1],
        tabuleiro[1][1],
        tabuleiro[2][1],
    ]
    var linhaTres = [
        tabuleiro[0][2],
        tabuleiro[1][2],
        tabuleiro[2][2],
    ]

    return (checarSequencia(linhaUm) || checarSequencia(linhaDois) || checarSequencia(linhaTres))

}

function checarDiagonal() {
    // Esquerda Superior até direita inferior
    var diagonalUm = [
        tabuleiro[0][0],
        tabuleiro[1][1],
        tabuleiro[2][2]
    ]

    // Direita Superior até esquerda Superior
    var diagonalDois = [
        tabuleiro[0][2],
        tabuleiro[1][1],
        tabuleiro[2][0]
    ]
    return (checarSequencia(diagonalUm) || checarSequencia(diagonalDois))
}

function checarVitoria() {
    if (checarLinha() || checarColuna() || checarDiagonal()) {
        alert(`O jogador -> ${jogadorAtual.simbolo} ganhou`);
        iniciaJogo();
        limpaTabuleiro();
    return true;
    } else if (numeroJogadas >= 9) {
        alert('Empate');
        iniciaJogo();
        limpaTabuleiro();
        return true;
    }
    return false;
}

function iniciaJogo() {
    jogadorAtual = jogadorX;
    tabuleiro = [
        [VAZIO, VAZIO, VAZIO],
        [VAZIO, VAZIO, VAZIO],
        [VAZIO, VAZIO, VAZIO]
    ]
    numeroJogadas = 0;
    desenhaTabuleiro()
}
