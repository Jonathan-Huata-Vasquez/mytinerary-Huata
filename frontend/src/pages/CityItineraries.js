import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect } from 'react-redux'
import cityItineraryActions from '../redux/actions/cityItineraryAction'
import Itinerario from '../components/Itinerario'
import EsqueletoItinerario from '../components/esqueletos/EsqueletoItinerario'
import { mostrarTostada } from '../helpers/tostadas';
class City extends React.Component {
    state = {
        ciudad: null
    }

    async componentDidMount() {
        let idCiudad = this.props.match.params.id;
        let ciudadActual;
        if(this.props.ciudades.length !== 0){
            ciudadActual = this.props.ciudades.find(ciudad => idCiudad === ciudad._id)
        }else{
            try{
                ciudadActual = await this.props.cargarCiudad(idCiudad)
            }catch(e){ //en que casos llega aca ???
                mostrarTostada("error","ups, reload please")
            }
        }
        this.setState({
            ciudad: ciudadActual
        })
        this.props.cargarItinerarios(idCiudad);
    }
    componentWillUnmount(){
        this.props.restaurarItinerarios()
    }    

    render() {
        if (this.props.loading) {
            return (
                <div className="cityItinerariesContenido">
                    <SkeletonTheme color="#eceff1" highlightColor="#90caf9">
                        <Skeleton duration={0.25} width="90vw" height="60vh" className="esqueletoFotoCiudadCities" />
                    </SkeletonTheme>
                    <EsqueletoItinerario />
                    <EsqueletoItinerario />
                </div>
            )
        }
        if(!this.props.loading){
            if(!this.props.error500Itinerarios && !this.state.ciudad)
                return (
                    <div className="cityItinerariesContenido">
                        <h1>Ups, please go back to Cities </h1>
                        <Link to="/cities" className=" LinkBlancoNone mt-5">
                            <Button variant="contained" color="primary" className="text-white">
                                Go back to Cities
                            </Button>
                        </Link>
                    </div>
                )
        }
        return (
            <div className="cityItinerariesContenido">
                <div className="cityItinerariesPortada" style={{ backgroundImage: `url(/assets/ciudades/${this.state.ciudad.foto})` }} >
                    <h1>{this.state.ciudad.nombreCiudad}</h1>
                </div>

                { this.props.itinerariosCiudad.length === 0 &&
                    <div className="sinItinerariosContenedor" style={{ backgroundImage: "url(/assets/itinerarios/sinItinerarios.jpg)" }}>
                        <div className="sinItinerariosContenido">
                            Sorry, we don't have any itinerary in this city yet :(
                        </div>
                    </div>
                }
                {this.props.itinerariosCiudad.map(itinerario => (
                    <Itinerario key={itinerario._id} unItinerario={itinerario} />
                ))}

                <Link to="/cities" className=" LinkBlancoNone mt-5">
                    <Button variant="contained" color="primary" className="text-white">
                        Go back to Cities
                    </Button>
                </Link>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ciudades: state.citiesReducer.todasLasCiudades,
        itinerariosCiudad: state.cityItineraryReducer.itinerariosCiudad,
        loading: state.cityItineraryReducer.loading,
        
    }
}
const mapDispatchToProps = {
    cargarItinerarios: cityItineraryActions.cargarItinerarios,
    cargarCiudad: cityItineraryActions.cargarCiudad,
    restaurarItinerarios: cityItineraryActions.restaurarItinerarios
}

export default connect(mapStateToProps, mapDispatchToProps)(City);