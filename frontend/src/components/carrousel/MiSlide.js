
const MiSlide = ({grupoElementos,estiloSlide,estiloImagen,propTitulo,propUrlImagen}) =>{
    return (
        <div className ={estiloSlide}>
            {grupoElementos.map( (unElemento) => 
                <div key={unElemento[propUrlImagen]} className ={estiloImagen} style ={{backgroundImage: `url(/assets/${unElemento[propUrlImagen]})`}}>
                    <div className ="nombreCiudad">{unElemento[propTitulo]}</div>
                </div>
            )}
        </div> 
    );
}
/*itinerarios/antalya/ruinsInAntalya/aspendos.jpg */
/*style ={{backgroundImage: `url(./assets/${unElemento[propUrlImagen]})`}}> */
export default MiSlide;