## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` para partir de la rama actualizada

## 2. Implementación

- [x] 2.1 En `sections/header.liquid`, añadir al bloque `{% style %}` (después de la media query de `min-width: 750px`) una regla condicionada a `template.name == 'product'` que establezca `.section-header { margin-bottom: 0; }`, sin tocar el ajuste `margin_bottom` ni su uso en otras plantillas

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y confirmar que no hay ofensas nuevas en `sections/header.liquid`
- [x] 3.2 Con Playwright contra `shopify theme dev`, en escritorio y móvil, medir la distancia entre el borde inferior del header y el inicio de `#MainContent`: 0 en una página de producto y el margen configurado (52 escritorio / 39 móvil) en una colección
- [x] 3.3 Prueba manual en el navegador: en una página de producto no se ve franja entre el header y el contenedor blanco (móvil y escritorio); el header fijo se comporta igual al desplazarse; otras páginas sin cambios
- [x] 3.4 Ejecutar `git diff --name-only` y confirmar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)

## 4. Entrega

- [x] 4.1 Hacer commit con mensaje convencional y push a `develop`
