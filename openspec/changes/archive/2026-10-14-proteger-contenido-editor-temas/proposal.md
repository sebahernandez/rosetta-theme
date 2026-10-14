# Proposal

## Why

Los cambios de código del theme (Liquid, CSS, JS) se están commiteando junto con archivos que el editor de temas de Shopify escribe: por ejemplo `sections/header-group.json` y `templates/index.json` aparecen en commits de código (`26e7e0e`) y en commits `Update from Shopify`. Cuando un cambio de código sobrescribe esos archivos con una versión local desactualizada, se pierden las ediciones visuales del comerciante: imágenes cargadas, textos, bloques y su orden.

## What Changes

- Se define qué archivos son **código del theme** y cuáles son **contenido del editor de temas**.
- Todo cambio de código SHALL tocar solo archivos de código; los archivos de contenido quedan fuera de los commits de código.
- Antes de empezar un cambio se sincroniza con `origin/develop` para partir de la última versión del contenido guardado por Shopify.
- Se define una excepción controlada: si un cambio de código exige modificar un archivo de contenido, requiere aprobación explícita y se commitea por separado.
- Se agrega `.shopifyignore` para que `shopify theme push` no sobrescriba el contenido del editor.

## Capabilities

### New Capabilities
- `theme-content-protection`: separa el código del theme del contenido del editor de temas y garantiza que los cambios de código no alteren imágenes, textos, bloques ni configuración visual del comerciante.

### Modified Capabilities

## Impact

- Archivo nuevo: `.shopifyignore`.
- Flujo de trabajo de commits en `develop` (complementa `development-workflow`).
- Sin cambios en el comportamiento visible de la tienda.
