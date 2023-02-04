import React, { useEffect } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';
import '../assets/css/ventanamodal.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UsuarioContext } from './UsuarioContext';
import { useContext } from 'react'
import { useState } from 'react'

import { getDatabase, ref, child, get, set } from "firebase/database";




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
const provider = new GoogleAuthProvider();


//VALIDACIÓN

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('El email es obligatorio'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmpassword: yup
    .string('Repite la contraseña')
    .min(8, 'Password should be of minimum 8 characters length')
    .oneOf([yup.ref("password"), null], 'Las contraseñas deben coincidir')
    .required('Password is required'),
  name: yup
    .string('Introduce tu nombre')  
    .min(4, 'El nombre debe contener mínimo 4 letras')
    .required('El nombre es obligatorio'),
  apellidos: yup
    .string('Introduce tus apellidos')  
    .min(5, 'El apellido debe contener mínimo 5 letras')
    .required('El apellido es obligatorio'),
  condiciones: yup
    .bool()
    .oneOf([true], 'You need to accept the terms and conditions'),

});







//INICIAR SESION CON GOOGLE

function inicioSesionGoogle(){

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

}

function cerrarModal(){
    const modal = document.getElementById('portal');
    modal.remove();
    //pruebbbba();
}

//OCULTAR MODAL PRINCIPAL Y MOSTRAR LOGIN
const alternarLogin = () => {
  const modal = document.getElementsByClassName("modal1")
  const login = document.getElementsByClassName("login")
  modal[0].classList.toggle('ocultar')
  login[0].classList.toggle('ocultar')

  

}



//OCULTAR MODAL PRINCIPAL Y MOSTRAR REGISTRO
const boton = () => {
    console.log("HOLA")
    const modal = document.getElementsByClassName("modal1")
    const registro = document.getElementsByClassName("registro")

    
    modal[0].classList.toggle('ocultar')
    registro[0].classList.toggle('ocultar')

}


//FUNCIONES DEL REGISTRO

function Copyright(props) {
  return (
    <Typography sx={{mt:5}}variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Wallapop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

export const ContenidoLogin = () => {


  const formik = useFormik({
    initialValues: {

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  //REGISTRO CON CORREO Y CONTRASEÑA
  const registro = () => {
    const authRegistro = getAuth();
  
    let usuario = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("password").value;
    let apellidos = document.getElementById("apellidos").value;
    //let condiciones = document.getElementById("condiciones");

    if(formik.errors.email === 'Enter a valid email' || formik.errors.email === 'El email es obligatorio' || formik.errors.password === 'Password is required' || 
    formik.errors.password === 'Password should be of minimum 8 characters length' || formik.errors.name === 'El nombre es obligatorio' || 
    formik.errors.name === 'El nombre debe contener mínimo 4 letras' || formik.errors.apellidos === 'El apellido es obligatorio' || 
    formik.errors.apellidos === 'El apellido debe contener mínimo 5 letras' || formik.errors.confirmpassword === 'Las contraseñas deben coincidir' ||
    formik.errors.confirmpassword === 'Password is required' || formik.errors.confirmpassword === 'Password should be of minimum 8 characters length'
    ){
      
      console.log("ES INCORRECTO")
    }else{
        


        
      createUserWithEmailAndPassword(authRegistro, email, contraseña)
      .then((userCredential) => {
        // Signed in 
        console.log("entra, el uid es: "+userCredential.user.uid)
        const user = {
          "nombre": usuario,
          "apellidos": apellidos,
          "email": email,
          "contraseña": contraseña,
          "sesion": true,
          "uid": userCredential.user.uid
      
        }
        setUsuario(user);

        writeUserData(user.nombre, user.apellidos, user.email, user.contraseña, user.uid);

        //const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      console.log("ES CORRECTO")
      
      
      
    }
  
  }

  const { usuario, setUsuario } = useContext( UsuarioContext );

  //INICIAR SESION CON CORREO

  const login = () => {
    console.log("entra al login")
    let email = document.getElementById("emailLogin").value;
    let contraseña = document.getElementById("passwordLogin").value;
    console.log(email)
    console.log(contraseña)

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, contraseña)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential)

        console.log(userCredential.user.uid)
        // ...
        
        funcion(userCredential.user.uid)
        //cerrarModal();
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

      console.log("usuario:" +usuario)

  }


  //CERRAR SESIÓN
 
  useEffect(() => {

    if(usuario.sesion === false){
      const user = {
        "nombre": null,
        "apellidos": null,
        "email": null,
        "contraseña": null,
        "sesion": false,
        "uid": null
      }
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("SE CERRÓ SESION")

      }).catch((error) => {
        // An error happened.
      });

    }
  }, [usuario]);


    ////////////////////////LEER DATOS DE BASE DE DATOS/////////////////

  const funcion = (uid) => {


    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const uzuario = {
          "nombre": snapshot.val().nombre,
          "apellidos": snapshot.val().apellidos,
          "email": snapshot.val().email,
          "contraseña": snapshot.val().contraseña,
          "sesion": true,
          "uid": uid
        }
        setUsuario(uzuario);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
    
  /////////////////////ESCRIBIR DATOS EN BASE DE DATOS///////////////////////

  
  function writeUserData(nombre, apellidos, email, contraseña, uid) {


    const db = getDatabase();
    set(ref(db, 'users/'+uid), {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      contraseña: contraseña
    });
  }
  




  return (
    <>
    
        <div className="modal1">
            <h2>Bienvenido a Wallapop</h2>
            <p id="subtitulo">Regístrate o Inicia Sesión</p>


            <Stack sx={{
                '&  button': {mb: 2, ml: 1, color:'black', id: "divvv"},
            }} >

            <Button sx={{  }}
            
            id="botonEntrarGoogle" variant="outlined" startIcon={<GoogleIcon />} onClick={inicioSesionGoogle}>
                Entrar con Google
            </Button>
        
            </Stack>


            <Stack  sx={{
                '&  button': { mb: 2, ml: 1, color:'black'},
            }}>

            <Button id="botonEntrarCorreo" variant="outlined" startIcon={<CloudIcon />} onClick={boton}>
                Entrar con Correo electrónico
            </Button>
        
            </Stack>

            <p id="textoIniciaSesion" onClick={alternarLogin}>¿Ya tienes una cuenta? <span id="span">Inicia sesión</span></p>
        </div>
        <div className="ocultar registro">
          <Button id="botonBack" startIcon={<ArrowBackIcon/>} onClick={boton}></Button>
              <form onSubmit={formik.handleSubmit}>
                

                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Registro
                      </Typography>
                      <Box noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              id="name"
                              name="name"
                              label="Nombre"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              error={formik.touched.name && Boolean(formik.errors.name)}
                              helperText={formik.touched.name && formik.errors.name}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              id="apellidos"
                              name="apellidos"
                              label="Apellidos"
                              value={formik.values.apellidos}
                              onChange={formik.handleChange}
                              error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                              helperText={formik.touched.apellidos && formik.errors.apellidos}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="email"
                              name="email"
                              label="E-mail"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Contraseña"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="confirmpassword"
                              label="Repite Contraseña"
                              type="password"
                              id="confirmpassword"
                              autoComplete="new-password"
                              onChange={formik.handleChange}
                              error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                              helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<Checkbox 
                                name="condiciones"
                                color="primary" 
                                type="checkbox"
                                //value={formik.values.condiciones}
                                //onChange={formik.handleChange}
                                //helperText={formik.touched.condiciones && formik.errors.condiciones}
                              

                              />}
                              label="Acepto las Condiciones de uso y Política de privacidad."
                              error={formik.touched.condiciones && Boolean(formik.errors.condiciones)}

                            />
                          </Grid>
                        </Grid>
                        <Copyright></Copyright>

                        <Button sx={{mt: 6, mb: 3}} 
                        color="primary" onClick={registro} variant="contained" fullWidth type="submit">
                          Registrarse
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>


              </form>
        </div>
        <div className="ocultar login">
          <Button id="botonBack" startIcon={<ArrowBackIcon/>} onClick={alternarLogin}></Button>

          <form >
                

                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Login
                      </Typography>
                      <Box noValidate sx={{ mt: 3 }}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="emailLogin"
                              name="emailLogin"
                              label="E-mail"
                              /*value={formik.values.email}
                              onChange={formik.handleChange}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}*/
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="passwordLogin"
                              label="Contraseña"
                              type="password"
                              id="passwordLogin"
                              autoComplete="new-password"
                              /*value={formik.values.password}
                              onChange={formik.handleChange}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}*/
                            />
                          </Grid>
                        <Copyright></Copyright>

                        <Button sx={{mt: 6, mb: 3}} 
                        color="primary" variant="contained" onClick={login} fullWidth type="submit">
                          Entrar
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>


              </form>
        </div>
    </>


  )
}
