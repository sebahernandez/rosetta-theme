# Proposal

## Why

La sección "Promotional Banner" (`sections/promotional-bar.liquid`) no tiene ningún ajuste de espaciado: el banner queda pegado a las secciones vecinas y su separación lateral depende únicamente de `.page-width`. En la portada se usa dos veces (entre colecciones destacadas) y hoy el comerciante no puede ajustar la separación sin tocar código, ni darle valores distintos en móvil y en escritorio.

## What Changes

- Se añaden a la sección ajustes de **margen** (superior e inferior) configurables por separado para **escritorio** y para **móvil**.
- Se añaden ajustes de **padding** (superior, inferior y lateral) configurables por separado para **escritorio** y para **móvil**.
- Los ajustes se agrupan en el editor de temas bajo dos encabezados: "Espaciado en escritorio" y "Espaciado en móvil".
- Los valores por defecto reproducen el aspecto actual (márgenes y padding vertical en 0; padding lateral igual al que hoy aporta `.page-width`), de modo que los banners ya publicados no cambian hasta que el comerciante mueva un ajuste.
- El espaciado se aplica por instancia de sección: cada banner de la página conserva sus propios valores.

Supuestos registrados (detalles menores, no consultados):

- "Móvil" es todo ancho menor de 750px y "escritorio" es 750px o más (el corte que usa el resto del theme para paddings de sección). Las tablets usan los valores de escritorio; no se añade un tercer nivel de espaciado para tablet.
- No se añaden márgenes laterales: el banner sigue centrado dentro del ancho de página y la separación lateral se controla con el padding lateral.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `home-page`: se añade un requirement sobre el espaciado configurable por dispositivo del banner promocional.

## Impact

- `sections/promotional-bar.liquid`: nuevos ajustes en el `{% schema %}` y CSS con alcance por sección.
- `templates/index.json`: sin cambios; las dos instancias existentes toman los valores por defecto.
- Sin nuevas dependencias, sin JavaScript y sin cambios en `locales/` (las etiquetas de esta sección están escritas en español directamente en el schema).
