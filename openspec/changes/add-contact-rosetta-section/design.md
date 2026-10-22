# Design

## Context

- Theme Refresh 15.2.0 con secciones propias en español. La referencia más cercana es `sections/suscribete-rosetta.liquid`: CSS en `{% stylesheet %}`, valores del schema inyectados como variables CSS en el `style` del contenedor, paddings móvil derivados del valor de escritorio, schema con textos en español.
- Ya existe `sections/contact-form.liquid` (heredada, usa `t:` y el CSS `section-contact-form.css`). No se modifica; la nueva sección es independiente.
- El formulario nativo `{% form 'contact' %}` de Shopify solo exige `contact[email]`; el mensaje va en `contact[body]` y cualquier otro `contact[Etiqueta]` se incluye en el correo como campo personalizado.
- Regla del proyecto: no tocar contenido del editor (`templates/*.json`, `*-group.json`, `settings_data.json`).

## Goals / Non-Goals

**Goals:**
- Reproducir el diseño de la referencia con envío 100 % nativo de Shopify.
- Todo editable desde el schema: textos, imagen, colores, tipografías, radios y espaciados por dispositivo.
- Responsive desde 320px sin desbordamiento horizontal.

**Non-Goals:**
- JavaScript propio, envío por AJAX o integraciones externas.
- Modificar `contact-form.liquid` o los templates JSON; añadir la sección a la página se hace desde el editor.
- Nuevos archivos de locales (textos en español en el schema, como las demás secciones propias).

## Decisions

1. **Campos del formulario.** `contact[name]` no es campo reservado en el correo, por lo que se envían: `contact[Nombre]`, `contact[email]`, `contact[Teléfono]`, `contact[Motivo]` y `contact[body]`. Nombres fijos en español (no dependen de las etiquetas editables) para que el correo sea consistente aunque el comerciante renombre las etiquetas. Alternativa descartada: usar la etiqueta editable como clave; rompería filtros de correo al editarla.
2. **Selector de motivo con radios nativos.** Cada bloque `tema` renderiza `<input type="radio" name="contact[Motivo]" value="{{ label }}">` oculto visualmente + `<label>` con estilo de pastilla. El primero lleva `checked`; tras un error se restaura el valor con `form` (`form['Motivo']`; si no está disponible se conserva el primero). Ventajas: sin JS, teclado y lector de pantalla nativos (`fieldset` + `legend`). Alternativa descartada: botones con JS; añade código y accesibilidad manual.
3. **Pastillas sin cortes.** `flex-wrap: wrap` en el contenedor y `white-space: nowrap` en cada pastilla, evitando el defecto visible en la referencia ("Deliv/ery", "Otr/o").
4. **Variables CSS desde el schema.** Mismo patrón que `suscribete-rosetta`: el contenedor recibe `--cr-*` en `style` (colores, tamaños, radios, espacios) y el CSS vive en `{% stylesheet %}`. Espaciados y tamaños tienen par `_mobile`/`_desktop`; el breakpoint es 750px y el cambio a dos columnas a 990px, igual que las demás secciones propias.
5. **Tipografía.** Dos `font_picker` (títulos y texto) aplicados con `font-family` y `font-weight` desde `font.family`/`font.weight`, más `{{ font | font_face }}` en el `style` de la sección. El acento del título usa la misma fuente en cursiva (`font-style: italic`) y color propio; la cursiva real se pide con `font | font_modify: 'style', 'italic'` cuando exista.
6. **Título en dos líneas.** Dos settings (`heading` y `heading_accent`) dentro de un mismo `<h1>/<h2>`; el nivel del encabezado es configurable (select h1/h2) para no duplicar `h1` si la plantilla ya lo tiene.
7. **Imagen.** `image_picker` + `image_url` con `srcset`/`sizes` y `loading: lazy`; sin imagen, `placeholder_svg_tag`. Radio de la imagen configurable; `aspect-ratio` configurable (select 4:3, 1:1, 3:2, 16:9).
8. **Mensajes.** Éxito: región `role="status"` con el texto configurable al inicio de la tarjeta. Error: `role="alert"` con `form.errors` nativo; `aria-invalid` en el correo.
9. **Opcional en el Teléfono** se marca con el texto "(opcional)" dentro de la etiqueta editable; Nombre, Correo y Mensaje llevan `required` y asterisco.
10. **Orden en móvil.** Una columna: insignia, título, descripción, imagen, cita, tarjeta.

## Risks / Trade-offs

- `form['Motivo']` puede no repoblarse tras un error en todos los casos; mitigación: la primera opción queda marcada y el mensaje se conserva (el motivo es secundario frente al correo/mensaje).
- La cursiva del acento depende de que la fuente elegida tenga variante itálica; si no, el navegador sintetiza una oblicua.
- Muchas opciones de schema (~60): se agrupan con `header` por tema (Textos, Imagen, Selector, Colores, Tipografía, Espaciados) para mantener el editor manejable.
- Que el envío llegue al correo depende de la configuración de notificaciones de la tienda (fuera del alcance del código).
