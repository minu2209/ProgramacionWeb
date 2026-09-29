# M1 · El Despertar del DOM

## Descripción

Este proyecto corresponde a la misión **M1 · El Despertar del DOM** de la asignatura **Programación Web I · Cliente** de U-tad.

El proyecto consiste en un **Buscaminas desarrollado con HTML, CSS y JavaScript**, utilizando el DOM para crear y actualizar dinámicamente el tablero y gestionar la interacción del usuario.

El juego incluye diferentes niveles de dificultad, contador de minas, cronómetro, colocación de banderas mediante clic derecho, detección de victoria y derrota y un primer clic seguro para evitar perder nada más comenzar.

También se incluye un modo oscuro como funcionalidad adicional, que se puede activar mediante una secuencia de teclas.

## Tecnologías utilizadas

* **HTML5** — estructura de la página.
* **CSS3** — estilos, diseño del tablero y modo oscuro.
* **JavaScript** — lógica del juego, manipulación del DOM y gestión de eventos.

## Cómo ejecutar el proyecto

No es necesario instalar dependencias.

1. Clonar o descargar el repositorio.
2. Entrar en la carpeta `Mision1`.
3. Abrir el archivo `index.html` en un navegador web.

También se puede utilizar una extensión como **Live Server** en Visual Studio Code para ejecutar el proyecto mediante un servidor local.

## Estructura del proyecto

```text
Mision1/
├── index.html
├── styles.css
└── script.js
```

### `index.html`

Contiene la estructura principal de la aplicación y los elementos necesarios para interactuar con el juego.

### `styles.css`

Contiene los estilos visuales del proyecto, incluyendo el diseño del tablero, estados de las celdas y el modo oscuro.

### `script.js`

Contiene la lógica principal del Buscaminas: creación del tablero, colocación de minas, cálculo de números, interacción con las celdas, banderas, victoria, derrota y cronómetro.

## Decisiones de desarrollo

Una de las decisiones principales fue representar el tablero mediante una **matriz de JavaScript**, manteniendo en ella el estado de cada celda.

Cada celda puede almacenar información como si contiene una mina, si ha sido descubierta o si tiene una bandera.

Las minas se colocan después del primer clic para que la primera jugada sea siempre segura.

Para descubrir automáticamente las zonas vacías se utiliza un recorrido recursivo de las celdas vecinas (**flood fill**).

La interfaz se actualiza mediante manipulación del DOM utilizando métodos como `createElement`, `classList` y `dataset`.

Los eventos se gestionan mediante `addEventListener`, separando el comportamiento del clic izquierdo y del clic derecho.

El código está dividido en funciones pequeñas con responsabilidades concretas para facilitar su lectura y mantenimiento.

## Funcionalidades

* Tres niveles de dificultad.
* Generación dinámica del tablero.
* Colocación aleatoria de minas.
* Primer clic siempre seguro.
* Cálculo de minas adyacentes.
* Descubrimiento automático de zonas vacías.
* Colocación y eliminación de banderas con clic derecho.
* Contador de minas.
* Cronómetro.
* Detección de victoria.
* Detección de derrota.
* Revelado de las minas al perder.
* Modo oscuro mediante una secuencia de teclas.

## Uso de IA

Durante el desarrollo del proyecto se utilizó **ChatGPT** como herramienta de apoyo.

La IA se utilizó principalmente para consultar dudas sobre JavaScript, el DOM y la implementación de determinadas partes de la lógica del juego. Las respuestas generadas no se incorporaron directamente sin revisión.

### Qué se delegó a la IA

Se utilizó IA como apoyo para:

* Resolver dudas sobre manipulación del DOM.
* Consultar posibles formas de implementar determinadas funcionalidades del Buscaminas.
* Revisar y entender partes de la lógica JavaScript.
* Obtener explicaciones sobre conceptos y posibles errores.

### Cómo se verificó el resultado

Las respuestas proporcionadas por la IA fueron revisadas antes de utilizarlas.

La funcionalidad se comprobó ejecutando el proyecto en el navegador y probando manualmente diferentes situaciones del juego, como descubrir celdas, colocar banderas, ganar, perder y cambiar de dificultad.

También se revisó el código para entender qué hacía cada parte antes de incorporarla al proyecto.

### Trabajo realizado manualmente

La integración final del código, la organización de los archivos, las pruebas en el navegador, la comprobación del funcionamiento del juego y las decisiones sobre la interfaz y las funcionalidades fueron realizadas manualmente.

La IA se utilizó como herramienta de apoyo y no como sustituto de la comprensión y revisión del código.

## Autopsia

Durante el desarrollo hubo que tomar varias decisiones para conseguir que el juego funcionara correctamente.

Una decisión importante fue colocar las minas después del primer clic. De esta forma se evita que el jugador pueda perder inmediatamente al comenzar la partida.

También fue necesario controlar correctamente el estado de cada celda mediante la matriz del tablero. Esto permite diferenciar entre celdas con minas, celdas descubiertas y celdas marcadas con bandera.

Para descubrir zonas vacías se utiliza un recorrido recursivo de las celdas vecinas. Esta solución permite abrir automáticamente las zonas conectadas sin tener que comprobar manualmente cada celda desde el código principal.

Una parte que requiere especial atención es la función `colocarMinas`, ya que utiliza posiciones aleatorias y comprueba que una misma posición no reciba más de una mina.

Otra decisión fue separar la lógica del juego de la estructura HTML y de los estilos CSS, manteniendo cada responsabilidad en su archivo correspondiente.

## Estado del proyecto

Proyecto realizado para la misión **M1 · El Despertar del DOM**.

El Buscaminas es funcional y contiene tanto las funcionalidades principales solicitadas como funcionalidades adicionales.
