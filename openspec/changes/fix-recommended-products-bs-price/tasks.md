# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que el árbol está limpio

## 2. Implementación

- [x] 2.1 Crear `assets/bs-price.js` con el conversor (mismas fuentes de tasa y formato `≈ Bs <monto>`), tasa compartida como promesa única, marca `data-convertido` y `MutationObserver` para elementos agregados después de la carga
- [x] 2.2 Corregir el uso de `this` en el `parse` de la primera fuente de tasa
- [x] 2.3 Quitar el `<script>` de `snippets/bs-price.liquid`, dejando el estilo y el `<span class="bcv-convertido">`
- [x] 2.4 Cargar `bs-price.js` con `defer` en `layout/theme.liquid`

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y confirmar que no hay ofensas nuevas en los archivos tocados
- [ ] 3.2 Probar en una página de producto que "También te puede gustar" muestra `≈ Bs <monto>` (producto con recomendaciones disponibles)
- [ ] 3.3 Probar en una colección que, al filtrar u ordenar, las tarjetas nuevas muestran `≈ Bs <monto>`
- [x] 3.4 Verificar que PDP, tarjetas de colección y ofertas siguen mostrando la conversión y que la tasa se consulta una sola vez
- [x] 3.5 Verificar con `git diff --name-only` que no hay archivos de contenido del editor (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)

## 4. Cierre

- [x] 4.1 Hacer commit (conventional commit) y push a `develop`
