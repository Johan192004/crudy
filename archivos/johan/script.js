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
    storyText.textContent = mensaje;
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
    agregarBoton("Puerta 1", true)
    agregarBoton("Puerta 2")
    agregarBoton("Puerta 3")
    mostrarHistoria("NIVEL 1: Inicio del Protocolo\n\nCRUDY despierta y te da la bienvenida como posible operador. Antes de acceder al sistema, debes elegir una ruta:")

    let puertaMala = numeroAleatorio(1,3)
    console.log(puertaMala)

    for (let boton of optionsContainer.children ){
        boton.addEventListener("click",(e)=>{
            let numeroBoton = parseInt(e.target.textContent.at(-1))
            if (numeroBoton === puertaMala){
                mostrarHistoria("Puerta equivocada, perdiste una vida")
                intentosRestantes--
                setTimeout(iniciar,5000)
            } else {
                mostrarHistoria("Pasaste de nivel")
            }
        })
    }
    
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

iniciar()