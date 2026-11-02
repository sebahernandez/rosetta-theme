# Design

## Context

- Tienda: `rosetta-ve.myshopify.com`. Shopify CLI 4.9.4 ofrece `shopify store execute` (Admin GraphQL) y `shopify store auth`.
- Hoy no hay autenticación de store guardada: `shopify store execute` responde "No stored app authentication found". Hay que correr `shopify store auth --store rosetta-ve.myshopify.com --scopes read_products,write_products` (abre el navegador).
- `store execute` exige `--allow-mutations` para mutaciones y acepta `--query-file` / `--variable-file`, así que cada operación se lanza una vez por colección desde un pequeño script de shell.
- Las colecciones de Shopify son planas (no hay padre/hijo nativo).
- El theme enlaza colecciones por handle desde contenido del editor (`templates/index.json`: `panaderia`, `bebidas`, `cocinar`, `snacks`, `belleza-y-salud`, `ofertas-destacadas`). Ese archivo es contenido protegido (`theme-content-protection`) y no se toca en este cambio.

## Goals / Non-Goals

**Goals:**
- Reemplazo completo, auditable y reejecutable de las colecciones usando solo Shopify CLI.
- Cero pérdida de productos y respaldo recuperable de lo borrado.

**Non-Goals:**
- Asignar productos a las colecciones nuevas.
- Crear/editar menús de navegación o reparar enlaces del editor de temas.
- Cambios de código del theme.

## Decisions

1. **Fuente de verdad en un archivo de datos** — `openspec/changes/restructure-store-collections/data/collections.json`: lista de `{ title, parent }` (parent `null` para principales). Sirve para crear las colecciones y, más adelante, para el menú. *Alternativa*: títulos hardcodeados en el script → descartada, no deja registro de la jerarquía.
2. **Colecciones manuales (custom), sin reglas** — `collectionCreate(input: { title })`. *Alternativa*: smart collections por tag/tipo de producto → requiere una convención de tags que hoy no existe; queda para un cambio futuro.
3. **Handles generados por Shopify a partir del título** (sin acentos ni comas, p. ej. `jugos-nectares-y-te-frio`, `lacteos-y-refrigerados`). No se fijan a mano para evitar errores de transliteración.
4. **Orden: respaldo → crear → eliminar.** Crear antes de eliminar evita una ventana con la tienda sin categorías y permite abortar si la creación falla.
5. **Lista de borrado explícita y confirmada** — se consulta `collections(first: 250)`, se excluyen las preservadas (título normalizado sin acentos/mayúsculas: "ofertas", "mas vendidos") y las 56 nuevas; la lista resultante se muestra al usuario y se borra solo tras su "sí". Si "Ofertas" o "Más vendidos" no aparecen con ese título exacto, se detiene y se pregunta.
6. **Idempotencia** — antes de crear, se consulta si ya existe una colección con ese título exacto (`collections(query: "title:'...'")`); si existe, se omite.
7. **Publicación** — tras crear, `publishablePublish` en la publicación "Online Store" (id obtenido con `publications(first: 20)`), lo que requiere además el scope `write_publications`/`read_publications`.
8. **Archivos temporales** — respaldo, logs y script viven en el scratchpad / `data/` del cambio; nada se agrega a carpetas del theme.

## Risks / Trade-offs

- [Borrado irreversible de colecciones y sus reglas/imágenes/SEO] → respaldo JSON completo (incluye `ruleSet`, `image.url`, `seo`, ids de productos) + confirmación explícita de la lista.
- [Enlaces rotos en la home y menús que apuntan a handles borrados] → se listan en el reporte final para reasignarlos desde el editor de temas / Admin.
- ["Ofertas" real podría ser `ofertas-destacadas` con otro título] → la regla de preservación detiene el proceso si no hay coincidencia exacta; el usuario decide.
- [Rate limit de Admin API con ~60 mutaciones] → ejecución secuencial; volumen muy por debajo del límite.
- [Colisión de handle con una colección vieja aún no borrada (p. ej. si existe "Gaseosas")] → idempotencia por título la reutiliza en lugar de crear `gaseosas-1`, y esa colección queda excluida del borrado.

## Migration Plan

1. Autenticar CLI con scopes `read_products,write_products,read_publications,write_publications`.
2. Respaldo de todas las colecciones.
3. Crear y publicar las 56 colecciones (idempotente).
4. Mostrar lista de borrado, confirmar, eliminar con `collectionDelete`.
5. Verificar conteos.

**Rollback**: recrear las colecciones borradas desde el respaldo (`collectionCreate` con título, handle, descripción, `ruleSet` o `products`). Los ids originales no se recuperan; los handles sí si no están ocupados.
