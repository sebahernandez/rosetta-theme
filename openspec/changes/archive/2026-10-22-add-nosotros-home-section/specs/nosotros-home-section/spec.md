# nosotros-home-section Specification

## Purpose

Define la sección "Nosotros Home": una presentación de la tienda para la página de inicio, con contenido a la izquierda e imagen a la derecha, compuesta por bloques independientes (insignia, título, texto, botones, imagen y tarjeta flotante) editables desde el editor de temas y totalmente responsive.

## ADDED Requirements

### Requirement: Elementos como bloques independientes

La sección SHALL construir cada elemento como un bloque añadible, reordenable y eliminable, de los tipos Insignia, Título, Texto, Botón, Imagen y Tarjeta flotante, hasta un máximo de 16 bloques. Cada bloque SHALL tener su propia configuración sin compartirla con otros bloques del mismo tipo. Sin bloques, la sección SHALL no renderizar contenido.

#### Scenario: Composición por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestran la insignia "Nosotros · Minimarket y bodegón", el título "El sabor de lo local," con el acento "a tu puerta.", el texto descriptivo, los botones "Empezar a comprar" y "Cómo comprar", la imagen y la tarjeta "Tucacas, Falcón" con "Delivery exclusivo en la zona"

#### Scenario: Gestionar bloques

- **WHEN** el comerciante añade, reordena o elimina bloques
- **THEN** la sección refleja el nuevo orden dentro de cada columna

#### Scenario: Botones repetidos independientes

- **WHEN** el comerciante añade dos bloques Botón y cambia el color de uno
- **THEN** solo ese botón cambia

### Requirement: Columna por bloque

Cada bloque SHALL permitir elegir si se muestra en la columna izquierda o en la derecha. Los bloques de una columna SHALL respetar el orden del editor. Los bloques Botón consecutivos SHALL mostrarse en la misma fila mientras haya espacio.

#### Scenario: Imagen a la izquierda

- **WHEN** el comerciante cambia la columna del bloque Imagen a izquierda
- **THEN** la imagen se muestra en la columna izquierda y la columna derecha queda sin ese bloque

#### Scenario: Columna vacía

- **WHEN** una columna no tiene bloques
- **THEN** la otra columna ocupa el ancho completo

### Requirement: Bloques de texto editables

Los bloques Insignia, Título y Texto SHALL permitir editar su contenido, color, tamaño y fuente (donde aplique) y espaciado inferior, con tamaños independientes para móvil y escritorio. El bloque Insignia SHALL permitir configurar fondo y color del punto; el bloque Título SHALL permitir un texto de acento con color propio y cursiva. Un texto vacío SHALL no renderizar su elemento.

#### Scenario: Título con acento

- **WHEN** el bloque Título tiene "El sabor de lo local," y el acento "a tu puerta."
- **THEN** el acento se muestra en cursiva y con su color propio a continuación del título

#### Scenario: Texto vacío

- **WHEN** el comerciante deja vacío el contenido de un bloque Texto o Insignia
- **THEN** ese bloque no se muestra y no deja espacio vacío

### Requirement: Bloque Botón

El bloque Botón SHALL permitir configurar el texto, el enlace, el estilo (primario relleno o secundario con borde), los colores de fondo, texto, borde y hover, y mostrar u ocultar una flecha. Sin enlace o sin texto, el bloque SHALL no mostrarse.

#### Scenario: Botones por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** "Empezar a comprar" se muestra como botón rosa relleno con flecha y "Cómo comprar" como botón blanco con borde

#### Scenario: Botón sin enlace

- **WHEN** el comerciante deja vacío el enlace
- **THEN** el botón no se muestra

### Requirement: Bloque Imagen

El bloque Imagen SHALL permitir elegir la imagen, su texto alternativo, la proporción (4:3, 1:1, 4:5, 16:9), el radio de esquinas y el punto focal. Sin imagen, SHALL mostrar un marcador de posición sin romper el diseño.

#### Scenario: Imagen configurada

- **WHEN** el comerciante selecciona una imagen
- **THEN** se muestra con esquinas redondeadas, recortada a la proporción elegida y sin deformarse

#### Scenario: Sin imagen

- **WHEN** no hay imagen seleccionada
- **THEN** se muestra un marcador de posición y el resto de la sección se ve completo

### Requirement: Bloque Tarjeta flotante

El bloque Tarjeta flotante SHALL mostrarse superpuesto sobre la esquina inferior de la columna de la imagen y permitir configurar el ícono (lista integrada o imagen propia), título, subtítulo, colores de fondo, ícono, título y subtítulo, la posición (abajo derecha o abajo izquierda) y el radio. Un texto vacío SHALL no renderizarse.

#### Scenario: Tarjeta por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** sobre la esquina inferior derecha de la imagen se muestra una tarjeta blanca con ícono de ubicación verde, "Tucacas, Falcón" y "Delivery exclusivo en la zona"

#### Scenario: Cambio de posición

- **WHEN** el comerciante elige abajo izquierda
- **THEN** la tarjeta se muestra en la esquina inferior izquierda de la imagen

### Requirement: Ajustes de la sección

La sección SHALL permitir configurar el color de fondo, el ancho máximo, la proporción de columnas (50/50, 45/55, 40/60), el espacio entre columnas y el relleno superior, inferior y lateral, con valores independientes para móvil y escritorio.

#### Scenario: Relleno por dispositivo

- **WHEN** el comerciante cambia el relleno superior de móvil
- **THEN** solo cambia en pantallas menores de 750px y el de escritorio se conserva

### Requirement: Diseño responsive

La sección SHALL mostrar dos columnas desde 990px y una columna por debajo, con la columna izquierda primero y la derecha después. En móvil los botones SHALL poder ocupar todo el ancho, los títulos SHALL ajustarse sin desbordar y la tarjeta flotante SHALL permanecer dentro del ancho de la pantalla. No SHALL haber desbordamiento horizontal desde 320px de ancho.

#### Scenario: Escritorio

- **WHEN** la pantalla mide 990px o más
- **THEN** el contenido se ve a la izquierda y la imagen con su tarjeta a la derecha

#### Scenario: Móvil

- **WHEN** la pantalla mide menos de 750px
- **THEN** todo se apila en una columna, los botones se apilan a ancho completo y no hay scroll horizontal
