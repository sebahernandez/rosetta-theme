# Proposal

## Why

En escritorio (≥990px) la sección "Suscríbete Rosetta" alinea el formulario al borde inferior de la columna derecha (`align-self: end`). Como la columna de texto (eyebrow, título, descripción) es bastante más alta, el campo de correo y el botón quedan pegados abajo y se genera un espacio vacío grande encima de ellos dentro de la tarjeta.

## What Changes

- En escritorio, el bloque del formulario (campo de correo + botón) se centra verticalmente respecto a la altura de la tarjeta, en lugar de alinearse al borde inferior.
- Dentro de la fila del formulario, el campo y el botón mantienen la misma altura y quedan alineados verticalmente entre sí.
- Tablet y móvil no cambian: texto y formulario siguen apilados con campo y botón a ancho completo.
- No se agregan settings nuevos ni se modifica contenido del editor de temas.

## Capabilities

### New Capabilities

### Modified Capabilities

- `suscribete-rosetta-section`: el requisito "Diseño responsive" cambia el comportamiento en escritorio: el formulario se centra verticalmente en la tarjeta, sin dejar un hueco desproporcionado sobre el campo y el botón.

## Impact

- Código: `sections/suscribete-rosetta.liquid` (bloque `{% stylesheet %}`, regla `.suscribete__form-wrap` dentro del media query `min-width: 990px`).
- Sin cambios en schema, locales, JSON de templates ni dependencias.
- Spec afectada: `openspec/specs/suscribete-rosetta-section/spec.md` (delta).
