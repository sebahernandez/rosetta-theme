# Spec Delta

## Purpose

Define qué colecciones forman el catálogo de la tienda Rosetta Market, cuáles se preservan siempre y cómo se reemplaza la estructura de categorías de forma segura y verificable.

## ADDED Requirements

### Requirement: Estructura de categorías del catálogo
La tienda SHALL tener exactamente una colección por cada categoría principal y subcategoría de la estructura vigente (9 principales y 47 subcategorías), con el título exacto definido en la estructura, incluidos acentos y comas.

#### Scenario: Todas las categorías existen
- **WHEN** se lista el total de colecciones de la tienda después del cambio
- **THEN** existe una colección por cada una de las 56 entradas de la estructura (p. ej. "Bebidas sin alcohol", "Jugos, néctares y té frío", "Panadería y pastelería")
- **AND** no existe ninguna colección duplicada con el mismo título

#### Scenario: Categoría principal sin subcategorías
- **WHEN** se revisa la categoría "Panadería y pastelería"
- **THEN** existe como colección aunque no tenga subcategorías

### Requirement: Colecciones comerciales preservadas
Las colecciones "Ofertas", "Más vendidos", "ofertas destacadas" y "Productos Populares" SHALL conservarse intactas: mismo identificador, handle, productos y reglas que antes del cambio. Las dos últimas alimentan secciones de la página de inicio.

#### Scenario: Ofertas y Más vendidos sobreviven
- **WHEN** termina la reestructuración
- **THEN** "Ofertas", "Más vendidos", "ofertas destacadas" y "Productos Populares" siguen existiendo con el mismo id, handle y cantidad de productos que antes

#### Scenario: Colección preservada no identificable
- **WHEN** no se encuentra una colección cuyo título coincida con "Ofertas" o "Más vendidos"
- **THEN** no se elimina ninguna colección hasta que el responsable confirme cuáles preservar

### Requirement: Eliminación de colecciones anteriores
Toda colección que no esté en la estructura vigente ni sea una colección preservada SHALL eliminarse. Los productos que pertenecían a ella MUST seguir existiendo en la tienda.

#### Scenario: Colección antigua eliminada
- **WHEN** termina la reestructuración
- **THEN** ninguna colección fuera de la estructura vigente y de las preservadas existe en la tienda

#### Scenario: Handle limpio tras colisión
- **WHEN** una colección nueva recibió un handle con sufijo (p. ej. `aceites-y-vinagres-1`) porque una colección antigua ocupaba el handle base
- **THEN** tras eliminar la antigua, la nueva usa el handle base (`aceites-y-vinagres`)

#### Scenario: Productos no se pierden
- **WHEN** se elimina una colección antigua
- **THEN** el total de productos de la tienda es el mismo antes y después del cambio

### Requirement: Respaldo previo a la eliminación
Antes de eliminar cualquier colección SHALL existir un respaldo con su título, handle, descripción, reglas (si es automática) y productos asignados, suficiente para recrearla.

#### Scenario: Respaldo disponible
- **WHEN** se va a ejecutar la eliminación
- **THEN** existe un archivo de respaldo que incluye cada colección a eliminar con sus datos y productos

### Requirement: Colecciones nuevas visibles en la tienda online
Las colecciones nuevas SHALL publicarse en el canal Tienda online y ser accesibles por su URL `/collections/<handle>`.

#### Scenario: Visitante abre una categoría nueva
- **WHEN** un visitante abre `/collections/bebidas-sin-alcohol`
- **THEN** ve la página de la colección "Bebidas sin alcohol" (vacía si aún no tiene productos), no un error 404

### Requirement: Reejecución sin duplicados
La creación de colecciones SHALL poder repetirse sin generar duplicados: si una colección de la estructura ya existe, MUST omitirse.

#### Scenario: Ejecución interrumpida y repetida
- **WHEN** la creación se interrumpe a mitad y se vuelve a ejecutar
- **THEN** se crean solo las colecciones faltantes y el total sigue siendo una por entrada de la estructura
