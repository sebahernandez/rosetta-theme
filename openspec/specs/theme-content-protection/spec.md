# theme-content-protection Specification

## Purpose

Garantiza que los cambios de código del theme Rosetta no modifiquen el contenido que el comerciante edita en el editor de temas de Shopify (imágenes, textos, bloques y configuración visual).

## Requirements

### Requirement: Clasificación de archivos

El theme SHALL distinguir entre archivos de código (`layout/`, `sections/*.liquid`, `snippets/`, `assets/`, `blocks/`, `templates/*.liquid`, `config/settings_schema.json`, `locales/`) y archivos de contenido del editor de temas (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`).

#### Scenario: Archivo de contenido identificado

- **WHEN** se evalúa `templates/index.json`, `sections/header-group.json` o `config/settings_data.json`
- **THEN** se clasifican como contenido del editor de temas y no como código

#### Scenario: Archivo de código identificado

- **WHEN** se evalúa `sections/header.liquid` o `assets/component-header-redesign.css`
- **THEN** se clasifican como código del theme

### Requirement: Los cambios de código no tocan contenido

Un cambio de código SHALL modificar únicamente archivos de código. Los archivos de contenido SHALL NOT aparecer en el diff de un commit de código.

#### Scenario: Commit de código limpio

- **WHEN** se hace el commit de un cambio de código
- **THEN** ningún archivo de contenido del editor de temas figura entre los archivos modificados

#### Scenario: Contenido guardado en el editor

- **WHEN** el comerciante cargó una imagen o editó un bloque en el editor de temas y luego se entrega un cambio de código
- **THEN** la imagen y el bloque siguen visibles en la tienda sin cambios

### Requirement: Sincronización previa

Antes de iniciar un cambio de código, el repositorio local SHALL estar sincronizado con `origin/develop`, de modo que incluya los commits `Update from Shopify` más recientes.

#### Scenario: Cambios nuevos del editor

- **WHEN** existen commits `Update from Shopify` en `origin/develop` que no están en local
- **THEN** se traen con pull antes de editar cualquier archivo

### Requirement: Excepción aprobada para contenido

Si un cambio de código exige modificar un archivo de contenido, ese cambio SHALL requerir aprobación explícita del usuario y SHALL commitearse por separado del código, modificando solo las claves necesarias.

#### Scenario: Registrar una sección nueva en una plantilla

- **WHEN** una sección nueva debe agregarse a `templates/index.json`
- **THEN** se pide aprobación, se edita solo esa entrada y el commit queda separado del código

#### Scenario: Sin aprobación

- **WHEN** el usuario no aprueba la modificación de un archivo de contenido
- **THEN** el archivo no se modifica y el cambio se entrega sin él

### Requirement: Flujo para secciones con contenido multimedia

El contenido multimedia de una sección SHALL cargarse en el editor de temas y traerse a local mediante `git pull`; el repositorio SHALL guardar solo la referencia a cada archivo, no el archivo.

#### Scenario: Sección nueva con imágenes

- **WHEN** se sube el código de una sección, se cargan sus imágenes en el editor y se guarda
- **THEN** Shopify registra un commit `Update from Shopify` y un `git pull` trae las referencias a local

#### Scenario: Ver las imágenes en local

- **WHEN** el theme se ejecuta en local con `shopify theme dev` tras el `git pull`
- **THEN** las imágenes se muestran porque sus referencias apuntan a los archivos de la tienda
