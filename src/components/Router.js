import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContenidoLogin } from './ContenidoLogin';
import { Formulario } from './Formulario';
import Header from './Header';
import { Sidebar } from './Sidebar'
import '../assets/css/router.css';
import { UsuarioContext } from './UsuarioContext';
import { useContext } from 'react'
import BasicModal from './BasicModal';
import { ContenidoFavoritos } from './ContenidoFavoritos';
import { Error } from './Error'


export const Router = () => {
  const [active, setActive] = useState(true);
  const { usuario, setUsuario } = useContext( UsuarioContext );

  /*const toggle = () => {
    setActive(!active);
  }*/



  useEffect(()=> {

    if(usuario.sesion === false){
      const sidebar = document.getElementsByClassName("sidebar")
      sidebar[0].classList.toggle('ocultar')
    }else{
      const sidebar = document.getElementsByClassName("sidebar")
      sidebar[0].classList.toggle('ocultar')
      
      if(typeof usuario.nombre === 'string'){

        let div = document.getElementById("correoCuenta");
        console.log("nombre uzuario " +usuario.nombre)
        let prueba = document.getElementById("nombreLogin")
        prueba.innerHTML = usuario.nombre;
          
        div.appendChild(prueba);
   
      }
    }
    

  }, [usuario])

  
  return (
    <BrowserRouter>        
      <Header></Header>

        <div className="cabesera">
          <Sidebar>
              <div className="content">

              </div>
          </Sidebar>

          <Routes>
              <Route exact path="/" element={<Formulario></Formulario>}>
              </Route>
              {/*<Route exact path="/login"></Route>*/}
              <Route exact path="/perfil" element={<ContenidoFavoritos></ContenidoFavoritos>}></Route>
              <Route exact path="/busqueda" element={<Formulario></Formulario>}></Route>
              <Route exact path="/error" element={<Error></Error>}></Route>

          </Routes>

        </div>

        

        {/*<div>
          <Routes>
            <Route exact path="/login" element={<Header></Header>}></Route>
            <Route exact path="/" element={<Formulario></Formulario>}></Route>
            <Route exact path="/" element={<Sidebar></Sidebar>}></Route>
          </Routes>
      </div>*/}

        






    </BrowserRouter>
    
  )
}
