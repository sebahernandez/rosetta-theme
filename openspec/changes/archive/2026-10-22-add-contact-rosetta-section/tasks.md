# Tasks

## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` y confirmar que el árbol de trabajo está limpio salvo `.atl/`

## 2. Sección contact-rosetta.liquid

- [x] 2.1 Crear `sections/contact-rosetta.liquid` con la estructura: insignia, título (2 líneas), descripción, imagen y cita en la columna izquierda; tarjeta con formulario en la derecha
- [x] 2.2 Implementar `{% form 'contact' %}` con `contact[Nombre]`, `contact[email]`, `contact[Teléfono]`, `contact[Motivo]` y `contact[body]`, `required` en Nombre, Correo y Mensaje, valores conservados tras error y mensajes de éxito (`role="status"`) y error (`role="alert"`)
- [x] 2.3 Implementar el selector de motivo con bloques `tema` (radios nativos en `fieldset`/`legend`, primera opción marcada, pastillas sin corte de texto, foco visible)
- [x] 2.4 Implementar imagen con `image_url`/`srcset`/`sizes`, `placeholder_svg_tag` sin imagen y texto alternativo configurable
- [x] 2.5 Escribir el CSS en `{% stylesheet %}` con variables `--cr-*`: dos columnas desde 990px, una columna debajo, campos Nombre/Correo apilados en móvil, botón de ancho completo en móvil, sin overflow horizontal desde 320px
- [x] 2.6 Escribir el schema en español: textos, imagen, selector (bloque `tema`, máx. 8, preset con 5 opciones), colores, tipografías (`font_picker` y tamaños móvil/escritorio), radios y espaciados móvil/escritorio, con defaults de la referencia y `presets`

## 3. Verificación

- [x] 3.1 Ejecutar `shopify theme check` y corregir errores de la nueva sección
- [x] 3.2 Prueba manual con `shopify theme dev` en la página de contacto: añadir la sección en el editor, cambiar textos, imagen, colores, fuentes y espaciados y comprobar que cada setting se refleja
- [x] 3.3 Probar envío exitoso (llega el correo con Nombre, correo, teléfono, motivo y mensaje), envío con correo inválido (error nativo) y teléfono vacío
- [x] 3.4 Probar responsive a 320, 375, 768, 990 y 1440px: sin scroll horizontal, pastillas sin cortes y teclado sobre el selector

## 4. Cierre

- [x] 4.1 Verificar con `git diff --name-only` que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`) y que solo cambia `sections/contact-rosetta.liquid`
- [x] 4.2 Commit con conventional commits y push a `develop`
