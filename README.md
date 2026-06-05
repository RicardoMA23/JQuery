# CRUD con jQuery

Proyecto simple de inventario usando jQuery con operaciones CRUD y persistencia en `localStorage`.

## Validacion del proyecto

Este proyecto es estatico, por lo que no existe una compilacion tradicional.
Para validar si "pasa o no pasa" ahora se usan chequeos reales con herramientas de calidad:

- ESLint para JavaScript
- HTMLHint para HTML
- Stylelint para CSS

Comandos:

1. Instalar dependencias: `npm.cmd install`
2. Ejecutar validacion completa: `npm.cmd run validate`

Si algun chequeo falla, veras el motivo exacto (archivo, linea y regla).

## Funcionalidades

- Crear productos
- Listar productos en tabla
- Editar productos
- Eliminar productos
- Buscar por nombre o categoria
- Persistencia local con `localStorage`

## Estructura

- `index.html`: interfaz principal
- `css/styles.css`: estilos y responsive
- `js/app.js`: logica CRUD

## Como usar

1. Abre `index.html` en tu navegador.
2. Agrega productos desde el formulario.
3. Usa Editar o Eliminar en la tabla.
4. Usa la barra de busqueda para filtrar resultados.

## Nota

No requiere backend. jQuery se carga por CDN, pero la validacion local si requiere instalar dependencias de desarrollo.
