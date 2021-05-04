import NavBar from './NavBar'
import {Hidden} from '@material-ui/core'
import CajonListaMobile from './CajonListaMobile'
import {useState} from 'react'




const Header = () => {
    const [abierto, setAbierto] = useState(false); //Estado abrir o cerrar el menu mobile
    function abrirCerrarDrawer() {
        setAbierto(!abierto);
    }                
    return (
        <header>
            <NavBar abrirCerrarDrawer = {abrirCerrarDrawer}/>
            <Hidden mdUp>
                {/*la variante es el tipo que sera , temporary es para que se puede abrir y cerrar */}
                <CajonListaMobile variante="temporary" abierto={abierto} abrirCerrarDrawer={abrirCerrarDrawer} />
            </Hidden>
        </header>        
    );
}

export default Header;


