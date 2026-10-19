## Context

El logo del footer no lo renderiza `brand_information`: en `sections/footer-group.json` es un bloque `image` (`logo-rosetta-white.webp`, 100 px), renderizado en la rama `when 'image'` de `sections/footer.liquid` (`.footer-block-image` > `.footer-block__image-wrapper`). El footer ya tiene `payment_enable` (iconos nativos `list-payment` del pie inferior), que es otra funcionalidad y no se toca.

## Goals / Non-Goals

**Goals:** fila de 3 imágenes bajo el logo, editable por imagen desde el editor, con respaldo CDN, sin tocar el resto del footer.
**Non-Goals:** rediseñar el footer, modificar el logo, tocar `footer-group.json` o `settings_data.json`.

## Decisions

1. **Ajustes a nivel de sección, no de bloque.** El pedido es un grupo único en el schema del footer; ids `medios_pago_mostrar`, `medios_pago_pago_movil`, `medios_pago_zelle`, `medios_pago_stripe`, `medios_pago_tamano`, `medios_pago_separacion`, bajo un `header` "Medios de pago bajo el logo". Alternativa descartada: ajustes en el bloque `image` (se repetirían en cada bloque de imagen).
2. **Punto de inserción:** dentro de `.footer-block-image`, justo después del `.footer-block__image-wrapper` del logo, y solo en el primer bloque `image` (variable `medios_pago_renderizados` asignada antes del `for` y marcada tras renderizar) para evitar duplicados. Hereda la alineación (`left/center/right`) del bloque del logo; como el contenedor es `display: flex`, la fila se coloca en una nueva fila con `flex-basis: 100%` envuelto en un `div` propio.
3. **Respaldo con Liquid:** por cada medio, si `section.settings.medios_pago_X != blank` usar `| image_url: height: 2x` + `image_tag`-equivalente con `srcset`; si no, usar la URL CDN fija proporcionada (`...pago-movil.avif`, `zelle.avif`, `stripe.avif` con `?v=1792439585`). `image_picker` no admite URL por defecto, de ahí el respaldo.
4. **Tamaño = alto en px** (`range` 20–80, paso 2, default 40): el alto fijo con `width: auto` conserva la proporción sin deformar y evita saltos de layout. **Separación** (`range` 0–32, paso 2, default 12) como `gap` del flex. Ambos se inyectan como variables CSS en el `{% style %}` existente del footer (`--medios-pago-alto`, `--medios-pago-gap`).
5. **CSS** en `assets/section-footer.css`: `.footer-payment-methods { display:flex; flex-wrap:wrap; gap:var(--medios-pago-gap); align-items:center; width:100%; margin-bottom:2rem; max-width:100% }`, `img { height:var(--medios-pago-alto); width:auto; max-width:100%; object-fit:contain }`. Sin media queries: `flex-wrap` resuelve el responsive. En móvil se centra igual que `.footer-block-image` (<750 px).
6. **Atributos `img`:** `alt` fijo en español ("Pago Móvil", "Zelle", "Stripe"; para imágenes elegidas se usa igualmente el nombre del medio), `loading="lazy"`, `height` y `width` HTML. Las dimensiones intrínsecas de los AVIF de respaldo no se conocen en el repo: se medirán en la implementación (descarga y lectura de cabecera) y se fijan como `width`/`height` de respaldo; para imágenes elegidas se usan `image.width/height`.
7. **Idioma/convención:** labels del schema en español escritos directamente, como en las secciones propias del proyecto.

## Risks / Trade-offs

- Las URLs de respaldo dependen del CDN de Shopify; si el archivo se borra del admin, se rompe el respaldo → el comerciante puede elegir imagen propia.
- Si el comerciante quita todos los bloques `image`, los medios de pago no se muestran (viven bajo el logo) → comportamiento aceptado y documentado.
- Los ajustes nuevos no existen en `footer-group.json`; Shopify usa los `default` del schema hasta que se guarde en el editor, por lo que no hace falta modificar archivos de contenido.
