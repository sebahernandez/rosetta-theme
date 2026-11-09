# Spec Delta

## MODIFIED Requirements

### Requirement: Iconos de categoría configurables
Cada categoría de primer nivel SHALL poder mostrar un icono. Las 9 categorías principales de la tienda SHALL mostrar por defecto un icono de línea relacionado, sin relleno y en negro. Un bloque del encabezado que indique el título del enlace y un icono SHALL sustituir el icono por defecto. Una categoría sin icono SHALL mostrarse alineada con las demás.

#### Scenario: Iconos por defecto
- **WHEN** el tipo de menú es "Categorías" y no hay bloques de icono configurados
- **THEN** cada una de las 9 categorías principales (Panadería y pastelería, Bebidas sin alcohol, Cigarrillos y tabaco, Confitería y snacks, Cuidado personal, Lácteos y refrigerados, Licores y cervezas, Limpieza y hogar y Víveres y despensa) muestra a su izquierda un icono de línea negro relacionado con ella, en el panel de escritorio y en el cajón móvil

#### Scenario: Estilo del icono
- **WHEN** el visitante pasa el puntero sobre una categoría o esta queda seleccionada
- **THEN** el icono sigue siendo de línea, sin relleno y negro, y no cambia de tamaño

#### Scenario: Espacios respetados
- **WHEN** se muestran los iconos en el panel de escritorio o en el cajón móvil, en anchos desde 320px
- **THEN** cada icono ocupa el hueco reservado a la izquierda del texto con la misma separación, las filas mantienen su alto y no aparece desplazamiento horizontal

#### Scenario: Asignar icono
- **WHEN** el comerciante añade un bloque de icono para "Lácteos y refrigerados" con un icono elegido
- **THEN** ese icono reemplaza al icono por defecto junto a la categoría en el panel de escritorio y en el cajón móvil

#### Scenario: Categoría sin icono
- **WHEN** una categoría no tiene icono por defecto ni bloque de icono
- **THEN** se muestra solo con su texto, alineada con las demás

#### Scenario: Reordenar o eliminar bloques de icono
- **WHEN** el comerciante reordena o elimina un bloque de icono
- **THEN** el orden de las categorías no cambia (sigue el del menú) y la categoría afectada vuelve a su icono por defecto, o queda sin icono si no tiene uno por defecto
