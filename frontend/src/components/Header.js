import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core'
import BotonLogin from './BotonLogin';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from 'react-router-dom'

//podemos llamar al theme que tenemos  para cambiar algunas propiedades que tiene por defecto
//(theme) =>{}) es una funcion de flecha que llama el tema y devuelva el objeto que debe ir dentro de makeStyle
const useStyles = makeStyles(theme => ({
    //para dar un margen bottom al navBar y no tape los contenidos por tener position fixed
    //colocara el alto(margin bottom) de forma dinamica (ya que no para todos los tamaños tiene la misma altura)
    //Al toolBar porque se adapta al tamaño de este
    //navBarBottonMargin: theme.mixins.toolbar,

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


const Header = ({ abrirCerrarDrawer }) => {
    const misEstilos = useStyles();


    const BtnMenu = () => {
        const links = [
            {
                contenidoTexto: "Home",
                estiloClase: misEstilos.navBoton,
                url: "/",
            },
            {
                contenidoTexto: "City",
                estiloClase: misEstilos.navBoton,
                url: "/City",
            }
        ];

        return (
            <>
                <IconButton
                    color="inherit"
                    className={misEstilos.menuBoton}
                    onClick={abrirCerrarDrawer}
                >
                    <MenuIcon />
                </IconButton>
                {/*los links de la barra de navegacion*/}
                <div className={misEstilos.navegacionLinks}>
                    {links.map(link => (
                        <NavLink to = {link.url}>
                            <Typography key={link.url}
                            variant="h6"
                            color="initial"
                            className={link.estiloClase}
                        >
                            {link.contenidoTexto}
                        </Typography>
                        </NavLink>
                    ))}
                </div>
                <div className={misEstilos.navBoton}> {/*le agrego div para que me deje ocultarlo*/}
                    <BotonLogin />
                </div>

            </>
        )
    }
    return (
        <AppBar position="fixed" >  {/*esta el la barra,  se le puede poner como atributo postion = "sticky para que no tape contenido" */}
            <Toolbar>
                <BtnMenu />
            </Toolbar>
        </AppBar>
    );
}

export default Header;


