let palavrasValidas = []

palavrasValidasAcentuadas.forEach(function(element) {
    palavrasValidas.push(element.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase())
})

let indice = Math.floor(Math.random() * palavrasValidas.length)

let palavraDoDia = palavrasValidas[indice]
// palavraDoDia = 'OSSOS'

// VARIAVEL PARA SALVAR VALOR DE PALAVRA DO DIA
var palavraDoDiaAUX = palavraDoDia

let linha = 1

let entrada = []

let trataTeclas = (tecla) =>{

    let char = tecla.toUpperCase();

    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }

    if (char == 'ENTER') {
        if (entrada.length == 5){
        validarEntrada()
        entrada = []
        linha += 1}
        console.log('linha: ', linha)
        console.log('entrada: ',entrada.length)
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

const ouvinteDeTeclas = (event) => {
    trataTeclas(event.key)
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
    entrada = entrada.join('')

    // debugger
    
    for (var i = 0; i < palavraDoDia.length; i++){
        // debugger
        // Letra correta na posição correta
        if (palavraDoDia[i] == (entrada[i]) ){
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('validado')
            l.classList.add("animate__animated")
            l.classList.add("animate__flipInX")
            entrada = entrada.replace(entrada[i], '@')
            palavraDoDia = palavraDoDia.replace(palavraDoDia[i], '!')
        }

        // Letra correta na posição errada correta
        else if (palavraDoDia.includes(entrada[i])){
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)

            // CONTA LETRA NA PALAVRA DO DIA

            var letraRepetidaDia = 0

            for (x of palavraDoDia){
                if (x == entrada[i]){
                    letraRepetidaDia += 1
                }
            }

            // CONTA LETRA NA ENTRADA
            var letraRepetidaEntrada = 0

            for (x of entrada){
                if (x == entrada[i]){
                    letraRepetidaEntrada += 1
                }
            }

            if (letraRepetidaEntrada < letraRepetidaDia){
                l.classList.add('posicao-errada')
                letraRepetidaDia = 0
                letraRepetidaEntrada = 0
                entrada = entrada.replace(entrada[i], '@')
            } else if (letraRepetidaEntrada == letraRepetidaDia){
                l.classList.add('posicao-errada')
                letraRepetidaDia = 0
                letraRepetidaEntrada = 0
                palavraDoDia = palavraDoDia.replace(palavraDoDia.indexOf(entrada[i]),'@')
                entrada = entrada.replace(entrada[i], '@')
            } 
            
            else{
                l.classList.add('invalido')
                letraRepetidaDia = 0
                letraRepetidaEntrada = 0
                entrada = entrada.replace(entrada[i], '@')
            }

        } 
        
        
        // Letra não existe
        else{
            if (entrada.length == 5){           
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('invalido')
            l.classList.add("animate__animated")
            l.classList.add("animate__flipInX")
            }
        }

    }

    if (palavraDoDia === entrada){
        setTimeout(sucesso, 600)
    } 
    
    if (linha === 6 && palavraDoDia != entrada){
        setTimeout(fracasso, 600)
    }

    palavraDoDia = palavraDoDiaAUX
}



function sucesso (){
    alert('Parabéns, você venceu!')
}

function fracasso (){
    alert(`A palavra do dia era: ${palavraDoDia}`)
}


document.body.addEventListener('keydown', ouvinteDeTeclas)
document.querySelectorAll(".tecla").forEach((el) =>{
    el.addEventListener('click', function(el){
       let letra = el.srcElement.textContent 

       if (letra == "⌫"){
        letra = 'BACKSPACE'
       }

       trataTeclas(letra)
    })
})