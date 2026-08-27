# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # Catalogo de productos

  SPA desarrollada como parte de una prueba tecnica frontend para la consultora Periferia IT para el cliente Scotiabank. La aplicacion muestra productos desde un archivo JSON y permite buscarlos, filtrarlos y agregarlos a un carrito persistente.

  ## Funcionalidades

  - Listado de productos desde `src/features/products/data/products.json`.
  - Busqueda por nombre del producto.
  - Filtro por categoria generado a partir de los datos disponibles.
  - Estado de carga inicial simulado.
  - Carrito basico con agregar y eliminar productos.
  - Contador de unidades y resumen del carrito.
  - Persistencia del carrito en `localStorage` usando la clave `cart_items`.
  - Drawer accesible para consultar el carrito.
  - Imagenes con carga diferida mediante `loading="lazy"`.
  - Test funcional del filtro por categoria.

  ## Stack

  - React 19
  - TypeScript
  - Vite
  - Redux Toolkit y React Redux para el carrito
  - Sass para estilos
  - Vitest, jsdom y React Testing Library para pruebas
  - Lucide React para iconos

  ## Requisitos

  - Node.js 20 o superior
  - pnpm

  ## Instalacion

  ```bash
  pnpm install
````

## Scripts

Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

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

## Decisiones tecnicas

- El carrito usa Redux Toolkit porque su estado es compartido por tarjetas, contador, drawer y resumen.
- La busqueda y el filtro usan estado local en `ProductPage`, ya que solo afectan a esta vista.
- Las categorias se calculan desde los productos para evitar duplicar configuracion.
- El filtrado se memoriza con `useMemo` y la carga se simula con `useEffect` y `setTimeout`.
- Los controles interactivos principales son botones y los campos tienen etiquetas asociadas para facilitar la navegacion con teclado.

## Mejoras pendientes

La implementación actual utiliza `useMemo` para evitar cálculos innecesarios. Como mejora futura, podría incorporarse `useDeferredValue` para mantener fluida la búsqueda con listados grandes.

- Extraer la lógica de búsqueda y filtrado a un hook reutilizable.
- Incorporar controles para aumentar o disminuir la cantidad de productos en el carrito.

## Pruebas

El test ubicado en `src/pages/ProductPage/ProductPage.test.tsx` comprueba que:

1. Se muestra el estado de carga.
2. Los productos aparecen despues de la carga simulada.
3. La lista se actualiza al seleccionar una categoria.
