import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core'
import BotonLogin from './BotonLogin';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom'


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
    menuBoton: {
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
    const misEstilos = useStyles();


    //Creo un componente que tendra los botones del navNar
    const BotonesNav = () => {
        const links = [
            { contenidoTexto: "Home", estiloClase: misEstilos.navBoton, url: "/", },
            { contenidoTexto: "Cities", estiloClase: misEstilos.navBoton, url: "/Cities", }
        ];
        return (
            <>
                {/*el boton del menu hamburguesa, le colocamos la funcion enviada por props*/}
                <IconButton
                    color="inherit"
                    className={misEstilos.menuBoton}
                    onClick={abrirCerrarDrawer}
                >
                    <MenuIcon />
                </IconButton>

                {/*los links de la barra de navegacion*/}
                <NavLink exact to="/" style = {{color:"white" ,textDecoration:"none"}}>
                <div className = "estiloLogoNav">
                        <img src="./assets/logoCompleto2.png" style={{ width: "70px"}} alt="logoNavBar"></img>
                        <h5>MyTinerary</h5>
                    </div>
                </NavLink>
                
                

                <div className={misEstilos.navegacionLinks}>
                    {links.map(link => (
                        <NavLink exact to={link.url} key={link.url}  className ="estilosLinkNav" activeClassName ="estilosLinkNavActive">
                            <Typography
                                variant="h6"
                                color="initial"
                                className={link.estiloClase}
                            >
                                {link.contenidoTexto}
                            </Typography>
                        </NavLink>
                    ))}
                </div>
                
            
            </>
        )
    }
    return (
        <header>
            <AppBar position="fixed" >  {/*esta el la barra,  se le puede poner como atributo postion = "sticky para que no tape contenido" */}
                <Toolbar>
                    <BotonesNav />
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