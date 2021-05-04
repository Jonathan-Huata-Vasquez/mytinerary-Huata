import { Typography } from '@material-ui/core'
import { respuestaFetch, obtenerGruposCiudades } from '../helpers/ciudades.js'
import MiCarousel from '../components/carrousel/MiCarousel'

import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'



const Home = (props) => {
    

    let gruposCiudades = obtenerGruposCiudades(respuestaFetch,1);

    //esto es porque no logro poner el estilo del background-image del hero 
    const estiloBackgroundImagen = "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)) , url(./assets/opcHero5.gif)"
    return (
        <div className ="contenedorHome">
            <div className="hero" style={{ backgroundImage: estiloBackgroundImagen }}>
                <img src="assets/logoCompleto2.png" alt="logoHome" className="logoHero" />
                <h1>MyTinerary</h1>
                <h2 className="mt-5">Find your perfect trip, designed by insiders who know and love their cities!</h2>
            </div>
            <Container fluid={true}>
                <Row>
                    <Col >
                        <div className="callToAction " style={{ backgroundImage: `url(./assets/callToAction.jpg)` }}>
                            <div className="flex-grow-1 mt-5 ">
                                <Typography variant="h3" >TIME TO TRAVEL</Typography>
                            </div>
                            <div className="mb-4 d-flex flex-column align-items-center">
                                <h3>Make your dreams come true</h3>
                                <Link to="/Cities">
                                    <Button color="info">Show Me!</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <h3 className="mt-5 mb-3">Popular MYtineraries</h3>
            <MiCarousel gruposCiudades={gruposCiudades} />
        </div>
    )
}

export default Home;