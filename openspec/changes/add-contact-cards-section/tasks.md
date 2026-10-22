# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que el árbol de trabajo está limpio salvo `.atl/`

## 2. Bloque contact-card

- [x] 2.1 Crear `blocks/contact-card.liquid` con la tarjeta: ícono, título, valor, descripción y enlace, `block.shopify_attributes` y elementos vacíos omitidos
- [x] 2.2 Implementar íconos SVG integrados (whatsapp, correo, reloj, teléfono, ubicación, instagram, chat) con `currentColor` y la opción de imagen propia con prioridad
- [x] 2.3 Escribir el CSS de la tarjeta en `{% stylesheet %}` con variables `--cc-*` (colores por bloque; radio y relleno heredados de la sección), enlace al final de la tarjeta y `overflow-wrap: anywhere`
- [x] 2.4 Escribir el schema del bloque en español: elementos (ícono, título, valor, descripción, enlace) y colores de la tarjeta, con defaults de la referencia (los theme blocks no admiten `enabled_on`)

## 3. Sección contact-cards

- [x] 3.1 Crear `sections/contact-cards.liquid` con título opcional y cuadrícula que renderiza `{% content_for 'blocks' %}`
- [x] 3.2 Escribir el CSS de la cuadrícula: 1/2/3 columnas con breakpoints 750px y 990px configurables, tarjetas de igual altura y sin overflow desde 320px
- [x] 3.3 Escribir el schema en español: título (texto, color, tamaño, fuente), fondo, ancho máximo, columnas por dispositivo, espacios, radio, relleno de tarjeta y relleno de la sección por dispositivo, `blocks: [@theme]`, `max_blocks: 12` y preset con 3 tarjetas

## 4. Verificación

- [x] 4.1 Ejecutar `shopify theme check` y corregir errores de los archivos nuevos
- [ ] 4.2 Prueba manual con `shopify theme dev`: añadir la sección en la página de contacto, añadir/reordenar/eliminar tarjetas y comprobar que cada elemento y color se edita solo en su tarjeta
- [ ] 4.3 Verificar que el selector de enlace acepta `https://wa.me/...`, `mailto:` y `tel:`; si no, cambiarlo a un setting de texto
- [ ] 4.4 Probar responsive a 320, 375, 768, 990 y 1440px: sin scroll horizontal, igual altura por fila y correo largo sin desbordar

## 5. Cierre

- [x] 5.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`) y que solo cambian `sections/contact-cards.liquid` y `blocks/contact-card.liquid`
- [ ] 5.2 Commit con conventional commits y push a `develop`
