# Spec Delta

## ADDED Requirements

### Requirement: Favoritos no disponibles en la tienda

La tienda SHALL NOT ofrecer ninguna funcionalidad de favoritos mientras no exista una solución que registre métricas: no SHALL mostrarse botones de favoritos, accesos a una lista de favoritos ni ajustes del theme relacionados.

#### Scenario: Tarjetas sin botón de favoritos

- **WHEN** un visitante ve una tarjeta de producto o una tarjeta de oferta en cualquier página
- **THEN** la tarjeta no muestra ningún botón de favoritos

#### Scenario: Sin botón flotante

- **WHEN** un visitante navega por cualquier página de la tienda
- **THEN** no aparece el botón flotante de favoritos ni su contador

#### Scenario: Página de favoritos retirada

- **WHEN** un visitante abre `/pages/favoritos`
- **THEN** es llevado a la portada de la tienda

#### Scenario: Visitante con favoritos guardados previamente

- **WHEN** un visitante que había guardado favoritos en su navegador vuelve a la tienda
- **THEN** la tienda funciona con normalidad y no muestra rastro de esos favoritos

#### Scenario: Ajustes del theme

- **WHEN** un administrador abre los ajustes del theme en el editor
- **THEN** no existe el grupo de ajustes "Wishlist"

## REMOVED Requirements

### Requirement: Activación desde los ajustes del theme

**Reason**: La funcionalidad de favoritos basada en el navegador se retira completa, por lo que ya no hay nada que activar o desactivar.

**Migration**: Ninguna para el visitante. Si se retoma esta solución, los ajustes y su esquema están descritos en `openspec/specs/wishlist/reimplementacion.md`.

### Requirement: Agregar y quitar favoritos

**Reason**: Los favoritos se guardaban solo en el navegador y no entregaban métricas a la tienda; se reemplazarán por una solución que sí las registre.

**Migration**: Ninguna. El comportamiento retirado y su implementación quedan documentados en `openspec/specs/wishlist/reimplementacion.md`.

### Requirement: Persistencia en el navegador

**Reason**: Guardar la lista en el almacenamiento local del navegador impide medir su uso, que es el motivo del retiro.

**Migration**: Los favoritos ya guardados permanecen en el navegador del visitante sin uso; la futura solución puede leerlos para migrarlos (formato documentado en `openspec/specs/wishlist/reimplementacion.md`).

### Requirement: Página de favoritos

**Reason**: Sin lista de favoritos no hay contenido que mostrar en la página.

**Migration**: `/pages/favoritos` redirige a la portada.

### Requirement: Botón flotante de acceso con contador

**Reason**: Era el acceso a la página de favoritos, que se retira.

**Migration**: Ninguna.
