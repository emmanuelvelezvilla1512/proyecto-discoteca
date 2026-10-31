/* ==========================================================================
   pestanas.js
   Cambio entre pestañas (por ejemplo, en Configuración).
   Los paneles ya están escritos en el HTML; aquí solo se muestran u ocultan.

   Eventos que atiende:
   - "click" en un botón con role="tab": muestra su panel y oculta los demás.
   - "keydown" (flechas izquierda y derecha) sobre las pestañas: pasa a la
     pestaña vecina, como indica la guía de accesibilidad.
   ========================================================================== */
(function () {
  'use strict';

  var grupos = document.querySelectorAll('[data-pestanas]');

  grupos.forEach(function (grupo) {
    var botones = grupo.querySelectorAll('[role="tab"]');

    /** Activa una pestaña: clase es-activo, aria-selected y panel visible (hidden). */
    function activar(botonActivo) {
      botones.forEach(function (boton) {
        var activo = boton === botonActivo;
        boton.classList.toggle('es-activo', activo);
        boton.setAttribute('aria-selected', activo ? 'true' : 'false');
        boton.setAttribute('tabindex', activo ? '0' : '-1');
        var panel = document.getElementById(boton.getAttribute('aria-controls'));
        if (panel) panel.hidden = !activo;
      });
    }

    botones.forEach(function (boton, posicion) {
      // Evento "click": el usuario elige una pestaña
      boton.addEventListener('click', function () {
        activar(boton);
      });

      // Evento "keydown": flechas para moverse entre pestañas
      boton.addEventListener('keydown', function (evento) {
        var destino = null;
        if (evento.key === 'ArrowRight') destino = botones[(posicion + 1) % botones.length];
        if (evento.key === 'ArrowLeft') destino = botones[(posicion - 1 + botones.length) % botones.length];
        if (destino) {
          evento.preventDefault();
          activar(destino);
          destino.focus();
        }
      });
    });
  });
})();
