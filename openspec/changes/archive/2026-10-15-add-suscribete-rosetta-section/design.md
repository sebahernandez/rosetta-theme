# Design

## Context

Las secciones propias siguen el patrón de `beneficios.liquid`: `{%- style -%}` que aplica fondo, márgenes y rellenos a `#shopify-section-{{ section.id }}`, `{% stylesheet %}` para el CSS base, variables CSS inline para colores y schema en español. `newsletter.liquid` ya usa `{% form 'customer' %}` con `contact[tags]=newsletter`, pero depende de clases de Refresh (`field`, `color-scheme`), CSS con `!important` y una columna social; no se reutiliza ni modifica. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Una sola sección autocontenida (`sections/suscribete-rosetta.liquid`), sin JS ni assets nuevos.
- Suscripción 100 % nativa de Shopify, sin endpoints ni apps externas.
- Textos, fondos, botón, márgenes y rellenos configurables desde el editor.
- Responsive con CSS puro (flex/grid + media queries).

**Non-Goals:**
- No migrar ni eliminar `newsletter.liquid`.
- No envío por AJAX ni integración con Klaviyo u otras apps.
- No modificar archivos de contenido (`templates/*.json`, `settings_data.json`).

## Decisions

1. **Formulario nativo `{% form 'customer', id: 'SuscribeteForm-{{ section.id }}' %}`.** Con `<input type="hidden" name="contact[tags]" value="newsletter">` y `contact[email]`. Shopify crea el cliente con consentimiento de marketing por correo (mismo mecanismo que Dawn/Refresh) y redirige a la misma página con `form.posted_successfully?`. El `id` del form hace que Shopify añada el ancla `#id`, así la página vuelve a la sección tras el envío. Alternativa descartada: `fetch` AJAX al endpoint `/contact`; añade JS y estados a mantener sin beneficio real.
2. **Éxito y error en el servidor.** Éxito: `form.posted_successfully?` muestra el mensaje configurable (`success_text`). Error: `form.errors` muestra el mensaje nativo traducido (`form.errors.messages.email`) y conserva `form.email` en el campo. Un correo ya existente no genera error en Shopify, así que cae en el caso de éxito.
3. **Colores y radio por variables CSS en el contenedor.** El `<div class="suscribete">` recibe `--sus-card-bg`, `--sus-radius`, `--sus-eyebrow`, `--sus-title`, `--sus-text`, `--sus-input-bg`, `--sus-input-text`, `--sus-btn-bg`, `--sus-btn-text`, `--sus-btn-hover`; el `{% stylesheet %}` los consume. Sin `!important`.
4. **Separación y rellenos.** Ids `outer_padding_top|bottom|x` (relleno de la sección: separa la tarjeta de su contenedor y queda sobre el fondo de la franja) y `padding_top|bottom|x` (interior de la tarjeta), rango 0–120 px, paso 4, igual que `beneficios`. Fondo exterior vía `section_bg` aplicado en `#shopify-section-{{ section.id }}`.
5. **Layout.** Móvil (<750px): columna única; el formulario en columna, campo y botón al 100 %. Tablet (750–989px): texto arriba, formulario debajo en una fila. Escritorio (≥990px): grid de dos columnas, texto a la izquierda y formulario alineado abajo a la derecha (`align-self: end`), con campo `flex: 1` y botón de ancho automático, ambos en píldora (`border-radius: 999px`).
6. **Flecha del botón.** SVG inline con `currentColor` dentro del botón, condicionada por `show_arrow`.
7. **Accesibilidad.** `<label>` visualmente oculto (`visually-hidden`, clase del theme) para el correo; `aria-describedby` al mensaje; mensajes con `role="status"` (éxito) y `role="alert"` (error); `:focus-visible` con outline en campo y botón; `autocomplete="email"`, `type="email"`, `required`.
8. **Contenido protegido.** Defaults en español escritos en el schema (preset); sin tocar JSON de contenido. Los textos del eyebrow se escriben tal cual y se transforman con CSS `text-transform: uppercase` para que el comerciante escriba en minúsculas.

## Risks / Trade-offs

- [El `sections/*.liquid` con `{% form %}` duplicado si se añade dos veces en la misma página] → Ids de campo y form derivados de `section.id`.
- [Tras el envío la página recarga] → Ancla del form devuelve la vista a la sección; aceptable sin JS.
- [Contraste bajo si se eligen colores claros] → Defaults con contraste suficiente (texto oscuro sobre rosa, texto oscuro sobre verde); la elección final es del comerciante.
- [Shopify exige consentimiento de marketing configurado en Admin para enviar campañas] → El correo queda registrado de todos modos; se documenta en las tareas de verificación.
- [Mensajes de error nativos dependen del idioma del locale] → Se usan `form.errors` traducidos por Shopify.
