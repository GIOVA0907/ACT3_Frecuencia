const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

function irAlPanel(rol) {
    if (rol === "Médico") {
        window.location.href = "medico.html";
    } else {
        window.location.href = "paciente.html";
    }
}

const sesionActiva = obtenerSesion();
if (sesionActiva) {
    irAlPanel(sesionActiva.rol);
}

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    const encontrado = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (!encontrado) {
        mensaje.textContent = "Usuario o contraseña incorrectos";
        return;
    }

    sessionStorage.setItem("sesion", JSON.stringify({
        usuario: encontrado.usuario,
        nombre: encontrado.nombre,
        rol: encontrado.rol
    }));

    irAlPanel(encontrado.rol);
});
