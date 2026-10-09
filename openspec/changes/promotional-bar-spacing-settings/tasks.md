# Tasks

## 1. Ajustes en el schema

- [x] 1.1 En `sections/promotional-bar.liquid`, añadir al final de `settings` el encabezado "Espaciado en escritorio" con los rangos `margin_top_desktop`, `margin_bottom_desktop`, `padding_top_desktop`, `padding_bottom_desktop` (0–100, step 4, default 0, unidad px) y `padding_horizontal_desktop` (0–100, step 5, default 50), con etiquetas en español; verificar que aparecen en el panel de la sección en el editor de temas
- [x] 1.2 Añadir el encabezado "Espaciado en móvil" con los rangos equivalentes `_mobile` (mismos rangos; `padding_horizontal_mobile` con default 15); verificar que aparecen en el editor y que el schema es JSON válido (la sección carga sin error)

## 2. Estilos por instancia

- [x] 2.1 Añadir la clase `promotional-banner--{{ section.id }}` al `<section>` y un bloque `{%- style -%}` con selector `.promotional-banner.promotional-banner--{{ section.id }}` que aplique los valores móviles como base y los de escritorio en `@media screen and (min-width: 750px)`, usando propiedades individuales (`margin-top`, `margin-bottom`, `padding-*`); verificar en el HTML renderizado que cada instancia tiene su propia regla
- [x] 2.2 Ejecutar `shopify theme check` y verificar que no hay avisos nuevos en `sections/promotional-bar.liquid` respecto al estado previo

## 3. Verificación integrada

- [ ] 3.1 Con `shopify theme dev`, comprobar en la portada que los dos banners existentes se ven igual que antes del cambio en móvil (<750px) y en escritorio (≥750px), sin tocar ningún ajuste
- [ ] 3.2 En el editor de temas, cambiar márgenes y paddings de escritorio y de móvil en uno de los banners y comprobar que cada grupo solo afecta a su ancho de pantalla y que el otro banner no cambia

## 4. Entrega

- [x] 4.1 Hacer commit en `develop` con el código y la carpeta `openspec/changes/promotional-bar-spacing-settings/`, y push a `origin/develop`; verificar con `git status` que la rama local no va por delante del remoto
