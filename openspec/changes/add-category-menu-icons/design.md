# Design

## Context

- `snippets/header-categories-icon.liquid` se renderiza en el panel de escritorio (`header-categories-menu.liquid`) y en el cajón móvil (`header-drawer.liquid`, dos puntos: categorías con y sin hijos). Busca un bloque `category_icon` cuyo `link_title` coincida (vía `handleize`) con el título del enlace; si no hay, emite `<span class="categories-icon categories-icon--empty">` vacío.
- `.categories-icon` reserva `2.4rem × 2.4rem` (`flex: 0 0 2.4rem`) con `gap: 1.2rem` en el panel y `margin-right: 1.2rem` en el cajón. Ese es el hueco vacío visible hoy.
- El color actual es `var(--cat-accent, #f04ee0)` (rosa) y los SVG existentes (`icon-leaf.svg`, etc.) son de relleno, `viewBox 0 0 20 20`.
- `sections/header-group.json` no tiene bloques `category_icon`, y es contenido del editor: no se toca (spec `theme-content-protection`).

## Goals / Non-Goals

**Goals:**
- Iconos de línea negros por defecto para las 9 categorías, en escritorio y móvil, sin crear contenido en el editor.
- Reutilizar el hueco y espaciados existentes sin alterar el layout.

**Non-Goals:**
- Cambiar los iconos de las píldoras ("Categorías", "Ofertas"...) o de otras secciones.
- Iconos para subcategorías (segundo y tercer nivel).
- Hacer configurable el color del icono desde el editor.

## Decisions

### D1. Librería: Lucide (ISC)
Iconos 24×24, solo trazo (`fill="none"`, `stroke="currentColor"`), estilo coherente y licencia permisiva. Se copian los SVG al repo (sin CDN ni JS).
- Alternativas: Tabler Icons (MIT, también de línea, set similar; Lucide tiene `croissant`, `cigarette`, `soap-dispenser-droplet` con mejor encaje); Heroicons outline (no tiene iconos de comida/bebida).

Mapeo (asset → icono Lucide):

| Categoría (handle) | Asset | Lucide |
|---|---|---|
| `panaderia-y-pasteleria` | `icon-cat-bakery.svg` | `croissant` |
| `bebidas-sin-alcohol` | `icon-cat-soft-drinks.svg` | `cup-soda` |
| `cigarrillos-y-tabaco` | `icon-cat-tobacco.svg` | `cigarette` |
| `confiteria-y-snacks` | `icon-cat-candy.svg` | `candy` |
| `cuidado-personal` | `icon-cat-personal-care.svg` | `soap-dispenser-droplet` |
| `lacteos-y-refrigerados` | `icon-cat-dairy.svg` | `milk` |
| `licores-y-cervezas` | `icon-cat-beer.svg` | `beer` |
| `limpieza-y-hogar` | `icon-cat-cleaning.svg` | `spray-can` |
| `viveres-y-despensa` | `icon-cat-pantry.svg` | `shopping-basket` |

Se conserva el comentario de licencia de Lucide en cada SVG y se elimina `width/height` fijos para que escalen al contenedor. Se añade `class="icon icon-cat"`.

### D2. Mapa por defecto en código, bloques como sobrescritura
En `header-categories-icon.liquid`, si no hay bloque coincidente, se resuelve un icono por defecto con un `case` sobre `title | handleize`. Prioridad: `custom_icon` del bloque → `icon` del bloque → icono por defecto → vacío.
- Alternativa: crear 9 bloques `category_icon` en `header-group.json`. Rechazada: es contenido del editor y la regla del proyecto prohíbe modificarlo desde código.
- Comparar por handle hace la regla insensible a mayúsculas y tildes, igual que los bloques actuales. Si el comerciante renombra la categoría, pierde el icono por defecto y puede usar un bloque.

### D3. Color negro y trazo
`.categories-icon { color: var(--cat-icon-color, #000000); }` y `.categories-icon svg { stroke-width: 1.75; }` para un trazo fino acorde al peso de la tipografía. Se mantiene en hover/activo (no hay reglas que lo cambien). El override del bloque con imagen (`custom_icon`) no se recolorea.
- Alternativa: `--cat-text` (#1c1417). Rechazada porque el pedido es negro explícito; la variable `--cat-icon-color` deja la puerta abierta a ajustarlo sin tocar el componente.

### D4. Tamaño y espaciado sin cambios
Se mantiene `2.4rem` de contenedor y los gaps actuales. El SVG ocupa el 100% del contenedor (regla existente). En el cajón móvil el `summary` es flex: se verifica que el icono quede alineado verticalmente con el texto y no empuje la flecha.

### D5. Selector del bloque
Se añaden las 9 opciones (`cat-bakery`, `cat-soft-drinks`, ...) al `select` `icon` del bloque `category_icon` en `sections/header.liquid` con etiquetas en español, para que el comerciante pueda reasignarlos.

## Risks / Trade-offs

- [Los SVG de Lucide usan `stroke` y el CSS heredado `.icon` puede aplicar `fill`] → forzar `fill: none` en `.categories-icon svg` y `stroke: currentColor`.
- [Títulos con otro texto en el menú real no coinciden con el handle] → verificar los handles reales en el panel antes de cerrar; fallback por bloque.
- [Mezcla de estilos si el comerciante elige un icono de relleno antiguo en un bloque] → aceptado; es una decisión del comerciante.

## Migration Plan

Despliegue solo de código (sin contenido). Rollback: revertir el commit; sin bloques creados, las categorías vuelven al hueco vacío.
