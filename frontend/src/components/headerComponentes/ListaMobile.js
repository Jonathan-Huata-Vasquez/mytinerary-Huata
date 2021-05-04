import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import authActions from '../../redux/actions/authActions'
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useLocation } from "react-router";

const ListaSimple = ({ cerrarDrawer, usuarioLogueado, desloguearUsuario}) => {
    const desloguearse = () => {
        cerrarDrawer();
        desloguearUsuario();
    }
    const { pathname } = useLocation();
    return (
        <div>
            {/*componentes: es para decirle cual es el elemento que sera el envolvedor */}
            <List component="nav" >
                {/*lo decimos que cada item sera un button*/}
                <NavLink exact to="/" className="btnMovilLoginLink" activeClassName="btnMovilLoginLinkActive">
                    <ListItem button onClick={cerrarDrawer} >
                        <ListItemIcon >
                            <HomeIcon className={pathname === "/" ? "btnMovilLoginLinkActive" : "btnMovilLoginLink"}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>

                <NavLink to="/cities" className="btnMovilLoginLink" activeClassName="btnMovilLoginLinkActive">
                    <ListItem button onClick={cerrarDrawer}>
                        <ListItemIcon >
                            <LocationCityIcon className={pathname === "/cities" ? "btnMovilLoginLinkActive" : "btnMovilLoginLink"}/>
                        </ListItemIcon>
                        <ListItemText > Cities</ListItemText>
                    </ListItem>
                </NavLink>

                <Divider />

                {!usuarioLogueado && (
                    [
                        <NavLink to="/login" className="btnMovilLoginLink" activeClassName="btnMovilLoginLinkActive" key ="/login">
                            <ListItem button onClick={cerrarDrawer}>
                                <ListItemIcon >
                                    <PersonIcon className={pathname === "/login" ? "btnMovilLoginLinkActive" : "btnMovilLoginLink"}/>
                                </ListItemIcon>
                                <ListItemText primary="Log in" />
                            </ListItem>
                        </NavLink>,
                        <NavLink to="/signup" className="btnMovilLoginLink" activeClassName="btnMovilLoginLinkActive" key = "/signup">
                            <ListItem button onClick={cerrarDrawer}>
                                <ListItemIcon >
                                    <PersonAddIcon className={pathname === "/signup" ? "btnMovilLoginLinkActive" : "btnMovilLoginLink"}/>
                                </ListItemIcon>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        </NavLink>
                    ]
                )}
                {usuarioLogueado &&(
                    <ListItem button onClick={desloguearse}>
                        <ListItemIcon >
                            <ExitToAppIcon className="btnMovilLoginLink"/>
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                )}


            </List>
        </div >

    );
}
const mapStateToProps = (state) => {
    return {
        usuarioLogueado: state.authReducer.usuarioLogueado
    };
}

const mapDispatchToProps = {
    desloguearUsuario: authActions.desloguearUsuario
  }

export default connect(mapStateToProps,mapDispatchToProps)(ListaSimple);