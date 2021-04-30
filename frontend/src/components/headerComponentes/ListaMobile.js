import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import authActions from '../../redux/actions/authActions'


const ListaSimple = ({ cerrarDrawer, usuarioLogueado, desloguearUsuario}) => {
    const desloguearse = () => {
        cerrarDrawer();
        desloguearUsuario();
    }

    return (
        <div>
            {/*componentes: es para decirle cual es el elemento que sera el envolvedor */}
            <List component="nav" >
                {/*lo decimos que cada item sera un button*/}
                <NavLink to="/">
                    <ListItem button onClick={cerrarDrawer}>
                        <ListItemIcon >
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>

                <NavLink to="/cities">
                    <ListItem button onClick={cerrarDrawer}>
                        <ListItemIcon >
                            <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText > Cities</ListItemText>
                    </ListItem>
                </NavLink>

                <Divider />

                {!usuarioLogueado && (
                    [
                        <NavLink to="/login" className="btnLoginLink" activeClassName="btnLoginLinkActive" key ="/login">
                            <ListItem button onClick={cerrarDrawer}>
                                <ListItemText primary="Log in" />
                            </ListItem>
                        </NavLink>,
                        <NavLink to="/signup" className="btnLoginLink" activeClassName="btnLoginLinkActive" key = "/signup">
                            <ListItem button onClick={cerrarDrawer}>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        </NavLink>
                    ]
                )}
                {usuarioLogueado &&(
                    <ListItem button onClick={desloguearse}>
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