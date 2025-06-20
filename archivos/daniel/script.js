// Variables globales del juego
let nivel = 0;
let conocimiento = 0;
let intentosRestantes = 3;
let itemsObtenidos = [];
let decisionPath = [];

// Elementos DOM
const storyText = document.getElementById('story-text');
const optionsContainer = document.getElementById('options-container');
const statusDisplay = document.getElementById('status-display');
const startBtn = document.getElementById('start-btn');

// Funciones del juego
function mostrarEstado() {
    statusDisplay.innerHTML = `
        <div><strong>Nivel:</strong> ${nivel}/5</div>
        <div><strong>Intentos:</strong> ${intentosRestantes}</div>
    `;
}

function mostrarNarrativa(texto) {
    storyText.textContent = texto;
}

function mostrarHistoria(mensaje){
    storyText.innerText = mensaje;
}

function crearBoton(texto, accion, color = 'primary') {
    const btn = document.createElement('button');
    btn.className = `btn btn-option btn-${color}`;
    btn.textContent = texto;
    btn.onclick = accion;
    return btn;
}

function agregarBoton(texto,limpiar = false){
    if (limpiar){
        limpiarBotones()
    }
    optionsContainer.innerHTML += `<button class="btn btn-option btn-lg"><strong>${texto}</strong></button>`
}


function limpiarBotones(){
    optionsContainer.innerHTML = ""
}

function nivel5(){
    mostrarEstado()
    storyText.innerText = `NIVEL 5: ¿Qué imprime este código en Python? 

                        for i in range(1, 6):
                        if i % 2 == 0:
                        print(i)`
    agregarBoton("A. 1 3 5",true)
    agregarBoton("B. 2 4")
    agregarBoton("C. 1 2 3 4 5")
    agregarBoton("D. 0 2 4 6")


    for (let boton of optionsContainer.children ){
        if(boton.textContent.includes(". 2 4")){
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Pasaste de nivel")
                setTimeout(Nivel5_1,3000)
            })
        }else {
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Te equivocaste, has perdido una vida")
                intentosRestantes--
                setTimeout(nivel5,3000)
            })
        }
    } 
}

    

function Nivel5_1(){
    
    mostrarEstado()
    mostrarHistoria("¿Qué es una variable en programación?")
    agregarBoton("A. Un número que nunca cambia",true)
    agregarBoton("B. Un espacio en memoria que guarda un valor")
    agregarBoton("C. Un error del sistema")
    agregarBoton("D. Un comando que imprime datos")


    for (let boton of optionsContainer.children ){
        if(boton.textContent.includes("guarda un valor")){
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Pasaste de nivel")
                setTimeout(Nivel5_2,3000)
            })
        }else {
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Te equivocaste, has perdido una vida")
                intentosRestantes--
                setTimeout(Nivel5_1,3000)
            })
        }
    } 

}

function Nivel5_2(){
    mostrarEstado()
    mostrarHistoria("Si un programa es lento, ¿qué debes hacer primero?")
    agregarBoton("A. Borrar el código",true)
    agregarBoton("B. Medir tiempos y analizar funciones lentas")
    agregarBoton("C. Cambiar de lenguaje de programación")
    agregarBoton("D. Reiniciar la computadora")


    for (let boton of optionsContainer.children ){
        if(boton.textContent.includes("funciones lentas")){
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Pasaste de nivel")
                setTimeout(Nivel5_3,3000)
            })
        }else {
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Te equivocaste, has perdido una vida")
                intentosRestantes--
                setTimeout(Nivel5_2,3000)
            })
        }
    } 

}

function Nivel5_3(){
    mostrarHistoria("¡CONGRATULATIONS! Has completado el reto")
    limpiarBotones()
}
nivel5()