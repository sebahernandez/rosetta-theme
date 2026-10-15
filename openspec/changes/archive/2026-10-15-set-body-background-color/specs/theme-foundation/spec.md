# Spec Delta

## ADDED Requirements

### Requirement: Fondo global de la página

El fondo base de la página (`<body>`) SHALL ser el color `#FAF7F2` en todas las páginas que usan el layout principal. Las secciones con fondo propio SHALL conservar su color.

#### Scenario: Zona sin fondo propio

- **WHEN** un visitante carga cualquier página y hay espacio entre secciones sin fondo propio
- **THEN** ese espacio se muestra en `#FAF7F2`

#### Scenario: Sección con fondo propio

- **WHEN** una sección define su propio color de fondo (esquema de color o ajuste de fondo)
- **THEN** la sección conserva su color y no adopta `#FAF7F2`

#### Scenario: Página corta

- **WHEN** el contenido de la página es más corto que la ventana
- **THEN** el área restante de la ventana también se muestra en `#FAF7F2`, sin franjas blancas
