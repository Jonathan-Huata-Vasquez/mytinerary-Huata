import {Link} from 'react-router-dom'
const CiudadesEncontradas = ({ ciudadesEncontradas }) => {
    
    return (
        <div className="portaCiudadadesBuscador">
            {ciudadesEncontradas.length === 0 && 
                <div className="ciudadNoEncontrada" style={{backgroundImage:"url(./assets/ciudadNoEncontrada.jpg)"}}>
                    <div className="nombreCiudad">
                        Looks like the city that you're looking for is not yet...Try another one!
                    </div>
                </div>
            }

            {ciudadesEncontradas.map(ciudad => {
                return (
                    <Link  to ={`/cities/${ciudad._id}`} key={ciudad._id}>
                        <div  className="fotoCiudadCities" style={{ backgroundImage: `url(./assets/ciudades/${ciudad.foto})` }}>
                            <div className="nombreCiudad">{ciudad.nombreCiudad}</div>
                        </div>
                    </Link>
                ) 
            })}
        </div>
    )
}

export default CiudadesEncontradas;