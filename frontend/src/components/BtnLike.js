import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { useState} from 'react';
import {connect} from  'react-redux'
import { mostrarTostada,mostrarTostadaError500 } from '../helpers/tostadas.js';
import cityItineraryActions from '../redux/actions/cityItineraryAction.js'
const BtnLike = ({itinerarioId,estadoUserLike,cantidadLikes, usuarioLogueado,likearItinerario,  }) => {    
    const [estado,setEstado] = useState({
        liked:estadoUserLike,
        cantidadLikes ,
        peticionCargando: false
    })
    

    const likear = async ()=>{
        if(!usuarioLogueado){
            return  mostrarTostada("info","You must be logged in to like it");
        }
        
        
        if(estado.peticionCargando) return null
        let nuevaCantidadLike = estado.liked? estado.cantidadLikes-1: estado.cantidadLikes+1;
        let likeado = !estado.liked;
        setEstado({
            ...estado,
            cantidadLikes : nuevaCantidadLike,
            liked: likeado,
            peticionCargando:true
        })
        try{
            
            await likearItinerario(usuarioLogueado.token,itinerarioId);
            setEstado({
                ...estado,
                cantidadLikes : nuevaCantidadLike,
                liked: likeado,
                peticionCargando:false
            })
            
        }catch(e){
            mostrarTostadaError500()
        }
        
    }

    return (
        <div className="portaLikes">
            <IconButton size="small" color="secondary" onClick={likear} >
                {estado.liked && usuarioLogueado ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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