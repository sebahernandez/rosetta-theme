# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que no hay archivos de contenido modificados

## 2. Sección nuestro-compromiso.liquid

- [x] 2.1 Crear `sections/nuestro-compromiso.liquid` con el panel principal (texto + imagen a sangre) y la fila de tarjetas; fondo de sección transparente salvo que se defina color
- [x] 2.2 Implementar los bloques Etiqueta, Título (con acento) y Texto con fuente (Poppins), colores, tamaños móvil/escritorio y espaciado propios
- [x] 2.3 Implementar el bloque Ítem de lista (check circular con colores propios) y el bloque Botón (relleno/borde, flecha opcional, omitido sin texto o enlace)
- [x] 2.4 Implementar el bloque Imagen del panel (`image_url`/`srcset`, proporción móvil, punto focal, marcador sin imagen)
- [x] 2.5 Implementar el bloque Tarjeta de categoría (imagen de fondo, degradado, etiqueta, título, botón circular, enlace, radio y proporción)
- [x] 2.6 Escribir el CSS en `{% stylesheet %}` con variables `--nc-*`: panel en dos columnas desde 990px, tarjetas por columnas configurables, una columna en móvil, sin overflow desde 320px
- [x] 2.7 Escribir el schema en español (nombres de bloque ≤ 25 caracteres): ajustes de sección (fondo, ancho máximo, fondo y radio del panel, columnas de tarjetas, espacios), los 7 tipos de bloque, `max_blocks: 24` y preset con la composición de la referencia
- [x] 2.8 Validar que cada `range` tenga al menos 3 pasos y que los defaults caigan en un paso

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y corregir errores del archivo nuevo
- [x] 3.2 Prueba manual en el editor de temas: añadir la sección, añadir/reordenar/eliminar bloques, fondo transparente por defecto y con color, Poppins por defecto
- [x] 3.3 Probar responsive a 320, 375, 768, 990 y 1440px: sin scroll horizontal

## 4. Cierre

- [x] 4.1 Verificar con `git diff --name-only` que no hay archivos de contenido y que solo cambia `sections/nuestro-compromiso.liquid`
- [x] 4.2 Commit con conventional commits y push a `develop`; subir el archivo con `shopify theme push --only` si el tema no sincroniza, previa confirmación
