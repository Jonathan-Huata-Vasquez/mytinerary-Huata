import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const BotonLogin = () => {
  /* const [menuAbierto, setMenuAbierto] = useState(null);
 
   const abrirMenu = (event) => {
     setMenuAbierto(event.currentTarget);
   };
 
   const cerrarMenu = () => {
     setMenuAbierto(null);
   };
 
   return (
     <div>
       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={abrirMenu}>
         Open Menu
       </Button>
       <Menu
         id="simple-menu"
         menuAbierto={menuAbierto}
         keepMounted
         open={Boolean(menuAbierto)}
         onClose={cerrarMenu}
       >
         <MenuItem onClick={cerrarMenu}>Profile</MenuItem>
         <MenuItem onClick={cerrarMenu}>My account</MenuItem>
         <MenuItem onClick={cerrarMenu}>Logout</MenuItem>
       </Menu>
     </div>
   );*/

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
          <Avatar src="./assets/header/usuarioGenerico.jpg" />
          <ArrowDropDownIcon fontSize ="large"/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Sign In</MenuItem>
        <MenuItem onClick={handleClose}>Sign Up</MenuItem>

      </Menu>
    </div>
  );




}

export default BotonLogin;