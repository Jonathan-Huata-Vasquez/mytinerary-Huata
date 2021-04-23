import React from 'react'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {connect} from 'react-redux'
import cityItineraryActions from '../redux/actions/cityItineraryAction'
class City extends React.Component{
    state = {
        loading : true,
        ciudad : {}
    }

    componentDidMount(){
        let ciudadActual;
        let idCiudad = this.props.match.params.id;
        //if(this.props.ciudades.length !==0){
            ciudadActual = this.props.ciudades.find(ciudad =>  idCiudad === ciudad._id)
        /*}else{
            
            this.props.cargarciudad(idCiudad)
            console.log("hola")
            ciudadActual = this.props.ciudades.find(ciudad =>  idCiudad === ciudad._id)
        }*/
        
        this.setState({
            loading:false,
            ciudad : ciudadActual
        })
    }

    render(){
        if(this.state.loading){
            return (
                <div className ="cityItinerariesContenido">
                    <SkeletonTheme color="#eceff1"  highlightColor ="#90caf9">
                        <Skeleton duration={0.25}  width="90vw" height="60vh" className="esqueletoFotoCiudadCities" />
                    </SkeletonTheme>
                </div>
            )
        }
        if(!this.state.loading && !this.state.ciudad){
            return <div className ="cityItinerariesContenido"><h1>Ups, please reload the page </h1></div>
        }
        return(
            <div className ="cityItinerariesContenido">
                <div className = "cityItinerariesPortada" style={{backgroundImage : `url(/assets/ciudades/${this.state.ciudad.foto})`}} >
                    <h1>{this.state.ciudad.nombreCiudad}</h1>
                </div>
                <h1>Under construction</h1>           
                <Link to = "/cities" className =" LinkBlancoNone">
                    <Button variant="contained" color="primary" style={{color:"white"}}> 
                        Go back to Cities
                    </Button>
                </Link>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        ciudades : state.citiesReducer.todasLasCiudades,
    }
}
const mapDispatchToProps = {
    cargarCiudad : cityItineraryActions
}

export default connect(mapStateToProps,mapDispatchToProps)(City);