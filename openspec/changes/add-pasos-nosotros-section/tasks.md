# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que el árbol de trabajo está limpio salvo `.atl/` y `openspec/`

## 2. Sección pasos-nosotros.liquid

- [x] 2.1 Crear `sections/pasos-nosotros.liquid` con la cuadrícula de dos columnas y renderizado de bloques por columna (columna vacía omitida), fondo transparente salvo que se defina color
- [x] 2.2 Implementar los bloques Etiqueta, Título (con acento) y Subtítulo con fuente (Poppins por defecto), colores, tamaños móvil/escritorio y espaciado inferior propios
- [x] 2.3 Implementar el bloque Imagen (`image_url`/`srcset`, proporción, radio, punto focal, marcador sin imagen)
- [x] 2.4 Implementar el bloque Paso (círculo numerado, título, descripción, colores, radio, tamaños) con línea conectora entre pasos y sin línea tras el último
- [x] 2.5 Escribir el CSS en `{% stylesheet %}` con variables `--pn-*`: dos columnas desde 990px, una debajo, sin overflow horizontal desde 320px
- [x] 2.6 Escribir el schema en español: ajustes de sección (color de fondo sin default, ancho máximo, proporción, espacios y rellenos móvil/escritorio), los 5 tipos de bloque, `max_blocks: 16` y preset con la composición de la referencia (4 pasos)
- [x] 2.7 Validar que cada `range` tenga al menos 3 pasos ((max − min) / step ≥ 3) y que los defaults caigan en un paso

## 2b. Barra de beneficios

- [x] 2.8 Añadir el bloque Beneficio, la barra superior responsive y sus ajustes de sección; preset con Frescos, Artesanales y Seleccionados

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y corregir errores del archivo nuevo
- [ ] 3.2 Prueba manual en el editor de temas: añadir la sección en inicio, añadir/reordenar/eliminar bloques, comprobar fondo transparente por defecto y con color, y Poppins por defecto
- [ ] 3.3 Probar responsive a 320, 375, 768, 990 y 1440px: sin scroll horizontal

## 4. Cierre

- [x] 4.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`) y que solo cambia `sections/pasos-nosotros.liquid`
- [ ] 4.2 Commit con conventional commits y push a `develop`; si el tema no sincroniza, subir el archivo con `shopify theme push --only` previa confirmación
