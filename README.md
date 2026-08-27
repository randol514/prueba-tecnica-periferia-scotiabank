# Catalogo de productos

SPA desarrollada como parte de una prueba tecnica frontend para Periferia IT y Scotiabank. La aplicacion muestra productos desde un archivo JSON y permite buscarlos, filtrarlos y agregarlos a un carrito persistente.

## Como ejecutar el proyecto

### Requisitos

- Node.js 20 o superior
- pnpm

### Instalacion

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Vite iniciara el servidor local y mostrara la URL disponible en la terminal.

### Validacion

Crear el build de produccion:

```bash
pnpm build
```

Ejecutar ESLint:

```bash
pnpm lint
```

Ejecutar las pruebas:

```bash
pnpm test -- --run
```

## Funcionalidades

- Listado de productos desde `src/features/products/data/products.json`.
- Busqueda por nombre del producto.
- Filtro por categoria generado desde los datos disponibles.
- Estado de carga inicial simulado.
- Carrito basico con agregar y eliminar productos.
- Contador de unidades y resumen del carrito.
- Persistencia del carrito en `localStorage` usando la clave `cart_items`.
- Drawer accesible para consultar el carrito.
- Imagenes con carga diferida mediante `loading="lazy"`.

## Decisiones tecnicas

- Se utiliza Redux Toolkit para el carrito porque su estado es compartido por las tarjetas de producto, el contador, el drawer y el resumen.
- La busqueda y el filtro se manejan con estado local en `ProductPage`, ya que solo afectan a esta vista.
- Las categorias se calculan a partir de los productos para evitar duplicar configuracion.
- El filtrado y la lista de categorias usan `useMemo` para evitar calculos innecesarios cuando cambian otros estados de la pagina.
- La carga inicial se simula con `useEffect` y `setTimeout`, incluyendo la limpieza del timeout al desmontar el componente.
- Los controles interactivos principales son botones y los campos tienen etiquetas asociadas para facilitar la navegacion con teclado.

## Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit y React Redux
- Sass
- Vitest, jsdom y React Testing Library
- Lucide React

## Estructura principal

```text
src/
├── app/store/                 Configuracion de Redux
├── components/ui/             Componentes reutilizables
├── features/cart/             Carrito, drawer y persistencia
├── features/products/         Datos, servicio y componentes de productos
├── pages/ProductPage/         Pagina principal y filtros
└── styles/                    Estilos globales y Sass
```

## Pruebas

El test funcional ubicado en `src/pages/ProductPage/ProductPage.test.tsx` comprueba que:

1. Se muestra el estado de carga.
2. Los productos aparecen despues de la carga simulada.
3. La lista se actualiza al seleccionar una categoria.

## Mejoras pendientes

Las siguientes mejoras no son necesarias para el flujo principal, pero podrian incorporarse con mas tiempo:

- Usar `useDeferredValue` para mantener fluida la busqueda con listados significativamente mas grandes.
- Extraer la logica combinada de busqueda y filtrado a un hook reutilizable.
- Incorporar controles para aumentar y disminuir la cantidad de productos en el carrito.
