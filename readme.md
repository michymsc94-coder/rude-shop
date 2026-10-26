# CARRITO DE COMPRA - RUDE SHOP

## Descripción

Elaboración de un carrito de compras para una tienda de artículos tecnológicos llamada RUDE. Esta página está conformada por dos elementos principales:

- **Tabla de productos:** Muestra la lista de productos disponibles en la tienda, con su nombre, referencia y su precio. Incluye una columna con los botones `+` y `-` para seleccionar la cantidad de cada producto y otra donde se calcula el total por producto.
- **Recuadro de resumen:** Muestra las unidades, el nombre y el subtotal de cada producto seleccionado, y el total de la compra.


## Archivos

El proyecto cuenta con cuatro archivos:

- `index.html`: Engloba la estructura básica de la página (tabla y resumen).
- `estilos.css`: Abarca la parte visual (colores, fuentes y tamaños) y la adaptación de la pantalla a diferentes tamaños.
- `script.js`: Incluye la clase carrito, funciones del DOM, junto con los eventos y petición fetch.
- `api.php`: API local sin base de datos que devuelve el JSON.

## Ejecución

Para ejecutar el proyecto debes realizar los siguientes pasos:

1. Copia la carpeta del proyecto en `C:\xampp\htdocs\rude-shop`.
2. Abre el panel de control XAMPP y pulsa **Start** en Apache.
3. Abre el navegador y copia la siguiente URL: `http://localhost/rude-shop`.

### Importante 

- No abras `index.html` con doble clic ya que el fetch necesita del servidor.
- Si Apache utiliza otro puerto, inclúyelo en la URL.

## Cómo funciona

### Clase Carrito

La clase `Carrito` guarda los productos y el tipo de moneda, y hace todos los cálculos. Su constructor recibe los productos de la API, convierte el precio de cada uno de texto a número y les añade las unidades (`quantity`) y el subtotal, empezando ambos en cero.

La clase incluye tres métodos:

- **Buscar un producto por su SKU** (`obtenerInformacionProducto(sku)`): Recorre la lista de productos y devuelve el que tiene ese sku.
- **Actualizar las unidades de un producto** (`actualizarUnidades(sku, unidades)`): Aplica el método anterior para localizar el producto, comprueba que las unidades no sean negativas (si lo son, las deja en 0), las guarda y recalcula el subtotal.
- **Obtener el resumen del carrito** (`obtenerCarrito()`): Selecciona los productos con unidades, suma sus subtotales y devuelve el total, la moneda y lista de productos.

### Funciones

- `mostrarProductos()`: Crea una fila en la tabla por cada producto, con su nombre, referencia, botones, precio y subtotal. Al pulsar los botones `+` o `-`, le pide al carrito que actualice las unidades, actualiza la cantidad y el subtotal de la fila y llama a `mostrarResumen()`.
- `mostrarResumen()`: Pide el resumen al método `obtenerCarrito()`, vacía la lista y crea una línea por cada producto que tenga unidades. Por último, escribe el total.
- `iniciar()`: Pide los productos al archivo `api.php` mediante `fetch`, comprueba que la respuesta es correcta, la convierte en un objeto con `.json()`, crea el carrito y pinta la página. Si algo falla, muestra el error en consola.

El funcionamiento se divide en dos partes: la clase `Carrito`, que se encarga de gestionar todos los calculos, y las funciones de la vista, las cuales muestran los resultados en pantalla.

## Cambios respecto al ejemplo del profesor

- Implementé un bucle `for...of` con un `if` para buscar un producto por su SKU, en lugar de un `find`, ya que es la forma que más domino.
- Usé un if para evitar las cantidades negativas en vez de `Math.max`, porque deja la condición más clara.
- Añadí un cuarto producto a la API para comprobar que el código funciona con cualquier número de productos sin cambiar el JavaScript.
- Realicé un diseño propio: nombre de la tienda, tipografías y adaptación a pantallas con `@media`.
- Usé una API local (`api.php`) siguiendo la propuesta de la clase para evitar los problemas que se comentaron respecto a JSONBlob.

## Dificultades

- Acceder a los datos nivel por nivel.
- Diferenciar el for clásico, aquel donde la variable es la posición, del `for...of`, donde la variable es el propio elemento.
- Las variables que solo existen dentro de unas llaves, por ejemplo colocar fuera el append fuera del bucle.
- Errores con el JSON (claves sin comillas), con Apache sin arrancar y con la caché del navegador.

## Aprendizajes

- Separar la lógica (la clase) de la vista (funciones que tocan HTML).
- Diseñar la estructura de los datos.
- Usar la consola para encontrar errores y leer los mensajes en rojo.
- Usar `await` para esperar que lleguen los datos y `try/catch` para controlar los fallos.
