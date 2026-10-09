# Spec Delta

## Purpose

Define dónde inician sesión los clientes de Rosetta Market: un login propio fuera de Shopify, y qué puntos de la tienda llevan a él.

## ADDED Requirements

### Requirement: Destino único de inicio de sesión

Todos los enlaces de inicio de sesión que muestra la tienda SHALL llevar al login propio de Rosetta Market, cuya dirección por defecto es `https://admin.rosettamarketgroup.com/mi-cuenta/login`, y SHALL abrirse en la misma pestaña. Ningún enlace de la tienda SHALL llevar al inicio de sesión nativo de Shopify.

#### Scenario: Visitante pulsa cualquier acceso de inicio de sesión

- **WHEN** un visitante sin sesión pulsa un acceso de inicio de sesión en cualquier parte de la tienda
- **THEN** es llevado a `https://admin.rosettamarketgroup.com/mi-cuenta/login` en la misma pestaña

### Requirement: Dirección del login configurable

El comerciante SHALL poder cambiar la dirección del login propio desde los ajustes del theme, y el cambio SHALL aplicarse a todos los accesos de inicio de sesión a la vez. Si el ajuste queda vacío, la tienda SHALL usar la dirección por defecto.

#### Scenario: Comerciante cambia la dirección

- **WHEN** el comerciante guarda una nueva dirección de login en los ajustes del theme
- **THEN** el encabezado, el menú móvil y el carrito vacío llevan a la nueva dirección

#### Scenario: Ajuste vacío

- **WHEN** el comerciante deja vacía la dirección de login
- **THEN** los accesos de inicio de sesión llevan a `https://admin.rosettamarketgroup.com/mi-cuenta/login`

### Requirement: Acceso a cuenta en el encabezado de escritorio

El encabezado en escritorio SHALL mostrar siempre el icono de cuenta, sin depender de que las cuentas de cliente nativas de Shopify estén habilitadas, y para un visitante sin sesión el icono SHALL llevar al login propio.

#### Scenario: Visitante sin sesión en escritorio

- **WHEN** un visitante sin sesión pulsa el icono de cuenta del encabezado en escritorio
- **THEN** es llevado al login propio

#### Scenario: Cuentas nativas deshabilitadas

- **WHEN** las cuentas de cliente nativas están deshabilitadas en Shopify y un visitante carga una página
- **THEN** el icono de cuenta sigue visible en el encabezado y lleva al login propio

### Requirement: Acceso a cuenta en el menú móvil

El cajón de menú en móvil SHALL mostrar siempre el enlace "Iniciar sesión", sin depender de que las cuentas de cliente nativas estén habilitadas, y para un visitante sin sesión el enlace SHALL llevar al login propio.

#### Scenario: Visitante sin sesión en móvil

- **WHEN** un visitante sin sesión abre el cajón de menú en móvil y pulsa "Iniciar sesión"
- **THEN** es llevado al login propio

### Requirement: Invitación a iniciar sesión en el carrito vacío

Cuando el carrito está vacío y el visitante no tiene sesión, el cajón de carrito y la página de carrito SHALL mostrar una invitación a iniciar sesión cuyo enlace lleva al login propio.

#### Scenario: Carrito vacío en el cajón

- **WHEN** un visitante sin sesión abre el cajón de carrito sin productos y pulsa "Inicia sesión"
- **THEN** es llevado al login propio

#### Scenario: Carrito vacío en la página de carrito

- **WHEN** un visitante sin sesión abre la página de carrito sin productos y pulsa "Inicia sesión"
- **THEN** es llevado al login propio
