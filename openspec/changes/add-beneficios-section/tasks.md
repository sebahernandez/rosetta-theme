# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y verificar que el árbol queda limpio con `git status`

## 2. Sección `beneficios.liquid`

- [x] 2.1 Crear `sections/beneficios.liquid` con el `{%- style -%}` de fondo, márgenes y rellenos de la sección y el schema de settings (fondo, separadores, márgenes y rellenos 0–120 px paso 4); verificar con `shopify theme check` sin errores nuevos
- [x] 2.2 Definir el bloque `beneficio` en el schema (select de ícono, `image_picker`, título, descripción, colores de ícono, círculo, título y descripción), `max_blocks: 6` y preset con los cuatro beneficios de la referencia; verificar que el editor lista la sección y su preset
- [x] 2.3 Implementar el render: set de íconos SVG inline con `currentColor`, prioridad de imagen propia, omitir bloques sin título ni descripción y omitir la descripción vacía; verificar en el editor con ícono integrado, con imagen y con bloque vacío
- [x] 2.4 Implementar el CSS responsive en `{% stylesheet %}` (grid 4 / 2 / 1 columnas, separadores por breakpoint, `min-width: 0` y `overflow-wrap`); verificar a 1440, 900 y 375 px con 3, 4, 5 y 6 bloques sin scroll horizontal

## 3. Verificación y entrega

- [ ] 3.1 Ejecutar `shopify theme check` y probar manualmente en el editor de temas: cambiar colores por bloque, ocultar separadores, subir márgenes y rellenos, texto largo
- [x] 3.2 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); si hace falta tocarlos, pedir aprobación y commitear aparte
- [ ] 3.3 Commit (conventional commits) y push a `develop`; verificar con `git status` que no queda nada pendiente
