# cart Specification

## Purpose

Describe el carrito de compras del theme: cómo se agregan productos, cómo se revisa y edita el carrito, y el paso hacia el checkout.

## Requirements

### Requirement: Tipo de carrito configurable

El theme SHALL soportar tres experiencias de carrito seleccionables desde los ajustes: cajón lateral, página de carrito y notificación emergente. La tienda Rosetta usa el cajón lateral.

#### Scenario: Agregar al carrito con cajón

- **WHEN** el tipo de carrito es "cajón" y un visitante agrega un producto
- **THEN** se abre el cajón del carrito mostrando el producto agregado sin salir de la página

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
