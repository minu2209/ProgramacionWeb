# M1 · El Despertar del DOM

## ¿Qué es este proyecto?

Este proyecto es un **Buscaminas desarrollado con HTML, CSS y JavaScript** como parte de la misión M1 · El Despertar del DOM de la asignatura Programación Web 1: Cliente.

El objetivo principal es practicar la manipulación del DOM, el uso de eventos y los fundamentos de JavaScript mediante un juego interactivo.

El jugador puede seleccionar diferentes niveles de dificultad, descubrir casillas, colocar banderas y tratar de descubrir todas las casillas que no contienen minas.

## ¿Cómo arrancarlo?

No es necesario instalar dependencias.

1. Clonar o descargar el repositorio.
2. Entrar en la carpeta `Mision1`.
3. Abrir el archivo `index.html` en un navegador web.

También se puede utilizar la extensión **Live Server** de Visual Studio Code para ejecutarlo en un servidor local.

## Estructura del proyecto

```text
Mision1/
├── index.html
├── styles.css
└── script.js
```

- `index.html`: contiene la estructura de la interfaz y los elementos del juego.
- `styles.css`: contiene los estilos visuales del proyecto y los diferentes estados del tablero.
- `script.js`: contiene la lógica del Buscaminas, la creación del tablero, las minas, los eventos, la victoria y la derrota.

### Tablero representado mediante una matriz

El estado del juego se guarda en una matriz de JavaScript. Cada posición representa una casilla y contiene información como si tiene una mina, si está destapada o si tiene una bandera.

De esta forma se separa el estado del juego de la representación visual del DOM.

### Minas después del primer clic

Las minas se colocan después del primer clic del jugador. Esto permite garantizar que la primera casilla seleccionada no contenga una mina y evita perder inmediatamente al comenzar la partida.

Para colocar las minas se generan posiciones aleatorias y se comprueba que no estén ocupadas antes de añadir una nueva mina.

### Cálculo de números

Después de colocar las minas se calculan los números de cada casilla contando las minas que existen en sus casillas vecinas.

Para recorrer las posiciones cercanas se utiliza una función común que permite trabajar con los vecinos de una determinada casilla.

### Destapar casillas vacías

Cuando el jugador descubre una casilla vacía, se utiliza un recorrido recursivo para descubrir también las casillas vacías conectadas y sus números vecinos.

Esto permite implementar el comportamiento habitual del Buscaminas conocido como **flood fill**.

### Eventos

La interacción con el tablero se realiza mediante `addEventListener`.

- `click`: descubre una casilla.
- `contextmenu`: coloca o quita una bandera.
- `change`: permite cambiar la dificultad.
- `keydown`: controla la secuencia utilizada para activar el modo oscuro.

### Interfaz y DOM

Las casillas del tablero se crean dinámicamente utilizando `document.createElement()` y se modifican mediante `classList` y `dataset`.

De esta manera, el estado del juego se refleja visualmente en el DOM sin tener que escribir manualmente todas las casillas en el HTML.

### Modo oscuro

Como funcionalidad adicional se incorporó un modo oscuro que se activa mediante una secuencia de teclas. Escribiendo `dark` se cambia automáticamente al modo oscuro.

El cambio de tema se controla mediante un atributo `data-theme` y variables CSS.

## Funcionalidades

- Tres niveles de dificultad.
- Generación aleatoria de minas.
- Primera casilla segura.
- Descubrimiento de casillas.
- Banderas mediante clic derecho.
- Contador de minas.
- Cronómetro.
- Detección de victoria.
- Detección de derrota.
- Revelado de las minas al perder.
- Descubrimiento automático de zonas vacías.
- Modo oscuro mediante una secuencia de teclas.

## Uso de IA

Durante el desarrollo de esta misión se utilizó Claude (Anthropic) como herramienta de apoyo, alguno de los prompts resolvieron:

- Ideas iniciales de proyectos viables con HTML/CSS/JS puro.
- Explicación de conceptos (flood fill, delegación de eventos, primer clic seguro).
- Ayuda para depurar errores concretos (elementos null, selector de dificultad no funcional).
- Revisión de rendimiento tras la primera corrección: sustituir las búsquedas repetidas con querySelector por referencias directas guardadas en la matriz de estado, y convertir el flood fill recursivo en iterativo.

### ¿Qué se delegó?

Se utilizó la IA principalmente para el planteamiento inicial de la estructura HTML/CSS/JS, explicación de conceptos (flood fill, manejo de eventos), y una revisión de rendimiento (cachear referencias al DOM, flood fill iterativo) tras una primera corrección.

La IA se utilizó como apoyo para comprender, revisar o plantear soluciones, pero el código final fue revisado y adaptado al funcionamiento concreto del proyecto.

### ¿Cómo se verificó el resultado?

Las propuestas obtenidas mediante IA fueron revisadas antes de incorporarlas al proyecto.

Se comprobó el funcionamiento del juego en el navegador y se revisó que las soluciones fueran compatibles con la estructura del proyecto y con los requisitos de la misión.

También se comprobó manualmente la lógica relacionada con la creación del tablero, la colocación de minas, los eventos, las banderas, la victoria y la derrota.

### ¿Qué se hizo manualmente?

La integración final del código, la organización de los archivos, las pruebas del juego y los ajustes necesarios para que todas las funcionalidades funcionaran correctamente se realizaron manualmente.

## Autopsia

Una de las partes que requiere más atención es `colocarMinas`, ya que utiliza posiciones aleatorias y un bucle `while` para seguir generando posiciones hasta alcanzar el número de minas necesario.

La función comprueba que una posición generada no tenga ya una mina antes de colocarla. Esto evita duplicar minas y permite obtener exactamente el número de minas correspondiente a la dificultad seleccionada.

También es importante que esta función se ejecute después del primer clic, ya que así se puede garantizar que la primera casilla seleccionada por el jugador sea segura.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- DOM
- Git
- GitHub
