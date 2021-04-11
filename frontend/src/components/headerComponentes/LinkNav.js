
import { NavLink } from 'react-router-dom'
import {  Typography} from '@material-ui/core'
const LinkNav = ( {link:{contenidoTexto,estiloClase,url}}) => {
    return (
        <NavLink exact to={url} key={url} className="estilosLinkNav" activeClassName="estilosLinkNavActive">
            <Typography
                variant="h6"
                color="initial"
                className={estiloClase}
            >
                {contenidoTexto}
            </Typography>
        </NavLink>
    );
}
export default LinkNav