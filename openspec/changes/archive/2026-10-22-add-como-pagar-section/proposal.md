# Proposal

## Why

La tienda necesita explicar los métodos de pago disponibles (bolívares, tarjeta internacional y divisas) de forma clara en una sección propia, editable por el comerciante sin tocar código.

## What Changes

- Nueva sección `sections/como-pagar.liquid`: encabezado (etiqueta, título, subtítulo) y una fila de tarjetas de métodos de pago.
- Todos los elementos son bloques con configuración propia: Etiqueta, Título, Subtítulo y Método de pago (ícono, insignia, título, descripción y chips).
- Fondo de la sección sin color por defecto (transparente, configurable); tipografía por defecto Poppins, configurable por bloque (supuesto: se mantiene la convención de las secciones anteriores).
- Responsive: tarjetas apiladas en móvil, 2 en tablet y hasta 4 columnas en escritorio, sin overflow desde 320px.

## Capabilities

### New Capabilities
- `como-pagar-section`: sección informativa de métodos de pago con encabezado y tarjetas, compuesta por bloques independientes.

### Modified Capabilities

## Impact

- Archivo nuevo: `sections/como-pagar.liquid`. No modifica otras secciones (el footer de métodos de pago es independiente).
- No toca contenido del editor (`templates/*.json`, `*-group.json`, `settings_data.json`); solo se pushea código.
