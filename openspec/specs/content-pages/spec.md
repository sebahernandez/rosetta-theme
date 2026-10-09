# content-pages Specification

## Purpose

Describe las páginas de contenido de la tienda: páginas informativas, "Nosotros", contacto, blog y páginas de sistema (404 y contraseña).

## Requirements

### Requirement: Página genérica

La tienda SHALL ofrecer una plantilla de página por defecto que muestra el título y el contenido de la página administrado en Shopify.

#### Scenario: Página informativa

- **WHEN** un visitante abre una página creada en el administrador con la plantilla por defecto
- **THEN** ve su título y contenido dentro del layout de la tienda

### Requirement: Página "Nosotros"

La tienda SHALL ofrecer una plantilla "nosotros" compuesta por secciones propias: contenido institucional, texto con imagen, imagen con pasos e iconos (hasta 6), compromiso de marca, tarjetas promocionales, métodos de pago (hasta 6), testimonios y boletín.

#### Scenario: Comerciante edita la página Nosotros

- **WHEN** el comerciante edita textos, imágenes o bloques de las secciones de la plantilla "nosotros"
- **THEN** la página pública refleja los cambios sin modificar código

### Requirement: Página de contacto

La tienda SHALL ofrecer una plantilla de contacto con un formulario que envía el mensaje del visitante al comerciante.

#### Scenario: Envío exitoso

- **WHEN** un visitante completa el formulario de contacto con datos válidos y lo envía
- **THEN** ve un mensaje de confirmación de envío

#### Scenario: Datos inválidos

- **WHEN** el visitante envía el formulario con un correo inválido o campos requeridos vacíos
- **THEN** ve los errores correspondientes y el mensaje no se envía

### Requirement: Blog

La tienda SHALL ofrecer un listado de artículos del blog con paginación y una página de artículo con imagen destacada, título, contenido y opción de compartir.

#### Scenario: Lectura de un artículo

- **WHEN** un visitante selecciona un artículo del listado
- **THEN** ve el artículo completo con su imagen destacada y opción de compartir

### Requirement: Página no encontrada

La tienda SHALL mostrar una página 404 con un mensaje claro y un enlace para seguir comprando cuando la URL solicitada no existe.

#### Scenario: URL inexistente

- **WHEN** un visitante abre una URL que no existe en la tienda
- **THEN** ve la página 404 con un enlace para continuar navegando

### Requirement: Página de contraseña

Cuando la tienda está protegida con contraseña, SHALL mostrarse una página con layout propio que permite ingresar la contraseña y suscribirse por correo.

#### Scenario: Tienda protegida

- **WHEN** un visitante entra a la tienda protegida con contraseña
- **THEN** ve la página de contraseña en lugar del contenido de la tienda
