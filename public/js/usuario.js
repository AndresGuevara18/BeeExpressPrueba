document.addEventListener("DOMContentLoaded", () => {
    getAllUsuarios(); // Cargar usuarios automáticamente al cargar la página
    createUser(); // Inicializar el formulario de registro si está presente
});

// 🔹 Función para obtener y mostrar la lista de usuarios
function getAllUsuarios() {
    const tableBody = document.getElementById("userTable"); // Ubicación donde se mostrará la lista de usuarios

    if (!tableBody) {
        console.warn("⚠️ No se encontró la tabla de usuarios en la página.");
        return;
    }

    fetch('/api/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los usuarios");
            }
            return response.json();
        })
        .then(data => {
            tableBody.innerHTML = ""; // Limpiar contenido anterior antes de agregar nuevos datos
            
            data.forEach(user => {
                let row = `<tr>
                    <td>${user.id_usuario}</td>
                    <td>${user.tipo_documento}</td>
                    <td>${user.numero_documento}</td>
                    <td>${user.nombre_empleado}</td>
                    <td>${user.email_empleado}</td>
                    <td>${user.id_cargo}</td>
                    <td>
                        <button class="boton boton-editar">Editar</button>
                        <button class="boton boton-eliminar" onclick="eliminarUsuario(${user.id_usuario})">Eliminar</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("❌ Error al cargar usuarios:", error);
            tableBody.innerHTML = `<tr><td colspan="7">⚠️ Error al cargar los datos</td></tr>`;
        });
}

// 🔹 Función para manejar el registro de usuarios
function createUser() {
    const form = document.getElementById("userForm");

    if (!form) {
        console.warn("⚠️ No se encontró el formulario en la página.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita que la página se recargue automáticamente

        // Captura los valores del formulario y los almacena en un objeto
        const usuarioData = {
            tipo_documento: document.getElementById("tipo_documento").value,
            numero_documento: document.getElementById("numero_documento").value,
            nombre_empleado: document.getElementById("nombre_empleado").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value,
            email_empleado: document.getElementById("email_empleado").value,
            eps: document.getElementById("eps").value,
            usuario: document.getElementById("usuario").value,
            contrasena: document.getElementById("contrasena").value,
            id_cargo: document.getElementById("id_cargo").value
        };

        // Validar que los campos obligatorios no estén vacíos
        if (!usuarioData.tipo_documento || !usuarioData.numero_documento || !usuarioData.nombre_empleado || 
            !usuarioData.email_empleado || !usuarioData.id_cargo) {
            alert("⚠️ Por favor, complete todos los campos obligatorios.");
            return;
        }

        try {
            const response = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Usuario registrado exitosamente");
                window.location.href = "/usuario.html"; // Redirige a la lista de usuarios
            } else {
                alert("FRONT⚠️ Error: " + (result.error || "No se pudo registrar el usuario."));
                window.location.href = "/nuevo_usuario.html";
            }
        } catch (error) {
            console.error("FRONT❌ Error al enviar la solicitud:", error);
            alert("FRONT❌ Error al registrar el usuario.");
        }
    });
}
