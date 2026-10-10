# Spec Delta

## ADDED Requirements

### Requirement: Estado vacío del cajón

Cuando el carrito no tiene productos, el cajón SHALL mostrar un estado vacío centrado con un ícono de carrito, el título "Tu carrito está vacío", una línea de apoyo y un botón principal "Seguir comprando" que lleva al catálogo. El botón SHALL verse como botón, con un alto táctil de al menos 44 px. A los visitantes sin sesión el cajón SHALL mostrarles además, como bloque secundario, una invitación a iniciar sesión.

#### Scenario: Abrir el cajón con el carrito vacío

- **WHEN** un visitante sin productos en el carrito pulsa el ícono del carrito del encabezado
- **THEN** el cajón muestra, centrados y en este orden, el ícono de carrito, el título "Tu carrito está vacío", la línea de apoyo y el botón "Seguir comprando", además del control para cerrar el cajón

#### Scenario: Botón principal

- **WHEN** un visitante ve el estado vacío del cajón
- **THEN** "Seguir comprando" aparece como un botón con forma de píldora, de al menos 44 px de alto y con el texto centrado, y al pulsarlo el visitante llega al listado de todos los productos

#### Scenario: Visitante sin sesión

- **WHEN** un visitante que no ha iniciado sesión abre el cajón vacío
- **THEN** debajo del botón principal, separado visualmente de él, aparece "¿Tienes una cuenta?" con un enlace legible "Inicia sesión" que lleva a la página de inicio de sesión de la tienda

#### Scenario: Cliente con sesión iniciada

- **WHEN** un cliente con sesión iniciada abre el cajón vacío
- **THEN** el cajón no muestra la invitación a iniciar sesión y el resto del estado vacío permanece centrado

#### Scenario: Vaciar el carrito con el cajón abierto

- **WHEN** un visitante elimina la última línea del carrito con el cajón abierto
- **THEN** el cajón pasa a mostrar el mismo estado vacío sin recargar la página y el foco queda en el botón "Seguir comprando"

#### Scenario: Navegación con teclado

- **WHEN** un visitante recorre el estado vacío con el tabulador
- **THEN** el control de cierre, el botón "Seguir comprando" y el enlace "Inicia sesión" reciben el foco con un indicador visible

#### Scenario: Pantalla de móvil

- **WHEN** un visitante abre el cajón vacío en una pantalla de 375 px de ancho
- **THEN** todo el contenido del estado vacío cabe sin desplazamiento horizontal y el botón ocupa el ancho del contenido
