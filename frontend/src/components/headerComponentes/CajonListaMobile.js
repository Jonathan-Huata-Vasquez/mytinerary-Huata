import {makeStyles,Drawer,Divider} from '@material-ui/core'
import ListaMobile from './ListaMobile'

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

// recibo por props que tipo de cajon sera, si esta abierto, y la funcion para cambianr el estado de header del abierto
const Cajon = ({variante,abierto,abrirCerrarDrawer})=>{
    const misEstilos = useStyles();
    return(
        <Drawer 
            className ={misEstilos.cajon}  //estilos 
            classes ={{
                paper: misEstilos.cajonPaper, //le agrego al fondo un ancho 
            }}
            anchor = "left"  //se abrita desde la izquierda
            variant={variante} //el tipo de cajon que sera, en este caso que se puede abrir y cerrar
            open = {abierto} //esto recibe un boolean para aparecer abierto o cerrado
            
            //le mando la funcion para cerrar el cajon para que cambie el estado, gracias a esto re renderizara
            //el componente que tiene a este componente , lo que hara que este tambien se re renderize por cambiar sus props
            onClose = {abrirCerrarDrawer}
        >
        {/*classes es un objeto donde podemos señalar estilos de Css para el drawer*/}
        
        <div className ={misEstilos.navBarBottonMargin}></div>
        <Divider />
         <ListaMobile cerrarDrawer = {abrirCerrarDrawer} />
        </Drawer>
    );
}


export default Cajon ;