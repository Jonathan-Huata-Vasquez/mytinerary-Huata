import React, { useState } from 'react'

import {
    makeStyles,Hidden,Typography
} from '@material-ui/core'
import Header from '../components/Header';
import CajonListaMobile from '../components/CajonListaMobile';
import MiCarousel from '../components/MiCarousel'
import {respuestaFetch, obtenerGruposCiudades} from '../ciudades'

const useStyles = makeStyles((theme) => ({
    
    
    navMargin: theme.mixins.toolbar,
    contenidoHome : {
        flexGrow : 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const Home = () => {
    const misEstilos = useStyles();
    const [abierto ,setAbierto] = useState(false);
    function abrirCerrarDrawer(){
        setAbierto(!abierto);
    }
    let gruposCiudades = obtenerGruposCiudades(respuestaFetch);
    

    return (
        <div >
            {/*le paso al boton de menu hamburguesa*/ }
            <Header abrirCerrarDrawer = {abrirCerrarDrawer} />
            
            <Hidden smUp>
                <CajonListaMobile variante = "temporary" abierto = {abierto} abrirCerrarDrawer = {abrirCerrarDrawer} /> 
            </Hidden>
           
            <div className = "contenidoHome">
                <div className ={misEstilos.navMargin}></div>
                
                <div className ="hero" style= {{backgroundImage : 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(./assets/opcHero5.gif)'}}>
                
                <img src="assets/logoCompleto2.png" style = {{width : "25vw", minWidth : "210px"}}></img>
                <Typography variant= "h1" gutterBottom>MyTinerary</Typography>
                <h2>Find your perfect trip, designed by insiders who know and love their cities!.</h2>

                
                </div>
                    <h3>Popular Mytineraries</h3>
                    <MiCarousel gruposCiudades={gruposCiudades}/> 
                </div>
            
            
        </div>
    )
}

export default Home;