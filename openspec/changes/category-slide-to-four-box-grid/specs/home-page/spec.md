# Spec Delta

## MODIFIED Requirements

### Requirement: Portada componible por secciones

La página de inicio SHALL componerse de secciones independientes administrables desde el editor de temas, incluyendo: slider de imágenes, cuadrícula de categorías, buscador personalizado, colección destacada, banner promocional, promociones del mes, barra de marcas, características con iconos, testimonios, blog destacado y boletín.

#### Scenario: Reordenar la portada

- **WHEN** el comerciante reordena u oculta secciones de la página de inicio en el editor
- **THEN** la tienda refleja el nuevo orden sin cambios de código

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

## ADDED Requirements

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
