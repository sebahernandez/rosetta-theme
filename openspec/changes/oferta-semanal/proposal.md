# Proposal

## Why

Rosetta necesita una tarjeta promocional "Oferta semanal" (imagen a un lado, contenido de texto con una cifra destacada y un botón) que el comerciante pueda reutilizar cada semana sin tocar código. Hoy `banner-oferta` usa un layout de tres columnas con imagen de fondo y no permite componer el contenido con bloques ni controlar el espaciado de la tarjeta.

## What Changes

- Nueva sección `sections/oferta-semanal.liquid` que reproduce el diseño de referencia: tarjeta redondeada con imagen a la izquierda y panel de contenido a la derecha.
- Cada elemento del panel es un **bloque configurable**: etiqueta superior (eyebrow con línea), título (con una parte en cursiva de color de acento), texto descriptivo, cifra destacada (p. ej. "2×1") y botón con flecha. El comerciante puede añadir, quitar y reordenar bloques.
- La **imagen** se define desde un `image_picker` en los settings de la sección.
- La **tarjeta principal** expone margen y relleno configurables (superior, inferior, laterales).
- El **fondo de toda la sección** es un color configurable; el fondo del panel de contenido también.
- Diseño **responsive**: en móvil la imagen va arriba del contenido; en escritorio va a la izquierda.

## Capabilities

### New Capabilities
- `weekly-offer`: sección "Oferta semanal" administrable por bloques, con imagen, espaciado y colores configurables y comportamiento responsive.

### Modified Capabilities

## Impact

- Código nuevo: `sections/oferta-semanal.liquid` (schema, CSS en `{% stylesheet %}` y marcado).
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`: la sección se agrega a la portada desde el editor de temas (ver spec `theme-content-protection`). La imagen no va al repositorio; sigue el flujo documentado para secciones con multimedia.
- Sin dependencias nuevas ni JavaScript.
