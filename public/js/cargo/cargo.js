// 📌 Cargar todos los cargos al iniciar
document.addEventListener("DOMContentLoaded", function () {
    cargarTodosLosCargos();
});

//datos desde la api
function obtenerCargo(idCargo) {
    return fetch(`/api/cargos/${idCargo}`)
        .then(response => {
            if (!response.ok) throw new Error("Cargo no encontrado");
            return response.json();// Convierte la respuesta en JSON
        });
}

//buscar id y mostar en ventana modal del html
function buscarCargo() {
    const idCargo = document.getElementById("buscarCargo").value.trim();// Convierte la respuesta en JSON

    //si es vacio
    if (!idCargo) {
        alert("⚠️ Ingrese un ID.");
        return;
    }

    // Llama a la función 
    obtenerCargo(idCargo)
        .then(cargo => {
              // Asigna los valores obtenidos
            document.getElementById("cargoId").innerText = cargo.id_cargo;
            document.getElementById("cargoNombre").innerText = cargo.nombre_cargo;
            document.getElementById("cargoDescripcion").innerText = cargo.descripcion || "Sin descripción";

            //mostrar modal
            const modal = document.getElementById("modalCargo");
            modal.classList.remove("hidden");
            modal.style.display = "flex";
        })
        .catch(error => {
            //si no se encuentra el cargo
            document.getElementById("buscarCargo").value = "";
            alert("❌ " + error.message);
        });
}


// ❌ Cerrar modal
function cerrarModal() {
    document.getElementById("modalCargo").classList.add("hidden");
    document.getElementById("modalCargo").style.display = "none";
    // Limpiar el campo de búsqueda al cerrar el modal
    document.getElementById("buscarCargo").value = "";
}
 

// 📌 Cargar todos los cargos en la tabla
function cargarTodosLosCargos() {
    fetch('/api/cargos')
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los cargos");
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById("cargoTable");
            tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar los datos

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

                // Agregar eventos a botones
                row.querySelector(".boton-eliminar").addEventListener("click", function () {
                    eliminarCargo(this.dataset.id);
                });

                row.querySelector(".boton-editar").addEventListener("click", function () {
                    editarCargo(this.dataset.id);
                });

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            document.getElementById("cargoTable").innerHTML =
                `<tr><td colspan="4" class="border border-black p-2 text-red-500">❌ Error al cargar los datos</td></tr>`;
        });
}

// ❌ Eliminar un cargo
function eliminarCargo(id) {
    if (confirm("¿Seguro que deseas eliminar este cargo?")) {
        fetch(`/api/cargos/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) throw new Error("Error al eliminar el cargo");
                return response.json();
            })
            .then(() => {
                alert("✅ Cargo eliminado correctamente.");
                cargarTodosLosCargos(); // Recargar la tabla
            })
            .catch(error => {
                console.error(error);
                alert("❌ Error al eliminar el cargo.");
            });
    }
}

//EDITAR CARGO
async function editarCargo(id) {
    try {
        //Obtener  datos del cargo
        const cargo = await obtenerCargo(id);

        //Mostramos  prompt con los valores actuales 
        const nuevoNombre = prompt("Nuevo nombre del cargo:", cargo.nombre_cargo);
        const nuevaDescripcion = prompt("Nueva descripción del cargo:", cargo.descripcion || "");

        //Si el usuario cancela sale
        if (nuevoNombre === null || nuevaDescripcion === null) return;

        // campos no estén vacíos
        if (!nuevoNombre.trim() || !nuevaDescripcion.trim()) {//.trim() elimina los espacios en blanco al inicio y al final 
            alert("⚠️ Debes ingresar todos los datos.");
            return;
        }

        // Enviar la actualización a la API
        const response = await fetch(`/api/cargos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre_cargo: nuevoNombre, descripcion: nuevaDescripcion }),// convertircadena de texto JSON
        });

        //si hay errores
        if (!response.ok) throw new Error("Error al actualizar el cargo");

        alert("✅ Cargo actualizado correctamente.");
        cargarTodosLosCargos(); // Recargar la lista 
    } catch (error) {
        console.error("❌ Error en editarCargo:", error);
        alert("❌ Error al actualizar el cargo.");
    }
}



