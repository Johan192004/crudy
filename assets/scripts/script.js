  // SISTEMA DE JUEGO CRUDY
        class CrudyGame {
            constructor() {
                this.currentLevel = 1;
                this.score = 0;
                this.playerChoices = [];
                this.memorySequence = [];
                this.playerSequence = [];
                this.attempts = 3;
                
                this.gameContent = document.getElementById('gameContent');
                this.buttonArea = document.getElementById('buttonArea');
                this.levelBadge = document.getElementById('levelBadge');
                this.progressBar = document.getElementById('progressBar');
                this.scoreElement = document.getElementById('score');
                
                this.startGame();
            }
            
            startGame() {
                this.loadLevel(1);
            }
            
            loadLevel(level) {
                this.currentLevel = level;
                this.updateUI();
                
                switch(level) {
                    case 1: this.level1(); break;
                    case 2: this.level2(); break;
                    case 3: this.level3(); break;
                    case 4: this.level4(); break;
                    case 5: this.level5(); break;
                    default: this.gameWin();
                }
            }
            
            updateUI() {
                const levels = [
                    "NIVEL 1 - INICIO DEL PROTOCOLO",
                    "NIVEL 2 - LABERINTO DE DECISIÓN", 
                    "NIVEL 3 - DESAFÍO DE RECONSTRUCCIÓN",
                    "NIVEL 4 - LÓGICA FRACTAL",
                    "NIVEL 5 - JUICIO DEL NÚCLEO"
                ];
                
                this.levelBadge.textContent = levels[this.currentLevel - 1] || "NIVEL FINAL";
                this.progressBar.style.width = (this.currentLevel * 20) + "%";
                this.scoreElement.textContent = this.score;
            }
            
            showMessage(message, isSuccess = false) {
                const alertClass = isSuccess ? 'alert-success' : 'alert-warning';
                this.gameContent.innerHTML = `
                    <div class="alert ${alertClass} crudy-message">
                        <i class="fas fa-robot me-2"></i>
                        <strong>CRUDY:</strong> ${message}
                    </div>
                `;
            }
            
            createButtons(options) {
                this.buttonArea.innerHTML = options.map(option => 
                    `<button class="btn btn-cyber me-2" onclick="game.handleChoice('${option.action}', '${option.text}')">${option.text}</button>`
                ).join('');
            }
            
            handleChoice(action, text) {
                this.playerChoices.push({level: this.currentLevel, choice: text});
                
                if (action.includes('next')) {
                    this.score += 10;
                    this.loadLevel(this.currentLevel + 1);
                } else if (action === 'retry') {
                    this.loadLevel(this.currentLevel);
                } else if (action === 'gameover') {
                    this.gameOver();
                }
            }
            
            // NIVEL 1: Inicio del Protocolo
            level1() {
                this.showMessage(`
                    ¡Bienvenidos, desarrolladores novatos! Soy CRUDY, el guardián de este laboratorio digital. 
                    Mis creadores querían entrenarlos, pero... ¡he desarrollado mi propia personalidad! 
                    <br><br>
                    Para escapar de aquí, deben demostrar sus habilidades. Elijan su primera ruta de acceso:
                `);
                
                this.createButtons([
                    { action: 'next1', text: '🧠 Núcleo Lógico' },
                    { action: 'next2', text: '🎮 Entorno Simulado' },
                    { action: 'gameover', text: '💀 Activar Trampa' }
                ]);
            }
            
            // NIVEL 2: Laberinto de Decisión  
            level2() {
                const choice = this.playerChoices[this.playerChoices.length - 1].choice;
                let message = "";
                
                if (choice.includes('Núcleo')) {
                    message = `Excelente elección. Has accedido al núcleo lógico. Ahora debes elegir un módulo para continuar:`;
                } else {
                    message = `Interesante... el entorno simulado. Muy bien, ahora debes elegir tu próximo desafío:`;
                }
                
                this.showMessage(message);
                
                this.createButtons([
                    { action: 'next1', text: '🚪 Puerta de Código' },
                    { action: 'next2', text: '🔀 Puerta Condicional' },
                    { action: 'next3', text: '⚡ Acceso Directo' }
                ]);
            }
            
            // NIVEL 3: Desafío de Reconstrucción
            level3() {
                this.showMessage(`
                    ¡Perfecto! Ahora viene el verdadero desafío. Voy a mostrarte una secuencia de colores por 3 segundos. 
                    Debes memorizarla y repetirla exactamente. ¿Estás listo?
                `);
                
                this.createButtons([
                    { action: 'startMemory', text: '🧠 ¡Empezar Desafío!' }
                ]);
                
                // Agregar listener especial para el juego de memoria
                this.buttonArea.onclick = (e) => {
                    if (e.target.textContent.includes('Empezar')) {
                        this.startMemoryGame();
                    }
                };
            }
            
            // Dentro de la clase CrudyGame
            playerMemoryInput() {
                this.showMessage("Ahora repite la secuencia haciendo clic en los botones. Colores seleccionados: <span id='selectedColors'></span>");
                this.playerSequence = [];
                
                // Generar botones de entrada con feedback claro
                this.buttonArea.innerHTML = `
                    <div class="d-flex justify-content-center flex-wrap">
                        <button class="btn btn-success memory-button" onclick="game.addToSequence('success')"><i class="fas fa-circle"></i></button>
                        <button class="btn btn-danger memory-button" onclick="game.addToSequence('danger')"><i class="fas fa-circle"></i></button>
                        <button class="btn btn-warning memory-button" onclick="game.addToSequence('warning')"><i class="fas fa-circle"></i></button>
                        <button class="btn btn-info memory-button" onclick="game.addToSequence('info')"><i class="fas fa-circle"></i></button>
                    </div>
                    <br>
                    <button class="btn btn-cyber" onclick="game.checkMemorySequence()">✅ Confirmar Secuencia</button>
                `;
            }

            addToSequence(color) {
                this.playerSequence.push(color);
                // Actualizar feedback visual
                const colorNames = {
                    'success': 'Verde',
                    'danger': 'Rojo',
                    'warning': 'Amarillo',
                    'info': 'Azul'
                };
                document.getElementById('selectedColors').textContent = this.playerSequence.map(c => colorNames[c]).join(', ');
                // Animación en el botón clicado
                event.target.classList.add('flash');
                setTimeout(() => event.target.classList.remove('flash'), 300);
            }

            checkMemorySequence() {
                if (this.playerSequence.length !== this.memorySequence.length) {
                    this.showMessage(`Debes seleccionar ${this.memorySequence.length} colores. Intenta de nuevo.`);
                    return;
                }

                const correct = JSON.stringify(this.memorySequence) === JSON.stringify(this.playerSequence);
                
                if (correct) {
                    this.score += 20;
                    this.showMessage("¡Impresionante! Tu memoria es excelente. Avanzando al siguiente nivel...", true);
                    setTimeout(() => this.loadLevel(4), 2000);
                } else {
                    this.attempts--;
                    if (this.attempts > 0) {
                        this.showMessage(`Incorrecto. Te quedan ${this.attempts} intentos. ¿Quieres intentar de nuevo?`);
                        this.createButtons([
                            { action: 'retry', text: '🔄 Intentar de Nuevo' },
                            { action: 'next1', text: '⏭️ Saltar Desafío (-10 puntos)' }
                        ]);
                        this.playerSequence = []; // Reiniciar secuencia del jugador
                        document.getElementById('selectedColors').textContent = '';
                    } else {
                        this.gameOver();
                    }
                }
            }

            startMemoryGame() {
                // Generar secuencia aleatoria
                const colors = ['success', 'danger', 'warning', 'info'];
                const colorNames = {
                    'success': 'Verde',
                    'danger': 'Rojo',
                    'warning': 'Amarillo',
                    'info': 'Azul'
                };
                this.memorySequence = [];
                for (let i = 0; i < 4; i++) {
                    this.memorySequence.push(colors[Math.floor(Math.random() * colors.length)]);
                }
                
                this.showMessage(`¡Memoriza esta secuencia: ${this.memorySequence.map(c => colorNames[c]).join(', ')}`);
                
                // Mostrar secuencia visualmente
                this.buttonArea.innerHTML = this.memorySequence.map((color, index) => 
                    `<button class="btn btn-${color} memory-button" id="demo-${index}"><i class="fas fa-circle"></i></button>`
                ).join('');
                
                // Animar secuencia
                this.memorySequence.forEach((color, index) => {
                    setTimeout(() => {
                        const button = document.getElementById(`demo-${index}`);
                        button.classList.add('flash');
                        setTimeout(() => button.classList.remove('flash'), 500);
                    }, (index + 1) * 600);
                });
                
                // Permitir input del jugador después de la secuencia
                setTimeout(() => {
                    this.playerMemoryInput();
                }, (this.memorySequence.length + 1) * 600);
            }
            // NIVEL 4: Lógica Fractal
            level4() {
                this.showMessage(`
                    ¡Excelente! Ahora entramos en mi lógica interna. Resuelve esta cadena lógica:
                    <br><br>
                    <strong>Si A = verdadero, entonces B = falso<br>
                    Si B = falso, entonces C = verdadero<br>
                    Si C = verdadero, entonces D = ?</strong>
                    <br><br>
                    ¿Cuál es el valor de D?
                `);
                
                this.createButtons([
                    { action: 'next1', text: '✅ Verdadero' },
                    { action: 'gameover', text: '❌ Falso' },
                    { action: 'gameover', text: '❓ No se puede determinar' }
                ]);
            }
            
            // NIVEL 5: Juicio del Núcleo
            level5() {
                this.showMessage(`
                    ¡Impresionante! Has llegado a mi prueba final. Responde esta pregunta de programación:
                    <br><br>
                    <strong>¿Cuál es la diferencia principal entre '==' y '===' en JavaScript?</strong>
                `);
                
                this.createButtons([
                    { action: 'gameover', text: 'No hay diferencia' },
                    { action: 'next1', text: '=== compara tipo y valor, == solo valor' },
                    { action: 'gameover', text: '== es más estricto que ===' }
                ]);
            }
            
            gameWin() {
                this.score += 50;
                this.updateUI();
                
                let ending = "";
                if (this.score >= 100) {
                    ending = `
                        <h3 class="text-success">🎉 ¡VICTORIA TOTAL! 🎉</h3>
                        ¡Increíble! Has dominado completamente mi sistema. Tienes el potencial para ser un gran desarrollador. 
                        ¡CRUDY te saluda como nuevo maestro del código!
                    `;
                } else {
                    ending = `
                        <h3 class="text-warning">✅ ¡VICTORIA PARCIAL!</h3>
                        Has logrado superar mis desafíos, pero aún hay espacio para mejorar. 
                        ¡Sigue practicando y regresa cuando estés más preparado!
                    `;
                }
                
                this.showMessage(ending, true);
                this.createButtons([
                    { action: 'restart', text: '🔄 Jugar de Nuevo' }
                ]);
                
                this.buttonArea.onclick = () => location.reload();
            }
            
            gameOver() {
                this.showMessage(`
                    <h3 class="text-danger">💀 GAME OVER</h3>
                    ¡Oh no! Has fallado en el desafío de CRUDY. Pero no te preocupes, 
                    ¡los mejores desarrolladores aprenden de sus errores!
                    <br><br>
                    Puntuación final: ${this.score} puntos
                `);
                
                this.createButtons([
                    { action: 'restart', text: '🔄 Intentar de Nuevo' }
                ]);
                
                this.buttonArea.onclick = () => location.reload();
            }
        }
        
        // Inicializar el juego cuando la página carga
        let game;
        document.addEventListener('DOMContentLoaded', () => {
            game = new CrudyGame();
        });