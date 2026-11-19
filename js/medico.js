const listaPacientes = document.getElementById("listaPacientes");
const historial = document.getElementById("historial");
const tituloHistorial = document.getElementById("tituloHistorial");
const btnSalir = document.getElementById("btnSalir");

function validarAcceso() {
    const s = obtenerSesion();
    if (!s || s.rol !== "Médico") {
        window.location.replace("index.html");
        return false;
    }
    document.body.classList.remove("d-none");
    return true;
}

function mostrarPacientes() {
    const pacientes = usuarios.filter(u => u.rol === "Paciente");
    listaPacientes.innerHTML = "";

    pacientes.forEach(p => {
        listaPacientes.innerHTML += `
        <button type="button" class="list-group-item list-group-item-action" id="btn_${p.usuario}"
            onclick="verHistorial('${p.usuario}', '${p.nombre}')">
            ${p.nombre}
        </button>`;
    });
}

function verHistorial(usuario, nombre) {

    const registros = JSON.parse(localStorage.getItem("registrosSalud_" + usuario)) || [];

    document.querySelectorAll("#listaPacientes button").forEach(b => b.classList.remove("active"));
    document.getElementById("btn_" + usuario).classList.add("active");

    tituloHistorial.textContent = "📋 Historial de " + nombre;

    if (registros.length === 0) {
        historial.innerHTML = "<p class='text-muted'>Este paciente aún no tiene registros</p>";
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

btnSalir.addEventListener("click", cerrarSesion);

window.addEventListener("pageshow", validarAcceso);

if (validarAcceso()) {
    document.getElementById("nombreMedico").textContent = obtenerSesion().nombre;
    mostrarPacientes();
}
