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
        <div><strong>Conocimiento:</strong> ${conocimiento}</div>
        <div><strong>Intentos:</strong> ${intentosRestantes}</div>
    `;
}


function mostrarHistoria(mensaje){
    storyText.innerText = mensaje;
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

function iniciar(){
    mostrarEstado()
    agregarBoton("El nodo D está apagado", true)
    agregarBoton("El nodo D está activo")
    agregarBoton("El nodo D depende del nodo B")
    agregarBoton("El nodo D no cambia su estado")
    mostrarHistoria(`NIVEL 4:Si el nodo A está activo, entonces el nodo B también se activa. Si el nodo B está activo, entonces el nodo C se apaga. Si el nodo C está apagado, entonces el nodo D se activa. El nodo A está activo.

¿Cuál es el estado final del nodo D?`)


    for (let boton of optionsContainer.children ){
        if(boton.textContent.includes("D está activo")){
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Pasaste de nivel")
            })
        }else {
            boton.addEventListener("click",(e)=>{
                mostrarHistoria("Te equivocaste, has perdido una vida")
                intentosRestantes--
                setTimeout(iniciar,5000)
            })
        }
    } 
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

iniciar()