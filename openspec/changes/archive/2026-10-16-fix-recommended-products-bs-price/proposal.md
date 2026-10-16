# Proposal

## Why

En la página de producto, las tarjetas de "También te puede gustar" muestran el precio en USD pero el equivalente en bolívares se queda indefinidamente en "Cargando...". Los visitantes no ven el precio referencial en Bs en esas tarjetas, a diferencia del resto de la tienda.

Causa (verificada en el código): `snippets/bs-price.liquid` incluye su propio `<script>` que convierte los precios solo una vez, en `DOMContentLoaded`, sobre los `.bcv-convertido` presentes en ese momento. Las recomendaciones se cargan después (`ProductRecommendations` en `assets/global.js` hace `fetch` y las inyecta con `innerHTML`): los `<script>` inyectados con `innerHTML` no se ejecutan y `DOMContentLoaded` ya pasó, por lo que esos elementos nunca se convierten. El mismo defecto afecta a cualquier tarjeta renderizada dinámicamente (p. ej. la grilla de colecciones al aplicar filtros u ordenar, que reemplaza `#ProductGridContainer` con `innerHTML`).

## What Changes

- Mover la lógica de conversión a un asset único (`assets/bs-price.js`) cargado una vez desde `layout/theme.liquid`, en lugar de repetir un `<script>` por cada tarjeta.
- El asset convierte los `.bcv-convertido` presentes al cargar y observa el DOM para convertir los que se agreguen después (recomendaciones, filtros/orden de colecciones, etc.).
- `snippets/bs-price.liquid` queda solo con el estilo y el `<span>` con `data-precio`.
- Se conserva el comportamiento actual: formato `≈ Bs <monto>`, dos fuentes de tasa con respaldo, tasa obtenida una sola vez por carga y estados de error.

## Capabilities

### New Capabilities

### Modified Capabilities
- `price-display`: se añade el requisito de que el equivalente en bolívares también se calcule en tarjetas insertadas después de la carga inicial de la página.

## Impact

- `snippets/bs-price.liquid` (se elimina el script inline).
- `assets/bs-price.js` (nuevo).
- `layout/theme.liquid` (carga del nuevo asset con `defer`).
- No se tocan archivos de contenido del editor (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`).
- Efecto colateral positivo: se elimina la ejecución duplicada del script (una por tarjeta) y las llamadas redundantes.
