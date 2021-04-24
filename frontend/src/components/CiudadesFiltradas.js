import {Link} from 'react-router-dom'
import Zoom from '@material-ui/core/Zoom';
const CiudadesFiltradas = ({ ciudades }) => {
    console.log(ciudades)
    return (
        <div className="portaCiudadadesFiltradas">
            
            {(!ciudades || ciudades.length === 0) && 
                <div className="ciudadNoEncontrada" style={{backgroundImage:"url(/assets/ciudadNoEncontrada.jpg)"}}>
                    <div className="nombreCiudad">
                        It seems that the city you are looking for is not yet ... Try another!
                    </div>
                </div>
            }
            
            {ciudades.map(ciudad => {
                return (
                    
                    <Link className="LinkBlancoNone" to ={`/cities/${ciudad._id}`} key={ciudad._id}>
                        <Zoom in={true} style={{ transitionDelay: '100ms'  }}>
                            <div  className="fotoCiudadCities" style={{ backgroundImage: `url(/assets/ciudades/${ciudad.foto})` }}>
                                <div className="nombreCiudad">{ciudad.nombreCiudad}</div>
                            </div>
                        </Zoom>
                    </Link>
                    
                ) 
            })}
            
        </div>
    )
}

export default CiudadesFiltradas;