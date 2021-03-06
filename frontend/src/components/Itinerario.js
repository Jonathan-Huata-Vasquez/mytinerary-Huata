import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {  useState,useRef} from 'react';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import {connect} from 'react-redux'
import cityItineraryActions from '../redux/actions/cityItineraryAction.js'
import ItineraryActivities from './activities/ItineraryActivities'

import BtnLike from './BtnLike'


const useStyle = makeStyles({
    btnViewMoreEstilo :{
        backgroundColor: "#00bcd4",
        color:"white",
        borderColor: "#15e577",
        '&:hover':{
            backgroundColor: "#e0f7fa",
            color:"#00bcd4",
            borderWidth: "3px",
            borderColor:"#564345"
        }
    }
});
const Itinerario = ({unItinerario,cargarActividadesDeItinerario}) => {
    const misEstilos = useStyle();
    const [estaExpandido,setEstaExpandido] = useState(false);
    const [state,setState] = useState({
        actividades:[],
    })
    const refBtnViewMore = useRef(null);

    
    function crearNComponentes(n,componente){
        let aux = Array.from(new Array(n), (_,indice)=> <div key= {indice}>{componente}</div> )
        return  aux;
    }

    const  cargarActividades = async ()=>{
        setEstaExpandido(!estaExpandido)
        refBtnViewMore.current.focus();
        if(state.actividades?.length === 0){
            try{
                let respuesta = await cargarActividadesDeItinerario(unItinerario._id);
                setState({
                    ...state,
                    actividades:respuesta,
                })
            }catch(e){
                console.log(e);
            }
        }
    }
    
    

    return (
        <div className = "contenedorItinerario">
            <div className ="tituloItinerario"><h3>{unItinerario.titulo}</h3></div>
            <div className="autorItinerarioFoto" style={{backgroundImage : `url(/assets/itinerarios/${unItinerario.autorFoto}`}}></div>
            <h4 className ="mt-3">{unItinerario.autorNombre}</h4>
            <div className="portaPrecioDuracion">
                <div className ="portaPrecio">
                    <span className ="PriceDuration">Price </span>
                    <div className="portaSVGPriceDuration">
                        {crearNComponentes(unItinerario.precio,<LocalAtmIcon style= {{color:"green"}} />)}
                    </div>
                </div>
                <div className ="portaDuracion">
                    <span className ="PriceDuration">Duration </span>
                    <div className="portaSVGPriceDuration">
                        {crearNComponentes(unItinerario.duracion,<AccessTimeIcon style= {{color:"#1565c0"}}/>)}
                    </div>
                </div>
            </div>
            {/*eslint-disable-next-line*/}
            <a href="#" ref= {refBtnViewMore}></a>
            <div className="portalikesHashtags mt-3" >
                <BtnLike itinerarioId = {unItinerario._id} estaLikeado={unItinerario.estaLikeado} cantidadLikes={unItinerario.likes} />
                <div className = "portaHashtags mt-3">
                    {unItinerario.hashTags.map(hashTag => <span key={hashTag} className="hashtags ">{hashTag}</span>)}
                </div>
            </div>

            <Collapse in={estaExpandido} className="mt-3">
                <ItineraryActivities  actividades={state.actividades} idItinerario={unItinerario._id} comentarios={unItinerario.comentarios}/>
            </Collapse> 
            <Button
                className= {`${misEstilos.btnViewMoreEstilo} mt-3`}   
                variant="contained"
                endIcon={estaExpandido?  <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick = {cargarActividades}
            >
                {estaExpandido ? <>View Less</> : <>View More</>}
            </Button>
        </div>
    )
}
const mapStateToProps = state =>{
    return {
        usuarioLogueado : state.authReducer.usuarioLogueado
    }
}

const mapDispatchToProps = {
    cargarActividadesDeItinerario : cityItineraryActions.cargarActividadesDeItinerario,
    likearItinerario : cityItineraryActions.likearItinerario
}

export default connect(mapStateToProps,mapDispatchToProps)(Itinerario);