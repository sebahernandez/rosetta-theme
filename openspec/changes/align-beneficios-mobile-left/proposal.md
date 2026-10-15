## Why

En móvil, cada beneficio de la sección "Beneficios" se muestra centrado horizontalmente dentro de su fila (`justify-content: center`), por lo que los íconos y textos de beneficios con distinta longitud quedan desalineados entre sí. Alinear todo al borde izquierdo da una lectura más ordenada en una sola columna.

## What Changes

- En móvil (menos de 750px), cada beneficio se alinea a la izquierda de su fila: ícono primero y texto a continuación, con alineación de texto a la izquierda.
- El ícono y el bloque de texto (título + descripción) permanecen centrados verticalmente entre sí en cada fila.
- Tablet (750px+) y escritorio no cambian: se mantiene la distribución actual.
- No se agregan ajustes nuevos al editor de temas ni se modifican archivos de contenido.

## Capabilities

### New Capabilities

### Modified Capabilities
- `beneficios-section`: el requirement "Diseño responsive" cambia el comportamiento en móvil: los beneficios se alinean a la izquierda con ícono y texto centrados verticalmente entre sí.

## Impact

- Código: `sections/beneficios.liquid` (solo CSS del bloque `{% stylesheet %}`).
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`.
- Sin dependencias ni cambios de esquema.
