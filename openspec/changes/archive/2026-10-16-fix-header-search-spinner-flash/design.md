## Context

`snippets/loading-spinner.liquid` renderiza un `<div class="…">` con el SVG `loading-spinner.svg` inline. En el buscador del header se usa con la clase `predictive-search__loading-state` (`header-search-inline.liquid` línea 58, `header-search.liquid` línea 85). Los estilos que lo ocultan y dimensionan están en `assets/component-predictive-search.css`, cargado en `layout/theme.liquid` con `media="print" onload="this.media='all'"`. En la prueba con Playwright (red 50 KB/s, 400 ms de latencia, CPU x4) contra `shopify theme dev`, a los ~12 s el elemento `div.predictive-search__loading-state` medía 640×649 px y su SVG ~880×880 px, visible sobre el header y la página, hasta que llegó el CSS. El cambio anterior `fix-header-menu-fouc` solo tocó `sections/header.liquid`; esta hoja se carga desde el layout y quedó fuera.

## Goals / Non-Goals

**Goals:**
- Que el spinner del buscador nunca se vea fuera de una búsqueda activa, ni siquiera con conexión lenta.

**Non-Goals:**
- Rediseñar el spinner o el panel de sugerencias.
- Cambiar el overlay de filtros de la grilla (`.loading-overlay`), que solo aparece al filtrar y no interviene en este síntoma.

## Decisions

- **Cargar `component-predictive-search.css` de forma bloqueante** en `layout/theme.liquid` (con `stylesheet_tag`, manteniendo la condición `settings.predictive_search_enabled`). Alternativa: inlinear solo dos reglas críticas (ocultar el estado de carga y fijar el tamaño del `.spinner`). Se elige la hoja completa porque pesa solo 5,8 KB, evita duplicar reglas que luego diverjan y sigue el criterio del cambio previo del header.
- **Mantener `component-price.css` y el resto de hojas diferidas** del header como están; no forman parte del síntoma.
- **Verificación con Playwright** (red y CPU limitadas, escritorio y móvil) contra `shopify theme dev`, buscando elementos visibles con clases de spinner/loading mayores a 100 px y capturando pantallas en el tiempo.

## Risks / Trade-offs

- [+5,8 KB de CSS bloqueante en el `<head>` en todas las páginas] → impacto marginal en el primer render, a cambio de eliminar el destello.
- [El síntoma en móvil no se reprodujo en la prueba automatizada] → en móvil el buscador en línea está oculto por `component-header-redesign.css`; la hoja bloqueante cubre igualmente el spinner del buscador modal. Si tras el cambio persiste un loader en móvil real, se investiga con captura del dispositivo; queda como tarea de verificación manual.
- [Existen otros `loading-spinner` en la página (tarjetas de producto con clase `hidden`)] → ya se ocultan con `.hidden` de `base.css`, que es bloqueante; la prueba de verificación los vigila.
