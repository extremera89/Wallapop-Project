import React from 'react'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { UsuarioContext } from './UsuarioContext';
import '../assets/css/sidebar.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';

export const Sidebar = () => {


  const cerrarSesion = () => {
    if(usuario.sesion === true){
      const user = {
        "nombre": null,
        "apellidos": null,
        "email": null,
        "contraseña": null,
        "sesion": false,
        "uid": null
        }
        
        setUsuario(user);

    }
  
  }

  const { usuario, setUsuario } = useContext( UsuarioContext );



  return (
    <>
      <div className="sidebar" id="sidebar">
        
        <div className="perfilicono">
          <AccountBoxIcon sx={{color: 'rgb(61, 210, 186)'}}id="iconoperfil" ></AccountBoxIcon>
        </div>
        <div id="correoCuenta">
          <p id="nombreLogin"></p>
        </div>
        <ul id="listasidebar">
          <li>
            <Link to="/">
              <Button id="botonHome" startIcon={<HomeIcon sx={{color: 'white'}}/>} >Inicio</Button>
            </Link>
          </li>
          <li>
            <Link to="/perfil">
              <Button id="botonPerfil" startIcon={<ContactEmergencyIcon sx={{color: 'white'}}/>}>Mi Perfil</Button>
            </Link>
          </li>
          <li>
            <Link to="/error">
              <Button id="botonMensaje" startIcon={<EmailIcon sx={{color: 'white'}}/>}>Mensajes</Button>
            </Link>
          </li>
          <li>
            <Link onClick={cerrarSesion} to="">
              <Button id="botonCerrarSesion" startIcon={<LogoutIcon sx={{color: 'white'}}/>}>Cerrar Sesión</Button>
            </Link>
          </li>
        </ul>
        </div>
    </>
  )
}
