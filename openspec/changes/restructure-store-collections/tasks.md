# Tasks

> Este cambio modifica datos de la tienda, no código del theme. No hay secciones ni bloques nuevos, por lo que la verificación de bloques en el editor de temas no aplica.

## 1. Preparación

- [x] 1.1 `git pull origin develop` y verificar que el árbol queda sin conflictos (`git status`)
- [x] 1.2 Crear `openspec/changes/restructure-store-collections/data/collections.json` con las 56 entradas `{ "title", "parent" }` de la proposal (9 con `parent: null`, 47 con su principal); verificar con `jq length` = 56, `jq '[.[]|select(.parent==null)]|length'` = 9 y que no hay títulos duplicados
- [x] 1.3 Autenticar el CLI: `shopify store auth --store rosetta-ve.myshopify.com --scopes read_products,write_products,read_publications,write_publications` (interactivo, lo corre el usuario con `! ...`); verificar con una consulta `shopify store execute -s rosetta-ve.myshopify.com -q '{ shop { name } }'` que responde sin error

## 2. Inventario y respaldo

- [x] 2.1 Consultar todas las colecciones (`collections(first: 250)` con id, title, handle, description, ruleSet, image, seo, productsCount y ids de productos) y guardar el resultado en el scratchpad como `collections-backup.json`; verificar que el número de colecciones del archivo coincide con `collectionsCount`
- [x] 2.2 Registrar el total de productos de la tienda (`productsCount`) para la verificación final
- [x] 2.3 Identificar "Ofertas" y "Más vendidos" por título normalizado; si alguna no aparece exactamente, DETENERSE y preguntar al usuario cuál preservar (spec: "Colección preservada no identificable")

## 3. Crear colecciones nuevas

- [x] 3.1 Obtener el id de la publicación "Online Store" con `publications(first: 20)` y verificar que existe
- [x] 3.2 Script de shell que recorre `collections.json` y, para cada título: consulta si ya existe por título exacto; si no, ejecuta `collectionCreate` con `--allow-mutations` y luego `publishablePublish`; registrar en un log título → id/handle o error. Verificar que el log no tiene `userErrors`
- [x] 3.3 Reejecutar el script y verificar que no crea nada nuevo (idempotencia, spec "Reejecución sin duplicados")

## 4. Eliminar colecciones anteriores

- [x] 4.1 Calcular la lista de borrado: todas las colecciones menos las preservadas y las 56 de `collections.json`; mostrarla al usuario (título + handle + nº de productos) y esperar confirmación explícita
- [x] 4.2 Tras la confirmación, ejecutar `collectionDelete` por cada id de la lista; verificar que cada respuesta devuelve `deletedCollectionId` sin `userErrors`

## 5. Verificación integral

- [x] 5.0 Renombrar el handle `aceites-y-vinagres-1` a `aceites-y-vinagres` (con redirección) tras borrar la colección antigua; verificar con la API que el handle quedó en `aceites-y-vinagres`

- [x] 5.1 Consultar colecciones: exactamente 56 nuevas + "Ofertas" + "Más vendidos", sin duplicados; preservadas con el mismo id, handle y productsCount que en el respaldo
- [x] 5.2 Verificar que `productsCount` de la tienda es igual al registrado en 2.2
- [ ] 5.3 Abrir en el navegador `/collections/bebidas-sin-alcohol` y `/collections/panaderia-y-pasteleria` y verificar que cargan sin 404
- [x] 5.4 Reportar al usuario los handles borrados que estaban enlazados en `templates/index.json` (`panaderia`, `bebidas`, `cocinar`, `snacks`, `belleza-y-salud`, `ofertas-destacadas` si se borró) y en menús, para reasignarlos desde el editor de temas / Admin
- [x] 5.5 `shopify theme check` como control de que el theme no cambió (sin errores nuevos)

## 6. Entrega

- [x] 6.1 `git diff --name-only` y verificar que no aparecen archivos de contenido (templates/*.json, sections/*-group.json, config/settings_data.json); solo `openspec/`
- [x] 6.2 Commit (conventional commit) y push a `develop`; verificar con `git log origin/develop -1`

## Workflow follow-up

- Archivar el cambio con `/opsx:archive` una vez verificado.
- Cambio futuro sugerido: menú de navegación con la jerarquía de `collections.json` y asignación de productos (manual o smart collections por tag).
