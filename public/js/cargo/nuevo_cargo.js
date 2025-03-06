// 📌 Cargar todos los cargos al iniciar
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnAgregarCargo").addEventListener("click", agregarCargo);
});

//funcion agregar cargo y redireccionar al cargo
function agregarCargo() {
    const nombre_cargo = document.getElementById("nombre_cargo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const mensaje = document.getElementById("mensaje");

    // Limpiar el mensaje antes de cualquier validación
    mensaje.innerText = "";
    
    if (!nombre_cargo || !descripcion) {
        mensaje.innerText = "⚠️ Todos los campos son obligatorios.";
        mensaje.style.color = "red";
        return;
    }

    fetch("/api/cargos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_cargo, descripcion }),
    })
    .then(response => response.json())
    .then(data => {
        mensaje.innerText = data.message;
        mensaje.style.color = "green";

        setTimeout(() => {
            window.location.href = "cargo.html"; // Redirige tras 2 seg
        }, 1000);
    })
    .catch(error => {
        console.error(error);
        mensaje.innerText = "❌ Error al agregar el cargo.";
        mensaje.style.color = "red";
    });
}