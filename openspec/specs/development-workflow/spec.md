# development-workflow Specification

## Purpose

Define cómo se entregan los cambios del theme Rosetta al repositorio: qué rama recibe el trabajo y cuándo se considera entregado un cambio.

## Requirements

### Requirement: Entrega de cambios en develop

Todo cambio implementado en el theme SHALL registrarse con un commit en la rama `develop` y SHALL subirse con push a `origin/develop`. Un cambio SHALL NOT considerarse entregado mientras su commit exista solo en el repositorio local.

#### Scenario: Cambio implementado

- **WHEN** se termina de implementar un cambio en el theme
- **THEN** sus archivos quedan en un commit de `develop` y ese commit está en `origin/develop`

#### Scenario: Commit sin push

- **WHEN** un cambio tiene commit en `develop` local pero no se ha hecho push
- **THEN** el cambio no se considera entregado hasta que `origin/develop` contiene ese commit

### Requirement: Artefactos de planificación junto al código

El commit de un cambio SHALL incluir, además del código del theme, los artefactos de OpenSpec que lo describen (proposal, specs, design y tasks), de modo que el repositorio refleje qué se cambió y por qué.

#### Scenario: Cambio con artefactos de OpenSpec

- **WHEN** se hace el commit de un cambio planificado con OpenSpec
- **THEN** el commit contiene el código modificado y la carpeta del cambio bajo `openspec/changes/`
