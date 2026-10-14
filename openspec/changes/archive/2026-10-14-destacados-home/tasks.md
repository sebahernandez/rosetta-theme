# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar con `git status` que el árbol está limpio y actualizado

## 2. Schema de la sección

- [x] 2.1 Crear `sections/destacados-home.liquid` con el schema: `collection` picker, color de fondo de sección y `range` de margen y relleno (superior, inferior, laterales) en px; verificar con `shopify theme check` que el schema es válido
- [x] 2.2 Definir los 3 tipos de bloque (`eyebrow`, `heading`, `promo_card`) con sus settings (texto, color, icono, nota, enlace, fondo) y el preajuste con contenido de ejemplo; verificar en el editor de temas que los bloques se pueden añadir, eliminar y reordenar

## 3. Marcado y estilos

- [x] 3.1 Implementar el marcado: encabezado y tarjeta promocional con `{% case block.type %}`, sin renderizar elementos vacíos y con `block.shopify_attributes`; verificar que un bloque vacío o una nota sin texto no deja elementos en el HTML
- [x] 3.2 Renderizar 4 productos con `{% render 'card-product' %}` (`limit: 4`, `skip_styles` tras la primera) y 4 marcadores de posición si no hay colección; verificar con una colección de 6 productos, una de 2 y sin colección
- [x] 3.3 Aplicar fondo de sección sobre `#shopify-section-{{ section.id }}` y espaciado con variables CSS; verificar en el editor que cambiar fondo, margen y relleno se refleja al instante
- [x] 3.4 Escribir el CSS responsive en `{% stylesheet %}` (promoción a ancho completo y productos en 2 columnas en móvil, fila de 5 columnas desde 990px, 4 columnas si se elimina la promoción); verificar visualmente a 320, 390, 750, 990 y 1440 px sin scroll horizontal

## 4. Verificación

- [x] 4.1 Ejecutar `shopify theme check` y confirmar que `sections/destacados-home.liquid` no introduce errores
- [x] 4.2 Prueba manual con `shopify theme dev`: añadir la sección en el editor, elegir colección, cargar textos e icono, y comparar con la referencia en escritorio y móvil; confirmar que las tarjetas son las actuales (etiqueta, precio, botón Agregar)
- [x] 4.3 Antes de commitear, ejecutar `git diff --name-only` y confirmar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); si aparecen, pedir aprobación y commitear aparte

## 5. Entrega

- [x] 5.1 Commit con conventional commits (p. ej. `feat: agregar sección destacados-home`) y push a `develop`; verificar con `git status` y `git log -1` que quedó publicado
