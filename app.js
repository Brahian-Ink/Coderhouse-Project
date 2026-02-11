let historial = JSON.parse(localStorage.getItem("historialIMC")) || [];
const form = document.getElementById("formIMC");
const resultadoDiv = document.getElementById("resultado");
const tablaHistorial = document.getElementById("tablaHistorial");
const botonLimpiar = document.getElementById("limpiar");
const botonBorrarHistorial = document.getElementById("borrarHistorial");

// FUNCIONES
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function obtenerEstado(imc) {
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
}

function guardarEnStorage() {
  localStorage.setItem("historialIMC", JSON.stringify(historial));
}

function mostrarHistorial() {
  // Limpiar tabla
  tablaHistorial.innerHTML = "";

  if (historial.length === 0) {
    tablaHistorial.innerHTML = `
        <tr>
          <td colspan="5">No hay registros todavía.</td>
        </tr>
      `;
    return;
  }

  // Crear filas
  for (let i = 0; i < historial.length; i++) {
    const persona = historial[i];

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${persona.nombre}</td>
      <td>${persona.edad}</td>
      <td>${persona.imc}</td>
      <td>${persona.estado}</td>
      <td>
        <button class="btn" data-index="${i}" type="button">Borrar</button>
      </td>
    `;

    tablaHistorial.appendChild(fila);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = Number(document.getElementById("edad").value);
  const peso = Number(document.getElementById("peso").value);
  const altura = Number(document.getElementById("altura").value);

  if (nombre === "" || !edad || !peso || !altura || altura <= 0) {
    resultadoDiv.textContent = "Revisá los datos e intentá de nuevo.";
    return;
  }

  const imcNumero = calcularIMC(peso, altura);
  const imcTexto = imcNumero.toFixed(2);
  const estado = obtenerEstado(imcNumero);

  // Mostrar resultado en pantalla
  resultadoDiv.textContent =
    nombre + ", tu IMC es " + imcTexto + " (" + estado + ")";

  // Guardar en el array
  const persona = {
    nombre: nombre,
    edad: edad,
    imc: imcTexto,
    estado: estado,
  };

  historial.push(persona);

  // Guardar en localStorage y renderizar tabla
  guardarEnStorage();
  mostrarHistorial();
});

// Limpiar inputs
botonLimpiar.addEventListener("click", function () {
  form.reset();
  resultadoDiv.textContent = "Completá el formulario y tocá Calcular.";
});

// Borrar todo el historial
botonBorrarHistorial.addEventListener("click", function () {
  historial = [];
  localStorage.removeItem("historialIMC");
  mostrarHistorial();
  resultadoDiv.textContent = "Historial borrado.";
});

// Borrar una fila
tablaHistorial.addEventListener("click", function (e) {
  const index = Number(e.target.dataset.index);

  // Eliminar del array y volver a guardar
  historial.splice(index, 1);
  guardarEnStorage();
  mostrarHistorial();
});

mostrarHistorial();
