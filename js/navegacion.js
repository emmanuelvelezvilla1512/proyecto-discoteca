/* ==========================================================================
   navegacion.js
   Navegación entre las pantallas de acceso (inicio de sesión, registro y
   recuperación de contraseña).

   Evento que atiende: "submit" de los formularios con data-destino o con un
   selector cuyas opciones tienen data-destino (inicio de sesión).
   Qué hace: el navegador valida primero los campos (required, pattern…); si
   todo es válido, JavaScript solo cambia de página con location.href.
   ========================================================================== */
(function () {
  'use strict';

  var formularios = document.querySelectorAll('[data-navegar]');

  formularios.forEach(function (formulario) {
    // Evento "submit": se detiene el envío normal y se navega a la página elegida
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var destino = formulario.getAttribute('data-destino');

      // En el inicio de sesión el destino depende del tipo de usuario elegido
      var selector = formulario.querySelector('[data-destino-por-opcion]');
      if (selector) {
        var opcion = selector.options[selector.selectedIndex];
        destino = opcion ? opcion.getAttribute('data-destino') : null;
      }

      if (destino) window.location.href = destino;
    });
  });
})();
