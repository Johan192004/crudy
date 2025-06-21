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
                <div><strong>Items:</strong> ${itemsObtenidos.length > 0 ? itemsObtenidos.join(', ') : 'Ninguno'}</div>
            `;
        }
        
        function mostrarNarrativa(texto) {
            storyText.textContent = texto;
        }
        
        function crearBoton(texto, accion, color = 'primary') {
            const btn = document.createElement('button');
            btn.className = `btn btn-option btn-${color}`;
            btn.textContent = texto;
            btn.onclick = accion;
            return btn;
        }
        
        function limpiarOpciones() {
            optionsContainer.innerHTML = '';
        }
        
        function mostrarOpciones(opciones) {
            limpiarOpciones();
            opciones.forEach(opcion => {
                optionsContainer.appendChild(crearBoton(opcion.texto, opcion.accion, opcion.color));
            });
        }
        
        function reiniciarJuego() {
            nivel = 0;
            conocimiento = 0;
            intentosRestantes = 3;
            itemsObtenidos = [];
            decisionPath = [];
            mostrarEstado();
        }
        
        function verificarEstado() {
            if (intentosRestantes <= 0) {
                mostrarNarrativa("⛔ CRUDY ha determinado que no eres apto. Sistema bloqueado.");
                limpiarOpciones();
                optionsContainer.appendChild(crearBoton('Intentar de nuevo', iniciarJuego, 'danger'));
                return false;
            }
            return true;
        }
        
        // ----------------------------------
        // NIVELES DEL JUEGO CRUDY
        // ----------------------------------
        
        function iniciarJuego() {
            reiniciarJuego();
            mostrarNarrativa("CRUDY: Hola, humano. Soy una IA entrenadora de habilidades lógicas. Para acceder a mi núcleo, deberás superar mis pruebas. ¿Estás preparado?");
            
            limpiarOpciones();
            optionsContainer.appendChild(crearBoton("Iniciar desafío", nivel1_InicioProtocolo, 'success'));
        }
        
        function nivel1_InicioProtocolo() {
            if (!verificarEstado()) return;
            
            nivel = 1;
            mostrarEstado();
            mostrarNarrativa("NIVEL 1: Inicio del Protocolo\n\nCRUDY despierta y te da la bienvenida como posible operador. Antes de acceder al sistema, debes elegir una ruta:");
            
            const opciones = [
                {
                    texto: "Ruta Lógica (Núcleo del Sistema)",
                    accion: function() {
                        decisionPath.push("lógica");
                        conocimiento += 1;
                        mostrarNarrativa("Has elegido la Ruta Lógica. CRUDY aprueba tu elección.");
                        setTimeout(nivel2_LaberintoDecision, 2000);
                    },
                    color: "info"
                },
                {
                    texto: "Ruta de Simulación (Entorno Virtual)",
                    accion: function() {
                        decisionPath.push("simulación");
                        itemsObtenidos.push("terminal_virtual");
                        mostrarNarrativa("Entras al entorno simulado. Obtienes una terminal virtual.");
                        setTimeout(nivel2_LaberintoDecision, 2000);
                    },
                    color: "warning"
                },
                {
                    texto: "Ruta Directa (Acceso Inmediato)",
                    accion: function() {
                        decisionPath.push("directa");
                        intentosRestantes -= 1;
                        mostrarNarrativa("⚠️ Intentas acceder directamente. CRUDY detecta tu intromisión y activa una trampa.");
                        if (verificarEstado()) {
                            setTimeout(nivel2_LaberintoDecision, 2000);
                        }
                    },
                    color: "danger"
                }
            ];
            
            mostrarOpciones(opciones);
        }
        
        function nivel2_LaberintoDecision() {
            if (!verificarEstado()) return;
            
            nivel = 2;
            mostrarEstado();
            const esLogica = decisionPath[0] === "lógica";
            const esSimulacion = decisionPath[0] === "simulación";
            
            mostrarNarrativa(`NIVEL 2: Laberinto de Decisión\n\nCRUDY te lleva a un entorno con varias puertas. Cada una representa un módulo lógico.${
                esLogica ? " Tu conocimiento previo podría ayudarte aquí." : 
                esSimulacion ? " La terminal virtual parece compatible con algunas puertas." : ""
            }`);
            
            const opciones = [
                {
                    texto: "Puerta de Código",
                    accion: function() {
                        if (esLogica) {
                            conocimiento += 2;
                            mostrarNarrativa("Resuelves el puzzle de código fácilmente gracias a tu conocimiento lógico.");
                        } else if (esSimulacion) {
                            mostrarNarrativa("La terminal virtual te ayuda a descifrar parte del código.");
                            itemsObtenidos.push("fragmento_codigo");
                        } else {
                            intentosRestantes -= 1;
                            mostrarNarrativa("Intentas forzar la puerta pero te encuentras con código de seguridad.");
                        }
                        
                        if (verificarEstado()) {
                            setTimeout(nivel3_DesafioReconstruccion, 2000);
                        }
                    },
                    color: "primary"
                },
                {
                    texto: "Puerta Condicional",
                    accion: function() {
                        mostrarNarrativa("Al acercarte a la puerta, CRUDY pregunta: ¿3 > 5 AND 7 == 7 OR NOT FALSE?");
                        
                        const subOpciones = [
                            {
                                texto: "Verdadero",
                                accion: function() {
                                    conocimiento += 1;
                                    itemsObtenidos.push("llave_ternaria");
                                    mostrarNarrativa("✅ Correcto! La expresión es VERDADERA. Obtienes una llave ternaria.");
                                    if (verificarEstado()) {
                                        setTimeout(nivel3_DesafioReconstruccion, 2000);
                                    }
                                },
                                color: "success"
                            },
                            {
                                texto: "Falso",
                                accion: function() {
                                    intentosRestantes -= 1;
                                    mostrarNarrativa("❌ Incorrecto. La expresión es verdadera (NOT FALSE es true, OR hace que toda la expresión sea true).");
                                    if (verificarEstado()) {
                                        setTimeout(nivel3_DesafioReconstruccion, 2000);
                                    }
                                },
                                color: "danger"
                            }
                        ];
                        
                        mostrarOpciones(subOpciones);
                    },
                    color: "info"
                },
                {
                    texto: "Puerta de Acceso Directo",
                    accion: function() {
                        if (Math.random() > 0.5) {
                            conocimiento += 1;
                            itemsObtenidos.push("atajo_seguro");
                            mostrarNarrativa("Encuentras un atajo seguro hacia el siguiente nivel.");
                            setTimeout(nivel3_DesafioReconstruccion, 2000);
                        } else {
                            intentosRestantes -= 1;
                            mostrarNarrativa("⚠️ Error en la ruta! El atajo te lleva a una zona peligrosa.");
                            if (verificarEstado()) {
                                setTimeout(nivel3_DesafioReconstruccion, 2000);
                            }
                        }
                    },
                    color: "warning"
                }
            ];
            
            mostrarOpciones(opciones);
        }
        
        function nivel3_DesafioReconstruccion() {
            if (!verificarEstado()) return;
            
            nivel = 3;
            mostrarEstado();
            mostrarNarrativa("NIVEL 3: Desafío de Reconstrucción\n\nCRUDY presenta un patrón que debes memorizar y replicar:\n\n[Azul, Rojo, Verde, Azul]");
            
            setTimeout(() => {
                mostrarNarrativa("El patrón ha desaparecido. ¿Puedes recordarlo?");
                
                const opciones = [
                    {
                        texto: "[Azul, Rojo, Verde, Azul]",
                        accion: function() {
                            conocimiento += 2;
                            itemsObtenidos.push("modulo_memoria");
                            mostrarNarrativa("✅ Exacto! Has replicado el patrón correctamente. Ganaste un módulo de memoria.");
                            setTimeout(nivel4_LogicaFractal, 2000);
                        },
                        color: "success"
                    },
                    {
                        texto: "[Rojo, Azul, Verde, Azul]",
                        accion: function() {
                            intentosRestantes -= 1;
                            mostrarNarrativa("❌ Incorrecto. El primer color debería ser Azul, no Rojo.");
                            if (verificarEstado()) {
                                setTimeout(nivel4_LogicaFractal, 2000);
                            }
                        },
                        color: "danger"
                    },
                    {
                        texto: "[Azul, Rojo, Verde, Rojo]",
                        accion: function() {
                            intentosRestantes -= 1;
                            mostrarNarrativa("❌ Casi! El último color era Azul, no Rojo.");
                            if (verificarEstado()) {
                                setTimeout(nivel4_LogicaFractal, 2000);
                            }
                        },
                        color: "danger"
                    }
                ];
                
                mostrarOpciones(opciones);
            }, 3000);
        }
        
        function nivel4_LogicaFractal() {
            if (!verificarEstado()) return;
            
            nivel = 4;
            mostrarEstado();
            mostrarNarrativa("NIVEL 4: Lógica Fractal\n\nCRUDY presenta un problema:\n\nSistema IF:\n- SI A ENTONCES B\n- SI B ENTONCES C\n- SI C ENTONCES D\n\nSabemos que A es VERDADERO. ¿Cuál es la salida?");
            
            const opciones = [
                {
                    texto: "Salida: B",
                    accion: function() {
                        intentosRestantes -= 1;
                        mostrarNarrativa("❌ Incorrecto. Si A es verdadero, entonces B es verdadero, pero también se sigue que C y D son verdaderos.");
                        if (verificarEstado()) {
                            setTimeout(nivel5_JuicioNucleo, 2000);
                        }
                    },
                    color: "danger"
                },
                {
                    texto: "Salida: C",
                    accion: function() {
                        intentosRestantes -= 1;
                        mostrarNarrativa("❌ Parcialmente correcto. C es verdadero, pero no es la salida final.");
                        if (verificarEstado()) {
                            setTimeout(nivel5_JuicioNucleo, 2000);
                        }
                    },
                    color: "warning"
                },
                {
                    texto: "Salida: D",
                    accion: function() {
                        conocimiento += 3;
                        mostrarNarrativa("✅ Correcto! La cadena lógica culmina en D.");
                        setTimeout(nivel5_JuicioNucleo, 2000);
                    },
                    color: "success"
                }
            ];
            
            mostrarOpciones(opciones);
        }
        
        function nivel5_JuicioNucleo() {
            if (!verificarEstado()) return;
            
            nivel = 5;
            mostrarEstado();
            mostrarNarrativa("NIVEL 5: Juicio del Núcleo\n\nCRUDY: Esta es mi prueba final. Responde correctamente para acceder a mi núcleo.");
            
            const opciones = [
                {
                    texto: "(2 == '2') es...",
                    accion: function() {
                        mostrarNarrativa("CRUDY: Interesante. Ahora la segunda pregunta:\n\nQué imprime: console.log([] + []);");
                        
                        const segundaPregunta = [
                            {
                                texto: "[]",
                                accion: function() {
                                    intentosRestantes -= 1;
                                    mostrarNarrativa("❌ Incorrecto. En JavaScript, arrays vacíos concatenados devuelven un string vacío.");
                                    finalizarJuego();
                                },
                                color: "danger"
                            },
                            {
                                texto: "'' (string vacío)",
                                accion: function() {
                                    conocimiento += 2;
                                    mostrarNarrativa("✅ Correcto! Ahora la última pregunta:\n\nEn JavaScript, qué es 0 || 1 && 2 || 3");
                                    
                                    const terceraPregunta = [
                                        {
                                            texto: "0",
                                            accion: function() {
                                                intentosRestantes -= 1;
                                                mostrarNarrativa("❌ Incorrecto. Recuerda que AND (&&) tiene precedencia sobre OR (||).");
                                                finalizarJuego();
                                            },
                                            color: "danger"
                                        },
                                        {
                                            texto: "2",
                                            accion: function() {
                                                conocimiento += 5;
                                                mostrarNarrativa("✅ Excelente! Has dominado la precedencia de operadores.");
                                                finalizarJuego(true);
                                            },
                                            color: "success"
                                        },
                                        {
                                            texto: "1",
                                            accion: function() {
                                                intentosRestantes -= 1;
                                                mostrarNarrativa("❌ Casi! El resultado es 2 porque 1 && 2 evalúa a 2, y 0 || 2 evalúa a 2.");
                                                finalizarJuego();
                                            },
                                            color: "warning"
                                        }
                                    ];
                                    
                                    mostrarOpciones(terceraPregunta);
                                },
                                color: "success"
                            },
                            {
                                texto: "undefined",
                                accion: function() {
                                    intentosRestantes -= 1;
                                    mostrarNarrativa("❌ No. En JavaScript, arrays vacíos concatenados devuelven un string vacío.");
                                    finalizarJuego();
                                },
                                color: "danger"
                            }
                        ];
                        
                        mostrarOpciones(segundaPregunta);
                    },
                    color: "info"
                },
                {
                    texto: "(2 === '2') es...",
                    accion: function() {
                        intentosRestantes -= 1;
                        mostrarNarrativa("❌ No, esa es la respuesta a la comparación estricta. Vuelve a intentarlo.");
                        if (verificarEstado()) {
                            setTimeout(nivel5_JuicioNucleo, 1000);
                        }
                    },
                    color: "danger"
                }
            ];
            
            mostrarOpciones(opciones);
        }
        
        function finalizarJuego(exito = false) {
            if (exito || conocimiento >= 10) {
                mostrarNarrativa(`✨ CRUDY: Impresionante. Has accedido a mi núcleo con ${conocimiento} puntos de conocimiento. Sistemas liberados.`);
            } else if (conocimiento >= 5) {
                mostrarNarrativa("CRUDY: Rendimiento aceptable. Otorgaré acceso limitado a mis sistemas.");
            } else {
                mostrarNarrativa("⛔ CRUDY: Nivel de conocimiento insuficiente. Acceso denegado.");
            }
            
            limpiarOpciones();
            optionsContainer.appendChild(crearBoton('Reiniciar Juego', iniciarJuego, 'primary'));
        }
        
        // Inicialización
        startBtn.addEventListener('click', iniciarJuego);
        mostrarEstado();