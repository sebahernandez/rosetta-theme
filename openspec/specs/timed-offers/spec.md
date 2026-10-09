# timed-offers Specification

## Purpose

Define las ofertas con urgencia de Rosetta: secciones que destacan productos o promociones junto a una cuenta regresiva.

## Requirements

### Requirement: Sección de ofertas destacadas

La sección "Ofertas destacadas" SHALL mostrar un producto destacado con cuenta regresiva junto a productos de una colección elegida, con título, enlace "ver todo", cantidad de productos, visibilidad del proveedor y compra rápida configurables.

#### Scenario: Sección configurada

- **WHEN** el comerciante elige un producto destacado y una colección
- **THEN** la sección muestra la tarjeta de oferta del producto destacado y las tarjetas de los productos de la colección

### Requirement: Tarjeta de oferta con cuenta regresiva

La tarjeta de oferta SHALL mostrar el producto con su precio, su equivalente en bolívares y una cuenta regresiva en días, horas, minutos y segundos cuya duración define el comerciante en la sección.

#### Scenario: Cuenta regresiva en curso

- **WHEN** un visitante ve una oferta con tiempo restante
- **THEN** el contador disminuye cada segundo

#### Scenario: Duración no configurada

- **WHEN** el comerciante no define la duración de la oferta
- **THEN** la cuenta regresiva usa una duración por defecto

### Requirement: Continuidad de la cuenta regresiva

El tiempo restante de una oferta SHALL conservarse en el navegador del visitante entre recargas y visitas, y SHALL reiniciarse cuando el comerciante cambia la duración configurada.

#### Scenario: Recarga de página

- **WHEN** un visitante recarga la página con una oferta en curso
- **THEN** la cuenta regresiva continúa desde el tiempo restante y no se reinicia

#### Scenario: Cambio de configuración

- **WHEN** el comerciante cambia la duración de la oferta y el visitante vuelve a cargar la página
- **THEN** la cuenta regresiva se reinicia con la nueva duración

### Requirement: Estado de oferta expirada

Cuando la cuenta regresiva llega a cero, la tarjeta de oferta SHALL detener el contador en cero y, si el comerciante configuró una imagen de oferta expirada, SHALL ocultar el contenido de la tarjeta y mostrar esa imagen en su lugar.

#### Scenario: Oferta expira con imagen configurada

- **WHEN** la cuenta regresiva llega a cero y hay una imagen de expiración configurada
- **THEN** la tarjeta muestra la imagen de oferta expirada en lugar del producto

#### Scenario: Visitante llega con la oferta ya expirada

- **WHEN** un visitante carga la página después de que la oferta expiró
- **THEN** la tarjeta se muestra directamente en estado expirado

### Requirement: Bloques de oferta con fecha de fin

La sección "Ofertas con temporizador" SHALL mostrar bloques de oferta, cada uno con imagen de fondo, etiqueta, título, subtexto, botón con enlace y una fecha de fin que determina su temporizador.

#### Scenario: Bloque de oferta visible

- **WHEN** el comerciante agrega un bloque de oferta con fecha de fin
- **THEN** el bloque muestra su contenido, el tiempo restante hasta esa fecha y un botón que lleva al enlace configurado

### Requirement: Banner de oferta

La sección "Banner de oferta" SHALL mostrar un banner con fondo (imagen o color), subtítulo, título, texto adicional, imagen principal y un botón con enlace, con tamaños de texto y altura configurables.

#### Scenario: Clic en el botón del banner

- **WHEN** un visitante hace clic en el botón del banner de oferta
- **THEN** navega al enlace configurado
