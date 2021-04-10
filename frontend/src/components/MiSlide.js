
const MiSlide = ({grupoCiudades}) =>{
    return (
        <div className ="slideEstilo">
            {grupoCiudades.map( (unaCiudad) => 
                <div key={unaCiudad.id} className ="imagenCarrousel" style ={{backgroundImage: `url(./assets/ciudades/${unaCiudad.foto})`}}>
                    <div style = {{backgroundColor:"rgba(0,0,0,.562)", color: "white", width :"100%", textAlign:"center" }}>{unaCiudad.nombreCiudad}</div>
                </div>
            )}
        </div> 
    );
}

export default MiSlide;