import React, { useState } from 'react'

import {
    makeStyles,Hidden
} from '@material-ui/core'
import Header from '../components/Header';
import CajonListaMobile from '../components/CajonListaMobile';


const useStyles = makeStyles((theme) => ({
    contenedorHome: {
        display: "flex",
    },
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
    return (
        <div className={misEstilos.contenedorHome}>
            {/*le paso al boton de menu hamburguesa*/ }
            <Header abrirCerrarDrawer = {abrirCerrarDrawer} />
            
            <Hidden smUp>
                <CajonListaMobile variante = "temporary" abierto = {abierto} abrirCerrarDrawer = {abrirCerrarDrawer} /> 
            </Hidden>
           
            <div className = {misEstilos.contenidoHome,misEstilos}>
                <div className ={misEstilos.navBottonMargin}></div>
                Contenido
            </div>
            
            
        </div>
    )
}

export default Home;