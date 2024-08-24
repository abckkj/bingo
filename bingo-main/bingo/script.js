var numerosSorteados = [];
var cartelaCompleta = false;
var intervalId;

function gerarNumero() {
    if (cartelaCompleta) {
        alert("Cartela já está completa!");
        return;
    }

    if (numerosSorteados.length >= 75) {
        alert("Todos os números já foram sorteados!");
        return;
    }

    var numeroSorteado = sortearNumero();

    document.getElementById("numeroSorteado").innerHTML = numeroSorteado;
    marcarNumeroSorteado(numeroSorteado);

    if (numerosSorteados.length === 75) {
        cartelaCompleta = true;
        alert("Cartela completa!");
        clearInterval(intervalId); // Para o sorteio automático
    }
}

function sortearNumero() {
    var numero = Math.floor(Math.random() * 75) + 1;

    while (numerosSorteados.includes(numero)) {
        numero = Math.floor(Math.random() * 75) + 1;
    }

    numerosSorteados.push(numero);
    return numero;
}

function marcarNumeroSorteado(numero) {
    var celulas = document.getElementsByClassName("celula");

    for (var i = 0; i < celulas.length; i++) {
        if (celulas[i].innerHTML == numero) {
            celulas[i].classList.add("marcado");
            break;
        }
    }
}

function gerarCartela() {
    var cartela = document.getElementById("cartela");
    var numeros = Array.from({ length: 25 }, (_, i) => i + 1); // Array com os números de 1 a 25

    // Embaralhar os números
    for (var i = numeros.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numeros[i];
        numeros[i] = numeros[j];
        numeros[j] = temp;
    }

    for (var i = 0; i < 25; i++) {
        var celula = document.createElement("div");
        celula.className = "celula";
        celula.innerHTML = numeros[i];
        cartela.appendChild(celula);
    }
}


function sortearNumerosAutomaticamente() {
    intervalId = setInterval(gerarNumero, 1000);
}

window.onload = function () {
    gerarCartela();
    document.getElementById("sortearAutomaticamente").addEventListener("click", sortearNumerosAutomaticamente);
};
