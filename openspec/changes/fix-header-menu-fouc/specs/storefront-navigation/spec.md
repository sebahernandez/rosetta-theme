## ADDED Requirements

### Requirement: Encabezado sin destello de contenido sin estilos
El encabezado y el menú principal SHALL mostrarse con su estilo final desde el primer render, tanto en la carga inicial como al navegar a otra página, sin pasar por un estado sin estilos.

#### Scenario: Carga inicial de la página
- **WHEN** un visitante abre cualquier página de la tienda
- **THEN** el header, el buscador y el menú principal aparecen con su diseño final, sin enlaces en azul por defecto ni elementos estirados

#### Scenario: Navegación a otro enlace
- **WHEN** el visitante hace clic en un enlace del menú y se carga la nueva página
- **THEN** el header de la nueva página se muestra con el mismo diseño, sin cambios visibles de tamaño ni de color durante la carga

#### Scenario: Conexión lenta
- **WHEN** la hoja de estilos de un componente no esencial del header (drawer móvil, notificación de carrito) aún no se ha descargado
- **THEN** el header visible sigue mostrándose correctamente y no cambia de forma al terminar la descarga

#### Scenario: Altura reservada
- **WHEN** el header se pinta antes de que carguen sus imágenes
- **THEN** su altura ya está reservada y el contenido inferior no se desplaza al cargar el logo
