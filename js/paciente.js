const formSignos = document.getElementById("formSignos");
const historial = document.getElementById("historial");
const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const tituloForm = document.getElementById("tituloForm");
const btnSalir = document.getElementById("btnSalir");

const sesion = obtenerSesion();

function fechaHoy() {
    return new Date().toLocaleDateString("en-CA");
}

function llaveRegistros() {
    return "registrosSalud_" + sesion.usuario;
}

function leerRegistros() {
    return JSON.parse(localStorage.getItem(llaveRegistros())) || [];
}

function validarAcceso() {
    const s = obtenerSesion();
    if (!s || s.rol !== "Paciente") {
        window.location.replace("index.html");
        return false;
    }
    document.body.classList.remove("d-none");
    return true;
}

function mostrarHistorial() {
    const registros = leerRegistros();

    if (registros.length === 0) {
        historial.innerHTML = "<p class='text-muted'>Aún no tienes registros</p>";
        return;
    }

    let filas = "";
    registros.forEach(r => {
        filas += `
        <tr>
            <td>${r.fecha}</td>
            <td>${r.presion}</td>
            <td>${r.frecuencia} lpm</td>
            <td>${r.peso} kg</td>
        </tr>`;
    });

    historial.innerHTML = `
    <table class="table table-striped table-bordered bg-white shadow-sm">
        <thead class="table-primary">
            <tr><th>Fecha</th><th>Presión arterial</th><th>Frec. cardíaca</th><th>Peso</th></tr>
        </thead>
        <tbody>${filas}</tbody>
    </table>`;
}

function revisarRegistroDeHoy() {
    const registros = leerRegistros();
    const hoy = registros.find(r => r.fecha === fechaHoy());

    if (hoy) {
        document.getElementById("presion").value = hoy.presion;
        document.getElementById("frecuencia").value = hoy.frecuencia;
        document.getElementById("peso").value = hoy.peso;
        tituloForm.textContent = "Ya registraste hoy, puedes actualizar tus signos";
        btnGuardar.classList.add("d-none");
        btnActualizar.classList.remove("d-none");
    } else {
        tituloForm.textContent = "Registrar signos de hoy";
        btnGuardar.classList.remove("d-none");
        btnActualizar.classList.add("d-none");
    }
}

formSignos.addEventListener("submit", (e) => {
    e.preventDefault();
    const presion = document.getElementById("presion").value.trim();
    const frecuencia = document.getElementById("frecuencia").value.trim();
    const peso = document.getElementById("peso").value.trim();

    if (!presion || !frecuencia || !peso) return alert("Todos los campos son obligatorios");

    const registros = leerRegistros();
    const hoy = fechaHoy();
    const indice = registros.findIndex(r => r.fecha === hoy);

    const nuevoRegistro = { fecha: hoy, presion, frecuencia, peso };

    if (indice !== -1) {

        registros[indice] = nuevoRegistro;
        alert("Registro de hoy actualizado");
    } else {

        registros.push(nuevoRegistro);
        alert("Registro guardado");
    }

    localStorage.setItem(llaveRegistros(), JSON.stringify(registros));
    mostrarHistorial();
    revisarRegistroDeHoy();
});

btnSalir.addEventListener("click", cerrarSesion);

window.addEventListener("pageshow", validarAcceso);

if (validarAcceso()) {
    document.getElementById("nombrePaciente").textContent = sesion.nombre;
    mostrarHistorial();
    revisarRegistroDeHoy();
}
