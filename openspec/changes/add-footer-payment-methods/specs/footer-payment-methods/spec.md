## Purpose

Definir la fila de medios de pago (Pago Móvil, Zelle, Stripe) que se muestra bajo el logo del footer, con imágenes predeterminadas y personalización independiente desde el editor de temas.

## ADDED Requirements

### Requirement: Medios de pago bajo el logo

El footer SHALL mostrar las imágenes de Pago Móvil, Zelle y Stripe, en ese orden y en una sola fila, inmediatamente debajo del logo y dentro de su mismo contenedor visual.

#### Scenario: Primera carga sin configuración

- **WHEN** un visitante abre la tienda y el comerciante no ha elegido ninguna imagen
- **THEN** el footer muestra las tres imágenes predeterminadas bajo el logo

#### Scenario: Sin duplicados

- **WHEN** el footer contiene más de un bloque de imagen
- **THEN** los medios de pago aparecen una sola vez, bajo el primer logo

### Requirement: Imagen personalizada con respaldo por medio de pago

Cada medio de pago SHALL poder reemplazarse de forma independiente mediante un selector de imagen, y SHALL volver a su imagen predeterminada cuando no haya imagen seleccionada.

#### Scenario: Reemplazo de un solo medio

- **WHEN** el comerciante selecciona una imagen propia para Zelle
- **THEN** se muestra esa imagen en lugar de la de Zelle y Pago Móvil y Stripe conservan sus imágenes predeterminadas

#### Scenario: Imagen personalizada eliminada

- **WHEN** el comerciante elimina la imagen personalizada de un medio de pago
- **THEN** ese medio vuelve a mostrar su imagen predeterminada

### Requirement: Visibilidad configurable

El grupo de medios de pago SHALL poder mostrarse u ocultarse con un único ajuste, activado por defecto.

#### Scenario: Grupo oculto

- **WHEN** el comerciante desactiva "Mostrar medios de pago"
- **THEN** las tres imágenes desaparecen y no queda espacio vacío bajo el logo

### Requirement: Tamaño y separación configurables

El comerciante SHALL poder ajustar desde el editor el tamaño de las imágenes y la separación horizontal entre ellas, en píxeles.

#### Scenario: Cambio de tamaño

- **WHEN** el comerciante aumenta el tamaño de las imágenes
- **THEN** las tres imágenes crecen manteniendo su proporción original y se refleja en la vista previa del editor

#### Scenario: Cambio de separación

- **WHEN** el comerciante aumenta la separación horizontal
- **THEN** aumenta el espacio entre las imágenes sin modificar su tamaño

### Requirement: Presentación responsive y accesible

Las imágenes SHALL conservar su proporción (sin estirarse, deformarse ni recortarse), SHALL acomodarse en varias líneas cuando falte ancho sin generar desplazamiento horizontal, y SHALL tener texto alternativo descriptivo y carga diferida.

#### Scenario: Pantalla móvil estrecha

- **WHEN** el ancho disponible no alcanza para las tres imágenes en una fila
- **THEN** las imágenes pasan a una segunda línea y la página no muestra scroll horizontal

#### Scenario: Texto alternativo

- **WHEN** un lector de pantalla recorre el footer
- **THEN** cada imagen se anuncia con el nombre de su medio de pago (Pago Móvil, Zelle, Stripe)
