## MODIFIED Requirements

### Requirement: Diseño responsive

La sección SHALL distribuir los beneficios en una fila con separadores verticales en escritorio, en dos columnas en tablet y en una sola columna en móvil, sin provocar desplazamiento horizontal de la página. En móvil, cada beneficio SHALL alinearse a la izquierda de su fila, con el ícono y el texto (título y descripción) centrados verticalmente entre sí.

#### Scenario: Escritorio

- **WHEN** la pantalla es de escritorio y hay cuatro bloques
- **THEN** los cuatro beneficios se muestran en una sola fila con el ícono a la izquierda del texto

#### Scenario: Móvil

- **WHEN** la pantalla es de móvil
- **THEN** los beneficios se apilan en una columna, sin desbordar el ancho y sin textos cortados

#### Scenario: Alineación a la izquierda en móvil

- **WHEN** la pantalla es de móvil y los beneficios tienen textos de distinta longitud
- **THEN** el ícono de cada beneficio comienza en el mismo borde izquierdo y el texto se alinea a la izquierda junto al ícono

#### Scenario: Centrado vertical en móvil

- **WHEN** la pantalla es de móvil y un beneficio tiene título y descripción en varias líneas
- **THEN** el ícono queda centrado verticalmente respecto al bloque de texto de ese beneficio

#### Scenario: Tablet y escritorio sin cambios

- **WHEN** la pantalla es de tablet o escritorio
- **THEN** los beneficios mantienen su distribución actual, sin alinearse al borde izquierdo por efecto de este cambio

#### Scenario: Texto largo

- **WHEN** el título o la descripción de un bloque es muy largo
- **THEN** el texto se ajusta en varias líneas dentro de su celda sin romper el diseño
