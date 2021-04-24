import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useState} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import {makeStyles}from '@material-ui/core'
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
const Itinerario = () => {
    const misEstilos = useStyle();
    const [liked,setLiked] = useState(false);
    const [estaExpandido,setEstaExpandido] = useState(false);

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

            <div className="portalikesHashtags mt-3">
                <div className = "portaLikes">
                    <IconButton size="small" color="secondary" onClick = {()=>setLiked(!liked)}>
                        {liked ?<FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <span className="PriceDuration">8</span>
                </div>
                <div className = "portaHashtags mt-3">
                    <span className="hashtags ">#Paris</span>
                    <span className="hashtags ">#NoMamesQueAsco</span>
                    <span className="hashtags ">#AquiConElPincheMonstruoCulero</span>
                    <span className="hashtags ">#presenciandoElMilagroDeLaVida</span>
                    <span className="hashtags ">#Paris</span>
                </div>
            </div>

            <Collapse in={estaExpandido} className="mt-3">
                <img src = "http://gulahmedelectric.com/under_construction1.jpg" alt="construccion" className="w-75"/>
            </Collapse> 
            <Button
                className= {`${misEstilos.btnViewMoreEstilo} mt-3`}   
                variant="contained"
                endIcon={estaExpandido?  <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick = {()=>setEstaExpandido(!estaExpandido)}
            >
                {estaExpandido ? <>View Less</> : <>View More</>}
            </Button>
        </div>
    )
}

export default Itinerario;