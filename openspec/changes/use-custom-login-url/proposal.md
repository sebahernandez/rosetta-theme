# Proposal

## Why

Rosetta Market no usa el inicio de sesión nativo de Shopify: los clientes se autentican en un login propio alojado en `https://admin.rosettamarketgroup.com/mi-cuenta/login`. Hoy todos los accesos a "Iniciar sesión" del theme apuntan a la ruta nativa (`/account/login`), por lo que el visitante llega a un formulario que la tienda no utiliza.

## What Changes

- El acceso a cuenta del encabezado (icono en escritorio) lleva al login propio cuando el visitante no tiene sesión.
- El enlace "Iniciar sesión" del cajón de menú móvil lleva al login propio.
- El enlace "Inicia sesión" del estado de carrito vacío (cajón de carrito y página de carrito) lleva al login propio.
- Los accesos a inicio de sesión dejan de depender de que las cuentas de cliente nativas estén habilitadas en Shopify: se muestran siempre.
- La URL del login propio se define en un único lugar, editable desde los ajustes del theme, con `https://admin.rosettamarketgroup.com/mi-cuenta/login` como valor por defecto.

Fuera de alcance: las páginas nativas de inicio de sesión, registro, activación de cuenta, restablecimiento de contraseña, cuenta, direcciones y pedido no se modifican; tampoco el enlace de cierre de sesión ni el comportamiento del checkout alojado por Shopify. En particular, quien abra `/account/login` directamente sigue llegando al login de Shopify: la tienda usa las cuentas de cliente nuevas, que Shopify redirige a su página alojada antes de cargar el theme, por lo que el theme no puede intervenir.

## Capabilities

### New Capabilities

- `customer-login`: destino único de inicio de sesión de la tienda (login propio de Rosetta) y los puntos del storefront que llevan a él: encabezado, menú móvil y carrito vacío.

### Modified Capabilities

Ninguna.

## Impact

- Código del theme:
  - `sections/header.liquid` (enlace de cuenta, ~línea 364).
  - `snippets/header-drawer.liquid` (enlace de cuenta del cajón móvil, ~línea 139).
  - `snippets/cart-drawer.liquid` (invitación a iniciar sesión, ~línea 49).
  - `sections/main-cart-items.liquid` (invitación a iniciar sesión, ~línea 43).
  - `config/settings_schema.json` (nuevo ajuste con la URL del login) y un snippet nuevo que resuelve la URL.
- Sin cambios en `locales/`: los textos existentes (`customer.log_in`, `sections.cart.login.paragraph_html`) se reutilizan.
- Dependencia externa: disponibilidad de `admin.rosettamarketgroup.com`. Si el login propio no responde, el visitante no puede iniciar sesión desde el theme.
- Navegación: el visitante sale del dominio de la tienda hacia `admin.rosettamarketgroup.com` al iniciar sesión.
