## Why

La sección "Supermercado en línea" solo permite ajustar margen y relleno superior/inferior externos, con un único valor para todos los dispositivos. El espaciado interno (panel de texto, separación entre elementos y tarjeta promocional) está fijo en el CSS, por lo que el comerciante no puede adaptarlo a móvil y escritorio como en las demás secciones propias.

## What Changes

- Los márgenes y rellenos externos (superior, inferior y lateral) se configuran por separado para móvil (menos de 750 px) y escritorio (750 px o más). Los ajustes existentes `margin_top`, `margin_bottom`, `padding_top` y `padding_bottom` pasan a ser los valores de escritorio y se conservan con sus ids, de modo que los valores ya guardados no se pierden.
- Se agregan controles de espaciado interno, también por dispositivo, sobre los elementos principales:
  - relleno superior, inferior y lateral del panel de contenido (el área con título, texto y botones);
  - separación (gap) entre los elementos del panel;
  - relleno interno y distancia a los bordes de la tarjeta promocional sobre la imagen.
- Los valores por defecto reproducen el espaciado visual actual de la sección (panel, gap y tarjeta promocional) en ambos dispositivos.
- No se modifican archivos de contenido del editor.

## Capabilities

### New Capabilities
- `supermercado-linea-section`: espaciado configurable (márgenes y rellenos externos e internos, móvil y escritorio) de la sección "Supermercado en línea".

### Modified Capabilities

## Impact

- Código: `sections/supermercado-linea.liquid` (bloque `{% style %}`, CSS en `{% stylesheet %}` y `{% schema %}`).
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`. Los ids de ajustes existentes se mantienen.
- En móvil, la sección pasará a usar los valores por defecto de los nuevos ajustes móviles hasta que el comerciante los configure.
