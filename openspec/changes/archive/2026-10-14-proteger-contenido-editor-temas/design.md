# Design

## Context

El theme se sincroniza con GitHub (commits `Update from Shopify` escriben `templates/*.json` y `sections/*-group.json`) y también se edita localmente. Los commits `26e7e0e` y `182145c` muestran que `sections/header-group.json` cambió tanto desde código como desde el editor. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Que ningún commit de código modifique contenido del editor.
- Que partir de una copia desactualizada no pise ediciones del comerciante.

**Non-Goals:**
- No se cambia el comportamiento visible de la tienda.
- No se introduce build step ni dependencias (el proyecto no tiene `package.json`).

## Decisions

1. **Convención por rutas.** La clasificación código/contenido se basa en rutas (ver spec). Alternativa: marcar archivos a mano; descartada por frágil.
2. **`.shopifyignore`** con `templates/*.json`, `sections/*-group.json`, `config/settings_data.json`. Protege `shopify theme push/dev`. Limitación: no afecta la integración de GitHub, que se cubre con la regla de commits.
3. **Pull previo + `git status` antes de commitear.** Verificación manual: `git diff --name-only` no debe listar archivos de contenido. Alternativa: hook `pre-commit` en `.githooks`; se difiere para no añadir tooling sin pedirlo.
4. **Excepción aprobada y en commit separado**, para casos como registrar una sección nueva en una plantilla; se edita solo la clave necesaria.
5. **Regla en `openspec/config.yaml`** (rules de tasks) para que todo cambio futuro incluya la verificación.

## Risks / Trade-offs

- [Un cambio de código necesita defaults en un JSON] → Excepción aprobada con commit separado.
- [Olvidar el pull previo] → Primera tarea de cada change; verificar con `git status -sb`.
- [`.shopifyignore` impide subir contenido a propósito] → Se puede subir puntualmente con `--only` si el usuario lo pide.
