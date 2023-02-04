import React, { useState, useEffect } from 'react'
import '../assets/css/formulario.css';
import { BusquedaContext } from './BusquedaContext';
import { useContext } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PeliCard } from './PeliCard';
import { UsuarioContext } from './UsuarioContext';
import { FavoriteContext } from './FavoriteContext';


export const Formulario = () => {


    const [ pelicula, setPelicula ] = useState([]);
    const { busqueda, setBusqueda } = useContext( BusquedaContext );
    const [ pelisBuscadas, setPelisBuscadas] = useState([]);
    let [ pagina, setPagina] = useState(1);
    const { favorita, setFavorita } = useContext( FavoriteContext );


    const nextPage = () => {
        setPagina(pagina+=1);

        console.log("PAGINAAAA "+ pagina)
    }


    useEffect(() => {
        setPagina(1);


        if(typeof busqueda==="string" && busqueda.length>0){
            fetch('https://api.themoviedb.org/3/search/movie?api_key=ac639ae1d4d7aec0ed9319a5e1704159&language=en-US&query='+busqueda+'&page=1&include_adult=false')
            .then(response => response.json())
            .then(data => 
                
                setPelisBuscadas(data.results)
                
            );
        }
        else{
                

            fetch('https://api.themoviedb.org/3/movie/popular?api_key=ac639ae1d4d7aec0ed9319a5e1704159&language=en-US&page=1')
            .then(response => response.json())
            .then(data => 
                
                setPelicula(data.results)
                
            );
        }


    }, [busqueda]);

    useEffect(() => {

        if(typeof busqueda==="string" && busqueda.length>0){
            

            fetch('https://api.themoviedb.org/3/search/movie?api_key=ac639ae1d4d7aec0ed9319a5e1704159&language=en-US&query='+busqueda+'&page='+pagina+'&include_adult=false')
            .then(response => response.json())
            .then(data => 
                
                setPelisBuscadas(data.results)
                
            );
        }
        else{
                
            console.log("NUMERO PAGINA SIN BUSQUEDA: " + pagina)

            fetch('https://api.themoviedb.org/3/movie/popular?api_key=ac639ae1d4d7aec0ed9319a5e1704159&language=en-US&page='+pagina)
            .then(response => response.json())
            .then(data => 
                
                setPelicula(data.results)
                
            );
        }

        
    }, [pagina]);

    useEffect(() => {

        favorita.map((nombre) => {
            console.log(nombre);
        })

        console.log("///////////////")
    },[favorita])


  return (
    <>
        
        <body id="body">
            <section class="secciontitulo">
                <div>
                    <h2>Compra y vende películas de segunda mano</h2>
                    <p id="tituloformulario">casi, casi, sin moverte del sofá</p>
                </div>
            </section>
            
            <div class="siguiente">
                <Stack display="inline"  sx={{
                    '&  button': { mb: 11, ml: 1, color:'white'},
                    }}>
                <Button id="botonSiguiente" variant="contained" onClick={nextPage}>Siguiente</Button>
                </Stack>
            </div>


            


            <section class="seccionformulario">
                <article>
                    <div id="listaprincipal">
                        {typeof busqueda === "string" && busqueda.length>0 ? 
                        
                            pelisBuscadas?.length !== 0 ? 
                                
                                
                            (pelisBuscadas.map(element => {
                
                                return(
                
                                    <PeliCard element={element}></PeliCard>
                                
                                
                                )
                                
                            })) 
                        
                        : ""
                        
                        : 
                        
                        
            
                            pelicula?.length !== 0 ? 
                            
                            
                            (pelicula.map(element => {
                
                                return(
                
                                    <PeliCard element={element}></PeliCard>
                                
                                
                                
                                )
                                
                            })) 
                            
                            : ""
                        
                        
                        
                        
                        }
                        
                    </div>
                </article>
            </section>

            
            
        </body>
        
    
    </>
  )
}
