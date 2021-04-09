import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {List,ListItem,ListItemIcon,ListItemText,Divider} from '@material-ui/core';
const ListaSimple =()=>{
    return (
        <div>
            {/*componentes: es para decirle cual es el elemento que sera el envolvedor */}
            <List component = "nav">
                {/*lo decimos que cada item sera un button*/}
                <ListItem button>
                    <ListItemIcon >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary ="Home" /> 
                </ListItem>
                <ListItem button>
                    <ListItemIcon >
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText > City</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary ="Sign In" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary ="Sign Up" />
                </ListItem>
            </List>
        </div>

    );
}

export default ListaSimple;