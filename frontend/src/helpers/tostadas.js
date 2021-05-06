import { toast } from 'react-toastify';



export function mostrarTostada(tipo, message, position = "top-right",) {
    const configuracionTostada = {
        position: position,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    switch (tipo) {
        case "error":
            toast.error(message, configuracionTostada);
            break;
        case "success":
            toast.success(message, configuracionTostada);
            break;
        case "info":
            toast.info(message, configuracionTostada);
            break;
        default:
            console.log("default")
    }
}

export function mostrarTostadaError500( position = "top-right",) {
    const configuracionTostada = {
        position: position,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    toast.error("ups , something went wrong, please try again... ", configuracionTostada);
}

