# Tasks

## 1. Fuente única de la URL de login

- [x] 1.1 Añadir en `config/settings_schema.json` un grupo de ajustes en español (p. ej. "Inicio de sesión") con el ajuste `login_url` de tipo `text`, `default` `https://admin.rosettamarketgroup.com/mi-cuenta/login` y un texto de ayuda; verificar que el grupo aparece en los ajustes del theme dentro del editor con el valor por defecto
- [x] 1.2 Crear `snippets/login-url.liquid` que emita `settings.login_url` o, si está vacío, la URL por defecto, sin espacios ni saltos de línea alrededor; verificar renderizándolo temporalmente en una página que la salida es exactamente la URL, y que vaciando el ajuste en el editor sigue emitiendo la URL por defecto
- [x] 1.3 Ejecutar `shopify theme check` y verificar que no hay errores nuevos en `config/settings_schema.json` ni en `snippets/login-url.liquid`

## 2. Encabezado: escritorio y móvil

- [x] 2.1 En `sections/header.liquid` (~línea 364) quitar la condición `shop.customer_accounts_enabled` y usar la URL del snippet en lugar de `routes.account_login_url`, conservando la rama `customer` → `routes.account_url`; verificar en escritorio, sin sesión, que el `href` del icono de cuenta es la URL del login propio y que al pulsarlo se abre en la misma pestaña
- [x] 2.2 En `snippets/header-drawer.liquid` (~línea 139) aplicar el mismo cambio al enlace de cuenta del cajón; verificar en un viewport móvil (<750px) que "Iniciar sesión" aparece en el cajón de menú y lleva al login propio
- [x] 2.3 Verificar con las cuentas de cliente nativas deshabilitadas en la tienda de desarrollo (o forzando la condición) que el icono de escritorio y el enlace del cajón móvil siguen visibles
- [x] 2.4 Ejecutar `shopify theme check` y verificar que no hay errores nuevos en `sections/header.liquid` ni en `snippets/header-drawer.liquid`

## 3. Carrito vacío

- [x] 3.1 En `snippets/cart-drawer.liquid` (~línea 49) quitar `shop.customer_accounts_enabled` de la condición (conservando `customer == null`) y pasar la URL del snippet como `link` a `sections.cart.login.paragraph_html`; verificar abriendo el cajón con el carrito vacío que "Inicia sesión" lleva al login propio
- [x] 3.2 En `sections/main-cart-items.liquid` (~línea 43) aplicar el mismo cambio; verificar en `/cart` con el carrito vacío que "Inicia sesión" lleva al login propio
- [x] 3.3 Ejecutar `shopify theme check` y verificar que no hay errores nuevos en ambos archivos

## 4. Verificación de integración

- [x] 4.1 Buscar en el theme `routes.account_login_url` y `account/login` y verificar que no queda ningún enlace de visitante al login nativo fuera de `sections/main-login.liquid`
- [x] 4.2 Prueba manual en el editor de temas: cambiar el ajuste `login_url` a una URL de prueba, guardar y verificar que encabezado, cajón móvil y carrito vacío (cajón y página) usan la nueva URL; restaurar el valor por defecto
- [x] 4.3 Ejecutar `shopify theme check` sobre el theme completo y verificar que el número de errores no aumenta respecto a la rama `develop`
- [x] 4.4 Hacer commit del cambio (código del theme y artefactos de OpenSpec) en `develop` y push a `origin/develop`; verificar con `git status -sb` que `develop` no está por delante de `origin/develop`
