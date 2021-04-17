import {Link} from 'react-router-dom'

const CiudadesFiltradas = ({ ciudades }) => {
    
    return (
        <div className="portaCiudadadesFiltradas">
            {ciudades.length === 0 && 
                <div className="ciudadNoEncontrada" style={{backgroundImage:"url(/assets/ciudadNoEncontrada.jpg)"}}>
                    <div className="nombreCiudad">
                        Looks like the city that you're looking for is not yet...Try another one!
                    </div>
                </div>
            }

            {ciudades.map(ciudad => {
                return (
                    <Link className="LinkBlancoNone" to ={`/cities/${ciudad._id}`} key={ciudad._id}>
                        <div  className="fotoCiudadCities" style={{ backgroundImage: `url(/assets/ciudades/${ciudad.foto})` }}>
                            <div className="nombreCiudad">{ciudad.nombreCiudad}</div>
                        </div>
                    </Link>
                ) 
            })}
        </div>
    )
}

export default CiudadesFiltradas;