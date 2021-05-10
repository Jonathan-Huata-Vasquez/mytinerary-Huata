
import MiCarrousel from '../carrousel/MiCarousel'
import CajaCommentarios from './CajaComentario'
import EsqueletoCarrouselActivities from '../esqueletos/EsqueletoCarrousel'

const ItineraryActivities = ({ actividades = [], idItinerario, comentarios }) => {
    return (
        <div className="contenedorActivities">
            {actividades.length === 0
                ? <EsqueletoCarrouselActivities />
                :

                <MiCarrousel
                    className="mt-3"
                    elementos={actividades}
                    cantidadElementosSlide={1}
                    estiloSlide="slideEstilo-Activity"
                    estiloImagen="imagenCarrousel-Activity"
                    propTitulo="titulo"
                    propUrlImagen="imagen"
                    interval={0}
                />
            }
            <div className="labelActividades mb-2">Activities</div>


            <h3>Leave a Comment</h3>
            <CajaCommentarios idItinerario={idItinerario} comentarios={comentarios} />
        </div>
    );
}

export default ItineraryActivities;