# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y verificar que el árbol de trabajo queda limpio (`git status`)
- [x] 1.2 Confirmar en `shopify theme dev` los títulos reales de las 9 categorías del menú y que sus handles coinciden con la tabla de design.md (D1); anotar cualquier diferencia antes de seguir

## 2. Iconos SVG

- [x] 2.1 Descargar de Lucide (`lucide-static`, versión fija) los 9 iconos de la tabla D1 y guardarlos como `assets/icon-cat-*.svg` con `fill="none"`, `stroke="currentColor"`, sin `width/height`, `class="icon icon-cat"` y comentario de licencia ISC; verificar con `rg -L 'fill="none"' assets/icon-cat-*.svg` que ninguno tiene relleno

## 3. Snippet, estilos y selector

- [x] 3.1 En `snippets/header-categories-icon.liquid`, añadir el icono por defecto por `title | handleize` cuando no hay bloque (prioridad: `custom_icon` → `icon` → defecto → vacío) y actualizar el comentario de uso; verificar que el `span` deja de tener `categories-icon--empty` para las 9 categorías en el panel y en el cajón
- [x] 3.2 En `assets/component-categories-menu.css`, cambiar el color de `.categories-icon` a `var(--cat-icon-color, #000000)` y forzar `fill: none; stroke: currentColor; stroke-width: 1.75` en sus SVG; verificar en el navegador que el icono es negro en estado normal, hover y seleccionado
- [x] 3.3 En `sections/header.liquid`, añadir las 9 opciones `cat-*` al select `icon` del bloque `category_icon` con etiquetas en español; verificar que el JSON del schema es válido con `shopify theme check`

## 4. Verificación

- [x] 4.1 Escritorio (≥990px): abrir el panel "Categorías" y verificar que las 9 categorías muestran su icono en el hueco existente, con la misma separación respecto al texto y el mismo alto de fila
- [x] 4.2 Móvil/tablet (320px, 375px, 768px): abrir el cajón y verificar iconos alineados con el texto, flecha en su sitio, sin desplazamiento horizontal ni saltos de línea nuevos
- [x] 4.3 Editor de temas: añadir un bloque "Icono de categoría" para "Lácteos y refrigerados" con otro icono, verificar que reemplaza al por defecto; reordenarlo y verificar que el orden de categorías no cambia; configurarlo con un icono `cat-*`; eliminarlo y verificar que vuelve el icono por defecto (no guardar estos cambios de prueba)
- [x] 4.4 Ejecutar `shopify theme check` sin errores nuevos en los archivos tocados
- [x] 4.5 Ejecutar `git diff --name-only` y verificar que no aparecen `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`

## 5. Entrega

- [x] 5.1 Commit convencional (`feat(header): add line icons to category menu`) y push a `develop`; verificar con `git log origin/develop -1`
