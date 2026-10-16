## ADDED Requirements

### Requirement: Equivalente en bolívares en tarjetas cargadas dinámicamente

El equivalente en bolívares SHALL mostrarse también en las tarjetas de producto que se insertan en la página después de la carga inicial, como las de "También te puede gustar" y las de una colección tras filtrar u ordenar. Estas tarjetas MUST NOT quedar indefinidamente en el estado de carga cuando la tasa está disponible.

#### Scenario: Recomendaciones en la página de producto

- **WHEN** una página de producto carga las tarjetas de "También te puede gustar" después de la carga inicial
- **THEN** cada tarjeta muestra su equivalente como `≈ Bs <monto>` en lugar de "Cargando..."

#### Scenario: Colección filtrada u ordenada

- **WHEN** un visitante aplica un filtro u orden en una colección y la grilla de productos se actualiza
- **THEN** las tarjetas nuevas muestran su equivalente en bolívares

#### Scenario: Tarjetas dinámicas sin tasa disponible

- **WHEN** se insertan tarjetas después de la carga inicial y ninguna fuente devuelve una tasa
- **THEN** esas tarjetas muestran el estado de error (`Bs (error)`) y el precio en USD permanece visible

#### Scenario: Una sola consulta de tasa

- **WHEN** se insertan tarjetas dinámicas en una página que ya obtuvo la tasa
- **THEN** se reutiliza la tasa obtenida sin consultar nuevamente las fuentes externas
