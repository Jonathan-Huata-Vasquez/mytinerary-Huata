import { useEffect, useState } from "react";
import MiCarrousel from '../carrousel/MiCarousel'

const ItineraryActivities = ({actividades = []}) => {
    console.log(actividades)
    useEffect( ()=>{
        console.log("se monto ItineraryActivities")
        
    },[]) 
    
    //{elementos,cantidadElementosSlide,estiloSlide,estiloImagen}
    return(
        <div className ="contenedorActivities">
            <div className="labelActividades">Activities</div>
            {<MiCarrousel
            className="mt-3"
            elementos = {actividades} 
            cantidadElementosSlide = {1} 
            estiloSlide="slideEstilo-Activity" 
            estiloImagen="imagenCarrousel-Activity"
            propTitulo = "titulo"
            propUrlImagen = "imagen"
            />}
        </div>
    );
}

export default ItineraryActivities;