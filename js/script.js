const palavrasValidas = ['ARROZ', 'AMORA', 'TESTE']

const palavraDoDia = 'ARROZ'

let linha = 1

let entrada = []


const ouvinteDeTeclas = (event) => {

    let char = event.key.toUpperCase();
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }

    if (char == 'ENTER') {
        var indicesValidos = [5, 10, 15, 20, 25, 30]
        if (indicesValidos.includes(entrada.length) ){
        validarEntrada()}
        entrada = []
        linha += 1
        return;
    }

    if (char == 'BACKSPACE'){
        entrada.pop()
        console.log(entrada)
        removeLetra()
        return;
    }

    if (entrada.length < 5){
        entrada.push(char)  
    }
    
    console.log(entrada)
    exibeLetra(char)
}

function exibeLetra(letra) {
    let elId = `l${linha}c${entrada.length}`
    const el = document.getElementById(elId)
    el.textContent = letra
}

function removeLetra() {
    let elId = `l${linha}c${entrada.length + 1}`
    const el = document.getElementById(elId)
    el.textContent = ''
}

function validarEntrada() {
    
    for (var i = 0; i < palavraDoDia.length; i++){
        if (palavraDoDia[i] == (entrada.join('')[i])){
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('validado')
        } 
        
        // else if (palavraDoDia.slice(i,(palavraDoDia.length)).includes((entrada.join('')[i]))){
        //     let elId = `l${linha}c${i+1}`
        //     var l = document.getElementById(elId)
        //     l.classList.add('posicao-errada')
        // } 
        
        else{
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('invalido')
            console.log('Diferente')
        }
    }
}


document.body.addEventListener('keydown', ouvinteDeTeclas)