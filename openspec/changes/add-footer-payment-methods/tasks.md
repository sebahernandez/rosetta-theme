## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar árbol limpio
- [x] 1.2 Medir dimensiones intrínsecas de los tres AVIF de respaldo (descarga a un directorio temporal) para fijar `width`/`height`

## 2. Schema

- [x] 2.1 En `sections/footer.liquid` añadir al `{% schema %}` el `header` "Medios de pago bajo el logo" y los ajustes `medios_pago_mostrar` (checkbox, true), `medios_pago_pago_movil`, `medios_pago_zelle`, `medios_pago_stripe` (image_picker), `medios_pago_tamano` (range 20–80, paso 2, default 40) y `medios_pago_separacion` (range 0–32, paso 2, default 12)

## 3. Render

- [x] 3.1 Usar `medios_pago_renderizados` (sin declaración previa; nil != true) para renderizar una sola vez
- [x] 3.2 En la rama `when 'image'`, tras el wrapper del logo, renderizar la fila solo si `medios_pago_mostrar` y no se ha renderizado antes, con respaldo CDN por medio, `alt`, `loading="lazy"`, `width`/`height` y alto 2x para imágenes elegidas
- [x] 3.3 Inyectar `--medios-pago-alto` y `--medios-pago-gap` en el `{% style %}` del footer

## 4. Estilos

- [x] 4.1 Añadir en `assets/section-footer.css` las clases `.footer-payment-methods` e `img` (flex-wrap, gap, alto fijo, ancho auto, sin overflow, centrado en <750 px)

## 5. Verificación

- [x] 5.1 Ejecutar `shopify theme check` y corregir errores nuevos en los archivos tocados
- [ ] 5.2 Prueba manual en `shopify theme dev`: las 3 imágenes aparecen bajo el logo; reemplazo individual; eliminar imagen vuelve al respaldo; desactivar checkbox no deja espacio; ajustes de tamaño y separación; sin scroll horizontal en 320 px, tablet y escritorio; no hay duplicados
- [x] 5.3 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)

## 6. Cierre

- [x] 6.1 Commit convencional y push a `develop`
