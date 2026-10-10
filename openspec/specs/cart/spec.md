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
