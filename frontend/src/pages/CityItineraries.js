import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect } from 'react-redux'
import cityItineraryActions from '../redux/actions/cityItineraryAction'
import Itinerario from '../components/Itinerario'
import EsqueletoItinerario from '../components/esqueletos/EsqueletoItinerario'
class City extends React.Component {
    state = {
        ciudad: {}
    }

    componentDidMount() {
        let idCiudad = this.props.match.params.id;
        let ciudadActual = this.props.ciudades.find(ciudad => idCiudad === ciudad._id)
        this.setState({
            ciudad: ciudadActual
        })
        this.props.cargarItinerarios(idCiudad);
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
        if (!this.props.loading && !this.state.ciudad) {
            return <div className="cityItinerariesContenido"><h1>Ups, please reload the page </h1></div>
        }
        return (
            <div className="cityItinerariesContenido">
                <div className="cityItinerariesPortada" style={{ backgroundImage: `url(/assets/ciudades/${this.state.ciudad.foto})` }} >
                    <h1>{this.state.ciudad.nombreCiudad}</h1>
                </div>

                {this.props.itinerariosCiudad.length === 0 &&
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
        loading: state.cityItineraryReducer.loading
    }
}
const mapDispatchToProps = {
    cargarItinerarios: cityItineraryActions.cargarItinerarios
}

export default connect(mapStateToProps, mapDispatchToProps)(City);