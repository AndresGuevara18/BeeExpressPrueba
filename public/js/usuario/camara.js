// js/usuario/camara.js

export function initializeCamera() {
    // Capturar elementos del HTML mediante el ID
    const openCameraBtn = document.getElementById("openCameraBtn"); // Botón abrir la cámara
    const cameraBox = document.getElementById("cameraBox"); // Contenedor para la cámara
    const video = document.getElementById("video"); // Mostrar la cámara
    const captureBtn = document.getElementById("captureBtn"); // Capturar la foto
    const noCaptureBtn = document.getElementById("noCaptureBtn"); // Cerrar capturar foto
    const canvas = document.getElementById("canvas"); // Se dibujará la imagen capturada
    const fotoBase64 = document.getElementById("fotoBase64"); // Oculto donde se guardará la imagen en base 64
    const previewImage = document.getElementById("previewImage"); // Campo para la vista de la imagen

    let streamVideo = null; // Almacenar el flujo de video de la cámara

    // FUNCIÓN ABRIR CÁMARA
    function openCamera() {
        try {
            // Método de la API web que solicita al usuario permiso para usar dispositivos de entrada de audio y video
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((mediaStream) => { // Después de que conceda el permiso
                    if (mediaStream) { // Verifica que se obtuvo un flujo válido
                        streamVideo = mediaStream; // Se almacena el flujo del video en la variable let
                        video.srcObject = streamVideo; // srcObject propiedad elementos video, mostrar cámara en el elemento video

                        cameraBox.style.display = "block"; // Mostrar contenedor de la cámara

                        openCameraBtn.style.display = "none"; // Ocultar botón de abrir cámara
                        captureBtn.style.display = "block"; // Mostrar el botón capturar
                        noCaptureBtn.style.display = "block"; // Mostrar el botón de no capturar

                        console.log("✅ Cámara activada correctamente.");
                    } else {
                        console.error("⚠️ No se recibió flujo de video.");
                        alert("No se pudo acceder a la cámara.");
                    }
                })
                .catch((err) => { // Capturar error
                    console.error("❌ Error al acceder a la cámara", err);
                    alert("No se puede acceder a la cámara.");
                });
        } catch (error) {
            console.error("❌ Error inesperado al intentar abrir la cámara:", error);
            alert("Hubo un problema al intentar acceder a la cámara.");
        }
    }

    // FUNCIÓN CERRAR CÁMARA
    function closeCamera() {
        try {
            if (streamVideo) { // Si hay flujo de video
                let tracks = streamVideo.getTracks(); // Obtener las pistas de video devuelve un array de objetos MediaStreamTrack
                tracks.forEach(track => track.stop()); // Detener cada pista
                streamVideo = null; // Resetear la variable

                console.log("✅ Cámara cerrada correctamente.");
            } else {
                console.warn("⚠️ No había una cámara activa para cerrar.");
            }

            cameraBox.style.display = "none"; // No mostrar contenedor de la cámara
            openCameraBtn.style.display = "block"; // Mostrar botón de abrir cámara
            captureBtn.style.display = "none"; // Ocultar el botón capturar
            noCaptureBtn.style.display = "none"; // Ocultar botón de cerrar captura

        } catch (error) {
            console.error("❌ Error al intentar cerrar la cámara:", error);
            alert("Hubo un problema al intentar cerrar la cámara.");
        }
    }

    // FUNCIÓN CAPTURAR LA IMAGEN Y CONVERTIRLA A BASE64
    function captureImage() {
        try {
            if (video.videoWidth > 0 && video.videoHeight > 0) { // Verifica si el video está cargado correctamente
                // Establecer el tamaño del canvas igual al video
                canvas.width = video.videoWidth; // Propiedades que contienen el ancho real del video que proviene de la cámara.
                canvas.height = video.videoHeight; // Propiedades que contienen el alto real del video.

                // Dibujar la imagen del video en <canvas>
                const context = canvas.getContext("2d"); // Obtiene el contexto 2D del canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height); // Toma la foto del video y la dibuja en el canvas

                // Convertir la imagen a formato Base64
                const imageBase64 = canvas.toDataURL("image/png"); // Convertir el contenido del canvas en imagen codificada en Base64.
                fotoBase64.value = imageBase64; // Guardar en el input oculto

                // Mostrar la vista previa de la imagen capturada
                previewImage.src = imageBase64; // Asignar la imagen capturada como src del previewImage
                previewImage.style.display = "block"; // Asegurar que la imagen se muestre

                // Ocultar la cámara y mostrar botón de abrir cámara nuevamente
                cameraBox.style.display = "none"; // No mostrar contenedor de la cámara
                openCameraBtn.style.display = "block"; // Mostrar botón de abrir cámara
                captureBtn.style.display = "none"; // Ocultar el botón capturar
                noCaptureBtn.style.display = "none"; // Ocultar botón de cerrar captura

                alert("✅ Imagen capturada correctamente.");
                console.log("✅ Imagen capturada correctamente:", imageBase64); // Mensaje en consola cuando la imagen se captura correctamente

                // Cerrar la cámara después de capturar la imagen
                closeCamera();
            } else {
                console.warn("⚠️ No se pudo capturar la imagen porque el video no está cargado.");
                alert(" ⚠️ No se puede capturar la imagen, asegúrate de que la cámara está activa.");
            }
        } catch (error) { // Capturar cualquier error en la ejecución
            console.error("❌ Error al capturar la imagen:", error); // Mostrar el error en la consola
            alert("❌ Ocurrió un error al capturar la imagen. Inténtalo nuevamente."); // Mostrar mensaje de error al usuario
        }
    }

    // Asignar eventos a los botones
    openCameraBtn.addEventListener("click", openCamera); // Cuando se presiona "Abrir Cámara"
    noCaptureBtn.addEventListener("click", closeCamera); // Cuando se presiona "Cerrar Cámara"
    captureBtn.addEventListener("click", captureImage); // Cuando se presiona "Capturar Foto"
}