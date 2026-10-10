# wishlist Specification

## Purpose

Define el estado de los favoritos en Rosetta. La lista de favoritos basada en el navegador del visitante fue retirada porque no entregaba métricas a la tienda; mientras no exista una nueva solución, la tienda no ofrece favoritos. El comportamiento y la implementación de la solución anterior están documentados en `reimplementacion.md`, en esta misma carpeta, por si se retoma.

## Requirements

### Requirement: Favoritos no disponibles en la tienda

La tienda SHALL NOT ofrecer ninguna funcionalidad de favoritos mientras no exista una solución que registre métricas: no SHALL mostrarse botones de favoritos, accesos a una lista de favoritos ni ajustes del theme relacionados.

#### Scenario: Tarjetas sin botón de favoritos

- **WHEN** un visitante ve una tarjeta de producto o una tarjeta de oferta en cualquier página
- **THEN** la tarjeta no muestra ningún botón de favoritos

#### Scenario: Sin botón flotante

- **WHEN** un visitante navega por cualquier página de la tienda
- **THEN** no aparece el botón flotante de favoritos ni su contador

#### Scenario: Página de favoritos retirada

- **WHEN** un visitante abre `/pages/favoritos`
- **THEN** es llevado a la portada de la tienda

#### Scenario: Visitante con favoritos guardados previamente

- **WHEN** un visitante que había guardado favoritos en su navegador vuelve a la tienda
- **THEN** la tienda funciona con normalidad y no muestra rastro de esos favoritos

#### Scenario: Ajustes del theme

- **WHEN** un administrador abre los ajustes del theme en el editor
- **THEN** no existe el grupo de ajustes "Wishlist"
