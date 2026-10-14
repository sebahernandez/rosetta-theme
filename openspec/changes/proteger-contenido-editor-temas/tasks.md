# Tasks

## 1. Protección en el CLI

- [x] 1.1 Crear `.shopifyignore` excluyendo `templates/*.json`, `sections/*-group.json` y `config/settings_data.json`; verificar con `bat .shopifyignore` y que `shopify theme push --dry-run` (si está disponible) no lista esos archivos

## 2. Regla de flujo de trabajo

- [x] 2.1 Agregar en `openspec/config.yaml` (rules de tasks) la regla: sincronizar con `origin/develop` al inicio y verificar con `git diff --name-only` que no hay archivos de contenido; verificar que el YAML sigue siendo válido con `openspec context --json`
- [x] 2.2 Documentar la clasificación código/contenido en `openspec/config.yaml` (context); verificar leyendo el archivo

## 3. Validación

- [x] 3.1 Ejecutar `openspec validate proteger-contenido-editor-temas --strict` y verificar que pasa
- [x] 3.2 Ejecutar `shopify theme check` y verificar que no hay errores nuevos
- [ ] 3.3 Prueba manual: cargar una imagen en el editor de temas, hacer un cambio de código de prueba y confirmar que la imagen persiste y que el commit no incluye archivos de contenido
- [x] 3.4 Commit y push a `develop` incluyendo la carpeta del cambio (ver spec `development-workflow`)
