# Design

## Context

`layout/theme.liquid` renderiza `<body class="gradient ...">`. En `assets/base.css`, `.gradient` aplica `background: rgb(var(--color-background))`, `background: var(--gradient-background)` y `background-attachment: fixed`; esas variables vienen del esquema de color 1 (blanco), definido en `config/settings_data.json` (contenido protegido: lo escribe el editor y el código no debe modificarlo). Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Fondo `#FAF7F2` en el body de todas las páginas, sin tocar contenido del editor.

**Non-Goals:**
- No cambiar el esquema de color 1: afectaría a todas las secciones, tarjetas, carrito y formularios que lo usan.
- No convertirlo en setting configurable (no se pidió; se puede añadir después).
- No cambiar secciones con fondo propio.

## Decisions

1. **Regla `body.gradient { background: #faf7f2; }` en el bloque de estilos de `layout/theme.liquid`**, junto a la regla `body` existente. El selector `body.gradient` (0,1,1) gana a `.gradient` (0,1,0) de `base.css` sin `!important` y sin depender del orden de carga. Usar el shorthand `background` también anula el `background-image`/gradiente y el `background-attachment: fixed` heredados. Alternativa descartada: editar el esquema 1 en `settings_data.json`, por tocar contenido protegido y cambiar el fondo de todo lo que usa ese esquema.
2. **Valor literal.** `#FAF7F2` ya aparece literal en el theme (`component-header-redesign.css`, secciones propias); se mantiene la convención sin introducir variable nueva.
3. **Página corta.** El body es `min-height: 100%` en grid; el fondo del body se propaga al canvas (`html` no define fondo), por lo que el área restante también queda crema.

## Risks / Trade-offs

- [Secciones que dependen del body blanco (sin fondo propio) cambian de aspecto, p. ej. tarjetas transparentes] → Revisión visual de inicio, producto, colección, carrito y cuenta; si alguna se ve mal, darle fondo explícito en su propio cambio.
- [Contraste de texto sobre crema] → `#FAF7F2` es casi blanco; el contraste con texto oscuro es equivalente al de blanco.
- [El esquema 1 sigue siendo blanco] → Secciones con `color-scheme-1` mostrarán blanco sobre crema; es intencional (no se toca el esquema).
