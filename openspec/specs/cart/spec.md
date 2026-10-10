# cart Specification

## Purpose

Describe el carrito de compras del theme: cómo se agregan productos, cómo se revisa y edita el carrito, y el paso hacia el checkout.

## Requirements

### Requirement: Tipo de carrito configurable

El theme SHALL soportar tres experiencias de carrito seleccionables desde los ajustes: cajón lateral, página de carrito y notificación emergente. La tienda Rosetta usa el cajón lateral.

#### Scenario: Agregar al carrito con cajón

- **WHEN** el tipo de carrito es "cajón" y un visitante agrega un producto
- **THEN** el producto se agrega sin salir de la página, el contador del encabezado y el contenido del cajón se actualizan, y el cajón permanece cerrado

#### Scenario: Agregar al carrito con notificación

- **WHEN** el tipo de carrito es "notificación" y un visitante agrega un producto
- **THEN** aparece una notificación con el producto agregado y accesos al carrito y al checkout

### Requirement: Edición del carrito

El visitante SHALL poder cambiar cantidades y eliminar líneas tanto en el cajón como en la página de carrito, y los totales SHALL actualizarse sin recargar la página.

#### Scenario: Cambio de cantidad

- **WHEN** un visitante modifica la cantidad de una línea
- **THEN** el subtotal de la línea, el subtotal del carrito y el contador del encabezado se actualizan

#### Scenario: Cantidad no disponible

- **WHEN** la cantidad solicitada supera el inventario disponible
- **THEN** se muestra un mensaje de error en la línea y la cantidad se ajusta a un valor válido

#### Scenario: Carrito vacío

- **WHEN** el visitante elimina la última línea
- **THEN** se muestra el estado de carrito vacío con un enlace para seguir comprando

### Requirement: Página de carrito

La tienda SHALL ofrecer una página de carrito con el listado de artículos, subtotal, descuentos aplicados y botón para ir al checkout.

#### Scenario: Ir al checkout

- **WHEN** un visitante pulsa el botón de pagar desde el carrito
- **THEN** es llevado al checkout con los artículos del carrito

### Requirement: Script de traspaso de carrito

El layout SHALL cargar en todas las páginas, de forma diferida, el script externo de cart-handoff servido por `back.rosettamarketgroup.com`, que integra el carrito con el backend de Rosetta Market.

#### Scenario: Carga del script

- **WHEN** un visitante carga cualquier página de la tienda
- **THEN** el script de cart-handoff se solicita de forma diferida sin bloquear el renderizado

#### Scenario: Backend no disponible

- **WHEN** el script externo no puede cargarse
- **THEN** la navegación, el carrito nativo y el checkout de la tienda siguen funcionando

### Requirement: Apertura del cajón solo desde el encabezado

Con el tipo de carrito "cajón", el cajón SHALL abrirse únicamente cuando el visitante activa el ícono del carrito del encabezado. Ninguna acción de agregar o cambiar cantidades SHALL abrirlo, sea desde una tarjeta de producto, la ventana de selección de variantes, la página de producto o las tarjetas de ofertas.

#### Scenario: Agregar desde una tarjeta

- **WHEN** un visitante agrega un producto o cambia su cantidad desde una tarjeta de producto
- **THEN** el cajón permanece cerrado y el visitante sigue viendo el listado

#### Scenario: Agregar desde la página de producto

- **WHEN** un visitante pulsa el botón de agregar al carrito en la página de producto
- **THEN** el producto se agrega y el cajón permanece cerrado

#### Scenario: Agregar desde la selección de variantes

- **WHEN** un visitante elige una variante en la ventana de compra rápida y la agrega
- **THEN** la ventana se cierra, el producto se agrega y el cajón permanece cerrado

#### Scenario: Abrir el cajón desde el encabezado

- **WHEN** un visitante pulsa el ícono del carrito del encabezado después de agregar productos sin haber abierto el cajón
- **THEN** el cajón se abre mostrando todos los productos agregados con sus cantidades y el subtotal actualizados

#### Scenario: Carrito que queda vacío

- **WHEN** un visitante elimina desde las tarjetas el último producto del carrito y luego abre el cajón
- **THEN** el cajón muestra el estado de carrito vacío y el encabezado no muestra contador

### Requirement: Confirmación de agregado sin abrir el cajón

Cuando un producto se agrega al carrito sin que se abra el cajón, la tienda SHALL confirmar la acción en el propio control que la originó y SHALL actualizar el contador del carrito del encabezado.

#### Scenario: Confirmación en la página de producto

- **WHEN** un visitante agrega un producto desde la página de producto
- **THEN** el botón muestra por un momento el texto "Agregado" y luego vuelve a su texto habitual, y el contador del encabezado refleja la nueva cantidad

#### Scenario: Confirmación en la tarjeta

- **WHEN** un visitante agrega un producto desde una tarjeta con control de cantidad
- **THEN** la tarjeta muestra la cantidad agregada y el contador del encabezado refleja la nueva cantidad

#### Scenario: No se puede agregar

- **WHEN** el producto no puede agregarse por falta de inventario
- **THEN** el control muestra el mensaje de error o de agotado y no muestra la confirmación de agregado

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
