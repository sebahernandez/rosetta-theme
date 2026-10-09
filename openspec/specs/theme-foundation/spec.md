# theme-foundation Specification

## Purpose

Define la base técnica del theme Rosetta: un theme de Shopify Online Store 2.0 derivado de Refresh 15.2.0, su estructura de archivos, el layout global, la configuración editable desde el editor de temas y las convenciones que debe respetar cualquier cambio.

## Requirements

### Requirement: Estructura de theme Online Store 2.0

El theme SHALL mantener la estructura estándar de Shopify (`layout/`, `templates/`, `sections/`, `snippets/`, `assets/`, `config/`, `locales/`) y SHALL poder subirse a una tienda sin paso de compilación.

#### Scenario: Despliegue directo con Shopify CLI

- **WHEN** se ejecuta `shopify theme dev` o `shopify theme push` sobre la raíz del repositorio
- **THEN** el theme se sirve o se sube sin necesidad de instalar dependencias ni generar archivos

#### Scenario: Plantillas componibles desde el editor

- **WHEN** un comerciante abre una plantilla JSON (por ejemplo inicio, producto o colección) en el editor de temas
- **THEN** puede agregar, quitar y reordenar secciones sin editar código

### Requirement: Layout global

El layout `theme.liquid` SHALL envolver todas las páginas de la tienda con el grupo de secciones del encabezado, el contenido principal y el grupo de secciones del pie de página, e SHALL incluir un enlace de "saltar al contenido" como primer elemento enfocable.

#### Scenario: Página renderizada con encabezado y pie

- **WHEN** un visitante carga cualquier página que usa el layout principal
- **THEN** ve el encabezado, el contenido de la plantilla dentro de `<main id="MainContent">` y el pie de página

#### Scenario: Navegación por teclado

- **WHEN** un visitante presiona Tab al cargar la página
- **THEN** el primer elemento enfocado es el enlace para saltar al contenido principal

### Requirement: Apariencia configurable por ajustes del theme

Los colores (esquemas de color), tipografías, ancho de página, botones, tarjetas, medios, insignias y demás estilos globales SHALL derivarse de los ajustes de `config/settings_schema.json` y exponerse como variables CSS, de modo que el comerciante pueda cambiarlos sin tocar código.

#### Scenario: Cambio de esquema de color

- **WHEN** el comerciante modifica un esquema de color en los ajustes del theme
- **THEN** todas las secciones que usan ese esquema reflejan los nuevos colores

#### Scenario: Animaciones opcionales

- **WHEN** el ajuste de animaciones al hacer scroll está desactivado
- **THEN** el theme no carga el script de animaciones

### Requirement: Internacionalización de textos heredados

Los textos de interfaz heredados del theme base SHALL resolverse mediante los archivos de `locales/`, con inglés como idioma por defecto y español disponible, y el atributo `lang` del documento SHALL corresponder al idioma activo de la tienda.

#### Scenario: Tienda en español

- **WHEN** la tienda se muestra con el idioma español activo
- **THEN** los textos de interfaz estándar (carrito, cuentas, búsqueda, accesibilidad) aparecen en español y el documento declara `lang="es"`

### Requirement: Plantillas estándar de cuentas de cliente

El theme SHALL ofrecer las plantillas clásicas de cuentas de cliente: inicio de sesión, registro, activación de cuenta, restablecimiento de contraseña, cuenta, direcciones y detalle de pedido.

#### Scenario: Cliente consulta un pedido

- **WHEN** un cliente autenticado abre un pedido desde su cuenta
- **THEN** ve el detalle del pedido con sus líneas, totales y direcciones

### Requirement: Sin dependencias de compilación

El JavaScript y CSS del theme SHALL entregarse como archivos estáticos en `assets/`, escritos en JavaScript vanilla y CSS, sin frameworks ni empaquetadores. La única librería de terceros incluida en el repositorio es Splide para sliders.

#### Scenario: Nueva funcionalidad con script propio

- **WHEN** se añade una funcionalidad que requiere JavaScript
- **THEN** el script se agrega como archivo en `assets/` y se carga con `asset_url`, sin introducir un paso de build
