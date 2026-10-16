## Why

Al entrar a una categoría (collection), con conexión lenta aparece un círculo tipo loader gigante que cubre casi toda la pantalla durante la carga y desaparece solo al terminar. Se reprodujo con Playwright (red y CPU limitadas) contra `shopify theme dev`: es el spinner de "cargando sugerencias" del buscador del header, que se ve sin estilos mientras no llega su hoja de estilos.

## What Changes

- Causa observada: `snippets/header-search-inline.liquid` (y `snippets/header-search.liquid`) renderizan `loading-spinner` con la clase `predictive-search__loading-state` dentro del buscador. Las reglas que lo ocultan (`predictive-search:not([loading]) .predictive-search__loading-state { display: none }`) y fijan su tamaño (`predictive-search .spinner { width: 1.5rem; height: 1.5rem }`) están en `assets/component-predictive-search.css` (5,8 KB), que `layout/theme.liquid` carga de forma diferida con `media="print" onload="this.media='all'"`. Hasta que esa hoja llega, el SVG se pinta a tamaño completo (en la prueba, ~880×880 px sobre el header y la página).
- Cargar `component-predictive-search.css` de forma bloqueante, sin `media="print"`, para que el spinner nazca oculto y con su tamaño final.
- Verificar con la misma prueba de red lenta, en escritorio y móvil, que no hay ningún elemento de carga visible durante la carga de una categoría.
- Sin cambios de diseño ni de contenido del editor de temas.

## Capabilities

### New Capabilities

### Modified Capabilities
- `storefront-navigation`: el requirement "Encabezado sin destello de contenido sin estilos" añade que los indicadores de carga del buscador del header no sean visibles durante la carga de la página.

## Impact

- Código: `layout/theme.liquid` (bloque del `<link>` de `component-predictive-search.css`).
- Sin impacto en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`.
- Riesgo bajo: +5,8 KB de CSS bloqueante en el `<head>`.
- Limitación: el síntoma en móvil no se pudo reproducir con la prueba automatizada (en móvil el buscador en línea está oculto por `component-header-redesign.css`); la corrección cubre también el spinner del buscador modal de móvil por usar la misma hoja de estilos, y la prueba manual en móvil forma parte de las tareas.
