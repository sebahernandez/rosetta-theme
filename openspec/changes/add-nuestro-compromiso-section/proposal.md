# Proposal

## Why

La página de inicio necesita un bloque "Nuestro compromiso" que combine un mensaje de marca (con lista de garantías y botón) junto a una imagen, y una fila de tarjetas de categorías con enlace. Debe ser editable por el comerciante sin tocar código.

## What Changes

- Nueva sección `sections/nuestro-compromiso.liquid` con dos zonas: un panel principal (texto a la izquierda, imagen a la derecha a sangre) y una fila de tarjetas con imagen debajo.
- Todos los elementos son bloques con configuración propia: Etiqueta, Título (con acento), Texto, Ítem de lista (con check), Botón, Imagen y Tarjeta de categoría (etiqueta, título, enlace, imagen de fondo).
- Fondo de la sección sin color por defecto (transparente, configurable); el panel principal tiene su propio color (rosa claro por defecto).
- Tipografía por defecto Poppins, configurable por bloque (supuesto: se mantiene la convención de `pasos-nosotros`).
- Responsive: una columna bajo 990px, tarjetas apiladas en móvil, sin overflow desde 320px.

## Capabilities

### New Capabilities
- `nuestro-compromiso-section`: sección de compromiso de marca con panel principal y tarjetas de categorías, compuesta por bloques independientes.

### Modified Capabilities

## Impact

- Archivo nuevo: `sections/nuestro-compromiso.liquid`. No modifica otras secciones.
- No toca contenido del editor (`templates/*.json`, `*-group.json`, `settings_data.json`); solo se pushea código.
