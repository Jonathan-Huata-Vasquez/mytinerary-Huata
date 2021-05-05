import { toast } from 'react-toastify';

    
   export  function mostrarTostada(tipo,message,position = "top-right",) {
        const configuracionTostada = {
            position: position,
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        switch(tipo){
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


