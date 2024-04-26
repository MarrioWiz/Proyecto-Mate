let currentIndex = 0;
let nValue = 0;
let resaltado = ''; 

function deBruijn(n) {
    let k = 2;
    let sequence = Array(n).fill(0);
    let result = [];
    
    let db = function(t, p) {
        if (t > n) {
            if (n % p === 0) {
                for (let i = 1; i <= p; i++) {
                    result.push(sequence[i]);
                }
            }
        } else {
            sequence[t] = sequence[t - p];
            db(t + 1, p);
            for (let j = sequence[t - p] + 1; j < k; j++) {
                sequence[t] = j;
                db(t + 1, t);
            }
        }
    }
    
    db(1, 1);
    return result.join("").padStart(Math.pow(2, n), '0');
}

function generarConjuntos() {
    let inicio = performance.now();
    let n = document.getElementById("j1").value;
    let conjuntos = "";
    let cantidad = Math.pow(2, n);
    let dbSequence = deBruijn(n);
    for (let i = 0; i < cantidad; i++) {
        let conjunto = dbSequence.substr(i, n).padEnd(n, '0');
        conjuntos += `<button class="btn btn-outline-light btn-conjunto">${conjunto}</button>`;
    }
    document.getElementById("conjuntos").innerHTML = conjuntos;
    let fin = performance.now();
    let tiempo = fin - inicio;
    document.getElementById("tiempo").innerHTML = "Tiempo de ejecución: " + tiempo + " milisegundos";
    document.getElementById("cantidad").innerHTML = "Cantidad de conjuntos generados: " + cantidad;
    document.getElementById("debruijn").innerHTML = "Secuencia de De Bruijn: " + deBruijn(n);
}


function buscarCombinacionUnica(conjuntos, combinacion) {
    return conjuntos.indexOf(combinacion) !== -1;
}

function resaltarNumeros() {
    let n = document.getElementById("j1").value;
    if (n !== nValue) {
        nValue = n;
        currentIndex = 0;
    }

    let dbSequence = deBruijn(nValue);
    let length = dbSequence.length;
    let end = (currentIndex + parseInt(nValue)) % length;

    resaltado = ''; // Limpiar el resaltado
    for (let i = 0; i < length; i++) {
        if ((i >= currentIndex && i < end) || (end < currentIndex && (i < end || i >= currentIndex))) {
            resaltado += `<span style="background-color: red;">${dbSequence[i]}</span>`;
        } else {
            resaltado += dbSequence[i];
        }
        if ((i + 1) % 50 === 0 && i !== length - 1) {
            resaltado += "<br>";
        }
    }

    document.getElementById("debruijn").innerHTML = "Secuencia de De Bruijn: " + resaltado;

    let combinacion = dbSequence.substr(currentIndex, parseInt(nValue)) + (end < currentIndex ? dbSequence.substr(0, end) : '');
    let conjuntos = document.getElementById("conjuntos").innerHTML;
    let combinacionUnica = buscarCombinacionUnica(conjuntos, combinacion);

    if (combinacionUnica) {
        document.getElementById("conjuntos").innerHTML = conjuntos.replace(combinacion, `<span style="background-color: yellow; color: black;">${combinacion}</span>`);
    }

    currentIndex = (currentIndex + 1) % length;
}

