// ===== Configuración de dificultades =====
const DIFICULTADES = {
  facil:   { filas: 8,  columnas: 8,  minas: 10 },
  medio:   { filas: 16, columnas: 16, minas: 40 },
  dificil: { filas: 16, columnas: 30, minas: 99 }
};

// ===== Estado del juego =====
let tablero = [];       // matriz de objetos { esMina, numero, destapada, bandera }
let filas, columnas, totalMinas;
let minasRestantes = 0;
let juegoTerminado = false;
let primerClic = true;
let cronometroId = null;
let segundos = 0;

// ===== Referencias al DOM =====
const elTablero = document.getElementById('tablero');
const elMinasRestantes = document.getElementById('minas-restantes');
const elTiempo = document.getElementById('tiempo');
const elBtnReiniciar = document.getElementById('btn-reiniciar');
const elDificultad = document.getElementById('dificultad');
const elMensajeResultado = document.getElementById('mensaje-resultado');
const elTextoResultado = document.getElementById('texto-resultado');
const elBtnJugarDeNuevo = document.getElementById('btn-jugar-de-nuevo');

// ===== Inicializar el juego =====
function iniciarJuego() {
  const config = DIFICULTADES[elDificultad.value];
  filas = config.filas;
  columnas = config.columnas;
  totalMinas = config.minas;
  minasRestantes = totalMinas;
  juegoTerminado = false;
  primerClic = true;
  segundos = 0;

  detenerCronometro();
  elTiempo.textContent = '0';
  elMinasRestantes.textContent = minasRestantes;
  elBtnReiniciar.textContent = '🙂';
  elMensajeResultado.classList.add('oculto');

  crearMatrizVacia();
  pintarTablero();
}

// Crea la matriz de datos sin minas todavía (se colocan tras el primer clic)
function crearMatrizVacia() {
  tablero = [];
  for (let f = 0; f < filas; f++) {
    const fila = [];
    for (let c = 0; c < columnas; c++) {
      fila.push({ esMina: false, numero: 0, destapada: false, bandera: false });
    }
    tablero.push(fila);
  }
}

// Pinta las celdas en el DOM según el tamaño del tablero
function pintarTablero() {
  elTablero.innerHTML = '';
  elTablero.style.gridTemplateColumns = `repeat(${columnas}, 32px)`;

  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      const celda = document.createElement('button');
      celda.classList.add('celda');
      celda.dataset.fila = f;
      celda.dataset.columna = c;

      celda.addEventListener('click', manejarClicIzquierdo);
      celda.addEventListener('contextmenu', manejarClicDerecho);

      elTablero.appendChild(celda);
    }
  }
}

// ===== Colocar minas (tras el primer clic, para que nunca pierdas a la primera) =====
function colocarMinas(filaSegura, columnaSegura) {
  let minasColocadas = 0;

  while (minasColocadas < totalMinas) {
    const f = Math.floor(Math.random() * filas);
    const c = Math.floor(Math.random() * columnas);

    const esLaCasillaSegura = Math.abs(f - filaSegura) <= 1 && Math.abs(c - columnaSegura) <= 1;

    if (!tablero[f][c].esMina && !esLaCasillaSegura) {
      tablero[f][c].esMina = true;
      minasColocadas++;
    }
  }

  calcularNumeros();
}

// Calcula cuántas minas hay alrededor de cada celda
function calcularNumeros() {
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (tablero[f][c].esMina) continue;

      let contador = 0;
      recorrerVecinos(f, c, (nf, nc) => {
        if (tablero[nf][nc].esMina) contador++;
      });

      tablero[f][c].numero = contador;
    }
  }
}

// Ejecuta un callback para cada vecino válido de una celda (máximo 8 alrededor)
function recorrerVecinos(f, c, callback) {
  for (let df = -1; df <= 1; df++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (df === 0 && dc === 0) continue;
      const nf = f + df;
      const nc = c + dc;
      if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas) {
        callback(nf, nc);
      }
    }
  }
}

// ===== Clic izquierdo: destapar celda =====
function manejarClicIzquierdo(evento) {
  if (juegoTerminado) return;

  const f = Number(evento.target.dataset.fila);
  const c = Number(evento.target.dataset.columna);
  const datoCelda = tablero[f][c];

  if (datoCelda.destapada || datoCelda.bandera) return;

  if (primerClic) {
    colocarMinas(f, c);
    iniciarCronometro();
    primerClic = false;
  }

  if (datoCelda.esMina) {
    perderJuego(f, c);
    return;
  }

  destaparCelda(f, c);
  comprobarVictoria();
}

// Destapa una celda y, si tiene 0 minas alrededor, expande a los vecinos (flood fill)
function destaparCelda(f, c) {
  const datoCelda = tablero[f][c];
  if (datoCelda.destapada || datoCelda.bandera) return;

  datoCelda.destapada = true;

  const elCelda = obtenerElementoCelda(f, c);
  elCelda.classList.add('destapada');

  if (datoCelda.numero > 0) {
    elCelda.textContent = datoCelda.numero;
    elCelda.dataset.num = datoCelda.numero;
  } else {
    // Casilla vacía: revela automáticamente los vecinos
    recorrerVecinos(f, c, (nf, nc) => destaparCelda(nf, nc));
  }
}

// ===== Clic derecho: poner/quitar bandera =====
function manejarClicDerecho(evento) {
  evento.preventDefault();
  if (juegoTerminado) return;

  const f = Number(evento.target.dataset.fila);
  const c = Number(evento.target.dataset.columna);
  const datoCelda = tablero[f][c];

  if (datoCelda.destapada) return;

  datoCelda.bandera = !datoCelda.bandera;
  const elCelda = obtenerElementoCelda(f, c);

  if (datoCelda.bandera) {
    elCelda.classList.add('bandera');
    elCelda.textContent = '🚩';
    minasRestantes--;
  } else {
    elCelda.classList.remove('bandera');
    elCelda.textContent = '';
    minasRestantes++;
  }

  elMinasRestantes.textContent = minasRestantes;
}

// ===== Fin del juego: derrota =====
function perderJuego(filaExplotada, columnaExplotada) {
  juegoTerminado = true;
  detenerCronometro();
  elBtnReiniciar.textContent = '😵';

  // Revela todas las minas del tablero
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (tablero[f][c].esMina) {
        const elCelda = obtenerElementoCelda(f, c);
        elCelda.classList.add('destapada', 'mina');
        elCelda.textContent = '💣';

        if (f === filaExplotada && c === columnaExplotada) {
          elCelda.classList.add('explotada');
        }
      }
    }
  }

  mostrarResultado('💥 Has perdido. ¡Pisaste una mina!');
}

// ===== Comprobar si el jugador ha ganado =====
function comprobarVictoria() {
  let celdasSeguras = filas * columnas - totalMinas;
  let celdasDestapadas = 0;

  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (tablero[f][c].destapada) celdasDestapadas++;
    }
  }

  if (celdasDestapadas === celdasSeguras) {
    ganarJuego();
  }
}

function ganarJuego() {
  juegoTerminado = true;
  detenerCronometro();
  elBtnReiniciar.textContent = '😎';
  mostrarResultado('🎉 ¡Has ganado! Campo despejado.');
}

function mostrarResultado(texto) {
  elTextoResultado.textContent = texto;
  elMensajeResultado.classList.remove('oculto');
}

// ===== Cronómetro =====
function iniciarCronometro() {
  cronometroId = setInterval(() => {
    segundos++;
    elTiempo.textContent = segundos;
  }, 1000);
}

function detenerCronometro() {
  clearInterval(cronometroId);
}

// ===== Utilidad =====
function obtenerElementoCelda(f, c) {
  return elTablero.querySelector(`[data-fila="${f}"][data-columna="${c}"]`);
}

// ===== Eventos generales =====
elBtnReiniciar.addEventListener('click', iniciarJuego);
elBtnJugarDeNuevo.addEventListener('click', iniciarJuego);
elDificultad.addEventListener('change', iniciarJuego);

// ===== Modo oscuro con combinación de teclas secreta =====
// Ejemplo: escribir "dark" en cualquier momento activa/desactiva el modo terminal
const CODIGO_SECRETO = ['d', 'a', 'r', 'k'];
let teclasPulsadas = [];

document.addEventListener('keydown', (evento) => {
  teclasPulsadas.push(evento.key.toLowerCase());
  teclasPulsadas = teclasPulsadas.slice(-CODIGO_SECRETO.length);

  if (teclasPulsadas.join('') === CODIGO_SECRETO.join('')) {
    const temaActual = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', temaActual === 'dark' ? 'light' : 'dark');
  }
});

// ===== Arrancar el juego al cargar la página =====
iniciarJuego();