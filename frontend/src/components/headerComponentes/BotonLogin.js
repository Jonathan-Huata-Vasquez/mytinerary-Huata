import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import authActions from '../../redux/actions/authActions'

const useStyle = makeStyles({
  menuDesplegable: {
    marginTop: "35px",
  }

});

const BotonLogin = (props) => {
  const misEstilos = useStyle();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // que un Handler es un "manejador", algo que es capaz de "recibir" un evento, un mensaje, etc y actuar en función al mismo.
  const handleClick = (event) => {
    setMenuAbierto(event.currentTarget); //Al abrir el Menu , le pongo como valor el elemento
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const desloguearse = () => {
    cerrarMenu();
    props.desloguearUsuario();
  }
  
  const { usuarioLogueado } = props

  //valores por defecto
  let usuarioAvatar = usuarioLogueado
  ? usuarioLogueado.usuarioAvatar
  : "./assets/header/usuarioGenerico.jpg"
  
  
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
        <Avatar src={usuarioAvatar} />
        <ArrowDropDownIcon fontSize="large" />
      </Button>
      <Menu className={misEstilos.menuDesplegable}
        id="simple-menu"
        anchorEl={menuAbierto}  //esto es usado para ver la posicion del menu
        //keepMounte
        open={Boolean(menuAbierto)} //transformamos lo que hay dentro de menuAbierto en booleano (Castear?), si es true el menu es visible
        onClose={cerrarMenu}  // la accion que hace al cerarse el menu
      >
        {!usuarioLogueado && (
          [
            <NavLink to="/login" className="btnLoginLink" activeClassName="btnLoginLinkActive" key ="/login">
              <MenuItem onClick={cerrarMenu}>Log In</MenuItem>
            </NavLink>,
            <NavLink to="/signup" className="btnLoginLink" activeClassName="btnLoginLinkActive" key ="/signup">
              <MenuItem onClick={cerrarMenu}>Sign Up</MenuItem>
            </NavLink>
          ]
        )}

        {usuarioLogueado && (
          <MenuItem className="btnLoginLink" onClick={desloguearse}>Log out</MenuItem>
        )}
      </Menu>
    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(BotonLogin);