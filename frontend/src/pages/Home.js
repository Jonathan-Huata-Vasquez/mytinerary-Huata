import { Typography} from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer.js';
import { respuestaFetch, obtenerGruposCiudades } from '../ciudades.js'
import MiCarousel from '../components/MiCarousel.js'

import { Container, Row, Col,Button } from 'reactstrap';
import { Link } from 'react-router-dom'



const Home = () => {
    
    
    let gruposCiudades = obtenerGruposCiudades(respuestaFetch);


    return (
        <div className ="bg-dark text-white">
            <Header />
            <div className="contenidoHome">
               
                <div className="hero" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(./assets/opcHero5.gif)' }}>
                    <img src="assets/logoCompleto2.png" alt="logoHome" style={{ width: "25vw", minWidth: "210px" }}></img>
                    <h1>MyTinerary</h1> 
                    <h2 className="mt-5">Find your perfect trip, designed by insiders who know and love their cities!</h2>
                </div>
                <Container fluid={true}>
                    <Row>
                        <Col >
                            <div className ="callToAction " style = {{backgroundImage : `url(./assets/callToAction.jpg)`}}>
                                <div className ="flex-grow-1 mt-5 ">
                                    <Typography variant = "h3" >TIME TO TRAVEL</Typography>    
                                </div>
                                <div className = "mb-4 d-flex flex-column align-items-center">
                                    <h3>A selection of places to dream and realize</h3>
                                    <Link to ="/Cities">
                                        <Button color="info">Show Me!</Button>
                                    </Link>
                                    
                                </div>
                                
                            </div> 
                        </Col>
                    </Row>
                
                </Container>
                
                <h3 className ="mt-5 mb-3">Popular MYtineraries</h3>
                <MiCarousel gruposCiudades={gruposCiudades} />
            </div>


            <Footer />
        </div>
    )
}

export default Home;