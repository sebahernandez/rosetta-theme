# Design

## Context

- Theme Refresh 15.2.0: todas las secciones son archivos `sections/*.liquid` con bloques propios; no existe la carpeta `blocks/` ni se usan theme blocks (`@theme`). Las secciones propias (`suscribete-rosetta`, `contact-rosetta`) inyectan valores del schema como variables CSS en el `style` del contenedor y llevan el CSS en `{% stylesheet %}`.
- "Blocks de Horizon" se interpreta como la arquitectura de **theme blocks** de Shopify (archivos en `blocks/`, sección con `"blocks": [{ "type": "@theme" }]`), que es la que usa el theme Horizon. Es una característica de la plataforma OS 2.0, no depende de que el theme sea Horizon.
- Regla del proyecto: no tocar contenido del editor (`templates/*.json`, `*-group.json`, `settings_data.json`).

## Goals / Non-Goals

**Goals:**
- Tarjetas como theme blocks reutilizables, cada una con configuración propia y completa.
- Responsive 3/2/1 columnas, sin overflow desde 320px.

**Non-Goals:**
- Bloques anidados dentro de la tarjeta (ícono/texto/botón como sub-bloques). Cada elemento es un conjunto de settings del bloque `contact-card`; se evalúa anidar si el comerciante necesita reordenar elementos dentro de la tarjeta.
- JavaScript, y modificar `contact-form`/`contact-rosetta`.

## Decisions

1. **Archivos.** `sections/contact-cards.liquid` (título, cuadrícula, estilos comunes) y `blocks/contact-card.liquid` (una tarjeta). La sección declara `"blocks": [{ "type": "@theme" }]`, `max_blocks: 12` y un preset con 3 bloques `contact-card`. Los theme blocks no admiten `enabled_on` (verificado con `theme check`); como ninguna otra sección del theme declara `@theme`, el bloque solo se ofrece en `contact-cards`.
2. **Renderizado.** La sección hace `{% content_for 'blocks' %}` dentro de la cuadrícula. Cada bloque emite su `<article class="contact-card" {{ block.shopify_attributes }}>` con variables `--cc-*` propias en su `style`, de modo que sus colores no dependen de la sección.
3. **Estilos.** CSS de la cuadrícula en `{% stylesheet %}` de la sección; CSS de la tarjeta en `{% stylesheet %}` del bloque (Shopify lo carga una sola vez). Valores comunes (radio, relleno, espacios) llegan al bloque por variables CSS heredadas del contenedor de la sección (`--cc-radius`, `--cc-pad`), así que se editan una vez en la sección.
4. **Cuadrícula.** `display: grid` con `grid-template-columns: repeat(var(--cc-cols-m), minmax(0, 1fr))` y breakpoints 750px (tablet) y 990px (escritorio), con columnas configurables (1–2 móvil, 1–3 tablet, 1–4 escritorio). Las tarjetas se estiran (`align-items: stretch`) para igualar altura; el enlace va al final con `margin-top: auto`.
5. **Íconos.** Select con SVG inline (whatsapp, correo, reloj, teléfono, ubicación, instagram, chat) dentro del bloque, más `image_picker` opcional que tiene prioridad. El SVG usa `currentColor` y el color del ícono es configurable; el contenedor circular tiene fondo configurable.
6. **Enlace.** Setting `url` + texto. El enlace es un subrayado simple (como en la referencia); `target` no cambia salvo URLs externas (`rel="noopener"`). Se verifica en implementación que el selector `url` acepta `mailto:`/`tel:`/`https://wa.me/`; si no, se cambia a un setting `text`.
7. **Defaults.** Bloque 1 con fondo verde `#6bf78f`; los demás blanco con borde `#efe6dc`; íconos magenta `#a3157c` sobre `#fbe3f4`; textos `#1a1a1a` y descripciones `#5c5550`. Preset: WhatsApp / Correo / Delivery con los textos de la referencia.
8. **Accesibilidad.** El ícono es decorativo (`aria-hidden`), título como `h3`, el enlace con texto visible; si no hay texto de enlace, la tarjeta no es clicable.

## Risks / Trade-offs

- Primer uso de `blocks/` en el repo: Shopify CLI y `theme check` lo soportan, pero el comerciante verá los bloques solo en secciones con `@theme`. Mitigación: preset con bloques.
- El valor "Correo" largo puede desbordar: `overflow-wrap: anywhere`.
- Sin anidación, no se reordenan elementos dentro de una tarjeta; aceptado por simplicidad.
- Muchos settings por bloque (~25): se agrupan con `header`.
