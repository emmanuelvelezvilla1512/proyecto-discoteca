# IBIZA NIGHT CLUB — Frontend (HTML + CSS + JS)

Proyecto estático hecho solo con HTML5, CSS3 y JavaScript sin librerías. Se abre con Live Server (`index.html`) o con doble clic.

## Reglas de arquitectura
1. **Todo el contenido está en HTML.** Encabezado, menú, tablas, formularios, tarjetas, botones y modales están escritos en cada `.html`.
2. **Todo el aspecto está en CSS.** Sin atributo `style` ni estilos desde JavaScript. El responsive usa media queries.
3. **JavaScript solo para eventos de navegación del DOM:** abrir/cerrar el menú y los modales, cambiar pestañas, mostrar/ocultar elementos existentes y navegar (`location`). No se crea HTML desde JavaScript.
4. **Componentes en CSS con Atomic Design**, en este orden de carga: `variables → reset → atoms → molecules → organisms → templates → pages`. Cada nivel solo usa los inferiores.
5. **Selectores BEM** (`bloque`, `bloque__elemento`, `bloque--modificador`) en minúsculas y en español. Estados: `es-activo`, `esta-abierto`, `esta-bloqueado`. Sin ids en CSS, sin `!important`, etiquetas solo en `reset.css`.
6. **Accesibilidad:** cada atomo-campo tiene su `label`; menú y modales usan `aria-expanded`, `aria-controls` y `aria-hidden`; todo funciona con teclado y con foco visible.

## Estructura
```
index.html                         Página pública
pages/login.html, registro.html, recuperar-password.html, restablecer-password.html
pages/administrador/               dashboard, usuarios, clientes, empleados, reservas, eventos, servicios, compras, inventario, pedidos, reportes, configuracion
pages/empleado/                    inicio, clientes, reservas, eventos, servicios, compras, inventario, pedidos, reportes
pages/cliente/                     inicio, reservas, eventos, pedidos, perfil, reportes
css/                               variables, reset, atoms, molecules, organisms, templates, pages
js/                                menu, modales, pestanas, molecula-buscador, navegacion
components/                        Fragmentos de referencia por nivel de Atomic Design
CLASES_ATOMIC_DESIGN.md            Cada clase CSS con su nivel
```

## Cómo se manejan los roles
Cada rol tiene su propia carpeta con sus propias páginas: lo que un rol no puede hacer, simplemente no está escrito en su HTML (por ejemplo, el cliente no tiene botones Agregar, Editar ni Eliminar en Eventos).

## Qué hace cada JavaScript
| Archivo | Evento | Acción |
| --- | --- | --- |
| `menu.js` | `click`, `keydown` | Abre y cierra el menú lateral (celular) |
| `modales.js` | `click`, `submit`, `keydown` | Abre y cierra modales; Eliminar oculta la fila elegida |
| `pestanas.js` | `click`, `keydown` | Cambia entre pestañas |
| `molecula-buscador.js` | `input`, `change` | Oculta o muestra filas según búsqueda y filtros |
| `navegacion.js` | `submit` | Navega entre login, registro y recuperación |

## Límites (por las reglas anteriores)
- No hay guardado de datos: las tablas son ejemplos escritos en el HTML. Agregar, editar o eliminar no persiste; al recargar vuelve todo.
- No hay validación de cuentas ni contraseñas: el login navega según el tipo de usuario elegido.
- No hay protección de páginas: cualquiera con la URL abre cualquier página. Para eso hace falta un backend.
- La validación de formularios es la nativa del navegador (`required`, `pattern`, `type`).
- Los datos de contacto de `index.html` son de ejemplo.

Una versión con datos guardados en el navegador (localStorage), login que valida cuentas y permisos por rol vive en la carpeta `respaldo-proyecto-v2`, fuera del proyecto.
