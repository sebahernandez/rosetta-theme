# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y verificar que el árbol queda limpio con `git status`

## 2. Relleno interno

- [x] 2.1 En `sections/productos-populares.liquid`, mover el `padding` del `{%- style -%}` desde `#shopify-section-*` a variables CSS (`--pp-pad-*` móvil y `--pp-pad-*-lg` escritorio) y aplicarlas a `.productos-populares` con el `@media (min-width: 750px)`; verificar en las herramientas del navegador que el fondo (`.productos-populares`) envuelve el relleno y que `#shopify-section-*` ya no tiene `padding`
- [x] 2.2 Añadir al schema `padding_top_mobile`, `padding_bottom_mobile` y `padding_x_mobile` (0–120 px, paso 4, defaults 24/24/0) con el header "Relleno interno (móvil)", y renombrar las etiquetas de `padding_top|bottom|x` a escritorio conservando ids y defaults; verificar con `shopify theme check` sin errores nuevos y que el editor muestra ambos grupos
- [x] 2.3 Probar manualmente en el editor y en `shopify theme dev` a 1440 y 375 px: cambiar cada relleno de móvil y de escritorio, ponerlos en 0 y comprobar que los márgenes siguen separando de las secciones vecinas y que no hay scroll horizontal

## 3. Entrega

- [x] 3.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); si hace falta tocarlos, pedir aprobación y commitear aparte
- [x] 3.2 Commit (conventional commits) y push a `develop`; verificar con `git status` que no queda nada pendiente
