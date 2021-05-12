import { toast } from 'react-toastify';

const configuracionTostadaDefault = (position) =>{
    return  {
        position: position,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
}

export function mostrarTostada(tipo, message, position = "top-right",) {
    
    switch (tipo) {
        case "error":
            toast.error(message, configuracionTostadaDefault(position));
            break;
        case "success":
            toast.success(message, configuracionTostadaDefault(position));
            break;
        case "info":
            toast.info(message, configuracionTostadaDefault(position));
            break;
        default:
            console.log("default")
    }
}

export function mostrarTostadaError500( position = "top-right",) {
    toast.error("ups , something went wrong, please try again... ", configuracionTostadaDefault(position));
}

export function mostrarTostadaNecesarioLoguearse( position = "top-right",) {
    const configuracionTostada = {
        position: position,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    toast.info("ups , something went wrong, please try again... ", configuracionTostada);
}
