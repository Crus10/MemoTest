// Definición de colores disponibles
const colores = ['rojo', 'verde', 'amarillo', 'morado', 'naranja', 'azul'];

// Array para guardar las tarjetas del juego
let tarjetas = [];

// Tarjetas seleccionadas para comparación
let tarjetaSeleccionada1 = null;
let tarjetaSeleccionada2 = null;

// Variable para controlar los turnos
let turnoActivo = true;

// Función para inicializar y configurar el juego
function configurarJuego() {
    // Duplicar los colores para formar pares
    tarjetas = [...colores, ...colores];

    // Mezclar aleatoriamente las tarjetas
    mezclarArray(tarjetas);

    // Seleccionar todos los cuadros del tablero
    const cuadros = document.querySelectorAll('.cuadro');

    // Configurar el evento de clic en cada cuadro
    cuadros.forEach((cuadro, index) => {
        cuadro.addEventListener('click', manejarClickTarjeta); // Añadir evento de clic
        cuadro.setAttribute('data-index', index); // Asignar índice de tarjeta
    });
}

// Función para manejar el clic en las tarjetas
function manejarClickTarjeta(event) {
    if (!turnoActivo) {
        return; // Salir si no es el turno del jugador
    }

    const tarjeta = event.target;
    // Si la tarjeta ya está emparejada o ha sido seleccionada, salir
    if (tarjeta.classList.contains('acertada') || tarjeta.classList.contains('seleccionada')) {
        return;
    }

    // Mostrar la tarjeta seleccionada temporalmente
    tarjeta.classList.add('seleccionada');
    setTimeout(() => {
        revelarColorTarjeta(tarjeta);
    }, 500);

    // Verificar si es la primera o la segunda tarjeta seleccionada
    if (tarjetaSeleccionada1 === null) {
        tarjetaSeleccionada1 = tarjeta;
    } else if (tarjetaSeleccionada2 === null) {
        turnoActivo = false; // Desactivar el turno mientras se comparan las tarjetas
        tarjetaSeleccionada2 = tarjeta;
        
        // Comparar las tarjetas seleccionadas después de un breve retraso
        setTimeout(compararTarjetasSeleccionadas, 1000);
    }
}

// Función para revelar el color de la tarjeta
function revelarColorTarjeta(tarjeta) {
    const indice = parseInt(tarjeta.getAttribute('data-index'));
    const color = tarjetas[indice];
    tarjeta.classList.remove('seleccionada'); // Quitar la clase temporal
    tarjeta.classList.add(color); // Añadir la clase de color correspondiente
}

// Función para comparar las tarjetas seleccionadas
function compararTarjetasSeleccionadas() {
    const indice1 = parseInt(tarjetaSeleccionada1.getAttribute('data-index'));
    const indice2 = parseInt(tarjetaSeleccionada2.getAttribute('data-index'));

    // Obtener los colores de las tarjetas seleccionadas
    const color1 = tarjetas[indice1];
    const color2 = tarjetas[indice2];

    if (color1 === color2) {
        // Si las tarjetas son iguales, marcarlas como acertadas
        tarjetaSeleccionada1.classList.add('acertada');
        tarjetaSeleccionada2.classList.add('acertada');
    } else {
        // Si las tarjetas no son iguales, ocultarlas nuevamente
        tarjetaSeleccionada1.classList.remove('seleccionada', color1);
        tarjetaSeleccionada2.classList.remove('seleccionada', color2);
    }

    // Reiniciar las tarjetas seleccionadas y activar el turno
    tarjetaSeleccionada1 = null;
    tarjetaSeleccionada2 = null;
    turnoActivo = true;
}

// Función para mezclar aleatoriamente un array (algoritmo Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Llamar a la función de configuración del juego al cargar la página
document.addEventListener('DOMContentLoaded', configurarJuego);
