import NavBar from './NavBar'
import {Hidden} from '@material-ui/core'
import CajonListaMobile from './CajonListaMobile'
import {useState} from 'react'




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


