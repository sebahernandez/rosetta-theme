# Proposal

## Why

El catálogo de Rosetta Market necesita reorganizarse según la nueva estructura de categorías de supermercado (9 categorías principales con sus subcategorías). Las colecciones actuales de la tienda no siguen esa estructura y deben reemplazarse, conservando solo las colecciones comerciales "Ofertas" y "Más vendidos".

## What Changes

- **BREAKING**: Se eliminan de la tienda `rosetta-ve.myshopify.com` todas las colecciones existentes excepto "Ofertas" y "Más vendidos" y, por decisión del usuario durante la aplicación, "ofertas destacadas" (`ofertas-destacadas`) y "Productos Populares" (`productos-populares`), que usa la página de inicio. Los productos NO se eliminan; solo dejan de pertenecer a las colecciones borradas.
- Se crean 56 colecciones nuevas (9 principales + 47 subcategorías) con los títulos exactos de la lista entregada:
  - **Bebidas sin alcohol**: Bebidas en polvo y sobres; Energéticas y deportivas; Gaseosas; Jugos, néctares y té frío; Maltas; Sodas, agua mineral con gas y sin gas.
  - **Cigarrillos y tabaco**: Cigarrillos; Encendedores; Tabaco.
  - **Confitería y snacks**: Caramelos y gomitas; Chicles y mentas; Chocolates; Frutos secos; Galletas, obleas y barquillos; Pasapalos y snacks salados.
  - **Cuidado personal**: Cremas dentales; Jabones de baño; Papel higiénico; Toallas sanitarias.
  - **Lácteos y refrigerados**: Leches en polvo; Leches y cremas; Margarinas y mantequillas; Yogures y postres.
  - **Licores y cervezas**: Aguardientes; Brandy; Cervezas; Ginebra; Licores y cremas; Ron; Sangría; Vinos y espumantes; Vodka y bebidas preparadas; Whisky.
  - **Limpieza y hogar**: Lavaplatos.
  - **Panadería y pastelería** (sin subcategorías).
  - **Víveres y despensa**: Aceites y vinagres; Arroz y granos; Azúcar, endulzantes y saborizantes; Cereales y compotas; Condimentos y caldos; Enlatados y conservas; Harinas y almidones; Mermeladas y untables; Pastas; Postres y gelatinas; Repostería; Salsas y aderezos; Té, infusiones y café.
- Toda la operación se ejecuta con Shopify CLI (`shopify store auth` + `shopify store execute` sobre la Admin GraphQL API), con respaldo previo de las colecciones eliminadas.

Supuestos (a confirmar antes de aplicar):
- Las colecciones nuevas se crean como colecciones manuales, vacías y publicadas en la tienda online; la asignación de productos queda fuera de este cambio.
- Las colecciones de Shopify son planas: la jerarquía principal/subcategoría se registra en el archivo de datos del cambio para construir después el menú. Crear o modificar menús de navegación queda fuera de alcance.
- "Ofertas" y "Más vendidos" se identifican por título; si el título real difiere (p. ej. "Ofertas destacadas"), se confirma con el usuario antes de borrar nada.

## Capabilities

### New Capabilities
- `store-collections`: estructura de colecciones del catálogo de la tienda (qué colecciones existen, cuáles se preservan y cómo se gestionan vía CLI).

### Modified Capabilities
<!-- Ninguna: no cambian requisitos de specs existentes del theme. -->

## Impact

- **Datos de la tienda** (no código del theme): colecciones en Shopify Admin. Operación irreversible salvo por el respaldo JSON.
- **Enlaces del theme**: `templates/index.json` enlaza a colecciones que probablemente se eliminen (`panaderia`, `bebidas`, `cocinar`, `snacks`, `belleza-y-salud`; también `ofertas-destacadas`). Esos enlaces quedarán rotos hasta que se reasignen desde el editor de temas (contenido del editor, ver spec `theme-content-protection`; no se editan por código).
- **Menús de navegación**: los ítems que apunten a colecciones eliminadas quedarán rotos y deberán actualizarse en Shopify Admin.
- **Autenticación**: requiere `shopify store auth` con scopes `read_products,write_products` (interactivo en el navegador).
