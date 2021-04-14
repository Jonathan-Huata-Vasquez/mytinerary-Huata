
const CiudadesEncontradas = ({ ciudadesEncontradas }) => {
    return (
        <div className="portaCiudadadesBuscador">
            {ciudadesEncontradas.map(ciudad => {
                return (
                    <div key={ciudad.id} className="fotoCiudadCities" style={{ backgroundImage: `url(./assets/ciudades/${ciudad.foto})` }}>
                        <div className="nombreCiudad">{ciudad.nombreCiudad}</div>
                    </div>)
            })}
        </div>
    )
}

export default CiudadesEncontradas;