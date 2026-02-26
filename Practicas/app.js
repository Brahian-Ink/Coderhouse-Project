// Array
const productos = JSON.parse(localStorage.getItem("productos")) || []; // Si no hay productos en localStorage, se inicializa como un array vacío

function guardarProductos() { // Guardar productos en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));
}

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
    guardarProductos(); // Guardar el producto en localStorage después de agregarlo al array
    console.log("Producto agregado:", producto);
}

function mostrarProductos() {
    console.log("Productos en el carrito:");
    productos.forEach(producto => {
        console.table(producto);
    });
}  

//____Acitividad 6____//

function aplicarIVA() {
    const productosConIVA = productos.map(producto => {
        return {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio * 1.21, // Aplicar IVA del 21%
            cantidad: producto.cantidad,
            subtotal: producto.subtotal * (producto.precio * 1.21) 
             };
    });
    console.log("Productos con IVA aplicado:");
    productosConIVA.forEach(producto => { // Mostrar cada producto con IVA aplicado en formato de tabla
        console.table(producto);
    });
}

function bucarProducto(nombre){
    const productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
    if(productoEncontrado){
        console.log("Producto encontrado:", productoEncontrado);
    } else {
        console.log("Producto no encontrado");
    }
}

function FiltrarProducto() {
  const texto = prompt("Ingrese el nombre, precio o cantidad del producto a filtrar:");  

    if (!texto) { // Verificar si el usuario ingresó un texto válido
        console.log("No se ingresó ningún texto para filtrar.");
        return;
    }  
    const textoLimpio = texto.trim().toLowerCase(); // Eliminar espacios y convertir a minúsculas para una comparación más flexible
    
    const resultado = productos.filter(function(producto) {
    return producto.nombre.toLowerCase().includes(textoLimpio) ||
           producto.precio.toString().includes(textoLimpio) ||
           producto.cantidad.toString().includes(textoLimpio);
  });

  console.log("Productos filtrados:", resultado);
}

mostrarProductos();


//_____Actividad 7____//

const ctn = document.getElementById("ctn");
const titulo = document.getElementById("titulo");
const btn = document.getElementById("btn");
const btn2 = document.getElementById("btn2");
const productosDiv = document.getElementById("productos");

btn.addEventListener("click", () => {
    titulo.innerHTML = '<p>DOM Aplicado!</p>';
});      

btn2.addEventListener("click", () => {
    titulo.remove();
});      

productosDiv.innerHTML = `
  <h2>Lista de Productos</h2>
  <ul>
    ${productos.map(producto => `<li>${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad} - Subtotal: $${producto.subtotal}</li>`).join('')}
  </ul>
`;