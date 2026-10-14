# Proposal

## Why

El encabezado actual muestra la búsqueda como un icono que abre un modal, agrupa los iconos de cuenta y carrito sin contexto y tiene el menú de categorías mezclado con el logo. El nuevo diseño del navbar pone el buscador siempre visible, destaca el seguimiento de pedido y el carrito, y separa las categorías en una segunda fila, lo que acorta el camino a las tareas más frecuentes de un supermercado en línea.

## What Changes

- Rediseñar el navbar de escritorio en dos filas, sin tocar la barra superior (`announcement-bar`) que se mantiene tal como está:
  - Fila 1: logo con eslogan a la izquierda, buscador en línea (campo con icono, placeholder "¿Qué estás buscando?" y botón rosa "Buscar") al centro, y a la derecha el enlace "Seguir mi pedido" con icono, el icono de cuenta y el carrito como píldora verde con el contador (visible también en 0).
  - Fila 2: menú de categorías en una franja propia con los enlaces principales, un separador vertical y un grupo secundario (Ofertas, Más vendidos, Nosotros, Contacto).
- Nuevos ajustes en la sección `header`: enlace y texto de "Seguir mi pedido" (con opción de ocultarlo) y un segundo menú para el grupo secundario de la fila 2.
- El buscador en línea reutiliza la búsqueda predictiva y la página de resultados existentes.
- El comportamiento móvil (cajón de menú, icono de búsqueda en modal) no cambia.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `storefront-navigation`: cambian los requisitos del encabezado global (estructura en dos filas, acceso a "Seguir mi pedido", carrito con contador siempre visible), del menú adaptable (grupo secundario separado) y de la búsqueda (campo visible en escritorio).

## Impact

- `sections/header.liquid` (marcado, estilos de la sección, esquema y ajustes), `snippets/header-mega-menu.liquid` y `snippets/header-dropdown-menu.liquid` (grupo secundario), nuevo snippet del buscador en línea, `assets/base.css` o un CSS nuevo para el layout del encabezado.
- `sections/header-group.json` (valores de los nuevos ajustes; el archivo es regenerado por el editor de temas).
- `locales/*.schema.json` si se agregan etiquetas traducibles para los ajustes.
- Sin cambios en `announcement-bar`, carrito, ni integraciones externas.
