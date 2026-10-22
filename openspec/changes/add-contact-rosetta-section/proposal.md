# Proposal

## Why

La tienda necesita una página de contacto con la identidad visual de Rosetta (columna de bienvenida con imagen y un formulario en tarjeta). La sección `contact-form` heredada de Refresh es genérica, sin imagen, sin selector de motivo y con poca personalización. El comerciante debe poder ajustar textos, imágenes, colores, tipografías y espaciados sin tocar código.

## What Changes

- Nueva sección `sections/contact-rosetta.liquid` ("Contacto Rosetta") con diseño de dos columnas en escritorio y una sola columna en móvil.
- Columna izquierda: insignia de atención ("Atención 24/7"), título en dos líneas (la segunda con acento en cursiva y color), descripción, imagen y cita con autor.
- Columna derecha: tarjeta con título, nota de campos obligatorios, selector de motivo (pastillas), campos Nombre, Correo, Teléfono (opcional), Mensaje, nota al pie y botón "Enviar mensaje" con flecha.
- El formulario usa el formulario nativo de Shopify (`{% form 'contact' %}`), de modo que el envío llega al correo de la tienda y soporta mensajes de éxito y error nativos.
- El selector de motivo se compone de bloques editables (añadir, quitar, reordenar y renombrar opciones) y viaja como campo personalizado del formulario.
- Todo editable desde el schema: textos, imagen, colores, tipografías (selector de fuente y tamaños), radios y espaciados por dispositivo (escritorio y móvil).
- Totalmente responsive; las pastillas no parten su texto en varias líneas (en la referencia "Delivery" y "Otro" se cortan).

## Capabilities

### New Capabilities
- `contact-rosetta-section`: sección de contacto con formulario nativo de Shopify, selector de motivo por bloques y personalización completa desde el editor de temas.

### Modified Capabilities

## Impact

- Código nuevo: `sections/contact-rosetta.liquid` (CSS en `{% stylesheet %}`, schema propio con textos en español, siguiendo `suscribete-rosetta.liquid`).
- No se tocan `contact-form.liquid`, `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`; el comerciante añade la sección en la plantilla de la página de contacto desde el editor e inserta imagen y textos allí.
- Sin dependencias nuevas ni JavaScript.
