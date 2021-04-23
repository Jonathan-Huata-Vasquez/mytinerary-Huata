import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {useState} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
const Itinerario = () => {
    const [liked,setLiked] = useState(false);

    return (
        <div className = "contenedorItinerario">
            <div className ="tituloItinerario"><h3>Titulo Itinerario</h3></div>
            <div className="autorItinerarioFoto" style={{backgroundImage : "url(/assets/itinerarios/antalya/autor.png)"}}></div>
            <h4 className ="mt-3">Edgar Walddorf</h4>
            <div className="portaPrecioDuracion">
                <div className ="portaPrecio">
                    <span className ="PriceDuration">Price: </span>
                    <div className="portaSVGPriceDuration">
                        <LocalAtmIcon style= {{color:"green"}} />
                        <LocalAtmIcon style= {{color:"green"}} />
                        <LocalAtmIcon style= {{color:"green"}} />
                        <LocalAtmIcon style= {{color:"green"}} />
                        <LocalAtmIcon style= {{color:"green"}} />
                    </div>
                </div>
                <div className ="portaDuracion">
                    <span className ="PriceDuration">Duration: </span>
                    <div className="portaSVGPriceDuration">
                        <AccessTimeIcon style= {{color:"#1565c0"}}/>
                        <AccessTimeIcon style= {{color:"#1565c0"}}/>
                        <AccessTimeIcon style= {{color:"#1565c0"}}/>
                        <AccessTimeIcon style= {{color:"#1565c0"}}/>
                        <AccessTimeIcon style= {{color:"#1565c0"}}/>
                    </div>
                </div>
            </div>

            <div className="portalikesHashtags">
                <div className = "portaLikes">
                    <IconButton size="small" color="secondary" onClick = {()=>setLiked(!liked)}>
                        {liked ?<FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <span className="PriceDuration">8</span>
                </div>
                <div className = "portaHashtags mt-3">
                    <span className="hashtags link-info">#Paris</span>
                    <span className="hashtags link-info">#Paris</span>
                    <span className="hashtags link-info">#Paris</span>
                    <span className="hashtags link-info">#Paris</span>
                    <span className="hashtags link-info">#Paris</span>
                </div>
            </div>

        </div>
    )
}

export default Itinerario;