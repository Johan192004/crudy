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
        <div><strong>Intentos:</strong> ${intentosRestantes}</div>    `;
}

function mostrarNarrativa(texto) {
    storyText.textContent = texto;
}

function reiniciarJuego() {
    nivel = 0;
    conocimiento = 0;
    intentosRestantes = 3;
    mostrarEstado();
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

function nivel1(){
    // let botonBienvenida = document.querySelector(".bienvenida")

    // botonBienvenida.remove()

    mostrarEstado()
    agregarBoton("🚪Puerta 1", true)
    agregarBoton("🚪Puerta 2")
    agregarBoton("🚪Puerta 3")
    mostrarNarrativa("NIVEL 1: Inicio del Protocolo\n\nCRUDY despierta y te da la bienvenida como posible operador. Antes de acceder al sistema, debes elegir una ruta:")

    let puertaMala = numeroAleatorio(1,3)
    console.log(puertaMala)

    for (let boton of optionsContainer.children ){
        boton.addEventListener("click",(e)=>{
            let numeroBoton = parseInt(e.target.textContent.at(-1))
            if (numeroBoton === puertaMala){
                mostrarNarrativa("Puerta equivocada, perdiste una vida")
                intentosRestantes--
                setTimeout(nivel1,2000)
            } else {
                mostrarNarrativa("Pasaste de nivel")
                setTimeout(nivel2,2000)
            }
        })
    }
    
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Inicia el Nivel 2
function nivel2() {
    document.querySelector(".narrative-box").classList.remove("grow-anim")
    nivel = 2;
    mostrarEstado();

    storyText.innerHTML = "<strong>NIVEL 2: Laberinto de Decisión</strong><br>CRUDY te muestra 3 puertas. Elige bien la puerta para continuar, puedes perderlo todo...";

    optionsContainer.innerHTML = `
        <button class="btn btn-primary m-2" onclick="puerta1()">🚪 Puerta 1... Piensalo</button>
        <button class="btn btn-info m-2" onclick="puerta2()">🚪 Puerta 2... Quizás</button>
        <button class="btn btn-warning m-2" onclick="puerta3()">🚪 Puerta 3... Ganar o perder</button>
    `;
    document.querySelector(".narrative-box").classList.add("grow-anim")
    
}

function limpiarOpciones() {
    optionsContainer.innerHTML = "";
}


// Puerta 1: pasa directamente al Nivel 3
function puerta1() {
    storyText.innerHTML = "Espero tengas buena memoria... Bienvenido al Nivel 3... No confíes en nadie.";
    limpiarOpciones();
    optionsContainer.appendChild(crearBoton("Continuar al Nivel 3", nivel3, "success"));
}

// Puerta 2: pregunta lógica compleja
function puerta2() {
    storyText.innerHTML = `
        CRUDY lanza una expresión lógica avanzada:<br>
        <code>!(false && true) || (3 === "3" && true)</code><br>
        ¿Es Verdadera o Falsa?
    `;

    limpiarOpciones();
    optionsContainer.appendChild(crearBoton("Verdadero", () => responderCompleja(true), "success"));
    optionsContainer.appendChild(crearBoton("Falso", () => responderCompleja(false), "danger"));
}

function responderCompleja(respuesta) {
    if (respuesta === true) {
        storyText.innerHTML = "✅ ¡Correcto! CRUDY está sorprendido por tu lógica.";
        conocimiento++;
    } else {
        storyText.innerHTML = "❌ Incorrecto. La expresión es verdadera.";
        intentosRestantes--;
    }

    mostrarEstado();
    if (verificarEstado()) {
        limpiarOpciones();
        optionsContainer.appendChild(crearBoton("Continuar al Nivel 3", nivel3, "secondary"));
    }
}

// Puerta 3: suerte aleatoria
function puerta3() {
    const exito = Math.random() > 0.5;

    let nopaso = false

    if (exito) {
        storyText.innerHTML = "🎉 Has encontrado un atajo seguro. CRUDY te permite avanzar.";
        setTimeout(nivel4,3000)

    } else {
        storyText.innerHTML = "⚠️ El atajo te llevó a una zona peligrosa. Pierdes un intento.";
        intentosRestantes--;
        setTimeout(nivel2,3000)
    }

    // mostrarEstado();
    // if (verificarEstado()) {
    //     limpiarOpciones();
    //     optionsContainer.appendChild(crearBoton("Continuar al Nivel 3", nivel3, "dark"));
    // }

    // if(nopaso){
    //     setTimeout(nivel2,3000)
    // }
}

function crearBoton(texto, accion, tipo = 'primary') {
    const btn = document.createElement('button');
    btn.className = `btn btn-${tipo} m-2`;
    btn.textContent = texto;
    btn.onclick = accion;
    return btn;
}

// Nivel 3 (placeholder)
function nivel3() {
    nivel = 3;
    storyText.innerHTML = "<strong>NIVEL 3: Aquí inicia el siguiente desafío...</strong>";
    limpiarOpciones();
    mostrarEstado();
    setTimeout(nivel4,2000)
}



function nivel4(){
    mostrarEstado()
    agregarBoton("El nodo D está apagado", true)
    agregarBoton("El nodo D está activo")
    agregarBoton("El nodo D depende del nodo B")
    agregarBoton("El nodo D no cambia su estado")
    mostrarNarrativa(`NIVEL 4:Si el nodo A está activo, entonces el nodo B también se activa. Si el nodo B está activo, entonces el nodo C se apaga. Si el nodo C está apagado, entonces el nodo D se activa. El nodo A está activo.

¿Cuál es el estado final del nodo D?`)


    for (let boton of optionsContainer.children ){
        if(boton.textContent.includes("D está activo")){
            boton.addEventListener("click",(e)=>{
                mostrarNarrativa("Pasaste de nivel")
            })
        }else {
            boton.addEventListener("click",(e)=>{
                mostrarNarrativa("Te equivocaste, has perdido una vida")
                intentosRestantes--
                setTimeout(nivel4,2000)
            })
        }
    } 
}
// Inicialización
nivel1()

function inicio(){
    let bienvenida = document.querySelector(".row")

    bienvenida.classList.add("d-flex")
    bienvenida.classList.add("justify-content-center")
    bienvenida.classList.add("align-items-center")
    bienvenida.classList.add("flex-column")

    document.querySelector(".status-panel").classList.toggle("d-none")
    document.querySelector(".narrative-box").classList.toggle("d-none")
    document.getElementById("options-container").classList.toggle("d-none")

    
    bienvenida.innerHTML += `<button class="btn btn-primary m-2 bienvenida" style="width:auto">Bienvenido al JUEGO</button>`;

    let botonBienvenida = document.querySelector(".bienvenida")

    botonBienvenida.addEventListener("click",(e)=>{
        document.querySelector(".status-panel").classList.toggle("d-none")
        document.querySelector(".narrative-box").classList.toggle("d-none")
        document.getElementById("options-container").classList.toggle("d-none")
            
        nivel1()
    })
}