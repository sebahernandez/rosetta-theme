# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y verificar que el árbol queda limpio con `git status`

## 2. Fondo global

- [x] 2.1 Añadir `body.gradient { background: #faf7f2; }` en el bloque de estilos de `layout/theme.liquid`, junto a la regla `body`; verificar con `shopify theme check` sin errores nuevos y que el body computa `rgb(250, 247, 242)` en las herramientas del navegador
- [x] 2.2 Revisar visualmente con `shopify theme dev` inicio, producto, colección, carrito y cuenta a 1440 y 375 px: el espacio sin fondo propio se ve crema, las secciones con fondo propio conservan su color y una página corta no muestra franjas blancas

## 3. Entrega

- [x] 3.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); si hace falta tocarlos, pedir aprobación y commitear aparte
- [x] 3.2 Commit (conventional commits) y push a `develop`; verificar con `git status` que no queda nada pendiente
