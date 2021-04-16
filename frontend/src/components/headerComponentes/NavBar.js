import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import BotonLogin from './BotonLogin';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import LinkNav from './LinkNav'

//podemos llamar al theme que tenemos  para cambiar algunas propiedades que tiene por defecto
//(theme) =>{}) es una funcion de flecha que llama el tema y devuelva el objeto que debe ir dentro de makeStyle
const useStyles = makeStyles(theme => ({
    //para dar un margen bottom al navBar y no tape los contenidos por tener position fixed
    //colocara el alto(margin bottom) de forma dinamica (ya que no para todos los tamaños tiene la misma altura)
    //Al toolBar porque se adapta al tamaño de este
    //navBarBottonMargin: theme.mixins.toolbar,

    navMargin: theme.mixins.toolbar,
    navegacionLinks: {
        flexGrow: "1",
        display: "flex",
    },
    menuHamburguesaBoton: {
        marginRight: theme.spacing(2),
        //devuelve una media query que se aplica para los menores a sm 600px
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    },
    navBoton: {

        marginRight: theme.spacing(2),
        //devuelve una media query que se aplica para los mayores a sm 600px
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
}))



const NavBar = ({ abrirCerrarDrawer }) => {
    //este me devolvera las clases en un objeto 
    const misEstilos = useStyles();
    const links = [
        { contenidoTexto: "Home", estiloClase: misEstilos.navBoton, url: "/", },
        { contenidoTexto: "Cities", estiloClase: misEstilos.navBoton, url: "/cities", }
    ];

    //Creo un componente que tendra los botones del navNar
    
    return (
        <header>
            <AppBar position="fixed" >  {/*esta el la barra,  se le puede poner como atributo postion = "sticky para que no tape contenido" */}
                <Toolbar>
                    <IconButton
                        color="inherit"
                        className={misEstilos.menuHamburguesaBoton}
                        onClick={abrirCerrarDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/*los links de la barra de navegacion*/}
                    <Link  to="/" className ="letrasLogo">
                        <div className="estiloLogoNav">
                            <img src="/assets/logoCompleto2.png" className ="logoNav" alt="logoNavBar"></img>
                            <h5>MyTinerary</h5>
                        </div>
                    </Link>
                    <div className = {misEstilos.navegacionLinks}>
                        {links.map(link =>  <LinkNav key={link.url}  link = {link}/> )}
                    </div>
                    
                    <BotonLogin />
                </Toolbar>
            </AppBar>
            <div className={misEstilos.navMargin}></div>
        </header>
    );
}
export default NavBar;


//notas
//boton desplegable del Material UI: te deja ocultarlo si le pones un  div como padre  y ocultas al div