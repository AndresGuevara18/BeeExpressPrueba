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

    //FUNCION ABRIR CAMARA
    function openCamera(){
        ////método de la API web que solicita al usuario permiso para usar dispositivos de entrada de audio y video
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => { //despues de que conceda el permiso 
                streamVideo = mediaStream; // se almacena el flujo del video en la variable let
                video.srcObject = streamVideo; //srcObject propiedad elementos video, mostar camara en el elemnto video

                cameraBox.style.display = "block";//mostrar contenedor de la camara 

                openCameraBtn.style.display = "none";//ocultar boton de abrir camara
                captureBtn.style.display = "block"; //mostrar el boton capturar
                noCaptureBtn.style.display = "block";
            })
            .catch((err) =>{//capturar error
                console.log("FRONT❌ Error al acceder a la cámara", err);
                alert("No se puede acceder a la cámara");
            });
    }

    function closeCamera(){        
        if (streamVideo) {
            let tracks = streamVideo.getTracks(); // Obtener las pistas del video
            tracks.forEach(track => track.stop()); // Detener cada pista
            streamVideo = null; // Resetear la variable
        }
        cameraBox.style.display = "none";// no mostrar contenedor de la camara
        openCameraBtn.style.display = "block";//ocultar boton de abrir camara
        captureBtn.style.display = "none"; //mostrar el boton capturar
        noCaptureBtn.style.display = "none";
    }

    //Ejecutar funciones cuando se hacen clic en los botones
    openCameraBtn.addEventListener("click", openCamera); // Cuando se presiona "Abrir Cámara"
    noCaptureBtn.addEventListener("click", closeCamera);

});