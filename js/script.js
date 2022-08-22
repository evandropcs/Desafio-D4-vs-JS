let palavrasValidas = []

palavrasValidasAcentuadas.forEach(function(element) {
    palavrasValidas.push(element.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
})

let palavraDoDia = palavrasValidas[0].toUpperCase()

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
        if (entrada.length = 5){
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
    for (var i = 0; i < palavraDoDia.length; i++){
        
        // Letra correta na posição correta
        if (palavraDoDia[i] == (entrada[i])){
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('validado')
            l.classList.add("animate__animated")
            l.classList.add("animate__flipInX")
        }

        // Letra correta na posição errada correta
        else if (palavraDoDia.includes(entrada[i])){
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('posicao-errada')
        } 
        
        // Letra não existe
        else{
            let elId = `l${linha}c${i+1}`
            var l = document.getElementById(elId)
            l.classList.add('invalido')
            l.classList.add("animate__animated")
            l.classList.add("animate__flipInX")
        }

    }

    if (palavraDoDia === entrada){
        setTimeout(sucesso, 600)
    } 
    
    if (linha === 6 && palavraDoDia != entrada){
        setTimeout(fracasso, 600)
    }
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