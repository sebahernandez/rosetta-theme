## ADDED Requirements

### Requirement: Contenido de colección contiguo al encabezado

En la página de colección, el contenido principal SHALL comenzar inmediatamente debajo del encabezado, sin dejar visible una franja del color de fondo del sitio entre el encabezado y el contenedor de la colección, tanto en móvil como en escritorio. El margen inferior configurado para el encabezado SHALL seguir aplicándose en las páginas que no sean de producto ni de colección.

#### Scenario: Colección en escritorio

- **WHEN** un visitante abre una colección en escritorio
- **THEN** el contenedor con el título y los productos empieza justo debajo del encabezado y no se ve una franja del fondo del sitio entre ambos

#### Scenario: Colección en móvil

- **WHEN** un visitante abre una colección en móvil
- **THEN** el contenedor de la colección empieza justo debajo del encabezado, sin franja visible entre ambos

#### Scenario: Otras páginas sin cambios

- **WHEN** un visitante abre una página que no es de producto ni de colección (por ejemplo la lista de colecciones o una página de contenido)
- **THEN** el encabezado mantiene el margen inferior configurado en el editor de temas

#### Scenario: Filtros y orden

- **WHEN** el visitante aplica filtros u ordena los productos de la colección
- **THEN** el contenedor sigue contiguo al encabezado y el diseño no se desplaza
