/* ==========================================================================
   modales.js
   Ventanas modales (Ver, Editar, Agregar y confirmar Eliminar).
   Todos los modales ya están escritos en el HTML de cada página; este
   archivo solo los muestra y los oculta.

   Eventos que atiende:
   - "click" en botones con data-modal-abrir="id-del-modal": abre ese modal.
   - "click" en botones con data-modal-cerrar, o sobre el fondo oscuro: lo cierra.
   - "click" en el botón data-eliminar-confirmar: oculta la fila elegida.
   - "submit" de formularios con data-modal-formulario: cierra el modal
     (el navegador ya validó los campos antes de lanzar este evento).
   - "keydown": Escape cierra el modal y Tab mantiene el foco dentro de él.
   ========================================================================== */
(function () {
  'use strict';

  var modalAbierto = null;   // Modal que está visible ahora
  var disparador = null;     // Botón que lo abrió (el foco vuelve a él al cerrar)
  var filaObjetivo = null;   // Fila que se eliminará si se confirma

  /** Muestra un modal: clase esta-abierto, aria-hidden y foco dentro. */
  function abrir(id, origen) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modalAbierto = modal;
    disparador = origen;
    modal.classList.add('esta-abierto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('esta-bloqueado');
    if (origen) origen.setAttribute('aria-expanded', 'true');
    var caja = modal.querySelector('[data-modal-caja]');
    if (caja) caja.focus();
  }

  /** Oculta el modal abierto y devuelve el foco al botón que lo abrió. */
  function cerrar() {
    if (!modalAbierto) return;
    modalAbierto.classList.remove('esta-abierto');
    modalAbierto.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('esta-bloqueado');
    if (disparador) {
      disparador.setAttribute('aria-expanded', 'false');
      disparador.focus();
    }
    modalAbierto = null;
    disparador = null;
  }

  // Evento "click" en todo el documento (delegado): abrir, cerrar y confirmar
  document.addEventListener('click', function (evento) {
    var abrirBoton = evento.target.closest('[data-modal-abrir]');
    if (abrirBoton) {
      // Si el botón indica una fila (Eliminar), se recuerda para ocultarla al confirmar
      var idFila = abrirBoton.getAttribute('data-fila-objetivo');
      filaObjetivo = idFila ? document.getElementById(idFila) : null;
      abrir(abrirBoton.getAttribute('data-modal-abrir'), abrirBoton);
      return;
    }
    if (evento.target.closest('[data-eliminar-confirmar]')) {
      // Se oculta la fila (hidden); el dato vuelve al recargar porque no hay servidor
      if (filaObjetivo) {
        filaObjetivo.hidden = true;
        filaObjetivo.setAttribute('data-eliminada', 'true');
      }
      filaObjetivo = null;
      cerrar();
      return;
    }
    // Botón "Cancelar" o "✕", o clic sobre el fondo oscuro del modal
    if (evento.target.closest('[data-modal-cerrar]') || evento.target === modalAbierto) {
      cerrar();
    }
  });

  // Evento "submit" de los formularios dentro de modales: se cierra la ventana
  document.addEventListener('submit', function (evento) {
    if (!evento.target.hasAttribute('data-modal-formulario')) return;
    evento.preventDefault();
    cerrar();
  });

  // Evento "keydown": Escape cierra; Tab queda atrapado dentro del modal abierto
  document.addEventListener('keydown', function (evento) {
    if (!modalAbierto) return;
    if (evento.key === 'Escape') {
      cerrar();
      return;
    }
    if (evento.key !== 'Tab') return;
    var enfocables = modalAbierto.querySelectorAll('button, a[href], input, select, textarea');
    if (enfocables.length === 0) return;
    var primero = enfocables[0];
    var ultimo = enfocables[enfocables.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  });
})();
