import * as React from 'react';
import '../assets/css/cabecera.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from '../assets/images/logowallapop.svg'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react'
import { BusquedaContext } from './BusquedaContext';
import Modal from '@mui/material/Modal';
import BasicModal from './BasicModal'
import { ContenidoLogin } from './ContenidoLogin';
import { useEffect } from 'react'


export default function Header () {

  const [ title, setTitle ] = useState('');
  const { busqueda, setBusqueda } = useContext( BusquedaContext );



  const buscar = () => {
      {setBusqueda(title)}
    

  }

  const inicio = () => {
    console.log("ENTRA A INICIO")
    setBusqueda("");
  }

  const handleInputChange = ({target}) => {
    setTitle(target.value);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

          


  return (
    <>
    <header>
      <div id="cabecerabuscador">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img id="logowallapop" src={Logo} height={100} width={300} onClick={inicio}></img>
        </Link>

        <Box
          id="buscador"
          component="form"
          sx={{
            '& > :not(style)': { m: 2, width: '800px', mt:3},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="buscador2" value={title} onChange={handleInputChange} label="Buscar en todas las categorías" variant="outlined"/>
          
        </Box>

        <Stack display="inline"  sx={{
            '&  button': { mb: 11, ml: 1, color:'white'},
          }}>
          
            <Link to="/busqueda">
              <Button id="botonBuscar" variant="contained" onClick={buscar} startIcon={<SearchIcon />} >Buscar</Button>
            </Link>
        </Stack>

        <Link activeClassName="active" style={{ textDecoration: 'none' }}>
          <Stack  display="inline" sx={{
            '&  button': { mb: 11, ml: 1, color:'white'},
          }}>
            <Button id="botonInicioSesion" variant="contained" onClick={handleOpen}>Regístrate o Inicia Sesión</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
              >
                <Box sx={style}>
                  <ContenidoLogin/>
                </Box>
            </Modal>
          </Stack>
        </Link>

        <Stack  display="inline" sx={{
            '&  button': { mb: 11, ml: 1, color:'black'},
          }}>
          <Link to="/error">
            <Button id="botonSubirProducto" variant="outlined" startIcon={<ControlPointIcon sx={{color: 'white'}}/>}>
              Subir producto
            </Button>
          </Link>
        </Stack>
      </div>
    </header>
    
    
   
      
             
      
    
    </>
  );
}
