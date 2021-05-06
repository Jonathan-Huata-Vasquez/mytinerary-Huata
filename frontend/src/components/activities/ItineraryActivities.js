
import MiCarrousel from '../carrousel/MiCarousel'
import CajaCommentarios from './CajaComentario'

const ItineraryActivities = ({actividades = [],comentarios}) => {
    return(
        <div className ="contenedorActivities">
            <div className="labelActividades mb-2">Activities</div>
            <MiCarrousel
                className="mt-3"
                elementos = {actividades} 
                cantidadElementosSlide = {1} 
                estiloSlide="slideEstilo-Activity" 
                estiloImagen="imagenCarrousel-Activity"
                propTitulo = "titulo"
                propUrlImagen = "imagen"
            />
            <h3>Leave a Comment</h3>
            <CajaCommentarios comentarios={comentarios}/>
        </div>
    );
}

export default ItineraryActivities;