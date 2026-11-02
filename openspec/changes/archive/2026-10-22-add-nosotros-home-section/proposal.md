# Proposal

## Why

La página de inicio necesita una sección de presentación "Nosotros" (insignia, título con acento, texto, botones, imagen destacada y tarjeta flotante de ubicación). Hoy no hay una sección equivalente en el theme (`nosotros-content` tiene otro propósito), y el comerciante debe poder componerla, ordenarla y editar cada elemento por separado desde el editor de temas.

## What Changes

- Nueva sección `sections/nosotros-home.liquid` ("Nosotros Home"): dos columnas en escritorio (contenido a la izquierda, imagen a la derecha) y una columna en móvil.
- Cada elemento es un bloque con configuración propia: **Insignia**, **Título** (con segunda parte de acento), **Texto**, **Botón** (primario o secundario, repetible), **Imagen** y **Tarjeta flotante** (ícono, título y subtítulo sobre la imagen).
- Cada bloque define en qué columna se muestra (izquierda o derecha), y sus colores, tipografías, tamaños y espaciados se editan solo en ese bloque.
- La sección controla lo común: fondo, ancho máximo, proporción de columnas, espacios entre columnas y relleno de la sección por dispositivo.
- Completamente responsive (320px en adelante), con botones que pasan a ancho completo en móvil y tarjeta flotante que se ajusta sobre la imagen.

## Capabilities

### New Capabilities
- `nosotros-home-section`: sección de presentación de la tienda para la página de inicio, compuesta por bloques independientes y responsive.

### Modified Capabilities

## Impact

- Código nuevo: `sections/nosotros-home.liquid` (CSS en `{% stylesheet %}`, schema en español, patrón de `contact-rosetta`/`contact-cards`).
- No se tocan `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`; el comerciante añade la sección en la plantilla de inicio desde el editor y carga la imagen allí.
- Sin JavaScript ni dependencias nuevas. No modifica `nosotros-content.liquid`.
