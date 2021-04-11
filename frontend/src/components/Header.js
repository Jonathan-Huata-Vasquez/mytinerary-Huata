import NavBar from '../components/NavBar'
import {Hidden} from '@material-ui/core'
import CajonListaMobile from './CajonListaMobile'
import {useState} from 'react'

//podemos llamar al theme que tenemos  para cambiar algunas propiedades que tiene por defecto
//(theme) =>{}) es una funcion de flecha que llama el tema y devuelva el objeto que debe ir dentro de makeStyle


const Header = () => {
    const [abierto, setAbierto] = useState(false);
    function abrirCerrarDrawer() {
        setAbierto(!abierto);
    }                
    return (
        <header>
            <NavBar abrirCerrarDrawer = {abrirCerrarDrawer}/>
            <Hidden smUp>
                <CajonListaMobile variante="temporary" abierto={abierto} abrirCerrarDrawer={abrirCerrarDrawer} />
            </Hidden>
        </header>        
    );
}

export default Header;


