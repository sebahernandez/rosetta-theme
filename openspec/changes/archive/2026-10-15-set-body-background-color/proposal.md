# Proposal

## Why

El fondo de la página hoy es blanco: el `<body>` usa la clase `gradient`, que toma el fondo del esquema de color 1 (`#ffffff`). La identidad visual de Rosetta usa un crema cálido (`#FAF7F2`, ya presente en el encabezado y en varias secciones propias) y las secciones nuevas se diseñan sobre ese tono. El fondo base de toda la tienda debe ser ese crema para que el espacio entre secciones sea coherente.

## What Changes

- El `<body>` de todas las páginas que usan `layout/theme.liquid` pasa a tener fondo `#FAF7F2`.
- Se aplica con una regla CSS en el layout (`body.gradient`), sin modificar los esquemas de color ni `config/settings_data.json`.
- Las secciones que definen su propio fondo (esquemas de color, `section_bg` configurables, tarjetas, encabezado, pie) no cambian: solo se ve el crema donde no hay fondo propio.
- No se añaden settings ni assets nuevos.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `theme-foundation`: se añade un requirement de fondo global de la página (`#FAF7F2`).

## Impact

- Código: `layout/theme.liquid` (una regla CSS en el bloque de estilos existente).
- Sin cambios en `templates/*.json`, `config/` ni `locales/`.
- Efecto visual: todas las páginas (inicio, producto, colección, carrito, cuenta, etc.) muestran crema donde antes se veía blanco del body. Las zonas con esquema de color propio siguen en su color.
