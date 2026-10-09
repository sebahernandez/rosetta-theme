# Design

## Context

`sections/promotional-bar.liquid` renderiza `<section class="promotional-banner page-width">` con un bloque `<style>` estático (sin alcance por sección) y un schema sin ajustes de espaciado. La separación lateral viene de `.page-width` en `assets/base.css`: `padding: 0 1.5rem` (15px, el theme usa `font-size: 62.5%`) y `padding: 0 5rem` (50px) desde 750px. El schema declara `"class": "section-promotional-banner"`, por lo que el contenedor de Shopify no lleva la clase `.section` y no recibe el margen automático entre secciones. La sección se usa dos veces en `templates/index.json`.

## Goals / Non-Goals

**Goals:**

- Diez ajustes de tipo `range` (cinco por dispositivo) que el comerciante controla desde el editor.
- Cero cambio visual en los banners existentes.

**Non-Goals:**

- Nivel de espaciado propio para tablet.
- Márgenes laterales o ancho completo (full width).
- Refactorizar el CSS de imágenes existente o corregir el comentario de cabecera del archivo.

## Decisions

**1. Ids en inglés con sufijo de dispositivo, etiquetas en español.**
`margin_top_desktop`, `margin_bottom_desktop`, `padding_top_desktop`, `padding_bottom_desktop`, `padding_horizontal_desktop` y sus equivalentes `_mobile`. La sección ya usa ids en inglés (`banner_image_desktop`, `banner_image_mobile`) y etiquetas en español; se sigue ese patrón en vez del de ids en español de otras secciones propias.

**2. Rangos y valores por defecto.**

| Ajuste | min | max | step | default escritorio | default móvil |
|---|---|---|---|---|---|
| Margen superior / inferior | 0 | 100 | 4 | 0 | 0 |
| Padding superior / inferior | 0 | 100 | 4 | 0 | 0 |
| Padding lateral | 0 | 100 | 5 | 50 | 15 |

Unidad `px`. Los defaults del padding lateral igualan los 5rem / 1.5rem de `.page-width`, así los banners existentes (que no tienen estos valores en `index.json`) no cambian. Alternativa descartada: default 0 en el lateral, porque pegaría los banners publicados al borde de la pantalla.

**3. CSS con alcance por instancia mediante `section.id`.**
Se añade una clase `promotional-banner--{{ section.id }}` al `<section>` y un segundo bloque `{%- style -%}` con las reglas: valores móviles como base y valores de escritorio dentro de `@media screen and (min-width: 750px)`. El selector se escribe como `.promotional-banner.promotional-banner--{{ section.id }}` para ganar en especificidad a `.page-width` sin `!important`. Alternativa descartada: variables CSS inline en el atributo `style`, que es menos legible junto al resto del archivo y no aporta nada sin JS.

**4. Propiedades individuales, no shorthand.**
Se usan `margin-top` / `margin-bottom` (no `margin`) para conservar el `margin: 0 auto` de `.page-width` que centra el banner, y `padding-top` / `padding-bottom` / `padding-left` / `padding-right`.

**5. Corte único en 750px.**
Coincide con el corte de `.page-width` y con el de los paddings de sección heredados de Refresh. Los cortes de imagen del banner (768px / 990px) no se tocan; entre 750px y 767px se ve la imagen móvil con el espaciado de escritorio, igual que hoy ocurre con el padding de `.page-width`.

## Risks / Trade-offs

- [El margen vertical del `<section>` colapsa con el de secciones vecinas que también tengan margen] → Es el comportamiento normal de CSS; si el comerciante necesita separación garantizada puede usar el padding vertical.
- [Diez ajustes nuevos alargan el panel de la sección] → Se agrupan bajo dos encabezados (`header`) al final del schema.
- [`shopify theme check` puede reportar avisos previos del archivo, p. ej. `img_url` obsoleto] → Fuera de alcance; solo se exige que este cambio no introduzca avisos nuevos.
