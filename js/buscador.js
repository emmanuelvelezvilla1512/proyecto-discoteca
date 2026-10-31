/* ==========================================================================
   buscador.js
   Búsqueda y filtros sobre las filas de una tabla que ya está en el HTML.
   Solo muestra u oculta filas existentes con el atributo hidden.

   Eventos que atiende:
   - "input" en un campo con data-filtrar="id-de-la-tabla": filtra por texto.
   - "change" en un selector con data-filtrar="id-de-la-tabla": filtra por
     el valor de la columna indicada en data-filtrar-columna.
   Las filas eliminadas (data-eliminada) nunca se vuelven a mostrar.
   ========================================================================== */
(function () {
  'use strict';

  var controles = document.querySelectorAll('[data-filtrar]');

  /** Aplica la búsqueda y los filtros de una tabla. */
  function aplicar(idTabla) {
    var tabla = document.getElementById(idTabla);
    if (!tabla) return;
    var texto = '';
    var filtros = [];
    document.querySelectorAll('[data-filtrar="' + idTabla + '"]').forEach(function (control) {
      if (control.hasAttribute('data-filtrar-columna')) {
        if (control.value) filtros.push({ columna: Number(control.getAttribute('data-filtrar-columna')), valor: control.value });
      } else {
        texto = control.value.trim().toLowerCase();
      }
    });

    var visibles = 0;
    tabla.querySelectorAll('[data-fila]').forEach(function (fila) {
      if (fila.hasAttribute('data-eliminada')) return;
      var coincide = fila.textContent.toLowerCase().indexOf(texto) !== -1;
      filtros.forEach(function (filtro) {
        var celda = fila.children[filtro.columna];
        if (!celda || celda.textContent.trim().indexOf(filtro.valor) === -1) coincide = false;
      });
      fila.hidden = !coincide;
      if (coincide) visibles++;
    });

    // Fila de aviso "sin resultados" (ya escrita en el HTML)
    var vacio = tabla.querySelector('[data-sin-resultados]');
    if (vacio) vacio.hidden = visibles !== 0;
  }

  controles.forEach(function (control) {
    var evento = control.tagName === 'SELECT' ? 'change' : 'input';
    control.addEventListener(evento, function () {
      aplicar(control.getAttribute('data-filtrar'));
    });
  });
})();
