import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

import { NavLink } from 'react-router-dom'
const ListaSimple = () => {
    return (
        <div>
            {/*componentes: es para decirle cual es el elemento que sera el envolvedor */}
            <List component="nav" >
                {/*lo decimos que cada item sera un button*/}
                <NavLink to="/">
                    <ListItem button>
                        <ListItemIcon >
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>

                <NavLink to="/Cities">
                    <ListItem button>
                        <ListItemIcon >
                            <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText > Cities</ListItemText>
                    </ListItem>
                </NavLink>

                <Divider />
                <ListItem button>
                    <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Sign Up" />
                </ListItem>
            </List>
        </div >

    );
}

export default ListaSimple;