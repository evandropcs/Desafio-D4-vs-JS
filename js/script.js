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

const ouvinteDeTeclas = (event) => {
    trataTeclas(event.key)
}

// Capitura teclas digitadas no teclado
document.body.addEventListener('keydown', ouvinteDeTeclas)

// Capitura botões acionados pelo mouse
document.querySelectorAll(".tecla").forEach((el) =>{
    el.addEventListener('click', function(el){
       let letra = el.event.target.textContent 
       if (letra == "⌫"){
        letra = 'BACKSPACE'
       }
       trataTeclas(letra)
    })
})

let trataTeclas = (tecla) =>{

    let char = tecla.toUpperCase();

    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return;
    }

    if (char == 'ENTER') {
        if (entrada.length == 5){
        validarEntrada()
        entrada = []
        linha += 1}
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
        exibeLetra(char)
    }
}

const exibeLetra = (letra) => {
    let elId = `l${linha}c${entrada.length}`
    const el = document.getElementById(elId)
    el.textContent = letra
}

const removeLetra = () => {
    let elId = `l${linha}c${entrada.length + 1}`
    const el = document.getElementById(elId)
    el.textContent = ''
}

const validarEntrada = () => {
    entrada = entrada.join('')
    
    for (var i = 0; i < palavraDoDia.length; i++){
        
        let elId = `l${linha}c${i+1}`
        var el = document.getElementById(elId)

        // Letra correta na posição correta
        if (palavraDoDia[i] == (entrada[i]) ){
            el.classList.add('validado')
            el.classList.add("animate__animated")
            el.classList.add("animate__flipInX")
            entrada = entrada.replace(entrada[i], '@')
            palavraDoDia = palavraDoDia.replace(palavraDoDia[i], '!')
        }

        // Letra correta na posição errada correta
        else if (palavraDoDia.includes(entrada[i])){

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
                el.classList.add('posicao-errada')
                letraRepetidaDia = 0
                letraRepetidaEntrada = 0
                entrada = entrada.replace(entrada[i], '@')

            } else if (letraRepetidaEntrada == letraRepetidaDia){
                el.classList.add('posicao-errada')
                letraRepetidaDia = 0
                letraRepetidaEntrada = 0
                palavraDoDia = palavraDoDia.replace(palavraDoDia.indexOf(entrada[i]),'@')
                entrada = entrada.replace(entrada[i], '@')
            } 
            
            else{
                el.classList.add('invalido')
                letraRepetidaDia = 0
                letraRepetidaEntrada = 0
                entrada = entrada.replace(entrada[i], '@')
            }

        } 
           
        // Letra não existe
        else{
            if (entrada.length == 5){           
            el.classList.add('invalido')
            el.classList.add("animate__animated")
            el.classList.add("animate__flipInX")
            }
        }
    }

    palavraDoDia = palavraDoDiaAUX
}