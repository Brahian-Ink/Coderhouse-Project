const app = document.getElementById("app");

let rutinas = [];
let alimentos = [];

// CARGAR JSON

async function cargarDatos() {
  const resRutinas = await fetch("data/rutinas.json");
  rutinas = await resRutinas.json();

  const resAlimentos = await fetch("data/alimentos.json");
  alimentos = await resAlimentos.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  await cargarDatos();
  vistaIMC();
});

// LOCAL STORAGE

function obtenerHistorial() {
  return JSON.parse(localStorage.getItem("historialIMC")) || [];
}

function guardarHistorial(data) {
  let historial = obtenerHistorial();

  historial.push(data);

  localStorage.setItem("historialIMC", JSON.stringify(historial));
}

// CALCULAR IMC

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// CATEGORIA

function categoriaIMC(imc) {
  if (imc < 18.5) return "bajo";
  if (imc < 25) return "normal";
  if (imc < 30) return "sobrepeso";

  return "obesidad";
}

// VISTA IMC

function vistaIMC() {
  app.innerHTML = `
    <div class="card">
    <h2>Calculadora IMC</h2>
    <input id="nombre" placeholder="Nombre" value="Usuario">
    <input id="peso" placeholder="Peso (kg)">
    <input id="altura" placeholder="Altura (m)">
    <button id="btnCalcular">Calcular IMC</button>
    <div id="resultado"></div>
    </div>
    <div id="tablaHistorial"></div>

    `;

  document.getElementById("btnCalcular").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!peso || !altura) {
      Swal.fire("Completa peso y altura");

      return;
    }

    const imc = calcularIMC(peso, altura).toFixed(2);

    const categoria = categoriaIMC(imc);

    const rutina = rutinas.find((r) => r.categoria === categoria);
    const comida = alimentos.find((a) => a.categoria === categoria);

    document.getElementById("resultado").innerHTML = `
    <p><b>IMC:</b> ${imc}</p>
    <p><b>Categoría:</b> ${categoria}</p>
    <p><b>Rutina:</b> ${rutina ? rutina.nombre : "-"}</p>
    <p><b>Alimentación:</b> ${comida ? comida.nombre : "-"}</p>

    `;

    guardarHistorial({
      nombre: nombre,
      imc: imc,
      categoria: categoria,
      rutina: rutina ? rutina.nombre : "-",
      alimentacion: comida ? comida.nombre : "-",
    });

    Swal.fire("IMC calculado correctamente");

    mostrarTabla();
  });

  mostrarTabla();
}

// TABLA HISTORIAL

function mostrarTabla() {
  const historial = obtenerHistorial();

  let html = `
    <table>

    <tr>
    <th>Nombre</th>
    <th>IMC</th>
    <th>Categoría</th>
    <th>Rutina</th>
    <th>Alimentación</th>
    <th>Acción</th>
    </tr>

    `;

  historial.forEach((p, i) => {
    html += `
        <tr>

        <td>${p.nombre}</td>
        <td>${p.imc}</td>
        <td>${p.categoria}</td>
        <td>${p.rutina}</td>
        <td>${p.alimentacion}</td>

        <td>
        <button onclick="eliminarRegistro(${i})">
        Eliminar
        </button>
        </td>

        </tr>

        `;
  });

  html += `</table>`;

  document.getElementById("tablaHistorial").innerHTML = html;
}

// ELIMINAR REGISTRO

function eliminarRegistro(index) {
  let historial = obtenerHistorial();

  historial.splice(index, 1);

  localStorage.setItem("historialIMC", JSON.stringify(historial));

  mostrarTabla();

  Swal.fire("Registro eliminado");
}

// RUTINAS

function vistaRutinas() {
  app.innerHTML = "<h2>Rutinas</h2>";

  rutinas.forEach((r) => {
    app.innerHTML += `
    <div class="cardItem">
    <h3>${r.nombre}</h3>
    <p>${r.ejercicios}</p>
    </div>
    `;
  });
}

// ALIMENTACION

function vistaAlimentacion() {
  app.innerHTML = "<h2>Alimentación</h2>";

  alimentos.forEach((a) => {
    app.innerHTML += `
    <div class="cardItem">
    <h3>${a.nombre}</h3>
    <p>${a.descripcion}</p>
    </div>
    `;
  });
}

// NAVBAR

document.getElementById("navIMC").addEventListener("click", vistaIMC);
document.getElementById("navRutinas").addEventListener("click", vistaRutinas);
document
  .getElementById("navAlimentacion")
  .addEventListener("click", vistaAlimentacion);
