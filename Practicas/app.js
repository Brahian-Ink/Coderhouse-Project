// Array
const productos = [];

// Clase Producto
class Producto {
    constructor(nombre, precio, cantidad) {
        this.id = productos.length + 1;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = 0;
    }

    calcularSubtotal() {
        this.subtotal = this.precio * this.cantidad;
    }
}

// Crear producto con prompt
function crearProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));
    const cantidad = parseInt(prompt("Ingrese la cantidad del producto:"));

    return new Producto(nombre, precio, cantidad);
}

// Agregar al array
function agregarProducto() {
    const producto = crearProducto();
    producto.calcularSubtotal();
    productos.push(producto);

    console.log("Producto agregado:", producto);
}

// Ejecutar
agregarProducto();
console.log(productos);