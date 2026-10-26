// ----------------------- Clase Carrito ------------------------------
class Carrito{
    constructor(productos, moneda){
        this.productos = productos;
        this.moneda = moneda;
        
        for (const p of this.productos){
            p.price = Number(p.price);
            p.quantity = 0;
            p.subtotal = 0;
        }
    }

//  --------------------- Método: Buscar producto ------------------------
    obtenerInformacionProducto(sku){
        for(const producto of this.productos){
            if(producto.SKU === sku){
                return producto;
            }
        }
    }

//  --------------------- Método: Actualizar Unidades ------------------------
    actualizarUnidades(sku, unidades){
        const p = this.obtenerInformacionProducto(sku);
        if(unidades < 0){
            unidades = 0;
        }
        p.quantity = unidades;
        p.subtotal = Number((p.price * p.quantity).toFixed(2));
            
    }

//  ---------------------- Método: Obtener Carrito -----------------------------
    obtenerCarrito() {
        const productosEnCarrito = [];
        let total = 0;

        
        for(const p of this.productos){
            if(p.quantity > 0){
                productosEnCarrito.push(p);
                total += p.subtotal;
            }
        }

        total = Number(total.toFixed(2));

        return {
            total: total,
            currency: this.moneda,
            products: productosEnCarrito
        };
    }

}

//          ------ Variable compartida entre funciones ------
let carrito;


//  ------------------------- FUNCIONES - HTML ---------------------------------

//                 ------ Función Mostrar Productos - Tabla ------
function mostrarProductos(){
//  ----- Variable (Tabla) - Busca el elemento: id="productos"
    const tabla = document.getElementById("productos");

//  ----- Bucle for - Recorrer los elementos del carrito
    for (const producto of carrito.productos){
        // ----- Variable (fila) - Crea un elemento <tr> (fila)
        const fila = document.createElement("tr");

        // ----- En cada vuelta introduce el contenido en (fila)
        fila.innerHTML = `

            <td class="col-producto">
                ${producto.title}
                <p class="ref">REF: ${producto.SKU}</p>
            </td>

            <td>
                <button class="menos">-</button>
                <span class="cantidad">${producto.quantity}</span>
                <button class="mas">+</button>
            </td>

            <td>
                ${producto.price.toFixed(2)} ${carrito.moneda}
            </td>

            <td>
                <span class="subtotal">${producto.subtotal.toFixed(2)} ${carrito.moneda}</span>
            </td>
        `;

        // ----- Variables que busca las class de los elementos: <button> + <span>
        const botonMenos = fila.querySelector(".menos");
        const botonMas = fila.querySelector(".mas");
        const spanCantidad = fila.querySelector(".cantidad");
        const spanSubtotal = fila.querySelector(".subtotal");

        // ----- Función (+) que responde a un evento (clic)
        botonMas.addEventListener("click", function(){

            carrito.actualizarUnidades(producto.SKU, producto.quantity + 1);
            spanCantidad.textContent = producto.quantity;
            spanSubtotal.textContent = `${producto.subtotal.toFixed(2)} ${carrito.moneda}`;
            mostrarResumen();
        });

        // ----- Función (-) que responde a un evento (clic)
        botonMenos.addEventListener("click", function(){

            carrito.actualizarUnidades(producto.SKU, producto.quantity - 1);
            spanCantidad.textContent = producto.quantity;
            spanSubtotal.textContent = `${producto.subtotal.toFixed(2)} ${carrito.moneda}`;
            mostrarResumen();
        });

        // ----- Añade las filas a la tabla
        tabla.append(fila);
    }
}



//          ----- Función Mostrar Resumen en el <aside> total gris ------
function mostrarResumen(){
//  ---- Variable Lista - Busca los elementos del aside por id
    const lista = document.getElementById("lista-resumen");
    const parrafoTotal = document.getElementById("total");

//  ---- Variable Resumen - pide el resumen al método obtenerCarrito()
    const resumen = carrito.obtenerCarrito();

//  ---- Vacío la lista
    lista.innerHTML = "";

//  Recorro los elementos del resumen y los añado
    for(const p of resumen.products){

        const elemento = document.createElement("li");
        elemento.textContent = `${p.quantity} x ${p.title}: ${p.subtotal.toFixed(2)} ${resumen.currency}`;
        lista.append(elemento);
    }
//  Escribo el total
    parrafoTotal.textContent = `TOTAL ${resumen.total.toFixed(2)} ${resumen.currency}`;
}



//------  Función Iniciar: pide los productos a la API + arranca la página ------
async function iniciar() {

    try{
//  ---- 1. Solicita una petición del archivo api.php
        const respuesta = await fetch("api.php");

//      ---- 2. Comprobación de que los datos hayan llegado correctamente
        if(!respuesta.ok){
            throw new Error("HTTP " + respuesta.status);
        }

//  ---- 3. Convierte la respuesta JSON en un objeto
        const datos = await respuesta.json();

//  ---- 4. Crea el carrito + pinta la tabla + resumen del total
        carrito = new Carrito(datos.products, datos.currency);
        mostrarProductos();
        mostrarResumen();        
    } catch (error){
        console.error("No se pudieron cargar los productos: " + error.message);
    }        
}

iniciar();