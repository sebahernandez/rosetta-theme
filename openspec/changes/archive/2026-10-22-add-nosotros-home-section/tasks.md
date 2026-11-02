# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que el árbol de trabajo está limpio salvo `.atl/`

## 2. Sección nosotros-home.liquid

- [x] 2.1 Crear `sections/nosotros-home.liquid` con la cuadrícula de dos columnas y el renderizado de bloques por columna (izquierda/derecha, columna vacía omitida)
- [x] 2.2 Implementar los bloques Insignia, Título (con acento) y Texto con colores, fuentes, tamaños móvil/escritorio y espaciado inferior propios
- [x] 2.3 Implementar el bloque Botón (primario/secundario, colores, flecha opcional, omitido sin texto o enlace) con botones consecutivos en la misma fila y ancho completo en móvil
- [x] 2.4 Implementar el bloque Imagen (`image_url`/`srcset`, proporción, radio, punto focal, marcador sin imagen) y el bloque Tarjeta flotante (ícono integrado o imagen propia, título, subtítulo, colores, posición y radio) superpuesto a la columna de la imagen
- [x] 2.5 Escribir el CSS en `{% stylesheet %}` con variables `--nh-*`: dos columnas desde 990px, una debajo, sin overflow horizontal desde 320px
- [x] 2.6 Escribir el schema en español: ajustes de sección (fondo, ancho máximo, proporción de columnas, espacios y rellenos móvil/escritorio), los 6 tipos de bloque, `max_blocks: 16` y preset con la composición de la referencia
- [x] 2.7 Validar que cada `range` del schema tenga al menos 3 pasos ((max − min) / step ≥ 3) y que los defaults caigan en un paso

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y corregir errores del archivo nuevo
- [ ] 3.2 Prueba manual con `shopify theme dev`: añadir la sección en la plantilla de inicio, añadir/reordenar/eliminar bloques, cambiar la columna de cada uno y comprobar que cada configuración afecta solo a su bloque
- [ ] 3.3 Probar responsive a 320, 375, 768, 990 y 1440px: sin scroll horizontal, botones apilados en móvil y tarjeta flotante dentro de la pantalla

## 4. Cierre

- [x] 4.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`) y que solo cambia `sections/nosotros-home.liquid`
- [ ] 4.2 Commit con conventional commits y push a `develop`; si el tema no sincroniza, subir el archivo con `shopify theme push --only` previa confirmación
