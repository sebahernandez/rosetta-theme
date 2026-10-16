## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` para partir de la rama actualizada

## 2. Implementación

- [x] 2.1 En `layout/theme.liquid`, reemplazar el `<link rel="stylesheet" … media="print" onload="this.media='all'">` de `component-predictive-search.css` por una carga bloqueante con `stylesheet_tag`, conservando la condición `settings.predictive_search_enabled`

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y confirmar que no aparecen ofensas nuevas en `layout/theme.liquid` (el archivo tiene 4 ofensas previas ajenas a este cambio)
- [x] 3.2 Repetir la prueba con Playwright en `/collections/all` contra `shopify theme dev` (red lenta y CPU limitada, escritorio y móvil) y confirmar que en ningún momento hay un spinner ni un elemento de carga visible de más de 100 px
- [x] 3.3 Prueba manual en el navegador: abrir una categoría en móvil y en escritorio con la red limitada y confirmar que no aparece el círculo de carga; escribir en el buscador y confirmar que el spinner de sugerencias se sigue mostrando con su tamaño normal
- [x] 3.4 Ejecutar `git diff --name-only` y confirmar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)

## 4. Entrega

- [x] 4.1 Hacer commit con mensaje convencional y push a `develop`
