import React, { useState } from 'react'

import {
    makeStyles, Hidden, Typography
} from '@material-ui/core'
import Header from '../components/Header';
import CajonListaMobile from '../components/CajonListaMobile';
import MiCarousel from '../components/MiCarousel'
import { respuestaFetch, obtenerGruposCiudades } from '../ciudades'
import { Container, Row, Col,Button } from 'reactstrap';
const useStyles = makeStyles((theme) => ({


    navMargin: theme.mixins.toolbar,
    contenidoHome: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const Home = () => {
    const misEstilos = useStyles();
    const [abierto, setAbierto] = useState(false);
    function abrirCerrarDrawer() {
        setAbierto(!abierto);
    }
    let gruposCiudades = obtenerGruposCiudades(respuestaFetch);


    return (
        <div className ="bg-dark text-white">
            {/*le paso al boton de menu hamburguesa*/}
            <Header abrirCerrarDrawer={abrirCerrarDrawer} />

            <Hidden smUp>
                <CajonListaMobile variante="temporary" abierto={abierto} abrirCerrarDrawer={abrirCerrarDrawer} />
            </Hidden>

            <div className="contenidoHome">
                <div className={misEstilos.navMargin}></div>
                <div className="hero" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(./assets/opcHero5.gif)' }}>
                    <img src="assets/logoCompleto2.png" style={{ width: "25vw", minWidth: "210px" }}></img>
                    
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
                                    <Button color="secondary">Show Me!</Button>
                                </div>
                                
                            </div> 
                        </Col>
                    </Row>
                
                </Container>
                
                <h3 className ="mt-5 mb-3">Popular Mytineraries</h3>
                <MiCarousel gruposCiudades={gruposCiudades} />
            </div>


        </div>
    )
}

export default Home;