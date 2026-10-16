# Design

## Context

`snippets/bs-price.liquid` se renderiza en `card-product`, `offer-product` y en la PDP (`templates/product.json` vía `custom_liquid`). Cada render emite un `<script>` que registra un listener de `DOMContentLoaded`. Ese enfoque falla con HTML inyectado por `innerHTML` (recomendaciones en `assets/global.js`, grilla de colecciones en `assets/facets.js`): los scripts no se ejecutan y el evento ya ocurrió.

Además, el script se repite por cada tarjeta, y en el objeto `config.apis[0].parse` se usa `this.config.tasaFallback` dentro de una arrow function, donde `this` no es el conversor (defecto latente; solo se evalúa si la API no trae `VED`/`VES`).

## Goals / Non-Goals

**Goals:**
- Que toda tarjeta con `.bcv-convertido` termine convertida, sin importar cuándo se inserte.
- Un único script y una única consulta de tasa por carga de página.
- Mantener el formato, las fuentes de tasa y los estados de error actuales.

**Non-Goals:**
- Cambiar las fuentes de tasa, el formato `≈ Bs` o el diseño de la tarjeta.
- Tocar el contenido del editor (`templates/*.json`).
- Reintentos de red o caché persistente entre páginas.

## Decisions

1. **Asset global `assets/bs-price.js` con `defer`, cargado desde `layout/theme.liquid`.** Alternativa descartada: re-ejecutar el script inline tras cada inyección (acopla cada punto de inyección) o escuchar eventos de `pubsub` (no cubre recomendaciones). El asset global resuelve todos los casos con un mecanismo.
2. **`MutationObserver` sobre `document.body` (`childList`, `subtree`)** que, ante nodos agregados, busca `.bcv-convertido` pendientes y los convierte. Se procesan solo los elementos aún no convertidos (marcados con un atributo `data-convertido`) para evitar reprocesar. Alternativa descartada: `setInterval` (desperdicia CPU).
3. **Tasa cacheada como promesa única** (`tasaPromesa`) para que varias tarjetas y varios lotes compartan una sola consulta; si falla, el error se mantiene para esa carga y los elementos muestran `Bs (error)`, como hoy.
4. **El snippet conserva el `<span class="bcv-convertido" data-precio>` con "Cargando..." y su `<style>`;** solo se elimina el `<script>`.
5. **Corregir el uso de `this` en `parse`** usando la constante de respaldo directamente.

## Risks / Trade-offs

- El observador corre en cada mutación del body: se acota filtrando nodos agregados y usando `querySelectorAll` solo sobre ellos.
- Si el asset no carga, las tarjetas quedarían en "Cargando..."; igual que hoy si fallara el script inline.
- Verificación necesaria en producción/dev: recomendaciones requieren productos disponibles (hoy el catálogo puede devolver recomendaciones vacías); se valida también con la grilla de colecciones al filtrar.
