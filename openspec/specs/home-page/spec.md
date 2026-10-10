# home-page Specification

## Purpose

Define la página de inicio de Rosetta: una portada comercial compuesta por secciones propias (sliders, categorías, buscador, promociones, marcas, testimonios) que el comerciante administra desde el editor de temas.

## Requirements

### Requirement: Portada componible por secciones

La página de inicio SHALL componerse de secciones independientes administrables desde el editor de temas, incluyendo: slider de imágenes, cuadrícula de categorías, buscador personalizado, colección destacada, banner promocional, promociones del mes, barra de marcas, características con iconos, testimonios, blog destacado y boletín.

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

La portada SHALL ofrecer una cuadrícula de hasta cuatro cajas de categoría con imagen, todas visibles a la vez y sin comportamiento de carrusel (sin avance automático, flechas, paginación ni arrastre). Una caja con colección de destino SHALL enlazar a esa colección, y una caja con título SHALL mostrarlo sobre la imagen. El editor de temas SHALL NOT permitir añadir más de cuatro cajas.

#### Scenario: Visitante elige una categoría

- **WHEN** un visitante hace clic en una imagen de categoría que tiene colección de destino
- **THEN** es llevado a esa colección

#### Scenario: Cuatro categorías configuradas

- **WHEN** el comerciante configura cuatro cajas con imagen y un visitante abre la portada
- **THEN** las cuatro imágenes se muestran simultáneamente y ninguna se desplaza ni rota

#### Scenario: Caja sin colección de destino

- **WHEN** una caja no tiene colección de destino
- **THEN** la imagen se muestra sin comportarse como enlace

#### Scenario: Límite de cajas

- **WHEN** la sección ya tiene cuatro cajas y el comerciante intenta añadir otra en el editor de temas
- **THEN** el editor no permite añadir una quinta caja

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

### Requirement: Cajas de categoría del mismo tamaño

Todas las cajas de la cuadrícula de categorías SHALL tener el mismo ancho y el mismo alto entre sí en cualquier ancho de pantalla, con independencia de las dimensiones de las imágenes cargadas. La imagen de cada caja SHALL cubrir la caja completa sin deformarse.

#### Scenario: Imágenes de proporciones distintas

- **WHEN** el comerciante carga imágenes con proporciones distintas en las cajas
- **THEN** todas las cajas conservan el mismo tamaño y cada imagen llena su caja recortándose, sin estirarse

#### Scenario: Menos de cuatro cajas

- **WHEN** la sección tiene menos de cuatro cajas
- **THEN** las cajas presentes conservan el mismo tamaño que tendrían con las cuatro y la página no se descuadra

#### Scenario: Caja sin imagen

- **WHEN** una caja no tiene imagen
- **THEN** muestra un marcador de posición del mismo tamaño que las demás cajas

### Requirement: Disposición de la cuadrícula de categorías por dispositivo

La cuadrícula de categorías SHALL mostrar las cajas en una sola fila de cuatro en pantallas de 750px de ancho o más, y en dos filas de dos cajas (2 × 2) en pantallas de menos de 750px. Las cajas SHALL ajustar su tamaño al ancho disponible sin provocar desplazamiento horizontal.

#### Scenario: Escritorio

- **WHEN** un visitante abre la portada en una pantalla de 750px de ancho o más
- **THEN** las cuatro cajas se muestran una al lado de la otra en una sola fila

#### Scenario: Móvil

- **WHEN** un visitante abre la portada en una pantalla de menos de 750px de ancho
- **THEN** se muestran dos cajas arriba y dos abajo, en el orden configurado de izquierda a derecha y de arriba abajo

#### Scenario: Pantalla estrecha

- **WHEN** un visitante abre la portada en un móvil de 320px de ancho
- **THEN** las cajas se reducen para caber en dos columnas y la página no tiene desplazamiento horizontal

### Requirement: Imágenes por dispositivo en cada caja de categoría

Cada caja de categoría SHALL permitir al comerciante definir una imagen para escritorio y, opcionalmente, una imagen distinta para móvil. En pantallas de menos de 750px la caja SHALL mostrar la imagen de móvil cuando exista y la de escritorio en caso contrario.

#### Scenario: Caja con imagen de móvil

- **WHEN** una caja tiene imagen de escritorio e imagen de móvil y un visitante abre la portada en una pantalla de menos de 750px
- **THEN** la caja muestra la imagen de móvil

#### Scenario: Caja sin imagen de móvil

- **WHEN** una caja solo tiene imagen de escritorio y un visitante abre la portada en una pantalla de menos de 750px
- **THEN** la caja muestra la imagen de escritorio

#### Scenario: Escritorio con ambas imágenes

- **WHEN** una caja tiene ambas imágenes y un visitante abre la portada en una pantalla de 750px o más
- **THEN** la caja muestra la imagen de escritorio

### Requirement: Apariencia configurable de la cuadrícula de categorías

La sección SHALL permitir al comerciante configurar desde el editor de temas el espacio entre cajas y la proporción de las cajas, esta última con valores independientes para móvil y para escritorio.

#### Scenario: Proporción distinta en móvil

- **WHEN** el comerciante elige una proporción para escritorio y otra distinta para móvil
- **THEN** las cajas usan la proporción de escritorio en pantallas de 750px o más y la de móvil en pantallas menores

#### Scenario: Proporción adaptada a la imagen

- **WHEN** el comerciante no ha elegido una proporción fija y todas las imágenes cargadas tienen la misma proporción
- **THEN** las cajas adoptan la proporción de las imágenes y estas se muestran completas, sin recorte

#### Scenario: Espacio entre cajas

- **WHEN** el comerciante cambia el espacio entre imágenes
- **THEN** cambia la separación horizontal y vertical entre las cajas
