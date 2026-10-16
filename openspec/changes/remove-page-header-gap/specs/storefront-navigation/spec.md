## ADDED Requirements

### Requirement: Contenido de página personalizada contiguo al encabezado

En las páginas personalizadas (plantilla de página, incluidas sus variantes como "Nosotros" o "Contacto"), el contenido principal SHALL comenzar inmediatamente debajo del encabezado, sin dejar visible una franja del color de fondo del sitio entre el encabezado y el primer bloque de contenido, tanto en móvil como en escritorio. El margen inferior configurado para el encabezado SHALL seguir aplicándose en las páginas que no sean de producto, colección ni página personalizada.

#### Scenario: Página personalizada en escritorio

- **WHEN** un visitante abre una página personalizada en escritorio
- **THEN** el primer bloque de contenido empieza justo debajo del encabezado y no se ve una franja del fondo del sitio entre ambos

#### Scenario: Página personalizada en móvil

- **WHEN** un visitante abre una página personalizada en móvil
- **THEN** el primer bloque de contenido empieza justo debajo del encabezado, sin franja visible entre ambos

#### Scenario: Variantes de página

- **WHEN** el visitante abre una página que usa una plantilla alternativa (por ejemplo "Nosotros")
- **THEN** se aplica el mismo comportamiento que en una página personalizada estándar

#### Scenario: Otras páginas sin cambios

- **WHEN** un visitante abre una página que no es de producto, colección ni personalizada (por ejemplo la lista de colecciones o el carrito)
- **THEN** el encabezado mantiene el margen inferior configurado en el editor de temas
