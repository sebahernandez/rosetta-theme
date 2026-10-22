# Proposal

## Why

La página de inicio necesita una sección "Cómo comprar en Rosetta" que explique el proceso de compra en cuatro pasos junto a una imagen. Hoy no existe y el contenido debe ser editable por el comerciante sin tocar código.

## What Changes

- Nueva sección `sections/pasos-nosotros.liquid` con dos columnas: imagen a un lado y, al otro, etiqueta, título con acento, subtítulo y una lista vertical de pasos numerados unidos por una línea.
- Todos los elementos son bloques con configuración propia: Etiqueta, Título, Subtítulo, Imagen y Paso (número, título, descripción).
- Sin color de fondo por defecto (transparente); el comerciante puede definir uno opcionalmente.
- Tipografía por defecto Poppins, configurable por bloque con `font_picker`.
- Totalmente responsive (una columna bajo 990px, sin overflow desde 320px).

## Capabilities

### New Capabilities
- `pasos-nosotros-section`: sección de pasos de compra con bloques independientes, fondo opcional y Poppins por defecto.

### Modified Capabilities

## Impact

- Archivo nuevo: `sections/pasos-nosotros.liquid`. No modifica `nosotros-home` ni `nosotros-content`.
- No toca contenido del editor (`templates/*.json`, `*-group.json`, `settings_data.json`); solo se pushea código.
