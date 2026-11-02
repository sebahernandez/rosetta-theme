# Proposal

## Why

Con las 56 colecciones nuevas, el menú principal tiene muchas categorías y subcategorías, y la fila horizontal actual (desplegable o mega menú de Refresh) no las presenta de forma cómoda. Se quiere un menú de categorías al estilo supermercado: un botón "Categorías" que abre un panel de dos columnas (categorías a la izquierda, subcategorías a la derecha), con los colores del design system de Rosetta.

## What Changes

- Nuevo tipo de menú de escritorio **"Categorías"** en la sección del encabezado (opción adicional de `menu_type_desktop`; las opciones actuales se mantienen).
- La segunda fila del encabezado muestra botones tipo píldora: **"Categorías"** (abre el panel) y botones adicionales configurables como **"Ofertas"**.
- El panel de categorías:
  - Columna izquierda: los enlaces de primer nivel del menú configurado, cada uno con icono opcional y chevron; el seleccionado se resalta.
  - Panel derecho: título de la categoría seleccionada, enlace "Mostrar todo" a su destino, y sus subenlaces en columnas; los enlaces de tercer nivel se listan bajo cada subenlace, que termina con "Mostrar todo".
- Los enlaces y subenlaces salen **del menú actual tal cual** (Contenido > Menús): no se cambia ni se duplica ningún enlace.
- Iconos por categoría y botones píldora como **bloques configurables** del encabezado (título del enlace al que aplica, icono, colores, destino), según la norma de secciones.
- Responsive: en móvil y tablet (<990px) la misma estructura se navega en el cajón lateral con niveles deslizables (categoría → subcategorías → tercer nivel), con los mismos iconos y colores.
- Colores del design system de Rosetta (rosa, menta, crema y texto oscuro), configurables desde el editor.

Supuestos registrados:
- La imagen de referencia usa verde/amarillo; se traducen a la paleta de Rosetta: botón "Categorías" rosa (`#ff71db`), botón "Ofertas" menta (`#6fffd2`), resaltado de categoría activa rosa claro (`#ffdcf6`), acentos y "Mostrar todo" en rosa oscuro (`#f04ee0`), fondos crema `#faf7f2` y blanco.
- El botón "Ofertas" es un enlace directo a `/collections/ofertas` (sin desplegable).
- El comerciante activa el nuevo tipo desde el editor de temas; el código no modifica `sections/header-group.json`.

## Capabilities

### New Capabilities
<!-- Ninguna -->

### Modified Capabilities
- `storefront-navigation`: el requisito "Menú adaptable" incorpora el tipo "Categorías" en escritorio y el cajón móvil por niveles; se añaden requisitos del panel de categorías, sus bloques configurables y su accesibilidad.

## Impact

- Código: `sections/header.liquid` (opción de schema, bloques, render condicional), nuevo snippet `snippets/header-categories-menu.liquid`, nuevo `assets/component-categories-menu.css`, nuevo `assets/categories-menu.js` (custom element), ajustes en `snippets/header-drawer.liquid` y `assets/component-menu-drawer.css` para el cajón móvil.
- Locales: textos "Categorías" y "Mostrar todo" en `locales/es.json` y `locales/en.default.json` (+ schema).
- Sin cambios en datos de la tienda ni en archivos de contenido del editor.
