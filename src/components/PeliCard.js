import React, { useState, useEffect, useContext } from 'react'
import { CardActionArea, speedDialIconClasses, SvgIcon } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../assets/css/pelicard.css';
import { FavoriteContext } from './FavoriteContext';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { UsuarioContext } from './UsuarioContext';


export const PeliCard = (element) => {
    const { usuario, setUsuario } = useContext( UsuarioContext );

    const { favorita, setFavorita } = useContext( FavoriteContext );

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


    const isFavorite = (snapshot) => {
        let respuesta = false;
        if (snapshot.exists()) {
            const algo = Object.entries(snapshot.val().favoritos).map(([k,v]) => {return v})
            algo.map((pelicula) => {
                if(pelicula.nombre === element.element.original_title){
                    respuesta = true;
                }
                
            })
            
        }

        return respuesta;

    }

    const db = getDatabase();


    const prueba = () => {
        
        const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${usuario.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                if(isFavorite(snapshot) === true){
                    console.log("HAY UNA PELI REPETIDA")
                    //const algo = Object.entries(snapshot.val().favoritos).map(([k,v]) => {return v})
                    const elimino = ref(db, `users/${usuario.uid}/favoritos/${element.element.original_title}`)
                    remove(elimino).then(()=> {
                        console.log("se eliminó")
                    })
                }
                
                else{
                    console.log("NO TA REPETIA")
                    console.log(element.element.nombre)

                    const db = getDatabase();
                    set(ref(db, 'users/'+usuario.uid+"/favoritos/"+element.element.original_title), {
                        nombre: element.element.original_title,
                        precio: element.element.vote_average,
                        imagen: `https://image.tmdb.org/t/p/original/${element.element.poster_path}`
                    });

                    }

            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });

        
          
        

    }

    



  return (
    <>
        <div id="lista">
        

            <Card  id="card" sx={{ width: 180, justifyItems:"center", justifyContent: "center", textAlign: "center", borderRadius: 10}}>
                <CardActionArea  sx={{ height: 280, }}>
                    <CardMedia

                    sx={{ mt: 0, width: 200, display:"block", margin:"auto", padding: 0 }}
                    className="fotopeli"
                    component="img"
                    image={`https://image.tmdb.org/t/p/original/${element.element.poster_path}`}
                    alt="picture not found"
                    />
                </CardActionArea>
            </Card>
            
            <div id="titulo">
                <p> {element.element.original_title} </p>
                <div onClick={prueba} id="precio" className="precio">
                
                    <p> {element.element.vote_average}€ <FavoriteBorderIcon id="favorito" className="favorito" ></FavoriteBorderIcon></p>
                    
                </div>
                

            </div>
        </div>  
    </>
  )
    
}
