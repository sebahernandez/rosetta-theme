## ADDED Requirements

### Requirement: Contenido de producto contiguo al encabezado

En la página de producto, el contenido principal SHALL comenzar inmediatamente debajo del encabezado, sin dejar visible una franja del color de fondo del sitio entre el encabezado y el contenedor del producto, tanto en móvil como en escritorio. El margen inferior configurado para el encabezado SHALL seguir aplicándose en las demás páginas.

#### Scenario: Producto en escritorio

- **WHEN** un visitante abre una página de producto en escritorio
- **THEN** el contenedor del producto empieza justo debajo del encabezado y no se ve una franja del fondo del sitio entre ambos

#### Scenario: Producto en móvil

- **WHEN** un visitante abre una página de producto en móvil
- **THEN** el contenedor del producto empieza justo debajo del encabezado, sin franja visible entre ambos

#### Scenario: Otras páginas sin cambios

- **WHEN** un visitante abre una página que no es de producto (por ejemplo una colección)
- **THEN** el encabezado mantiene el margen inferior configurado en el editor de temas

#### Scenario: Encabezado fijo al desplazarse

- **WHEN** el visitante se desplaza por la página de producto con el encabezado fijo
- **THEN** el encabezado se sigue comportando igual y no aparece ningún hueco entre él y el contenido
