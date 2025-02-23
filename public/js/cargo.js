// 📌 Cargar todos los cargos al iniciar
document.addEventListener("DOMContentLoaded", function () {
    cargarTodosLosCargos();
    document.getElementById("btnAgregarCargo").addEventListener("click", agregarCargo);
});

// 🔍 Función para buscar un cargo por ID y mostrarlo en el modal
function buscarCargo() {
    const idCargo = document.getElementById("buscarCargo").value.trim();

    if (!idCargo) {
        alert("⚠️ Ingrese un ID de cargo válido.");
        return;
    }

    fetch(`/api/cargos/${idCargo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cargo no encontrado");
            }
            return response.json();
        })
        .then(cargo => {
            document.getElementById("cargoId").innerText = cargo.id_cargo;
            document.getElementById("cargoNombre").innerText = cargo.nombre_cargo;
            document.getElementById("cargoDescripcion").innerText = cargo.descripcion || "Sin descripción";

            // 📌 Mostrar el modal
            const modal = document.getElementById("modalCargo");
            modal.classList.remove("hidden");
            modal.style.display = "flex";
        })
        .catch(error => {
            alert("❌ " + error.message);
        });
}

// ❌ Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById("modalCargo");
    modal.classList.add("hidden");
    modal.style.display = "none";
}
 
//funcion agregar cargo y redireccionar al cargo
function agregarCargo() {
    const nombre_cargo = document.getElementById("nombre_cargo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const mensaje = document.getElementById("mensaje");

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

// 📌 Cargar todos los cargos en la tabla
function cargarTodosLosCargos() {
    fetch('/api/cargos')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los cargos");
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById("cargoTable");
            tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar los datos

            data.forEach(cargo => {
                let row = document.createElement("tr");
                row.className = "odd:bg-white even:bg-gray-200";

                row.innerHTML = `
                    <td class="border border-black p-2">${cargo.id_cargo}</td>
                    <td class="border border-black p-2">${cargo.nombre_cargo}</td>
                    <td class="border border-black p-2">${cargo.descripcion || "N/A"}</td>
                    <td class="border border-black p-2">
                        <button class="boton boton-editar">Editar</button>
                        <button class="boton boton-eliminar" data-id="${cargo.id_cargo}">Eliminar</button>
                    </td>
                `;

                // Agregar evento para eliminar
                row.querySelector(".boton-eliminar").addEventListener("click", function () {
                    eliminarCargo(this.dataset.id);
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

// ❌ Función para eliminar un cargo
function eliminarCargo(id) {
    if (confirm("¿Seguro que deseas eliminar este cargo?")) {
    }
}
