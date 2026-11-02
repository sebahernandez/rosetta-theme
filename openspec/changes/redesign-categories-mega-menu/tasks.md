# Tasks

## 1. Preparación

- [x] 1.1 `git pull origin develop` y verificar con `git status` que no hay conflictos

## 2. Schema y bloques del encabezado

- [x] 2.1 En `sections/header.liquid`, añadir la opción `categories` a `menu_type_desktop` y los settings `categories_*` (colores y alto máximo) con sus defaults de Rosetta; verificar con `shopify theme check` sin errores nuevos
- [ ] 2.2 Añadir los bloques `categories_button` (máx. 1), `pill_button` (máx. 4) y `category_icon` (máx. 30) junto al bloque `@app`, con `max_blocks` 40; verificar que el editor de temas los ofrece al elegir el tipo "Categorías"
- [x] 2.3 Añadir textos "Categorías" y "Mostrar todo" a `locales/es.json` y `locales/en.default.json` (y labels de schema según el patrón del archivo); verificar con `shopify theme check` que no faltan traducciones

## 3. Panel de categorías en escritorio

- [ ] 3.1 Crear `snippets/header-categories-menu.liquid`: botón Categorías, píldoras de bloques, columna de categorías con icono (bloque `category_icon` por `handleize`) y chevron, y un panel por categoría con título, "Mostrar todo", columnas de subenlaces y tercer nivel con su "Mostrar todo"; sin contenido hardcodeado. Verificar en `shopify theme dev` que todas las categorías y subenlaces del menú aparecen con sus destinos
- [ ] 3.2 Renderizar el snippet en `.header__nav-row` cuando `menu_type_desktop == 'categories'` y cargar el CSS/JS solo en ese caso; verificar que los tipos dropdown, mega y drawer siguen funcionando igual
- [ ] 3.3 Crear `assets/categories-menu.js` (custom element `categories-menu`): abrir/cerrar, cambio de categoría por hover/foco con retardo, flechas, Escape, clic fuera, retorno de foco, `aria-expanded` y `preventHide` del sticky header; verificar manualmente cada escenario del requisito "Panel de categorías en escritorio" y "Accesibilidad del menú de categorías"
- [ ] 3.4 Crear `assets/component-categories-menu.css` con variables `--cat-*`, píldoras de 44px, grid del panel, resaltado activo y scroll interno; verificar a 990, 1280 y 1440px que coincide con la imagen de referencia usando la paleta de Rosetta

## 4. Cajón móvil

- [ ] 4.1 En `snippets/header-drawer.liquid`, cuando el tipo es `categories`: icono de categoría en primer nivel, "Mostrar todo" al inicio de cada submenú y píldoras de bloques bajo la lista; verificar que los otros tipos no cambian
- [ ] 4.2 Estilos del cajón con las variables `--cat-*` en `assets/component-menu-drawer.css` (o el CSS nuevo); verificar a 320, 375 y 768px: navegación por niveles, botón volver, sin desplazamiento horizontal, objetivos de 44px

## 5. Verificación integral

- [ ] 5.1 En el editor de temas: activar "Categorías", añadir, reordenar, eliminar y configurar bloques `categories_button`, `pill_button` (Ofertas → `/collections/ofertas`) y `category_icon`; verificar que cada cambio se refleja en vista previa
- [ ] 5.2 `shopify theme check` sin errores nuevos respecto a la línea base (29 errores existentes)
- [ ] 5.3 Prueba manual con teclado y lector de pantalla (VoiceOver) del panel y del cajón

## 6. Entrega

- [ ] 6.1 `git diff --name-only` y verificar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)
- [ ] 6.2 `shopify theme push --only` con los archivos de código modificados (si GitHub sync no los toma), activar el tipo y los bloques en el editor, guardar y `git pull origin develop`
- [ ] 6.3 Commit (conventional commit) y push a `develop`; verificar con `git log origin/develop -1`

## Workflow follow-up

- Archivar el cambio con `/opsx:archive` tras la verificación.
