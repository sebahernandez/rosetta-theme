# Proposal

## Why

La tienda necesita una franja de beneficios (envío gratuito, pago seguro, atención 24/7, devolución garantizada) que refuerce la confianza del comprador. La sección existente `icon-features` solo permite imagen como ícono, no tiene colores ni márgenes/rellenos configurables y no tiene diseño de franja con separadores. El comerciante debe poder mantener esta franja completamente desde el editor de temas, sin tocar código.

## What Changes

- Nueva sección `sections/beneficios.liquid`: franja horizontal de beneficios, cada uno como bloque editable (ícono, título, descripción).
- Cada bloque expone: ícono (set de íconos SVG integrados, con opción de subir imagen propia), título, descripción, color del ícono, color del círculo de fondo del ícono, color del título y color de la descripción.
- La sección expone: color de fondo, color y visibilidad de los separadores entre beneficios, y márgenes y rellenos (superior, inferior, lateral) con el mismo patrón de `seleccionado`.
- Diseño responsive: 4 columnas con separadores verticales en escritorio, 2 columnas en tablet y 1 columna (o 2 compactas) en móvil, sin overflow horizontal.
- Un bloque sin título ni descripción no se renderiza.
- Preset con los cuatro beneficios de la referencia; los textos por defecto están en español.
- No se modifica `icon-features` ni ningún archivo de contenido (`templates/*.json`, `settings_data.json`).

## Capabilities

### New Capabilities

- `beneficios-section`: franja de beneficios responsive compuesta por bloques editables con ícono, textos, colores, márgenes y rellenos configurables desde el editor de temas.

### Modified Capabilities

<!-- Ninguna: no cambian requisitos de capacidades existentes. -->

## Impact

- Código: nuevo `sections/beneficios.liquid` (Liquid, `{% stylesheet %}` y `{% schema %}` inline; sin JS ni assets nuevos).
- Sin dependencias nuevas, sin cambios en `templates/*.json` ni `config/`.
- El comerciante deberá añadir la sección en el editor de temas y guardar; luego `git pull origin develop` para traer las referencias de contenido.
