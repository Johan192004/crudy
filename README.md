# CRUDY - El Desafío Lógico

**Equipo de Desarrollo:** JJJB
## Descripción General

CRUDY es un juego interactivo de aventura y lógica donde los jugadores deben superar diferentes niveles de desafíos mentales para convertirse en operadores certificados del sistema de inteligencia artificial CRUDY. La historia se desarrolla en un ambiente futurista donde el jugador debe demostrar sus habilidades lógicas y de toma de decisiones para avanzar a través de múltiples niveles.

### Historia del Juego

El jugador despierta en el sistema CRUDY, una inteligencia artificial que evalúa las capacidades de posibles operadores. A través de una serie de pruebas progresivas que incluyen laberintos de decisión, expresiones lógicas complejas y desafíos de razonamiento, el jugador debe demostrar que tiene las habilidades necesarias para operar el sistema.

### Mecánicas de Juego

- **Sistema de Vidas:** El jugador comienza con 3 intentos
- **Progresión por Niveles:** 5 niveles de dificultad creciente
- **Decisiones Múltiples:** Cada nivel presenta diferentes opciones que afectan el resultado
- **Elementos Aleatorios:** Algunos desafíos incorporan factores de suerte
- **Feedback Inmediato:** El sistema proporciona retroalimentación instantánea sobre las decisiones

## Tecnologías Utilizadas

- **HTML5:** Estructura del juego
- **CSS3:** Estilos y animaciones
- **JavaScript (ES6+):** Lógica del juego y manipulación del DOM
- **Bootstrap 5.3.0:** Framework CSS para diseño responsivo
- **Google Fonts:** Tipografía personalizada (Courier New)

##  Instrucciones de Instalación y Ejecución

### Clonar el Repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd crudy-juego
```

### Estructura de Archivos
```
crudy-juego/
├── index.html
├── assets/
│   ├── CSS/
│   │   └── styles.css
│   └── scripts/
│       └── script.js
└── README.md
```

### Ejecutar el Proyecto
1. Asegúrate de tener una conexión a internet (para cargar Bootstrap desde CDN)
2. Abre el archivo `index.html` en tu navegador web preferido
3. Haz clic en "Bienvenido al JUEGO" para comenzar

### Probar el Proyecto
- El juego funciona directamente en el navegador
- Compatible con Chrome, Firefox, Safari y Edge
- Responsivo para dispositivos móviles y desktop

## Funcionalidades Principales

### Sistema de Niveles
- **Nivel 1:** Selección de puertas con elemento aleatorio
- **Nivel 2:** Laberinto de decisión con múltiples rutas
- **Nivel 3:** Transición narrativa
- **Nivel 4:** Desafío de lógica proposicional con nodos
- **Nivel 5:** Preguntas de lógica de programación.

### Gestión de Estado
- Seguimiento de vidas restantes
- Progreso del nivel actual
- Sistema de puntuación por conocimiento
- Historial de decisiones del jugador

### Interfaz de Usuario
- Diseño futurista con tema oscuro
- Animaciones fluidas y efectos visuales
- Botones interactivos con hover effects
- Panel de estado en tiempo real

##  Lógica Implementada

### Arquitectura del Juego

El juego está estructurado de manera modular con las siguientes características:

**División por Escenas:**
- Cada nivel es implementado como una función independiente (`nivel1()`, `nivel2()`, etc.)
- Sistema de transiciones suaves entre niveles
- Pantalla de bienvenida inicial separada

**Gestión de Decisiones:**
- Event listeners dinámicos para botones de opciones
- Validación de respuestas con feedback inmediato
- Sistema de consecuencias (pérdida de vidas, avance de nivel)

**Estado del Juego:**
- Variables globales para mantener el estado (`nivel`, `conocimiento`, `intentosRestantes`)
- Funciones de utilidad para actualizar la interfaz
- Sistema de verificación de condiciones de victoria/derrota

**Elementos Aleatorios:**
- Generación de números aleatorios para desafíos variables
- Función `numeroAleatorio()` para crear experiencias únicas

## Aportes de Cada Integrante

- **Johan ramirez Marin:** Nivel 1 y 4
- **Juan Daniel Rua marin:** Nivel 5
- **Juan Manuel Arango Arana:** Nivel 3
- **Brahiam Ruiz Alzate** Nivel 2
 

##  Lecciones Aprendidas

### Aspectos Técnicos
- Implementación de lógica de juego con JavaScript vanilla
- Manipulación dinámica del DOM para crear interfaces interactivas
- Uso efectivo de Bootstrap para diseño responsivo
- Creación de animaciones CSS para mejorar la experiencia de usuario

### Aspectos de Diseño
- Importancia del feedback visual inmediato en juegos
- Balance entre desafío y frustración en el diseño de niveles
- Creación de una estética coherente con el tema del juego

### Trabajo en Equipo
- Coordinación en el desarrollo de diferentes componentes
- Importancia de la documentación del código
- Metodologías de control de versiones con Git

## Estado del Proyecto

**Estado Actual:** Finalizado

### Funcionalidades Completadas 
- Sistema básico de navegación entre niveles
- Niveles 1-4 implementados y funcionales
- Interfaz de usuario completa
- Sistema de vidas y progresión
- Diseño responsivo


### Próximos Pasos
1. Añadir más variedad en los tipos de desafíos
2. Implementar sistema de achievements
3. Mejorar la accesibilidad del juego
4. Realizar pruebas exhaustivas en diferentes dispositivos

