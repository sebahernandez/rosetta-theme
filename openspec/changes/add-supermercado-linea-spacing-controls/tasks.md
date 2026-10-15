## 1. Preparación

- [x] 1.1 Ejecutar `git pull origin develop` para partir de la rama actualizada

## 2. Esquema y estilos externos

- [x] 2.1 En `sections/supermercado-linea.liquid`, añadir al esquema los ajustes `margin_top_mobile`, `margin_bottom_mobile`, `margin_x_mobile`, `margin_x`, `padding_top_mobile`, `padding_bottom_mobile`, `padding_x_mobile` y `padding_x` (conservando los ids existentes `margin_top`, `margin_bottom`, `padding_top`, `padding_bottom` como valores de escritorio), agrupados bajo headers de móvil y escritorio
- [x] 2.2 Reescribir el bloque `{% style %}` de `#shopify-section-{{ section.id }}` para aplicar los valores móviles por defecto y los de escritorio desde `min-width: 750px`, incluyendo `margin-inline` y `padding-inline`

## 3. Espaciado interno

- [x] 3.1 Añadir los ajustes del panel (`panel_padding_top|bottom|x` y `panel_gap`, con versión `_mobile`) y consumirlos en `.supermercado-linea__panel` mediante variables CSS, retirando los valores fijos equivalentes del CSS y de la media query `max-width: 989px`
- [x] 3.2 Añadir los ajustes de la tarjeta promocional (`promo_padding_y|x`, `promo_offset`, con versión `_mobile`) y consumirlos en `.supermercado-linea__promo`, ajustando `max-width` para que no desborde
- [x] 3.3 Fijar los defaults para reproducir el espaciado actual: panel móvil 32/32/20 y escritorio 50/50/40; gap móvil 20 y escritorio 24; promo móvil 12/16 con distancia 16 y escritorio 16/20 con distancia 32

## 4. Verificación

- [x] 4.1 Ejecutar `shopify theme check` y confirmar 0 ofensas nuevas en `sections/supermercado-linea.liquid`
- [x] 4.2 Prueba manual en el editor de temas: cada control modifica solo su dispositivo (móvil < 750px, escritorio ≥ 750px), los valores guardados de escritorio se conservan y sin configurar el aspecto coincide con el actual; sin desbordes
- [x] 4.3 Ejecutar `git diff --name-only` y confirmar que no hay archivos de contenido (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`)

## 5. Entrega

- [x] 5.1 Hacer commit con mensaje convencional y push a `develop`
