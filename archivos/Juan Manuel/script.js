document.addEventListener("DOMContentLoaded", function () {
    let colores = ["red", "green", "yellow", "blue"];
    let secuencia = [];
    let secuenciaJugador = [];
    let vidas = 3;

    const botonesColores = document.querySelectorAll(".color-btn");
    const btnMostrar = document.getElementById ("start-sequence");
    const btnReintentar = document.getElementById("retry-sequence");
    const feedback = document.getElementById("level3-feedback");
    const estado = document.getElementById("status-display");

    function actualizarEstado () {
        estado.innerHTML = `<p> Vidas: ${vidas}</p>`;
    }

    function generarSecuencia () {
        secuencia = [];
        for (let i = 0; i < 4; i++) {
            let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            secuencia.push(colorAleatorio);
        }
    }

    function mostrarSecuencia() {
        let tiempo = 600;
        secuenciaJugador = [];
        feedback.textContent = "Observa la secuencia";
        desactivarBotones();

        secuencia.forEach((color, i) => {
            setTimeout(() => {
                let boton = document.querySelector(`.color-btn[data-color="${color}"]`);
                boton.classList.add("active");
                setTimeout(() => {
                    boton.classList.remove("active");
                }, 300);
            }, tiempo * (i + 1));
        });

        setTimeout (() => {
            feedback.textContent = "¡Ahora repite la secuencia!";
            activarBotones();
        }, tiempo * secuencia.length + 500);
    }

    function activarBotones () {
        botonesColores.forEach(boton => {
            boton.addEventListener("click", manejarClick);
        });
    }

    function desactivarBotones () {
        botonesColores.forEach(boton => {
            boton.removeEventListener ("click", manejarClick);
        });
    }

    function manejarClick(e) {
        let colorPresionado = e.target.dataset.color;
        secuenciaJugador.push(colorPresionado);
        let indice = secuenciaJugador.length - 1;

        if (secuenciaJugador[indice] !== secuencia[indice]) {
            vidas--;
            actualizarEstado();
            feedback.textContent = `¡Fallaste! Te quedan ${vidas} vidas.`;

            if (vidas <= 0) {
                feedback.textContent = `Juego Terminado. Te has quedado sin vidas.`;
                desactivarBotones ();
                btnReintentar.classList.remove("d-none");
                return;
            }

            secuenciaJugador = [];
            desactivarBotones();
            btnReintentar.classList.remove("d-none");
            return;
        }

        if (secuenciaJugador.length === secuencia.length) {
            feedback.textContent = `¡Correcto! Has pasado el desafio.`;
            desactivarBotones();
            btnReintentar.classList.add("d-none");
        }
    }

    btnMostrar.addEventListener("click", function () {
        vidas = 3;
        actualizarEstado();
        generarSecuencia();
        mostrarSecuencia();
        btnReintentar.classList.add("d-none");
    });

    btnReintentar.addEventListener("click", function () {
        vidas = 3;
        actualizarEstado();
        generarSecuencia();
        mostrarSecuencia();
        btnReintentar.classList.add("d-none");
    });

    actualizarEstado();
})
