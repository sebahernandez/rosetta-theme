# contact-cards-section Specification

## Purpose

Define la sección "Tarjetas de contacto": una cuadrícula responsive de tarjetas (WhatsApp, correo, delivery u otras) construida con theme blocks, donde cada tarjeta y cada uno de sus elementos se editan por separado desde el editor de temas.

## ADDED Requirements

### Requirement: Tarjetas como bloques independientes

La sección SHALL construir cada tarjeta como un theme block añadible, reordenable y eliminable desde el editor, hasta un máximo de 12 bloques. Cada bloque SHALL tener su propia configuración sin compartirla con los demás. Sin bloques, la sección SHALL no renderizar la cuadrícula.

#### Scenario: Tarjetas por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestran tres tarjetas: "WhatsApp" con "+58 412 000 0000", "Correo" con "hola@rosettavzla.com" y "Delivery" con "Tucacas, estado Falcón"

#### Scenario: Gestionar tarjetas

- **WHEN** el comerciante añade, reordena o elimina bloques de tarjeta
- **THEN** la cuadrícula refleja el nuevo orden y cantidad

#### Scenario: Edición independiente

- **WHEN** el comerciante cambia un texto o color en una tarjeta
- **THEN** solo esa tarjeta cambia y las demás conservan su configuración

### Requirement: Elementos editables por tarjeta

Cada tarjeta SHALL permitir editar por separado: el ícono, el título, el valor principal, la descripción y el enlace (texto y destino). Un elemento vacío SHALL no renderizarse ni dejar espacio vacío. El ícono SHALL poder elegirse de una lista integrada (WhatsApp, correo, reloj, teléfono, ubicación, Instagram, chat) o sustituirse por una imagen propia.

#### Scenario: Elemento vacío

- **WHEN** el comerciante deja vacía la descripción o el texto del enlace de una tarjeta
- **THEN** ese elemento no se muestra y no deja espacio vacío

#### Scenario: Ícono propio

- **WHEN** el comerciante sube una imagen de ícono en una tarjeta
- **THEN** la tarjeta muestra esa imagen en lugar del ícono integrado

#### Scenario: Enlaces de contacto

- **WHEN** el comerciante usa un destino `https://wa.me/...`, `mailto:...` o `tel:...`
- **THEN** el enlace de la tarjeta abre WhatsApp, el cliente de correo o el marcador respectivamente

### Requirement: Colores editables por tarjeta

Cada tarjeta SHALL permitir configurar el color de fondo, el borde, el fondo del ícono, el color del ícono, el color del título, del valor principal, de la descripción y del enlace.

#### Scenario: Tarjeta destacada

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** la primera tarjeta se muestra con fondo verde y las demás con fondo blanco, borde suave e ícono magenta sobre rosa claro

#### Scenario: Cambio de fondo

- **WHEN** el comerciante cambia el fondo de una tarjeta
- **THEN** solo esa tarjeta refleja el nuevo color

### Requirement: Ajustes de la sección

La sección SHALL permitir editar el título (texto, color, tamaño y fuente), el fondo de la sección, el ancho máximo, el número de columnas en escritorio, tablet y móvil, el espacio entre tarjetas, el radio de las tarjetas, el relleno interno de las tarjetas y el relleno superior e inferior, con valores independientes para móvil y escritorio donde aplique.

#### Scenario: Columnas por dispositivo

- **WHEN** el comerciante cambia las columnas de escritorio a 2
- **THEN** solo en pantallas de 990px o más las tarjetas se distribuyen en 2 columnas

#### Scenario: Título vacío

- **WHEN** el comerciante deja vacío el título de la sección
- **THEN** no se muestra y no deja espacio vacío

### Requirement: Diseño responsive

La sección SHALL mostrar por defecto 3 columnas desde 990px, 2 columnas entre 750px y 989px y 1 columna por debajo de 750px, con tarjetas de igual altura por fila, sin desbordamiento horizontal desde 320px y con textos largos que se ajustan sin romper el diseño.

#### Scenario: Móvil

- **WHEN** la pantalla mide menos de 750px
- **THEN** las tarjetas se apilan en una columna a ancho completo y sin scroll horizontal

#### Scenario: Valor largo

- **WHEN** el valor principal es un correo largo
- **THEN** el texto se ajusta dentro de la tarjeta sin desbordarla
