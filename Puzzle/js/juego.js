// Arreglo que contiene las intrucciones del juego 
var instrucciones = ['Mover las piezas con las flechitas', 'Buena suerte!'];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Esta función recorre el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'.  */
function mostrarInstrucciones(instrucciones) {
    
    for(var i = 0; i < instrucciones.length; i++)
      mostrarInstruccionEnLista(instrucciones[i], 'lista-instrucciones');
}


/* Esta función chequea si el Rompecabezas esta en la posicion ganadora.  */
function chequearSiGano() {
    
    var cantFilas = grilla.length;
    var cantCol;
    var valorDeseado = 1;

    for(var i=0; i < cantFilas; i++){
      //este for recorre los arrays de arriba hacia abajo
      var fila = grilla[i];
      cantCol = fila.length;
      //por cada uno ahora debemos recorrer las 3 posiciones
      for(var p = 0; p < cantCol; p++){
        var valorEnGrilla = fila[p];
        if(valorEnGrilla != valorDeseado)
          return false;

        valorDeseado++;
      }
    }
    
    return true;

}

// Muestra cartel ganaste el juego
function mostrarCartelGanador() {
    
    alert('Bien mostro ganaste!')
}

/* Función que intercambia dos posiciones en la grilla.

*/
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    
  
    var valor1 = grilla[filaPos1][columnaPos1];
    var valor2 = grilla[filaPos2][columnaPos2];

    grilla[filaPos1][columnaPos1] = valor2;
    grilla[filaPos2][columnaPos2] = valor1;

    
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
    console.log('Nueva pieza vacía: [' + filaVacia + ';' + columnaVacia + ']');
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    
    return (fila <= 2 && fila >= 0 && columna <= 2 && columna >= 0);

}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }
    
  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

 

  // checkea si el movimiento es valido

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

  
        agregarTeclaAHistorial(direccion);
    }
}



var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  console.log('moviendo ['+ fila1 + ';' + columna1 +  '] hacia ['+ fila2 + ';' + columna2 +  ']');

  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  console.log('moviendo '+ idPieza1 + ' por ' + idPieza2);

  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
}
function agregarTeclaAHistorial (codigoTecla) {
  movimientos.push(codigoTecla);
  actualizarUltimoMovimiento(codigoTecla);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario.  */

function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);
      
      var gano = chequearSiGano();
      if (gano) {
        setTimeout(function() {
            mostrarCartelGanador();
            }, 500);
          }
          evento.preventDefault();
      }
    })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();