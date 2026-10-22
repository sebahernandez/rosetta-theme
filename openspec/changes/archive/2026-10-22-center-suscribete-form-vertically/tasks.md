# Tasks

## 1. Alineación vertical del formulario

- [x] 1.1 En `sections/suscribete-rosetta.liquid`, cambiar `align-self: end` por `align-self: center` en `.suscribete__form-wrap` (media query `min-width: 990px`) y verificar con `rg -n "align-self" sections/suscribete-rosetta.liquid` que ya no queda `end`.
- [x] 1.2 Verificar en `shopify theme dev` a ≥990px que el campo y el botón quedan centrados verticalmente en la tarjeta (mismo espacio arriba y abajo) y a la misma altura entre sí.
- [x] 1.3 Verificar a 750–989px y a <750px que el layout no cambió (apilado en tablet, campo y botón a ancho completo en móvil, sin desborde horizontal) y que el mensaje de éxito/error se sigue mostrando dentro de la tarjeta.
- [x] 1.4 Ejecutar `shopify theme check` sobre `sections/suscribete-rosetta.liquid` y verificar que no introduce nuevas advertencias.

## Workflow follow-up

- Archivar el cambio tras la revisión (sincroniza el delta a `openspec/specs/suscribete-rosetta-section/spec.md`).
