import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { useState} from 'react';
import {connect} from  'react-redux'
import { mostrarTostada,mostrarTostadaError500 } from '../helpers/tostadas.js';
import cityItineraryActions from '../redux/actions/cityItineraryAction.js'
const BtnLike = ({itinerarioId,estaLikeado,cantidadLikes, usuarioLogueado,likearItinerario,  }) => {    
    const [estado,setEstado] = useState({
        estaLikeado,
        cantidadLikes ,
    })
    const [peticionando,setPeticionando] = useState(false);
    

    const likear = async ()=>{
        if(!usuarioLogueado){
            return  mostrarTostada("info","You must be logged in to like it");
        }
        if(peticionando) return false

        setPeticionando(true);

        let estadoAntesDeActualizar = {...estado}
        setEstado({
            ...estado,
            cantidadLikes : estado.estaLikeado? estado.cantidadLikes-1: estado.cantidadLikes+1,
            estaLikeado: !estado.estaLikeado,
        })
        let respuesta;
        try{
            respuesta = await likearItinerario(usuarioLogueado.token,itinerarioId);
            if(!respuesta.success) setEstado(estadoAntesDeActualizar)
            setPeticionando(false)

        }catch(e){
            console.log(e)
            mostrarTostadaError500();
        }
        
    }

    return (
        <div className="portaLikes">
            <IconButton size="small" color="secondary" onClick={likear} >
                {estado.estaLikeado && usuarioLogueado ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <span className="PriceDuration">{estado.cantidadLikes}</span>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        usuarioLogueado : state.authReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    likearItinerario : cityItineraryActions.likearItinerario
}

export default connect(mapStateToProps,mapDispatchToProps)(BtnLike);