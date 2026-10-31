/* ==========================================================================
   menu.js
   Menú lateral en pantallas pequeñas.
   Evento que atiende: "click" del botón con el atributo data-menu-boton.
   Qué hace: abre o cierra el menú (clase esta-abierto) y actualiza
   aria-expanded en el botón. También se cierra con la tecla Escape o al
   hacer clic fuera del menú.
   ========================================================================== */
(function () {
  'use strict';

  var boton = document.querySelector('[data-menu-boton]');
  if (!boton) return;
  var menu = document.getElementById(boton.getAttribute('aria-controls'));
  if (!menu) return;

  /** Abre el menú y lo avisa a los lectores de pantalla. */
  function abrir() {
    menu.classList.add('esta-abierto');
    boton.setAttribute('aria-expanded', 'true');
  }

  /** Cierra el menú y lo avisa a los lectores de pantalla. */
  function cerrar() {
    menu.classList.remove('esta-abierto');
    boton.setAttribute('aria-expanded', 'false');
  }

  // Evento "click" en el botón del encabezado: alterna el menú
  boton.addEventListener('click', function () {
    if (menu.classList.contains('esta-abierto')) {
      cerrar();
    } else {
      abrir();
    }
  });

  // Evento "keydown": con Escape se cierra el menú y el foco vuelve al botón
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('esta-abierto')) {
      cerrar();
      boton.focus();
    }
  });

  // Evento "click" en el documento: un clic fuera del menú lo cierra
  document.addEventListener('click', function (evento) {
    if (!menu.classList.contains('esta-abierto')) return;
    if (menu.contains(evento.target) || boton.contains(evento.target)) return;
    cerrar();
  });
})();
