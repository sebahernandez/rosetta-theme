## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` para partir de la rama actualizada

## 2. Implementación

- [x] 2.1 En `sections/header.liquid`, ampliar la condición existente del bloque `{% style %}` a `template.name == 'product' or template.name == 'collection'`, manteniendo `.section-header { margin-bottom: 0; }` y su posición después de la media query de 750px

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y confirmar que no hay ofensas nuevas en `sections/header.liquid`
- [x] 3.2 Con Playwright contra `shopify theme dev`, en escritorio y móvil, medir la distancia entre el borde inferior del header y `#MainContent`: 0 en colección y en producto, y el margen configurado (52 escritorio / 39 móvil) en una página que no sea de producto ni de colección; comprobar también que tras aplicar un filtro u orden en la colección la distancia sigue en 0
- [x] 3.3 Prueba manual en el navegador: en una colección no se ve franja entre el header y el contenedor blanco (móvil y escritorio) y el header fijo se comporta igual al desplazarse
- [x] 3.4 Ejecutar `git diff --name-only` y confirmar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)

## 4. Entrega

- [x] 4.1 Hacer commit con mensaje convencional y push a `develop`
