# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que no hay archivos de contenido modificados

## 2. Sección como-pagar.liquid

- [x] 2.1 Crear `sections/como-pagar.liquid` con encabezado y cuadrícula de tarjetas; fondo de sección transparente salvo que se defina color
- [x] 2.2 Implementar los bloques Etiqueta, Título y Subtítulo con fuente (Poppins), colores, tamaños móvil/escritorio y espaciado propios
- [x] 2.3 Implementar el bloque Método de pago: ícono (integrado o imagen), insignia, título, descripción, línea divisoria y chips por coma, con colores, radio y tamaños propios
- [x] 2.4 Escribir el CSS en `{% stylesheet %}` con variables `--cp-*`: 1 columna en móvil, 2 desde 750px, N desde 990px, tarjetas de igual altura con chips abajo, sin overflow desde 320px
- [x] 2.5 Escribir el schema en español (nombres de bloque ≤ 25 caracteres): ajustes de sección (fondo, ancho máximo, columnas, espacios), los 4 tipos de bloque, `max_blocks: 20` y preset con la composición de la referencia (3 métodos)
- [x] 2.6 Validar que cada `range` tenga al menos 3 pasos y que los defaults caigan en un paso

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y corregir errores del archivo nuevo
- [x] 3.2 Prueba manual en el editor de temas: añadir la sección, añadir/reordenar/eliminar métodos, fondo transparente por defecto y con color, Poppins por defecto
- [x] 3.3 Probar responsive a 320, 375, 768, 990 y 1440px: sin scroll horizontal

## 4. Cierre

- [x] 4.1 Verificar con `git diff --name-only` que no hay archivos de contenido y que solo cambia `sections/como-pagar.liquid`
- [x] 4.2 Commit con conventional commits y push a `develop`; subir el archivo con `shopify theme push --only` si el tema no sincroniza, previa confirmación
