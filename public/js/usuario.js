// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el formulario del HTML por su ID
    const form = document.getElementById("userForm");

    // Escucha el evento "submit" cuando el usuario envía el formulario
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita que la página se recargue automáticamente

        // Captura los valores de los campos del formulario y los almacena en un objeto
        const usuarioData = {
            tipo_documento: document.getElementById("tipo_documento").value, // Tipo de documento (CC, TI, CE, etc.)
            numero_documento: document.getElementById("numero_documento").value, // Número de documento del usuario
            nombre_empleado: document.getElementById("nombre_empleado").value, // Nombre completo del usuario
            direccion: document.getElementById("direccion").value, // Dirección del usuario
            telefono: document.getElementById("telefono").value, // Teléfono del usuario
            email_empleado: document.getElementById("email_empleado").value, // Correo electrónico
            eps: document.getElementById("eps").value, // EPS (Entidad de salud del usuario)
            usuario: document.getElementById("usuario").value, // Nombre de usuario
            contrasena: document.getElementById("contrasena").value, // Contraseña del usuario
            id_cargo: document.getElementById("id_cargo").value // Cargo asignado al usuario
        };

        try {
            // Realiza una petición HTTP a la API para registrar al usuario
            const response = await fetch("/api/usuarios", {
                method: "POST", // Tipo de petición (crear usuario)
                headers: {
                    "Content-Type": "application/json" // Indica que se enviará JSON
                },
                body: JSON.stringify(usuarioData) // Convierte el objeto en una cadena JSON
            });

            // Convierte la respuesta en un objeto JSON
            const result = await response.json();

            // Si la respuesta del servidor es exitosa (código 201)
            if (response.ok) {
                alert("✅ Usuario registrado exitosamente"); // Muestra un mensaje de éxito

                // 🔄 Redirige automáticamente a usuario.html después del registro
                window.location.href = "/usuario.html";
            } else {
                alert("FRONT⚠️ Error: " + result.error); // Muestra un mensaje de error si falla
            }
        } catch (error) {
            // Si ocurre un error en la petición, se captura y se muestra en la consola
            console.error("FRONT❌ Error al enviar la solicitud:", error);
            alert("FRONT❌ Error al registrar el usuario.");
        }
    });
});
