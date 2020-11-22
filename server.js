
////////IMPORTAR DEPENDENCIAS///////

const express = require('express');

const bodyParser = require('body-parser');

const cors = require ("cors");

const firebase = require ("firebase");

////CONFIGURACIÓN INICIAL////////
const server = express();

const listenPort = 8888;

/////IMPORTAR MI CARPETA CON EL FRONT-END////////
const staticFilesPath = express.static('Public');
server.use(staticFilesPath);

////////////////////////CONEXION FIREBASE//////////////////////////////////////
firebase.initializeApp({
    apiKey: "AIzaSyBT9CSEK8BjJ8F3xH6zawd1GWMaSDkYVHA",
    authDomain: "quiz-gameofthrones.firebaseapp.com",
    databaseURL: "https://quiz-gameofthrones.firebaseio.com",
    projectId: "quiz-gameofthrones",
    storageBucket: "quiz-gameofthrones.appspot.com",
    messagingSenderId: "808283146541",
    appId: "1:808283146541:web:4a73dc5d8a19005a66aba4"
});


////CUANTAS PREGUNTAS HAY////
let numberOfQuestions = 0;
firebase.database().ref("/numberOfQuestions").on("value", firebaseRes => {
    numberOfQuestions = firebaseRes.val();
});


//////GET QUESTIONS De Firebase/////

server.get('/getQuestions', (req, res) => {
    firebase.database().ref("/Preguntas").once("value", dataDb => {
        let data = dataDb.val();
        if (data)
            res.send (Object.values(data).filter(el => el.Q !== undefined))////mando datos si cumple la condicion de que existe la propiedad Q. Esto me evita datos en blanco debido al delete. Si no tiene nada el filter se lo carga 
            //Object.values (es porque cuando firebase tiene menos de 5 datos, convierte mi Array de objetos en Objeto entonces se rompia) Con esto coge el objeto y te coge sus valores en un Array.
        else
            res.send([]);
    })
})

///////POST para METER NUEVA PREGUNTA EN LA BASE DE DATOS(POST) y ACTUALIZAR NUMERO DE PREGUNTAS(GET)//////

server.post("/newQuestion", (req,res) => {
        firebase.database().ref(`/Preguntas/${numberOfQuestions}`).set(req.body); //En la ultima posicion le metemos la nueva pregunta
        firebase.database().ref("/numberOfQuestions").set(numberOfQuestions + 1); //Actualizamos nuestro contador de preguntas
        res.send({"Mensaje":"Post Send"})
});

//////PUT para cambiar el contenido de una pregunta////////////////

server.put("/EditQuestion", (req, res) => {

    if(!req.body.id){

        res.send({mensaje: "error"});

    }
    else{

         let preguntas = firebase.database().ref(`Preguntas/${req.body.id}`);
            preguntas.once("value",(snapshot) =>{
                    
                    let miPregunta = req.body.Q;
                    let misRespuestas = req.body.A;
                    let miCorrecta = req.body.Correct;

                    contenido = snapshot.val();
                    console.log("Contenido");
                    let newQuestion = {};
                    //console.log(`${miPregunta},${misRespuestas},${miCorrecta},${contenido}`)
                    if (contenido == null){
                         res.send({"Mensaje": "No existe la pregunta"});
                    }
                        
                    else{
                        if(miPregunta && miPregunta !== contenido.Q) ///vemos si hay pregunta y luego si ha cambiado
                        {
                            newQuestion.Q = miPregunta;
                        }

                        if(misRespuestas && JSON.stringify(misRespuestas) !== JSON.stringify(contenido.R))
                        {
                            newQuestion.A = misRespuestas;
                        }

                        if(miCorrecta && miCorrecta !== contenido.Correct)
                        {
                            newQuestion.Correct = miCorrecta;
                        }

                        if (miPregunta && miPregunta !== contenido.Q || misRespuestas && JSON.stringify(misRespuestas) !== JSON.stringify(contenido.A) || miCorrecta && miCorrecta !== contenido.Correct){

                            preguntas.update(newQuestion);
                            
                            res.send({"Mensaje":"Update", "question": newQuestion });
                        }
                        else{
                            res.send({"Mensaje": "Not Updated"});
                        }
                    }
            })
        }    
})

///////DELETE borrar Preguntas////////

server.delete("/DeleteQuestion", (req, res) => {

    if(!req.body.id){

        res.send({"mensaje": "error"});

    }
    else{
        // console.log(req.body.id)
        let pregunta = firebase.database().ref(`Preguntas/${req.body.id}`);
            pregunta.once("value",(snapshot) =>{

                contenido = snapshot.val();

                if(contenido){
                    console.log(contenido);
                    pregunta.remove();
                    firebase.database().ref("/numberOfQuestions").set(numberOfQuestions - 1)
                    

                    res.send({"Mensaje":"Question Deleted"})
                }
                else{
                    res.send({"Mensaje": "Not Deleted"});
                }
                
            })
    }
})

////LOGIN ADMINISTRADOR//////

server.post('/loginAdmin', (req, res) => {
    
        firebase.database().ref('/User').once("value", (snapshot) => {
            
            let email = req.body.email;
            let pass = req.body.pass;
            // console.log(req.body.pass);

            contenido = snapshot.val();
            console.log(contenido);

            if ((contenido.email == "")||(contenido.pass == ""))
            {
                res.send("Credenciales sin completar");
            }
            else
            {
                if (email !== contenido.email)
                {///Falla el usuario
                    res.send("Usuario incorrecto");
                }
                else
                {
                    if (pass != parseInt(contenido.pass))
                    {
                        //Falla la password
                        res.send("Contraseña incorrecta");
                    }
                    else
                    {
                        // console.log("Redirect");
                        res.redirect('/editDelete.html');
                        
                    }
                }   
            }
        });
    })
        
/////LOGIN PLAYERS/////

server.post('/loginPlayers', (req, res) => {

    if((req.body.email == "")||(req.body.pass == "")||(req.body.birthdate == "")){

        res.send("Campos Vacios")
    }
    else
    {
        let Players = firebase.database().ref('/Players');
        Players.once("value",(snapshot) => {

            let email = req.body.email;
            let pass = req.body.pass;
            let birthdate = req.body.birthdate;

            let users = snapshot.val();
           
            newPlayer = {
                email,
                pass,
                birthdate
            }

            if(!users || !Object.values(users).filter(user => user.email === email).length)
            { 
                Players.push(newPlayer);
                res.send("¡Usuario registrado!");
                console.log("Su Usuario ha sido registrado¡")
                
            }
            else
            {
               res.send("Este Usuario ya existe")
               console.log("Este Usuario YA existía")
            }
        })
    }
})


////////INICIAMOS EL SERVER////////
server.listen(listenPort, () => {console.log(`server listening on port ${listenPort}`)});






























////////COGEMOS NUESTROS DATOS DE GET QUESTION////// METODO SIN EXPRESS

// let database = firebase.database();

// const http = require('http'); //llamas a http

// const listenPort = 8080;  //puerto que está escuchando 

// const server = http.createServer((request,response)=> {

//     const desbloqueoCORS = {
//         'Access-Control-Allow-Origin':'*'
//     }

//     if (request.url === "/getJSON"){ ///CREAMOS SERVIDOR
//         response.writeHead(200,{...desbloqueoCORS , 'Content-Type':'application/json'});/// me crea un archivo .json;
        
//         let preguntas = database.ref('Preguntas/');
//             preguntas.on ("value", (snapshot) => { ///cogeme la base de datos y recorremela varias veces "on" "once" seria una vez

//                 contenido = snapshot.val();
//                 response.write(JSON.stringify(contenido));
//                 response.end();
//             })
//     }
//     else {
//         response.writeHead(404, { ...headers, 'Content-Type': 'text/html' });
//         response.write('<h1>Not found</h1>');
//       }

// })