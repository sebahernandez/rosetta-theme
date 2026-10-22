# Proposal

## Why

Debajo del formulario de contacto la tienda necesita mostrar "Otras formas de contactarnos" (WhatsApp, correo, delivery) como tarjetas. Hoy no existe una sección para esto, y el comerciante debe poder añadir, quitar y reordenar tarjetas y editar cada elemento de cada una de forma independiente.

## What Changes

- Nueva sección `sections/contact-cards.liquid` ("Tarjetas de contacto") con un título opcional y una cuadrícula de tarjetas.
- Nuevo theme block `blocks/contact-card.liquid` (arquitectura de bloques de tema, como en el theme Horizon): cada tarjeta es un bloque que se añade, reordena y elimina desde el editor.
- Cada tarjeta contiene ícono (de una lista integrada o imagen propia), título, valor principal, descripción y enlace con texto, y TODOS sus elementos y colores se editan por bloque, sin compartir configuración entre tarjetas.
- La sección controla lo común: título, columnas por dispositivo, espacios, ancho máximo, fondo y tipografías.
- Responsive: 3 columnas en escritorio, 2 en tablet y 1 en móvil (configurables).
- La primera tarjeta del preset replica la variante destacada de la referencia (fondo verde), pero el color es configurable por bloque.

## Capabilities

### New Capabilities
- `contact-cards-section`: sección de tarjetas de contacto compuesta por theme blocks, con edición independiente de cada tarjeta y diseño responsive.

### Modified Capabilities

## Impact

- Código nuevo: `sections/contact-cards.liquid` y `blocks/contact-card.liquid`. Es la primera vez que el repo usa la carpeta `blocks/`.
- No se tocan `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`; el comerciante añade la sección en la página de contacto desde el editor.
- Sin JavaScript ni dependencias nuevas.
