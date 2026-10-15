# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y verificar que el árbol queda limpio con `git status`

## 2. Sección `suscribete-rosetta.liquid`

- [x] 2.1 Crear `sections/suscribete-rosetta.liquid` con el `{%- style -%}` de fondo exterior y márgenes de la franja y el schema de settings (textos, colores, radio, flecha, márgenes y rellenos 0–120 px paso 4) más el preset con los valores de la referencia; verificar con `shopify theme check` sin errores nuevos y que el editor lista la sección y su preset
- [ ] 2.2 Implementar el marcado: eyebrow, título y descripción condicionales (omitidos si están vacíos), `{% form 'customer' %}` con `contact[tags]=newsletter`, campo de correo con `<label>` oculto, botón con flecha opcional; verificar en el editor que se renderiza y que un texto vacío no deja hueco
- [ ] 2.3 Implementar estados del formulario: mensaje de éxito configurable con `form.posted_successfully?` y mensaje de error con `form.errors` (conservando `form.email`), con `role="status"`/`role="alert"` y `aria-describedby`; verificar enviando un correo válido, uno inválido y un correo repetido en `shopify theme dev`
- [ ] 2.4 Implementar el CSS responsive en `{% stylesheet %}` (variables `--sus-*`, grid de dos columnas ≥990px, apilado en tablet, campo y botón en columna <750px, píldoras, hover y `:focus-visible`, `min-width: 0` y `overflow-wrap`); verificar a 1440, 900 y 375 px sin scroll horizontal y con título largo

## 3. Verificación y entrega

- [ ] 3.1 Ejecutar `shopify theme check` y probar manualmente en el editor de temas: cambiar textos, fondo de tarjeta, colores y hover del botón, ocultar flecha, subir márgenes y rellenos; confirmar que el correo enviado aparece en Clientes de Shopify con la etiqueta `newsletter`
- [x] 3.2 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); si hace falta tocarlos, pedir aprobación y commitear aparte
- [ ] 3.3 Commit (conventional commits) y push a `develop`; verificar con `git status` que no queda nada pendiente
