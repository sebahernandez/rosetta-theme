# home-page Specification

## Purpose

Define la página de inicio de Rosetta: una portada comercial compuesta por secciones propias (sliders, categorías, buscador, promociones, marcas, testimonios) que el comerciante administra desde el editor de temas.

## Requirements

### Requirement: Portada componible por secciones

La página de inicio SHALL componerse de secciones independientes administrables desde el editor de temas, incluyendo: slider de imágenes, slider de categorías, buscador personalizado, colección destacada, banner promocional, promociones del mes, barra de marcas, características con iconos, testimonios, blog destacado y boletín.

#### Scenario: Reordenar la portada

- **WHEN** el comerciante reordena u oculta secciones de la página de inicio en el editor
- **THEN** la tienda refleja el nuevo orden sin cambios de código

### Requirement: Slider principal de imágenes

La sección "Slider de Imágenes" SHALL mostrar diapositivas configuradas por bloques, con autoplay, intervalo, flechas y paginación configurables, y con alturas independientes para escritorio, tablet y móvil.

#### Scenario: Autoplay activado

- **WHEN** el autoplay está activado con un intervalo definido
- **THEN** las diapositivas avanzan automáticamente con ese intervalo

#### Scenario: Altura por dispositivo

- **WHEN** un visitante abre la portada en móvil
- **THEN** el slider usa la altura configurada para móvil

### Requirement: Navegación por categorías

La portada SHALL ofrecer un slider de categorías con imágenes enlazadas, con número de elementos por página, separación y autoplay configurables.

#### Scenario: Visitante elige una categoría

- **WHEN** un visitante hace clic en una imagen de categoría
- **THEN** es llevado al destino configurado para esa categoría

### Requirement: Buscador personalizado en portada

La sección "Buscador Personalizado" SHALL mostrar un formulario de búsqueda con encabezado, texto de ayuda, placeholder, etiqueta de botón y colores configurables, y SHALL usar las sugerencias predictivas cuando estén habilitadas en el theme.

#### Scenario: Búsqueda desde la portada

- **WHEN** un visitante escribe un término en el buscador de la portada y lo envía
- **THEN** es llevado a la página de resultados de búsqueda

### Requirement: Contenido promocional

La portada SHALL permitir mostrar un banner promocional con imágenes distintas para escritorio, tablet y móvil y enlace opcional, y una sección de "Promociones del mes" compuesta por bloques de promoción.

#### Scenario: Banner con enlace

- **WHEN** el banner promocional tiene un enlace configurado y un visitante hace clic en él
- **THEN** navega al enlace, en una pestaña nueva si así está configurado

### Requirement: Prueba social y marcas

La portada SHALL permitir mostrar una barra de logos de marcas, hasta 6 características con icono y hasta 10 testimonios, todos administrados como bloques.

#### Scenario: Sin bloques configurados

- **WHEN** una de estas secciones no tiene bloques
- **THEN** la sección no muestra elementos vacíos ni rompe el diseño de la página

### Requirement: Espaciado del banner promocional por dispositivo

El banner promocional SHALL permitir al comerciante configurar desde el editor de temas su margen superior e inferior y su padding superior, inferior y lateral, con valores independientes para móvil y para escritorio. Cada banner de la página SHALL conservar sus propios valores de espaciado.

#### Scenario: Espaciado en escritorio

- **WHEN** el comerciante define márgenes y paddings de escritorio y un visitante abre la página en una pantalla de 750px de ancho o más
- **THEN** el banner se muestra con los márgenes y paddings configurados para escritorio

#### Scenario: Espaciado en móvil

- **WHEN** el comerciante define márgenes y paddings de móvil distintos a los de escritorio y un visitante abre la página en una pantalla de menos de 750px de ancho
- **THEN** el banner se muestra con los márgenes y paddings configurados para móvil y no con los de escritorio

#### Scenario: Varios banners en la misma página

- **WHEN** la página tiene dos banners promocionales con valores de espaciado distintos
- **THEN** cada banner muestra su propio espaciado sin afectar al otro

### Requirement: Compatibilidad del espaciado del banner promocional

Un banner promocional cuyos ajustes de espaciado no han sido modificados SHALL mostrarse con la misma separación que tenía antes de existir dichos ajustes.

#### Scenario: Banner ya publicado

- **WHEN** un banner promocional existente no tiene valores de espaciado guardados
- **THEN** se muestra igual que antes, sin márgenes ni padding vertical añadidos y con la misma separación lateral en móvil y en escritorio
