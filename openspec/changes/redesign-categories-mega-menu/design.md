# Design

## Context

- `sections/header.liquid` renderiza la segunda fila (`.header__nav-row`, l.418-428) con `header-dropdown-menu` o `header-mega-menu` según `menu_type_desktop` (`dropdown` | `mega` | `drawer`); el menú es `main-menu` (`sections/header-group.json`). El cajón móvil es `snippets/header-drawer.liquid` (3 niveles con `<details>` y `MenuDrawer` en `assets/global.js`).
- Los tres snippets ya recorren 3 niveles (`link.links` → `childlink.links`), el máximo de Shopify.
- Estilos del rediseño en `assets/component-header-redesign.css` con variables `--header-*` (crema `#faf7f2`, rosa hover `#ff4fd1`, menta carrito `#6fffd2`). Otros tonos del design system: rosa `#ff71db`, rosa claro `#ffdcf6`, rosa oscuro `#f04ee0`, texto `#1c1417`, muted `#6b625b`, borde `#e1d7ca`.
- Iconos disponibles en `assets/icon-*.svg` (apple, bottle, dairy, carrot, snowflake, serving-dish, paw-print, perfume, leaf, price-tag, discount, etc.) vía `inline_asset_content`. Font Awesome 6.5.2 ya se carga en `layout/theme.liquid:8`.
- El schema del header solo tiene bloques `@app`.

## Goals / Non-Goals

**Goals:**
- Nuevo tipo `categories` sin romper los tipos existentes.
- Reutilizar el menú configurado (cero enlaces duplicados).
- Mismo contenido en escritorio (panel) y móvil (cajón por niveles).

**Non-Goals:**
- Cambiar la primera fila del encabezado (logo, búsqueda, cuenta, carrito).
- Editar el menú en Shopify Admin o `header-group.json`.
- Mega menú con imágenes/promos.

## Decisions

1. **Nueva opción `categories` en `menu_type_desktop`**, render condicional en la segunda fila → `snippets/header-categories-menu.liquid`. *Alternativa*: sección nueva aparte → descartada: duplicaría sticky header, cálculos de altura y el cajón móvil.
2. **Bloques del header** (conviven con `@app`):
   - `categories_button` (máx. 1): `text` ("Categorías"), `icon` (select de iconos), `bg_color` (#ff71db), `text_color` (#1c1417).
   - `pill_button` (máx. 4): `text`, `link` (url), `icon` (select, incl. `discount`), `bg_color` (#6fffd2), `text_color` (#1c1417).
   - `category_icon` (máx. 30): `link_title` (texto exacto del enlace de primer nivel; comparación sin acentos/mayúsculas vía `handleize`), `icon` (select de `assets/icon-*.svg`) o `custom_icon` (image_picker) que tiene prioridad.
   - Settings de sección nuevos (layout/colores del contenedor): `categories_panel_bg` (#ffffff), `categories_list_bg` (#faf7f2), `categories_active_bg` (#ffdcf6), `categories_accent` (#f04ee0), `categories_text` (#1c1417), `categories_panel_max_height` (range 400–800, 640).
   Se definen con `max_blocks` global de 40. *Alternativa*: icono como metafield de colección → no aplica a enlaces que no son colecciones y no es editable desde el editor de temas.
3. **Markup del panel**: `<categories-menu>` con `<button aria-expanded aria-controls>` + `<div role="dialog">` que contiene `<ul role="list">` de categorías (cada `<a>` con `data-target`) y un `<div class="categories-panel__content" id="cat-{{ link.handle }}">` por categoría (render del lado servidor, solo uno visible). Todo en Liquid: sin fetch, sin contenido hardcodeado.
4. **JS** `assets/categories-menu.js` (custom element, ~120 líneas, sin dependencias): abre/cierra, `mouseenter`/`focus` cambia categoría activa (con retardo de 80ms para evitar parpadeo al cruzar en diagonal), flechas arriba/abajo, Escape, clic fuera, devuelve foco. Se integra con `sticky-header` publicando `preventHide` como hace `header-menu` en `details-disclosure.js`.
5. **CSS** `assets/component-categories-menu.css`, cargado solo con `categories`. Variables `--cat-*` alimentadas por los settings mediante `style` inline en el contenedor. Panel: grid `minmax(260px, 30%) 1fr`; columnas derechas `repeat(auto-fill, minmax(180px, 1fr))`. Píldoras `border-radius: 999px`, altura 44px. Fuente del theme (`--font-body-family`).
6. **Móvil**: se reutiliza `header-drawer.liquid` (ya navega 3 niveles con paneles deslizables). Se añade: icono de categoría en el primer nivel, enlace "Mostrar todo" al inicio de cada submenú, y estilos con las mismas variables `--cat-*`. Los botones píldora se muestran en el cajón bajo las categorías. *Alternativa*: un acordeón nuevo → duplicaría `MenuDrawer`.
7. **Textos**: claves nuevas `sections.header.categories` y `sections.header.show_all` en `locales/es.json` y `en.default.json`; labels del schema en `locales/*.schema.json` siguiendo el patrón existente (o literales en español como otras secciones propias).

## Risks / Trade-offs

- [Titulo del bloque de icono no coincide con el enlace] → comparación por `handleize`; el `info` del setting lo explica.
- [Menús muy largos superan el alto de pantalla] → columna izquierda y panel con `max-height` configurable y scroll interno.
- [Conflicto con sticky header que se oculta al hacer scroll] → `preventHide` mientras el panel está abierto.
- [El tipo nuevo no se activa automáticamente] → el comerciante lo elige en el editor; el código no toca `header-group.json`.

## Migration Plan

Desplegar código (push con `--only` de los archivos de código), activar "Categorías" en el editor, añadir bloques (Categorías, Ofertas, iconos), guardar, `git pull`. Rollback: volver `menu_type_desktop` a `dropdown` en el editor.
