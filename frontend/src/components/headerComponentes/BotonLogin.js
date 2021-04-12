import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyle = makeStyles({
  menuDesplegable : {
    marginTop : "35px"
  }

});

const BotonLogin = () => {
  const misEstilos = useStyle();
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // que un Handler es un "manejador", algo que es capaz de "recibir" un evento, un mensaje, etc y actuar en función al mismo.
  const handleClick = (event) => {
    setMenuAbierto(event.currentTarget); //Al abrir el Menu , le pongo como valor el elemento
  };

  const handleClose = () => {
    setMenuAbierto(false);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
          <Avatar src="./assets/header/usuarioGenerico.jpg" />
          <ArrowDropDownIcon fontSize ="large"/>
      </Button>
      <Menu className = {misEstilos.menuDesplegable}
        id="simple-menu"
        anchorEl={menuAbierto}  //esto es usado para ver la posicion del menu
        //keepMounte
        open={Boolean(menuAbierto)} //transformamos lo que hay dentro de menuAbierto en booleano (Castear?), si es true el menu es visible
        onClose={handleClose}  // la accion que hace al cerarse el menu
      >
        <MenuItem onClick={handleClose}>Log In</MenuItem>
        <MenuItem onClick={handleClose}>Sign Up</MenuItem>

      </Menu>
    </div>
  );
}

export default BotonLogin;