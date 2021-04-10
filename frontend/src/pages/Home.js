import React, { useState } from 'react'

import {
    makeStyles,Hidden
} from '@material-ui/core'
import Header from '../components/Header';
import CajonListaMobile from '../components/CajonListaMobile';
import MiCarousel from '../components/MiCarousel'
import {respuestaFetch, obtenerGruposCiudades} from '../ciudades'

const useStyles = makeStyles((theme) => ({
    
    
    navBottonMargin: theme.mixins.toolbar,
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
            <div className ={misEstilos.navBottonMargin}></div>
                <MiCarousel gruposCiudades={gruposCiudades}/> 
            </div>
            
            
        </div>
    )
}

export default Home;