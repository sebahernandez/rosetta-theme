# Design

## Context

- Mismo patrón que `pasos-nosotros` y `nuestro-compromiso`: bloques de sección en el schema, variables CSS `--cp-*` por bloque, CSS en `{% stylesheet %}`, `font_picker` por bloque.
- Reglas del proyecto: `range` con al menos 3 pasos; nombres de bloque de 25 caracteres o menos; solo código en el push.

## Goals / Non-Goals

**Goals:** cada elemento es un bloque configurable; fondo opcional; Poppins por defecto; responsive.

**Non-Goals:** JavaScript, acordeones, theme blocks anidados, modificar el footer de métodos de pago.

## Decisions

1. **Bloques de sección**: `etiqueta`, `titulo`, `subtitulo` (encabezado) y `metodo` (tarjeta); `max_blocks: 20`. El tipo decide la zona: encabezado arriba, métodos en la cuadrícula.
2. **Chips en un campo de texto separado por comas** dentro del bloque Método. Alternativa descartada: theme blocks anidados (un archivo en `blocks/` por chip) por añadir complejidad y archivos a sincronizar para pastillas de una palabra. Trade-off: no se puede dar un estilo distinto a cada chip; los colores de chips son por tarjeta.
3. **Ícono**: `select` con íconos SVG integrados (transferencia, tarjeta, dinero, teléfono, billetera, escudo) o imagen propia; círculo con color de fondo y de ícono propios.
4. **Cuadrícula**: `grid` de 1 columna en móvil, 2 desde 750px y N columnas (`select` 2/3/4) desde 990px; tarjetas con `display: flex; flex-direction: column` y chips con `margin-top: auto` para alinear.
5. **Insignia**: píldora a la derecha del ícono con colores propios; se omite sin texto.
6. **Fondo de sección** sin `default`; el `{% style %}` solo emite `background-color` si hay valor.
7. **Tamaños** en `rem` (`px / 10`) con variantes móvil/escritorio y media query a 750px.

## Risks / Trade-offs

- Chips por coma: una coma dentro de un chip lo divide; se documenta en el `info` del campo.
- Muchas opciones por tarjeta: se agrupan con `header`.
- Poppins debe existir en la biblioteca de fuentes de Shopify (`poppins_n4`), ya usada en secciones anteriores.
