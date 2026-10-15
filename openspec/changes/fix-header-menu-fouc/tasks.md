## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop`
- [ ] 1.2 Reproducir el problema con `shopify theme dev` y throttling "Slow 3G" en DevTools; confirmar que el azul/estiramiento desaparece al bloquear los CSS (valida la hipótesis del diseño)

## 2. Implementación

- [x] 2.1 En `sections/header.liquid`, cargar sin `media="print"` `component-list-menu.css`, `component-search.css` y `component-mega-menu.css` (manteniendo la condición del mega menú)
- [x] 2.2 Mantener diferidos `component-menu-drawer.css`, `component-cart-notification.css` y `component-price.css`, añadiendo `<noscript>` de respaldo
- [ ] 2.3 Si persiste un salto de layout, reservar altura mínima del header (en `sections/header.liquid` o `assets/component-header-redesign.css`)

## 3. Verificación

- [ ] 3.1 Probar carga inicial y navegación entre inicio, colección y producto en escritorio y móvil con Slow 3G: sin enlaces azules ni header estirado
- [ ] 3.2 Probar menú móvil (drawer), buscador predictivo y notificación de carrito siguen funcionando
- [x] 3.3 Ejecutar `shopify theme check` sin errores nuevos
- [ ] 3.4 Probar en el editor de temas

## 4. Cierre

- [x] 4.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)
- [ ] 4.2 Commit (conventional commits) y push a `develop`
