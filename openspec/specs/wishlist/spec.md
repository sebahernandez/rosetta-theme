# wishlist Specification

## Purpose

Define el estado de los favoritos en Rosetta. La lista de favoritos basada en el navegador del visitante fue retirada porque no entregaba métricas a la tienda; mientras no exista una nueva solución, la tienda no ofrece favoritos. El comportamiento y la implementación de la solución anterior están documentados en `reimplementacion.md`, en esta misma carpeta, por si se retoma.

## Requirements

### Requirement: Activación desde los ajustes del theme

La funcionalidad de favoritos SHALL poder activarse o desactivarse con el ajuste "Enable Wishlist" del theme.

#### Scenario: Favoritos desactivados

- **WHEN** el ajuste "Enable Wishlist" está desactivado
- **THEN** las tarjetas de producto y de oferta no muestran el botón de favoritos

### Requirement: Agregar y quitar favoritos

Las tarjetas de producto y de oferta SHALL mostrar un botón de favoritos que alterna el producto dentro y fuera de la lista, reflejando visualmente su estado.

#### Scenario: Agregar un producto

- **WHEN** un visitante pulsa el botón de favoritos de un producto que no está en su lista
- **THEN** el producto se agrega a la lista y el botón pasa al estado activo

#### Scenario: Quitar un producto

- **WHEN** un visitante pulsa el botón de favoritos de un producto que ya está en su lista
- **THEN** el producto se elimina de la lista y el botón vuelve al estado inactivo

#### Scenario: Mismo producto en varias tarjetas

- **WHEN** un producto aparece en más de una tarjeta de la página y se cambia su estado desde una de ellas
- **THEN** todos los botones de ese producto reflejan el nuevo estado

#### Scenario: Sin duplicados

- **WHEN** se intenta agregar un producto que ya está en la lista
- **THEN** la lista no cambia

### Requirement: Persistencia en el navegador

La lista de favoritos SHALL guardarse en el almacenamiento local del navegador del visitante, sin requerir cuenta de cliente, y SHALL conservarse entre páginas y visitas en el mismo navegador.

#### Scenario: Visitante regresa a la tienda

- **WHEN** un visitante con favoritos guardados vuelve a la tienda en el mismo navegador
- **THEN** los botones de sus productos favoritos aparecen en estado activo

#### Scenario: Datos inválidos guardados

- **WHEN** la lista guardada contiene entradas inválidas o no puede leerse
- **THEN** las entradas inválidas se descartan y la tienda sigue funcionando con una lista válida

### Requirement: Página de favoritos

La tienda SHALL ofrecer una página de favoritos en `/pages/favoritos` (plantilla de página `wishlist`) que muestra los productos guardados como tarjetas de producto actualizadas desde la tienda.

#### Scenario: Lista con productos

- **WHEN** un visitante con favoritos abre la página de favoritos
- **THEN** ve una tarjeta por cada producto guardado, con su información y precio actuales

#### Scenario: Quitar desde la página de favoritos

- **WHEN** un visitante quita un producto desde la página de favoritos
- **THEN** el producto deja de estar en su lista

### Requirement: Botón flotante de acceso con contador

Cuando el ajuste "Enable Floating Button" está activo, todas las páginas SHALL mostrar un botón flotante que enlaza a la página de favoritos, ubicado en la posición configurada (medio izquierda, medio derecha, abajo izquierda, abajo centro o abajo derecha), con un contador de productos guardados.

#### Scenario: Contador actualizado

- **WHEN** un visitante agrega o quita un favorito
- **THEN** el contador del botón flotante se actualiza de inmediato

#### Scenario: Lista vacía

- **WHEN** la lista de favoritos está vacía
- **THEN** el contador no se muestra

#### Scenario: Botón flotante desactivado

- **WHEN** el ajuste "Enable Floating Button" está desactivado
- **THEN** el botón flotante no se muestra en ninguna página
