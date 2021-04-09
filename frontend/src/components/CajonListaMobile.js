import {makeStyles,Drawer,Divider} from '@material-ui/core'
import ListaMobile from '../components/ListaMobile'
const anchoCajon = "240px";
const useStyles = makeStyles(theme => ({
    cajon: {
        width : anchoCajon,
        flexShrink: 0,
    },
    cajonPaper: {
        width :anchoCajon,
    },
    //para  que tenga un espaciado al principio del tamaño del nav
    navBarBottonMargin: theme.mixins.toolbar,
}));

const Cajon =({variante,abierto,abrirCerrarDrawer})=>{
    const misEstilos = useStyles();
    return(
        <Drawer 
            className ={misEstilos.cajon} 
            classes ={{
                paper: misEstilos.cajonPaper,
            }}
            anchor = "left"
            variant={variante}
            open = {abierto}
            //como en el primer drawer no vamos a enviar nada
            onClose = {abrirCerrarDrawer? abrirCerrarDrawer: null}
        >
        {/*classes es un objeto donde podemos señalar estilos de Css para el drawer*/}
        
        <div className ={misEstilos.navBarBottonMargin}></div>
        <Divider />
         <ListaMobile />
        </Drawer>
    );

}
export default Cajon ;