import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {  useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import {connect} from 'react-redux'
import cityItineraryActions from '../redux/actions/cityItineraryAction.js'
import ItineraryActivities from './activities/ItineraryActivities'
import { mostrarTostada } from '../helpers/tostadas.js';

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
const Itinerario = ({usuarioLogueado,unItinerario,cargarActividadesDeItinerario,likearItinerario}) => {
    const misEstilos = useStyle();
    const [estaExpandido,setEstaExpandido] = useState(false);
    const [loading,setLoading] = useState(false);
    const [state,setState] = useState({
        actividades:[],
        liked:unItinerario.estadoUserLike
    })

    
    function crearNComponentes(n,componente){
        let aux = [];
        for(let i = 0 ; i< n ; i++){
            aux.push(<div key= {i}>{componente}</div> )
        }
        return <>{aux}</>
    }

    const  cargarActividades = async ()=>{
        setEstaExpandido(!estaExpandido)
        if(state.actividades.length === 0){
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
    
    
    const likear = async ()=>{
        if(!usuarioLogueado){
            return  mostrarTostada("info","You must be logged in to like it");
        }
        //btnLike.current.disabled();
        try{
            setLoading(true)
            console.log("hola")
            await likearItinerario(usuarioLogueado.token,unItinerario._id);
            setState({
                ...state,
                liked: !state.liked
            })
            setLoading(false)
        }catch(e){
            console.log(e)
            setLoading(false)
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

            <div className="portalikesHashtags mt-3">
                <div className = "portaLikes">
                    <IconButton size="small" color="secondary" onClick = {likear} >
                        {state.liked ?<FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <span className="PriceDuration">{unItinerario.likes}</span>
                </div>
                <div className = "portaHashtags mt-3">
                    {unItinerario.hashTags.map((hashTag,indice) => <span key={hashTag} className="hashtags ">{hashTag}</span>)}
                </div>
            </div>

            <Collapse in={estaExpandido} className="mt-3">
                <ItineraryActivities  actividades={state.actividades}/>
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