# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y verificar que el árbol está limpio con `git status`

## 2. Sección y bloques

- [ ] 2.1 Crear `sections/seleccionado.liquid` con schema (ajustes de color, margen y relleno; bloques `eyebrow`, `heading`, `subtitle`, `collection`, `product`) y verificar que aparece en el editor de temas
- [ ] 2.2 Renderizar el encabezado y las tarjetas agrupando cada `product` bajo la `collection` anterior; verificar con 2 tarjetas de 3 productos y con 0 bloques (sin errores)
- [ ] 2.3 Estilos: grilla de 2 columnas en escritorio y 1 en móvil, tarjetas con imagen superior, filas de producto con miniatura, nombre, precio y botón circular; verificar a 375 px y 1440 px
- [ ] 2.4 Manejar casos límite: imagen ausente (placeholder), producto sin seleccionar (no se muestra) y producto agotado (botón deshabilitado)

## 3. Agregar al carrito

- [ ] 3.1 Crear `assets/seleccionado.js` con el custom element `seleccionado-add` (POST a `cart/add.js`, actualiza `cart-drawer` y `cart-icon-bubble`, publica `cartUpdate`, no llama a `open()`); verificar que el cajón no se abre y el contador sube
- [ ] 3.2 Bloquear clics durante la solicitud y mostrar el error del inventario en una región `aria-live`; verificar agregando más unidades que el stock y con doble clic rápido
- [ ] 3.3 Cargar el script desde la sección con `defer` y verificar que no hay errores en consola

## 4. Verificación y cierre

- [x] 4.1 Ejecutar `shopify theme check` y verificar que no hay errores nuevos
- [ ] 4.2 Probar en el editor de temas: añadir, reordenar y eliminar bloques y cambiar textos, imágenes y colores
- [x] 4.3 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)
- [ ] 4.4 Commit (conventional commits) y push a `develop`
