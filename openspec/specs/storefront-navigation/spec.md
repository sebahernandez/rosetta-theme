# storefront-navigation Specification

## Purpose

Describe cómo los visitantes se orientan y se mueven por la tienda: encabezado, menús, búsqueda y pie de página.

## Requirements

### Requirement: Encabezado global

El encabezado SHALL mostrarse en todas las páginas con el logo, el menú principal, el acceso a búsqueda, el acceso a la cuenta de cliente y el icono del carrito con su contador. Opcionalmente SHALL mostrar una barra de anuncios sobre el encabezado.

#### Scenario: Visitante en cualquier página

- **WHEN** un visitante carga una página de la tienda
- **THEN** ve el logo, el menú, la búsqueda, el acceso a cuenta y el carrito en el encabezado

#### Scenario: Contador del carrito

- **WHEN** el carrito contiene productos
- **THEN** el icono del carrito muestra la cantidad de artículos

### Requirement: Logo diferenciado entre inicio y resto de páginas

El encabezado SHALL permitir configurar un logo (y su ancho) para la página de inicio y otro distinto para las demás páginas, tanto en escritorio como en móvil.

#### Scenario: Logo alternativo configurado

- **WHEN** el comerciante define un logo para "otras páginas" y un visitante navega a una página que no es el inicio
- **THEN** el encabezado muestra el logo alternativo

#### Scenario: Sin logo alternativo

- **WHEN** no hay logo alternativo configurado
- **THEN** el encabezado muestra el logo principal en todas las páginas

### Requirement: Menú adaptable

El menú principal SHALL ofrecer en escritorio los tipos desplegable, mega menú o cajón según la configuración de la sección, y en móvil SHALL presentarse como cajón lateral.

#### Scenario: Navegación en móvil

- **WHEN** un visitante en móvil toca el icono de menú
- **THEN** se abre un cajón con los enlaces del menú principal y sus submenús

### Requirement: Búsqueda con sugerencias predictivas

La tienda SHALL ofrecer búsqueda desde el encabezado y una página de resultados. Cuando la búsqueda predictiva está habilitada en los ajustes del theme, el campo de búsqueda SHALL mostrar sugerencias mientras el visitante escribe.

#### Scenario: Sugerencias al escribir

- **WHEN** la búsqueda predictiva está habilitada y el visitante escribe un término en el buscador
- **THEN** se muestran sugerencias de resultados sin abandonar la página

#### Scenario: Envío de la búsqueda

- **WHEN** el visitante envía el formulario de búsqueda
- **THEN** es llevado a la página de resultados con el término consultado

### Requirement: Pie de página global

El pie de página SHALL mostrarse en todas las páginas y SHALL poder incluir bloques de enlaces, imagen o marca, suscripción al boletín, redes sociales y medios de pago, configurables desde el editor de temas.

#### Scenario: Suscripción desde el pie

- **WHEN** un visitante ingresa su correo en el formulario de boletín del pie y lo envía
- **THEN** queda registrado como suscriptor y ve un mensaje de confirmación

### Requirement: Encabezado móvil en una fila

En móvil y tablet (menos de 990px) el encabezado SHALL mostrarse en una sola fila con, de izquierda a derecha, el icono de menú, el logo con su eslogan, el icono de búsqueda y el carrito como píldora destacada con el contador de artículos, incluido el valor 0. Los elementos SHALL tener un espaciado uniforme, SHALL NOT superponerse ni provocar desplazamiento horizontal de la página en anchos desde 320px, y los controles táctiles SHALL medir al menos 44px.

#### Scenario: Composición de la fila

- **WHEN** un visitante carga una página en un móvil
- **THEN** ve en una sola fila el icono de menú, el logo con eslogan, el icono de búsqueda y la píldora del carrito con su contador

#### Scenario: Carrito vacío en móvil

- **WHEN** el carrito no contiene productos y el visitante está en móvil
- **THEN** la píldora del carrito muestra el contador en 0

#### Scenario: Pantalla angosta

- **WHEN** el visitante usa una pantalla de 320px de ancho
- **THEN** el logo se reduce para ceder espacio, ningún elemento del encabezado se superpone a otro y la página no se desplaza horizontalmente

#### Scenario: Contador de varios dígitos

- **WHEN** el carrito contiene 10 o más artículos en móvil
- **THEN** la píldora crece lo necesario sin tapar el icono de búsqueda ni salirse de la pantalla

#### Scenario: Búsqueda en móvil

- **WHEN** el visitante toca el icono de búsqueda en móvil
- **THEN** se abre el buscador en modal con el mismo comportamiento previo

#### Scenario: Menú en móvil

- **WHEN** el visitante toca el icono de menú
- **THEN** se abre el cajón lateral con los enlaces del menú principal, igual que antes del cambio
