// Exportar la función obtenerCargo para usarla en otros módulos (como nuevo_usuario.js)
export async function obtenerCargo(idCargo) {
    try {
        // Petición GET al servidor
        const response = await fetch(`/api/cargos/${idCargo}`);

        // Si la respuesta no es exitosa, lanzar un error
        if (!response.ok) throw new Error("Cargo no encontrado");

        // Convertir la respuesta en JSON y retornarla
        return await response.json();
    } catch (error) {
        console.error("❌ Error en obtenerCargo:", error); // Mostrar el error en la consola
        throw error; // Lanzar el error para manejarlo en la función que llama
    }
}

// Función para buscar un cargo y mostrarlo en una ventana modal
export async function buscarCargo() {
    try {
        // Obtener el ID ingresado en el input
        const idCargo = document.getElementById("buscarCargo").value.trim();

        // Si el campo está vacío, mostrar una alerta
        if (!idCargo) {
            alert("⚠️ Ingrese un ID.");
            return;
        }

        // Llamar a la función obtenerCargo para buscar el cargo
        const cargo = await obtenerCargo(idCargo);

        // Si encuentra el cargo, asignar los valores obtenidos a los elementos del modal
        document.getElementById("cargoId").innerText = cargo.id_cargo;
        document.getElementById("cargoNombre").innerText = cargo.nombre_cargo;
        document.getElementById("cargoDescripcion").innerText = cargo.descripcion || "Sin descripción";

        // Mostrar el modal
        const modal = document.getElementById("modalCargo");
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    } catch (error) {
        // Limpiar el campo de búsqueda y mostrar un mensaje de error
        document.getElementById("buscarCargo").value = "";
        alert("❌ " + error.message);
    }
}

// Función para cerrar el modal
export function cerrarModal() {
    document.getElementById("modalCargo").classList.add("hidden");
    document.getElementById("modalCargo").style.display = "none";
    // Limpiar el campo de búsqueda al cerrar el modal
    document.getElementById("buscarCargo").value = "";
}

// Función para cargar todos los cargos en la tabla
export async function cargarTodosLosCargos() {
    try {
        // Realizar la petición a la API para obtener los cargos
        const response = await fetch('/api/cargos');

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Error al obtener los cargos");
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Seleccionar la tabla donde se mostrarán los cargos
        const tableBody = document.getElementById("cargoTable");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        // Recorrer los cargos obtenidos y agregarlos a la tabla
        data.forEach(cargo => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td class="border border-black p-2">${cargo.id_cargo}</td>
                <td class="border border-black p-2">${cargo.nombre_cargo}</td>
                <td class="border border-black p-2">${cargo.descripcion || "N/A"}</td>
                <td class="border border-black p-2">
                    <button class="boton boton-editar" data-id="${cargo.id_cargo}">✏️ Editar</button>
                    <button class="boton boton-eliminar" data-id="${cargo.id_cargo}">🗑 Eliminar</button>
                </td>
            `;

            // Agregar eventos a los botones de edición y eliminación
            row.querySelector(".boton-eliminar").addEventListener("click", function () {
                eliminarCargo(this.dataset.id); // this.dataset.id captura el valor de data-id
            });

            row.querySelector(".boton-editar").addEventListener("click", function () {
                editarCargo(this.dataset.id); // this.dataset.id captura el valor de data-id
            });

            // Añadir la fila a la tabla
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("❌ Error en cargarTodosLosCargos:", error);

        // Mostrar un mensaje de error en la tabla
        document.getElementById("cargoTable").innerHTML =
            `<tr><td colspan="4" class="border border-black p-2 text-red-500">❌ Error al cargar los datos</td></tr>`;
    }
}

// Función para eliminar un cargo
export async function eliminarCargo(id) {
    // Mostrar un cuadro de confirmación antes de eliminar
    if (!confirm("¿Seguro que deseas eliminar este cargo?")) return;

    try {
        // Realizar la petición DELETE al servidor
        const response = await fetch(`/api/cargos/${id}`, { method: "DELETE" });

        // Leer la respuesta JSON del backend
        const data = await response.json();

        // Si hay un error, lanzar una excepción con el mensaje del backend
        if (!response.ok) throw new Error(data.error || "Error al eliminar el cargo");

        // Mostrar un mensaje de éxito y recargar la tabla de cargos
        alert(data.message || "✅ Cargo eliminado correctamente.");
        cargarTodosLosCargos();
    } catch (error) {
        console.error(error); // Mostrar el error en la consola
        alert(`❌ ${error.message}`); // Mostrar una alerta con el mensaje del backend
    }
}

// Función para editar un cargo
export async function editarCargo(id) {
    try {
        // Obtener los datos del cargo
        const cargo = await obtenerCargo(id);

        // Mostrar un prompt con los valores actuales del cargo
        const nuevoNombre = prompt("Nuevo nombre del cargo:", cargo.nombre_cargo);
        const nuevaDescripcion = prompt("Nueva descripción del cargo:", cargo.descripcion || "");

        // Si el usuario cancela, salir de la función
        if (nuevoNombre === null || nuevaDescripcion === null) return;

        // Validar que los campos no estén vacíos
        if (!nuevoNombre.trim() || !nuevaDescripcion.trim()) {
            alert("⚠️ Debes ingresar todos los datos.");
            return;
        }

        // Realizar la petición PUT al servidor para actualizar el cargo
        const response = await fetch(`/api/cargos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre_cargo: nuevoNombre, descripcion: nuevaDescripcion }),
        });

        // Si hay un error, lanzar una excepción
        if (!response.ok) throw new Error("Error al actualizar el cargo");

        // Mostrar un mensaje de éxito y recargar la lista de cargos
        alert("✅ Cargo actualizado correctamente.");
        cargarTodosLosCargos();
    } catch (error) {
        console.error("❌ Error en editarCargo:", error);
        alert("❌ Error al actualizar el cargo.");
    }
}

// Inicializar la carga de cargos al cargar la página
document.addEventListener("DOMContentLoaded", cargarTodosLosCargos);

// Asignar eventos a los botones del HTML
document.getElementById("buscarCargoBtn").addEventListener("click", buscarCargo);
document.getElementById("cerrarModalBtn").addEventListener("click", cerrarModal);