## Context

`sections/supermercado-linea.liquid` aplica `margin_top/bottom` y `padding_top/bottom` a `#shopify-section-{{ section.id }}` con un único valor para todos los dispositivos. El espaciado interno está fijo en el CSS: `.supermercado-linea__panel` (`5rem 4rem` en escritorio, `3.2rem 2rem` bajo 990px, gap `2.4rem`/`2rem`) y `.supermercado-linea__promo` (offset `3.2rem`/`1.6rem`, padding `1.6rem 2rem`/`1.2rem 1.6rem`). Los valores guardados en `templates/index.json` (`margin_top: 80`, `margin_bottom: 80`, `padding_top: 32`, …) usan los ids actuales y no deben perderse. El patrón de referencia es `productos-populares`: variables CSS `--*-mobile` y `--*-lg` con media query en 750px.

## Goals / Non-Goals

**Goals:**
- Controlar márgenes y rellenos externos e internos de los elementos principales, por móvil y escritorio.
- Conservar los ids existentes y el aspecto actual con los valores por defecto.

**Non-Goals:**
- Cambiar colores, radios, tamaños de texto o la estructura de bloques.
- Modificar la sección `supermercado-explora` ni archivos de contenido.

## Decisions

- **Conservar `margin_top`, `margin_bottom`, `padding_top`, `padding_bottom` como valores de escritorio; añadir variantes `_mobile` y márgenes/relleno laterales (`margin_x`, `padding_x` y sus `_mobile`).** Alternativa: renombrar los ids. Se descarta porque borraría los valores guardados (80/80/32/32).
- **Umbral único de 750px** (móvil `< 750`, escritorio `>= 750`), igual que `productos-populares`. Hoy el CSS cambia a una columna en 990px; el espaciado por dispositivo usa 750px, y los controles solo sustituyen los valores fijos de padding/gap/offset, sin alterar el layout de columnas.
- **Aplicar valores mediante variables CSS en el bloque `{% style %}`** (`--sl-pad-*`, `--sl-gap`, `--sl-promo-*`, versión móvil por defecto y versión `-lg` en `@media (min-width: 750px)`), y consumirlas en las reglas de `.supermercado-linea__panel` y `.supermercado-linea__promo`, retirando los valores fijos equivalentes. Es mobile-first y evita duplicar reglas por ajuste.
- **Unidad en px** en los ajustes (rango 0–120 salvo gap y promo, con topes menores) y conversión directa `{{ value }}px`; las reglas existentes en `rem` se reemplazan por las variables.
- **Defaults** que reproducen el diseño actual en cada dispositivo: panel móvil 32/32/20, escritorio 50/50/40; gap móvil 20, escritorio 24; promo padding móvil 12/16, escritorio 16/20, distancia móvil 16, escritorio 32.
- **Margen lateral sobre `#shopify-section-…`** (`margin-inline`), sumado al gutter de `page-width`; por defecto 0. El relleno lateral externo se aplica de igual forma con `padding-inline`.
- **Organización del esquema** con headers separados: "Margen y relleno externo (móvil)", "(escritorio)", "Panel de contenido (móvil)", "(escritorio)", "Tarjeta promocional (móvil)", "(escritorio)".

## Risks / Trade-offs

- [En móvil el margen/relleno externo hoy usa los valores guardados (80/80/32/32); pasará a los defaults móviles] → los defaults móviles se fijan en valores moderados (32 de margen, 0 de relleno); el comerciante los ajusta desde el editor. Se documenta en la proposal.
- [Muchos ajustes en el editor] → se agrupan por header y dispositivo para que sea claro.
- [Diferencia de umbral 750px vs 990px del layout] → el espaciado cambia en 750px aunque entre 750 y 989 el panel sigue en una columna; es el mismo criterio ya usado en otras secciones y se verifica en la prueba manual.
