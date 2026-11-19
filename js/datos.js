const usuarios = [
    { usuario: "medico1",   password: "1234", nombre: "Dra. Laura Gómez", rol: "Médico" },
    { usuario: "paciente1", password: "1234", nombre: "Juan Pérez",       rol: "Paciente" },
    { usuario: "paciente2", password: "1234", nombre: "María López",      rol: "Paciente" },
    { usuario: "paciente3", password: "1234", nombre: "Carlos Ramírez",   rol: "Paciente" }
];

function obtenerSesion() {
    return JSON.parse(sessionStorage.getItem("sesion"));
}

function cerrarSesion() {
    sessionStorage.removeItem("sesion");
    window.location.href = "index.html";
}
