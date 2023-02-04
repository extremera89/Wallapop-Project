import { BusquedaContext } from './components/BusquedaContext';
import { Router } from './components/Router';
import { useState } from 'react'
import { UsuarioContext } from './components/UsuarioContext';
import { FavoriteContext } from './components/FavoriteContext';
import { Footer } from './components/Footer';

function App() {

  const user = {
    "nombre": null,
    "apellidos": null,
    "email": null,
    "contraseña": null,
    "sesion": false,
    "uid": null,

  }


  const [busqueda, setBusqueda] = useState({});
  const [usuario, setUsuario] = useState({user})
  const [favorita, setFavorita] = useState([]);

  return (
    <>
      <UsuarioContext.Provider value={{
        usuario,
        setUsuario
      }}>
        <BusquedaContext.Provider value={{
          busqueda, 
          setBusqueda
        }}>
          <FavoriteContext.Provider value={{
            favorita,
            setFavorita
          }}>
            <Router></Router>
            <Footer></Footer>
          </FavoriteContext.Provider>
        </BusquedaContext.Provider>
      </UsuarioContext.Provider>
    </>
  );
}

export default App;
