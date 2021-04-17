import React from 'react'
import axios from 'axios'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
class City extends React.Component{

    state = {
        loading : true,
        ciudad : {}
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/api/cities/${this.props.match.params.id}`)
        .then(response => this.setState({
            loading : false,
            ciudad : response.data.respuesta
        }))
        
    }

    render(){
        if(this.state.loading){
            return <div className ="cityItinerariesContenido"><h1>Loading...</h1></div>
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