# Proposal

## Why

La tienda necesita un bloque de captación de correos ("Recetas, promociones y novedades fresquitas") que convierta visitantes en suscriptores. El `newsletter.liquid` existente tiene otro diseño (tarjeta blanca con redes sociales, botón dentro del campo, estilos con `!important`) y no permite configurar colores de fondo y botón con precisión. El comerciante debe poder editar textos, fondos y botones desde el editor de temas, y el formulario debe registrar al suscriptor con el motor nativo de Shopify.

## What Changes

- Nueva sección `sections/suscribete-rosetta.liquid`: tarjeta redondeada con texto a la izquierda (eyebrow, título y descripción) y formulario a la derecha (campo de correo en forma de píldora y botón "Suscribirme" con flecha).
- El formulario usa el formulario nativo `customer` de Shopify (`{% form 'customer' %}`) con la etiqueta `newsletter`: el correo queda registrado como cliente con consentimiento de marketing por correo, visible en Clientes de la tienda. Sin JS ni endpoints propios.
- Textos editables: eyebrow, título, descripción, placeholder del campo, texto del botón, mensaje de éxito.
- Colores editables: fondo de la sección (franja exterior), fondo de la tarjeta, colores de eyebrow, título y descripción, fondo y texto del campo, fondo, texto y hover del botón. Radio de la tarjeta, márgenes y rellenos configurables.
- Opción para mostrar u ocultar la flecha del botón.
- Estados del formulario: éxito (mensaje configurable) y error (mensaje nativo de Shopify, p. ej. correo inválido).
- Diseño responsive: dos columnas en escritorio, apilado en tablet/móvil con el campo y el botón en columna en pantallas pequeñas, sin overflow horizontal.
- Preset con los textos y colores de la referencia. No se modifica `newsletter.liquid` ni ningún archivo de contenido.

## Capabilities

### New Capabilities

- `suscribete-rosetta-section`: tarjeta de suscripción responsive con textos, fondos y botón configurables desde el editor de temas y formulario nativo de Shopify para registrar el correo del suscriptor.

### Modified Capabilities

<!-- Ninguna: no cambian requisitos de capacidades existentes. -->

## Impact

- Código: nuevo `sections/suscribete-rosetta.liquid` (Liquid, `{% stylesheet %}` y `{% schema %}` inline; sin JS ni assets nuevos).
- Sin dependencias nuevas, sin cambios en `templates/*.json`, `config/` ni `locales/`.
- Datos: los correos se guardan como clientes de Shopify con etiqueta `newsletter` (mismo mecanismo que `newsletter.liquid`).
- El comerciante deberá añadir la sección en el editor de temas y guardar; luego `git pull origin develop` para traer las referencias de contenido.
