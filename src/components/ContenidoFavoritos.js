import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/favoritos.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { UsuarioContext } from './UsuarioContext';
import { PeliCardFav } from './PeliCardFav';

export const ContenidoFavoritos = () => {
  const { usuario, setUsuario } = useContext( UsuarioContext );
  const firebaseConfig = {
    apiKey: "AIzaSyBRCnPAz9JMCiHm_uyZaFoVUeBcBmJP6ZI",
    authDomain: "proyecto-wallapop.firebaseapp.com",
    projectId: "proyecto-wallapop",
    storageBucket: "proyecto-wallapop.appspot.com",
    messagingSenderId: "190465243696",
    appId: "1:190465243696:web:d6bd877d07b9f7ee270bf5",
    measurementId: "G-TDY8SZC439",
    databaseURL: "https://proyecto-wallapop-default-rtdb.europe-west1.firebasedatabase.app"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const [peli, setPeli] = useState([]);
  const [lleno, setLleno] = useState([]);

  useEffect(() => {

      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${usuario.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const algo = Object.entries(snapshot.val().favoritos).map(([k,v]) => {return v})
          setLleno(algo);
            /*algo.map((pelicula) => {
              console.log(pelicula)
              setPeli(pelicula);
              
            })*/
  
  
  
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    
    
  },[]);
    


  return (
    <>
    {console.log("ENTRA EN FAVORITOS")}
      <div className="favoritos">
        <h2>Tus películas favoritas, <span>{usuario.nombre}</span></h2>
        <div className="listafavoritos">
          <section className="seccionFavorito">
            <article>
              {
                lleno?.length !== 0 ? 

                (lleno.map(element => {
                  return(
                    <>
                      {console.log("ESTO ES EL RETURN "+element)}

                      <PeliCardFav element={element}></PeliCardFav>
                    </>
                  )
                }))

                : ""


              }    
            </article>
          </section>
        </div>                            
      </div>
    </>


  )
}
