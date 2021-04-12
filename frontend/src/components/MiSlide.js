
const MiSlide = ({grupoCiudades}) =>{
    return (
        <div className ="slideEstilo">
            {grupoCiudades.map( (unaCiudad) => 
                <div key={unaCiudad.id} className ="imagenCarrousel" style ={{backgroundImage: `url(./assets/ciudades/${unaCiudad.foto})`}}>
                    <div className ="nombreCiudadSlide">{unaCiudad.nombreCiudad}</div>
                </div>
            )}
        </div> 
    );
}

export default MiSlide;