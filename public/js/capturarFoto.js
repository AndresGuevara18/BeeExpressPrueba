//esparar que el DOM este completamente cargado
document.addEventListener("DOMContentLoaded", () =>{
    //capturar elelemntos del html mediante el ID
    const openCameraBtn = document.getElementById("openCameraBtn"); //boton abrir la camara
    const cameraBox = document.getElementById("cameraBox");//contenedor para la camara
    const video = document.getElementById("video");// mostrar la camara
    const captureBtn = document.getElementById("captureBtn");//capturar la foto
    const noCaptureBtn = document.getElementById("noCaptureBtn")//cerrar capturar foto
    const canvas = document.getElementById("canvas"); //se dibuhara la imagen capturada
    const fotoBase64 = document.getElementById("fotoBase64");//oculto donde se guardara la imagen en base 64
    const previewImage = document.getElementById("previewImage");//campo para la vista de la imagen

    let streamVideo = null; // almacenar el flujo de video de la cámara

    // FUNCION ABRIR CAMARA
    function openCamera() {
        try {
            // método de la API web que solicita al usuario permiso para usar dispositivos de entrada de audio y video
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((mediaStream) => { // después de que conceda el permiso 
                    if (mediaStream) { // Verifica que se obtuvo un flujo válido
                        streamVideo = mediaStream; // Se almacena el flujo del video en la variable let
                        video.srcObject = streamVideo; // srcObject propiedad elementos video, mostrar cámara en el elemento video

                        cameraBox.style.display = "block"; // mostrar contenedor de la cámara

                        openCameraBtn.style.display = "none"; // ocultar botón de abrir cámara
                        captureBtn.style.display = "block"; // mostrar el botón capturar
                        noCaptureBtn.style.display = "block";

                        console.log("✅ Cámara activada correctamente.");
                    } else {
                        console.error("⚠️ No se recibió flujo de video.");
                        alert("No se pudo acceder a la cámara.");
                    }
                })
                .catch((err) => { // capturar error
                    console.error("❌ Error al acceder a la cámara", err);
                    alert("No se puede acceder a la cámara.");
                });
        } catch (error) {
            console.error("❌ Error inesperado al intentar abrir la cámara:", error);
            alert("Hubo un problema al intentar acceder a la cámara.");
        }
    }

    // CERRAR CAMARA
    function closeCamera() {
        try {
            if (streamVideo) { // si hay flujo de video
                let tracks = streamVideo.getTracks(); // Obtener las pistas de video devuelve un array de objetos MediaStreamTrack
                tracks.forEach(track => track.stop()); // Detener cada pista
                streamVideo = null; // Resetear la variable

                console.log("✅ Cámara cerrada correctamente.");
            } else {
                console.warn("⚠️ No había una cámara activa para cerrar.");
            }

            cameraBox.style.display = "none"; // no mostrar contenedor de la cámara
            openCameraBtn.style.display = "block"; // mostrar botón de abrir cámara
            captureBtn.style.display = "none"; // ocultar el botón capturar
            noCaptureBtn.style.display = "none";

        } catch (error) {
            console.error("❌ Error al intentar cerrar la cámara:", error);
            alert("Hubo un problema al intentar cerrar la cámara.");
        }
    }


    // CAPTURAR LA IMAGEN Y CONVERTIRLA BASE64
    function captureImage() {
        try {
            if (video.videoWidth > 0 && video.videoHeight > 0) { // Verifica si el video está cargado correctamente
                // Establecer el tamaño del canvas igual al video
                canvas.width = video.videoWidth; // Propiedades que contienen el ancho real del video que proviene de la cámara.
                canvas.height = video.videoHeight; // Propiedades que contienen el alto real del video.

                // Dibujar la imagen del video en  <canvas>
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

    //Ejecutar funciones cuando se hacen clic en los botones
    openCameraBtn.addEventListener("click", openCamera); // Cuando se presiona "Abrir Cámara"
    noCaptureBtn.addEventListener("click", closeCamera); // Cuando se presiona "Cerrar Cámara"
    captureBtn.addEventListener("click", captureImage); // Cuando se presiona "Capturar Foto"
});