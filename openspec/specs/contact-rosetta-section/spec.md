# contact-rosetta-section Specification

## Purpose

Define la sección "Contacto Rosetta": una página de contacto responsive con columna de bienvenida (texto, imagen y cita) y un formulario en tarjeta con selector de motivo, cuyo envío usa el motor nativo de contacto de Shopify y cuyo aspecto y contenido son editables desde el editor de temas.

## Requirements

### Requirement: Envío nativo de Shopify

El formulario SHALL usar `{% form 'contact' %}` y enviar los campos de forma compatible con Shopify: el correo en `contact[email]`, el mensaje en `contact[body]` y el nombre, teléfono y motivo como campos personalizados `contact[...]`. El envío SHALL llegar al correo de la tienda con todos los campos y SHALL mostrar un mensaje de éxito tras `form.posted_successfully?` y los errores nativos en caso contrario, conservando los valores ingresados.

#### Scenario: Envío exitoso

- **WHEN** un visitante completa nombre, correo y mensaje válidos, elige un motivo y envía
- **THEN** Shopify procesa el mensaje, la página muestra el texto de éxito configurado y el correo de la tienda recibe nombre, correo, teléfono, motivo y mensaje

#### Scenario: Error de validación

- **WHEN** el visitante envía un correo inválido o vacío
- **THEN** se muestra el error nativo de Shopify en una región de alerta accesible y los campos conservan lo escrito

#### Scenario: Teléfono opcional

- **WHEN** el visitante deja el teléfono vacío
- **THEN** el formulario se envía sin error

### Requirement: Selector de motivo editable

La sección SHALL mostrar el selector "¿Sobre qué nos escribes?" como un grupo de pastillas de selección única construido con bloques editables. Cada bloque SHALL permitir configurar la etiqueta de la opción. La primera opción SHALL venir seleccionada, y el valor elegido SHALL enviarse como campo del formulario. Sin bloques, el selector SHALL no mostrarse.

#### Scenario: Opciones por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestran las pastillas "Mi pedido", "Pagos", "Delivery", "Productos" y "Otro", con "Mi pedido" seleccionada

#### Scenario: Gestionar opciones

- **WHEN** el comerciante añade, reordena, renombra o elimina bloques de opción
- **THEN** el selector refleja los cambios y el valor enviado corresponde a la opción elegida

#### Scenario: Navegación por teclado

- **WHEN** el visitante usa el teclado sobre el selector
- **THEN** puede elegir una opción con las flechas y ver un indicador de foco visible

#### Scenario: Texto sin cortes

- **WHEN** una etiqueta es larga o el ancho es reducido
- **THEN** las pastillas pasan a la siguiente línea completas, sin partir el texto de una etiqueta

### Requirement: Textos editables

La sección SHALL permitir editar el texto de la insignia, las dos líneas del título (la segunda con acento), la descripción, la cita y su autor, el título del formulario, la nota de obligatorios, la pregunta del selector, las etiquetas de nombre, correo, teléfono y mensaje, el texto de la nota al pie, el texto del botón y el mensaje de éxito. Un texto vacío SHALL no renderizar su elemento ni dejar espacio vacío.

#### Scenario: Textos por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestran "Atención 24/7", "Hablemos,", "estamos cerca.", la descripción, la cita "Cada mensaje lo responde alguien de la casa.", "Escríbenos", "Los campos con * son obligatorios.", "Respondemos en horario de atención." y el botón "Enviar mensaje"

#### Scenario: Texto vacío

- **WHEN** el comerciante deja vacía la insignia, la cita o la nota al pie
- **THEN** ese elemento no se muestra y no deja espacio vacío

### Requirement: Imagen editable

La sección SHALL permitir elegir la imagen de la columna izquierda y configurar el radio de sus esquinas. Sin imagen seleccionada, SHALL mostrar un marcador de posición sin romper el diseño. La imagen SHALL incluir texto alternativo configurable.

#### Scenario: Imagen configurada

- **WHEN** el comerciante selecciona una imagen
- **THEN** la imagen se muestra con las esquinas redondeadas configuradas y sin deformarse

#### Scenario: Sin imagen

- **WHEN** no hay imagen seleccionada
- **THEN** se muestra un marcador de posición y el resto de la sección se ve completo

### Requirement: Colores editables

La sección SHALL permitir configurar los colores del fondo de la sección, la insignia (fondo, texto y punto), el título, el acento del título, la descripción, la cita (texto, autor y barra), la tarjeta del formulario (fondo y borde), los campos (fondo, borde, texto y placeholder), las pastillas (fondo, borde, texto, y fondo y texto en estado seleccionado) y el botón (fondo, texto y fondo en hover).

#### Scenario: Cambio de color de la tarjeta

- **WHEN** el comerciante cambia el fondo de la tarjeta
- **THEN** la tarjeta refleja el nuevo color y el fondo de la sección conserva el suyo

#### Scenario: Colores por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestra sobre fondo crema, con título oscuro, acento magenta, pastilla seleccionada oscura y botón rosa con texto oscuro

### Requirement: Tipografía editable

La sección SHALL permitir elegir la fuente del título y la de los demás textos mediante selector de fuente, y configurar el tamaño del título, de la descripción y del texto de los campos, con valores independientes para móvil y escritorio donde aplique el cambio de tamaño.

#### Scenario: Cambio de fuente del título

- **WHEN** el comerciante elige otra fuente para el título
- **THEN** el título y el título del formulario usan esa fuente y el acento conserva el estilo cursivo

#### Scenario: Tamaño por dispositivo

- **WHEN** el comerciante cambia el tamaño del título en móvil
- **THEN** solo cambia en pantallas menores de 750px

### Requirement: Espaciados editables

La sección SHALL permitir configurar el padding superior e inferior de la sección, el ancho máximo del contenido, el espacio entre columnas, el padding interno de la tarjeta y el espacio entre campos, con valores independientes para móvil y escritorio.

#### Scenario: Padding por dispositivo

- **WHEN** el comerciante cambia el padding superior de móvil
- **THEN** solo cambia en pantallas menores de 750px y el de escritorio se conserva

### Requirement: Diseño responsive

La sección SHALL mostrar dos columnas desde 990px y una columna por debajo, en el orden insignia, título, descripción, imagen, cita y tarjeta del formulario. En móvil los campos Nombre y Correo SHALL apilarse, el botón y la nota al pie SHALL apilarse y el botón SHALL ocupar todo el ancho. No SHALL haber desbordamiento horizontal desde 320px de ancho.

#### Scenario: Escritorio

- **WHEN** la pantalla mide 990px o más
- **THEN** el texto e imagen aparecen a la izquierda y la tarjeta a la derecha, con Nombre y Correo en la misma fila

#### Scenario: Móvil

- **WHEN** la pantalla mide menos de 750px
- **THEN** todo se apila en una columna, los campos ocupan el ancho completo y no hay scroll horizontal
