# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar con `git status` que el árbol está limpio y actualizado

## 2. Schema de la sección

- [x] 2.1 Crear `sections/oferta-semanal.liquid` con el schema: `image_picker` de imagen, color de fondo de sección, color de fondo del panel y los ajustes `range` de margen y relleno de la tarjeta (superior, inferior, laterales); verificar con `shopify theme check` que el schema es válido
- [x] 2.2 Definir los 5 tipos de bloque (`eyebrow`, `heading`, `text`, `highlight`, `button`) con sus settings (texto, color, línea de acento, enlace) y el preajuste con el contenido de ejemplo; verificar en el editor de temas que los 5 tipos se pueden añadir y reordenar

## 3. Marcado y estilos

- [x] 3.1 Implementar el marcado: tarjeta con imagen (`image_tag` o marcador de posición) y panel con `{% case block.type %}`, sin renderizar elementos vacíos y con `block.shopify_attributes`; verificar que un bloque vacío o un botón sin enlace no deja elementos en el HTML
- [x] 3.2 Aplicar fondo de sección sobre `#shopify-section-{{ section.id }}` y espaciado de la tarjeta con variables CSS; verificar en el editor que cambiar fondo, margen y relleno se refleja al instante
- [x] 3.3 Escribir el CSS responsive en `{% stylesheet %}` (grid de una columna en móvil con imagen arriba, dos columnas desde 750px con imagen a la izquierda, estilos de cada bloque, flecha del botón); verificar visualmente a 320, 390, 750 y 1440 px sin scroll horizontal

## 4. Verificación

- [x] 4.1 Ejecutar `shopify theme check` y confirmar que `sections/oferta-semanal.liquid` no introduce errores
- [x] 4.2 Prueba manual con `shopify theme dev`: añadir la sección en el editor, cargar imagen y textos, y comparar con la referencia en escritorio y móvil
- [x] 4.3 Antes de commitear, ejecutar `git diff --name-only` y confirmar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); si aparecen, pedir aprobación y commitear aparte

## 5. Entrega

- [x] 5.1 Commit con conventional commits (p. ej. `feat: agregar sección oferta-semanal`) y push a `develop`; verificar con `git status` y `git log -1` que quedó publicado
