// Variables globales del juego
let nivel = 2;
let conocimiento = 0;
let intentosRestantes = 3;
let itemsObtenidos = [];
let decisionPath = [];

// Elementos DOM
const storyText = document.getElementById('story-text');
const optionsContainer = document.getElementById('options-container');
const statusDisplay = document.getElementById('status-display');
const startBtn = document.getElementById('start-btn');

// Mostrar el estado del jugador
function mostrarEstado() {
    statusDisplay.innerHTML = `
        <div><strong>Nivel:</strong> ${nivel}/5</div>
        <div><strong>Conocimiento:</strong> ${conocimiento}</div>
        <div><strong>Intentos:</strong> ${intentosRestantes}</div>
    `;
}

// Verifica si se pueden seguir jugando
function verificarEstado() {
    if (intentosRestantes <= 0) {
        storyText.innerHTML = "⛔ CRUDY ha determinado que no eres apto. Sistema bloqueado.";
        limpiarOpciones();
        optionsContainer.appendChild(crearBoton('Intentar de nuevo', () => location.reload(), 'danger'));
        return false;
    }
    return true;
}

// Limpia las opciones anteriores
function limpiarOpciones() {
    optionsContainer.innerHTML = "";
}

// Crea un botón reutilizable
function crearBoton(texto, accion, tipo = 'primary') {
    const btn = document.createElement('button');
    btn.className = `btn btn-${tipo} m-2`;
    btn.textContent = texto;
    btn.onclick = accion;
    return btn;
}

// Inicia el Nivel 2
function nivel2_simpleDOM() {
    nivel = 2;
    mostrarEstado();

    storyText.innerHTML = "<strong>NIVEL 2: Laberinto de Decisión</strong><br>CRUDY te muestra 3 puertas. Elige bien la puerta para continuar, puedes perderlo todo...";

    optionsContainer.innerHTML = `
        <button class="btn btn-primary m-2" onclick="puerta1()">🚪 Puerta 1... Piensalo</button>
        <button class="btn btn-info m-2" onclick="puerta2()">🚪 Puerta 2... Quizás</button>
        <button class="btn btn-warning m-2" onclick="puerta3()">🚪 Puerta 3... Ganar o perder</button>
    `;
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

    if (exito) {
        storyText.innerHTML = "🎉 Has encontrado un atajo seguro. CRUDY te permite avanzar.";
        conocimiento++;
        itemsObtenidos.push("atajo");
    } else {
        storyText.innerHTML = "⚠️ El atajo te llevó a una zona peligrosa. Pierdes un intento.";
        intentosRestantes--;
    }

    mostrarEstado();
    if (verificarEstado()) {
        limpiarOpciones();
        optionsContainer.appendChild(crearBoton("Continuar al Nivel 3", nivel3, "dark"));
    }
}

// Nivel 3 (placeholder)
function nivel3() {
    nivel = 3;
    storyText.innerHTML = "<strong>NIVEL 3: Aquí inicia el siguiente desafío...</strong>";
    limpiarOpciones();
    mostrarEstado();
}

// Iniciar desde el botón
startBtn.addEventListener("click", nivel2_simpleDOM);
