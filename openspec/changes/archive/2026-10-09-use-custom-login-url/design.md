# Design

## Context

Ver `proposal.md` (Why) para la motivación. Estado observado en el theme:

| Punto | Archivo | Comportamiento actual |
| --- | --- | --- |
| Icono de cuenta (escritorio) | `sections/header.liquid:364-366` | Solo si `shop.customer_accounts_enabled`; `routes.account_login_url` sin sesión, `routes.account_url` con sesión |
| Enlace de cuenta (cajón móvil) | `snippets/header-drawer.liquid:139-141` | Igual que el anterior |
| Carrito vacío (cajón) | `snippets/cart-drawer.liquid:49-52` | Si `shop.customer_accounts_enabled and customer == null`, pasa `routes.account_login_url` a `sections.cart.login.paragraph_html` |
| Carrito vacío (página) | `sections/main-cart-items.liquid:43-46` | Igual que el anterior |

No hay más enlaces a login en el theme: el resto de coincidencias (`main-account`, `main-addresses`, `main-order`, `main-register`) son enlaces a cuenta, cierre de sesión o registro. La wishlist no requiere sesión. El icono de escritorio lleva `small-hide` cuando hay menú configurado, así que en móvil el único acceso es el del cajón: hay que cambiar ambos.

Restricciones: sin build step; el objeto `customer` solo existe con sesión nativa de Shopify, por lo que con el login propio será `null` en la práctica. La tienda (`rosetta-ve.myshopify.com`) usa las cuentas de cliente nuevas: Shopify responde a `/account/login` y `/account` con una redirección 302 a `shopify.com/<id>/account` antes de renderizar el theme, de modo que `templates/customers/login.json` y `sections/main-login.liquid` no se sirven a los visitantes.

## Goals / Non-Goals

**Goals:**

- Una sola fuente para la URL del login, consumida por todos los puntos de la tabla.
- Que ningún enlace del theme lleve al login nativo.
- Cambio mínimo sobre el código heredado de Refresh para facilitar futuras actualizaciones del theme base.

**Non-Goals:**

- Reflejar en el theme el estado de sesión del login propio (mostrar nombre, avatar o "Mi cuenta" según la sesión externa).
- Redirigir `/account/login`, registro, restablecimiento de contraseña, activación, cuenta, direcciones o pedido.
- Parámetro de retorno (`return_url`) hacia la página de origen tras iniciar sesión.
- Cambiar el login del checkout alojado por Shopify.

## Decisions

### 1. URL en un ajuste del theme, resuelta por un snippet

Se añade un ajuste de tipo `text` (`login_url`) en un grupo nuevo de `config/settings_schema.json`, con la URL del login propio como `default`, y un snippet `snippets/login-url.liquid` que emite `settings.login_url` o, si está vacío, la URL por defecto. Cada punto de uso captura el resultado del snippet (`capture` + `render`) y lo usa como `href`.

- Por qué `text` y no `url`: los ajustes `url` de Shopify no admiten un `default` arbitrario, y se necesita que el theme funcione sin configuración previa.
- Por qué un snippet y no leer `settings.login_url` directamente: centraliza el valor de respaldo cuando el comerciante vacía el campo, evitando enlaces con `href` vacío.
- Alternativa descartada, URL escrita a mano en cada archivo: cuatro o cinco copias que divergen en el siguiente cambio de dominio.
- El nombre y la etiqueta del grupo siguen la convención de ajustes propios en español (como el grupo "Wishlist" ya existente, sin claves de `locales/`).

### 2. Quitar la condición `shop.customer_accounts_enabled`, conservar la rama `customer`

Los accesos se muestran siempre. Como el login nativo no se usa, es esperable que el comerciante deshabilite las cuentas nativas, y con la condición actual el icono desaparecería. Se conserva `{% if customer %}` → `routes.account_url` en el encabezado y `customer == null` en el carrito: son inocuos mientras no haya sesión nativa y evitan enviar a iniciar sesión a alguien que ya la tiene.

- Alternativa descartada, eliminar también la rama `customer`: ahorra dos líneas pero rompe el caso residual de sesión nativa y aleja más el código del theme base.

### 3. No redirigir `/account/login` desde el theme

Se implementó y se retiró una redirección en el `<head>` de `layout/theme.liquid` condicionada a `request.page_type == 'customers/login'`. En la vista previa se comprobó que nunca se ejecuta: con las cuentas de cliente nuevas Shopify redirige la ruta en el servidor antes de cargar el theme. Mantenerla sería código muerto.

- Alternativa descartada, dejarla como respaldo por si la tienda vuelve a cuentas clásicas: no hay intención de usar el login nativo, y el código no se puede probar en la tienda actual.
- Alternativa fuera del theme: cambiar la tienda a cuentas clásicas o deshabilitar las cuentas en el admin de Shopify.

### 4. Sin cambios en `locales/`

`sections.cart.login.paragraph_html` ya recibe el enlace como parámetro `link` y `customer.log_in` es solo texto; basta con pasar la nueva URL.

## Risks / Trade-offs

- [Quien abre `/account/login` directamente, o inicia sesión desde el checkout, llega al login alojado por Shopify y no al propio] → No tiene solución desde el theme (ver decisión 3). Mitigación en el admin de Shopify: configuración de cuentas de cliente y de inicio de sesión en el checkout.
- [El visitante no vuelve a la página de origen tras iniciar sesión] → Fuera de alcance; ver Open Questions.
- [`admin.rosettamarketgroup.com` caído] → Los accesos llevan a una página de error externa; navegación, carrito y checkout como invitado siguen funcionando.
- [Con sesión externa activa el icono sigue llevando al login] → Se asume que el login propio redirige a "mi cuenta" cuando ya hay sesión.

## Migration Plan

1. Desplegar el theme en un tema de vista previa (`shopify theme dev` / `shopify theme push --unpublished`) y validar los escenarios de `specs/customer-login/spec.md`.
2. Publicar. No requiere tocar `config/settings_data.json`: el `default` del ajuste aplica mientras no se guarde otro valor.
3. Rollback: revertir el commit. No hay datos ni migraciones asociadas.

## Open Questions

- ¿El login propio acepta un parámetro de retorno para devolver al cliente a la página de la tienda donde estaba? Si existe, se añade en un cambio posterior en el snippet de la URL, sin tocar los puntos de uso.
- ¿El registro de clientes también pasa al sistema propio? El theme no muestra hoy ningún enlace de registro fuera de la página nativa de login, así que no hay nada que cambiar por ahora.
