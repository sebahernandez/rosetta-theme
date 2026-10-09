# price-display Specification

## Purpose

Define cómo se muestran los precios en la tienda: el precio en la moneda de la tienda (USD) y su equivalente referencial en bolívares calculado con la tasa del BCV.

## Requirements

### Requirement: Precio en moneda de la tienda

Los precios SHALL mostrarse con el formato de moneda de la tienda, indicando precio rebajado y precio anterior cuando el producto está en oferta, y el precio unitario cuando aplique.

#### Scenario: Producto con descuento

- **WHEN** un producto tiene precio de comparación mayor a su precio
- **THEN** se muestran el precio actual y el precio anterior tachado

### Requirement: Equivalente en bolívares

Junto al precio de un producto en tarjetas de producto, tarjetas de oferta y PDP, la tienda SHALL mostrar el equivalente aproximado en bolívares con el formato `≈ Bs <monto>` con dos decimales, calculado como precio en USD multiplicado por la tasa de cambio vigente.

#### Scenario: Tasa obtenida correctamente

- **WHEN** se carga una página con productos y se obtiene la tasa de cambio
- **THEN** cada precio muestra su equivalente como `≈ Bs <monto>`

#### Scenario: Estado de carga

- **WHEN** la tasa aún no se ha obtenido
- **THEN** el equivalente muestra un texto de carga en lugar de un monto

### Requirement: Obtención resiliente de la tasa de cambio

La tasa USD→Bs SHALL obtenerse en el navegador desde una fuente externa, con al menos una fuente alternativa que se consulte si la primera falla. La tasa SHALL obtenerse una sola vez por carga de página y reutilizarse para todos los precios mostrados.

#### Scenario: Falla la fuente principal

- **WHEN** la fuente principal de la tasa no responde o devuelve un error
- **THEN** se consulta la fuente alternativa y se usa su tasa

#### Scenario: Fallan todas las fuentes

- **WHEN** ninguna fuente devuelve una tasa
- **THEN** el equivalente muestra un estado de error (`Bs (error)`) y el precio en USD permanece visible

#### Scenario: Precio inválido

- **WHEN** el precio de un producto no es un número mayor que cero
- **THEN** el equivalente de ese producto muestra el estado de error sin afectar a los demás

### Requirement: El equivalente es solo informativo

El equivalente en bolívares SHALL ser referencial y MUST NOT alterar el precio, la moneda ni los totales usados en el carrito y el checkout.

#### Scenario: Producto agregado al carrito

- **WHEN** un visitante agrega al carrito un producto que muestra su equivalente en bolívares
- **THEN** el carrito y el checkout operan con el precio en la moneda de la tienda
