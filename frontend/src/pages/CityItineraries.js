import React from 'react'
import axios from 'axios'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
class City extends React.Component{

    state = {
        loading : true,
        ciudad : {}
    }

    componentDidMount(){
        axios.get(`http://192.168.1.104:4000/api/cities/${this.props.match.params.id}`)
        .then(response => this.setState({
            loading : false,
            ciudad : response.data.respuesta
        }))
        .catch(error => this.setState({ //caso de que falle la comunicacion
            loading:false,
        }))
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
export default City;