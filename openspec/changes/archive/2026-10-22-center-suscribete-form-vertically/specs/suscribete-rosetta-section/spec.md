# Spec Delta

## MODIFIED Requirements

### Requirement: Diseño responsive

La sección SHALL mostrar el texto a la izquierda y el formulario a la derecha en escritorio, y apilar texto y formulario en tablet y móvil. En escritorio, el formulario SHALL quedar centrado verticalmente respecto a la altura de la tarjeta, sin dejar un espacio vacío desproporcionado sobre el campo y el botón. En pantallas pequeñas el campo y el botón SHALL ocupar todo el ancho disponible en columna, sin provocar desplazamiento horizontal de la página.

#### Scenario: Escritorio

- **WHEN** la pantalla es de escritorio
- **THEN** el texto se muestra a la izquierda y el campo con el botón alineados a la derecha en una sola fila, con el campo y el botón a la misma altura y alineados verticalmente entre sí

#### Scenario: Formulario centrado verticalmente en escritorio

- **WHEN** la pantalla es de escritorio y la columna de texto es más alta que el formulario
- **THEN** el campo y el botón quedan centrados verticalmente en la tarjeta, con el mismo espacio libre arriba y abajo, y no pegados al borde inferior

#### Scenario: Móvil

- **WHEN** la pantalla es de móvil
- **THEN** el texto y el formulario se apilan, el campo y el botón ocupan el ancho completo en columna y no hay desborde horizontal

#### Scenario: Título largo

- **WHEN** el título o la descripción son muy largos
- **THEN** el texto se ajusta en varias líneas dentro de la tarjeta sin romper el diseño
