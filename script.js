var cache;
var cont;
var palavra;
var palavraTemp;
var img = document.querySelector("#forca")
var arrayPalavras = [
    {'0': ['CAJU', 'FRUTA']},
    {'1': ['GOIABA', 'FRUTA']},
    {'2': ['JABUTICABA', 'FRUTA']},
    {'3': ['LARANJA', 'FRUTA']},
    {'4': ['MEXERICA', 'FRUTA']},
    {'5': ['BANANA', 'FRUTA']},
    {'6': ['MELANCIA', 'FRUTA']},
    {'7': ['ABACAXI', 'FRUTA']},
    {'8': ['VASSOURA', 'OBJETO']},
    {'9': ['PANELA', 'OBJETO']},
    {'10': ['CADEIRA', 'OBJETO']},
    {'11': ['CHAVE', 'OBJETO']},
    {'12': ['PNEU', 'OBJETO']},
    {'13': ['SABONETE', 'OBJETO']},
    {'14': ['CAVALO', 'ANIMAL']},
    {'15': ['PORCO', 'ANIMAL']},
    {'16': ['MACACO', 'ANIMAL']},
    {'17': ['RATO', 'ANIMAL']},
    {'18': ['GATO', 'ANIMAL']},
    {'19': ['CACHORRO', 'ANIMAL']},
    {'20': ['CALOPSITA', 'ANIMAL']},
    {'21': ['PAPAGAIO', 'ANIMAL']},
    {'22': ['PATO', 'ANIMAL']},
];

window.addEventListener('keyup', function(event) {
    var letra = event.key.toUpperCase();
    if(isAlpha(event.key)) {
        checarLetra(letra)
    }
});

var isAlpha = function(ch){
    return /^[a-z]$/i.test(ch);
}

function getValueByKey (collection, key) {
    var value;
    collection.map(function (item) {
        if (key in item) value = item[key];
    })
    return value;
}

function checarLetra(letra){
    arrayRes = palavraTemp.match(letra);    
    if (arrayRes != null){  
        if(cont < 6){
             do{
                var index = arrayRes.index;
                var painelLetras = document.getElementById("painelLetras");
                painelLetras.children[index].innerHTML = palavra.charAt(index);
                palavraTemp = palavraTemp.replace(letra, "0");
                arrayRes = palavraTemp.match(letra)
            }while(arrayRes != null);
            var bool = true;
            for (var i = 0; i < palavraTemp.length; i++) {
                if (palavraTemp.charAt(i) != 0){
                    bool = false;
                    break;
                }
            }
            if(bool){
                setTimeout(function(){ alert("Você ganhou!!!"); zerarJogo();}, 500);
            }
        }  
        cache = cache.concat(letra);

    }else if(cache.match(letra) == null){
        if(++cont == 6){
            setTimeout(function(){ alert("Você perdeu!!!"); zerarJogo();}, 500);
        }else if(cont > 6){
            cont = 6;
        }
        img.src = "img/" + cont + ".png";
        cache = cache.concat(letra);

    }else{
        alert("Você já digitou esta letra!");
    }
    
    document.getElementById("cache").innerHTML = "LETRAS USADAS: " + cache;
}

function sortearPalavra(){
    var sort = Math.floor(Math.random() * arrayPalavras.length);
    var text = getValueByKey(arrayPalavras, sort);
    return text;
}

function removeLetras(){
    var painelLetras = document.getElementById("painelLetras");
    document.getElementById("cache").innerHTML = "LETRAS USADAS: ";
    document.getElementById("h2-dica").innerHTML = "DICA: " + arr[1];
    var dica;
    if (painelLetras.children.length > 0){
        for(var i = painelLetras.children.length-1; i >=0; i--){
            painelLetras.children[i].remove();
        }
    }
}
function addLetras(){
    var painelLetras = document.getElementById("painelLetras");
    for(var i = 0; i < palavra.length;i++){
        var spanNovo = document.createElement("span");
        spanNovo.className = 'spanDica';
        spanNovo.innerHTML = '_';
        painelLetras.appendChild(spanNovo);
    }
}
function resetaLetras(){
    removeLetras();
    addLetras();
}
function zerarJogo(){
    cache = "";
    cont = 0;
    img.src = "img/0.png";
    arr = sortearPalavra();
    palavra = palavraTemp = arr[0];
    console.log(palavra);
    resetaLetras();
}
zerarJogo();