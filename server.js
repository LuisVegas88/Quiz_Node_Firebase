
////////IMPORTAR DEPENDENCIAS///////
const express = require('express');

const bodyParser = require('body-parser');

const cors = require ("cors");

const firebase = require ("firebase");

////CONFIGURACIÓN INICIAL////////
const server = express();

const listenPort = 8888;

/////IMPORTAR MI CARPETA CON EL FRONT-END////////
const staticFilesPath = express.static('public');
server.use(staticFilesPath);

///////CORS/////////////

server.use(cors());

//MODULO PARSEO DE LOS JSON QUE LLEGAN AL SERVIDOR
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

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
        res.send (data)

    })
})

///////METER NUEVA PREGUNTA EN LA BASE DE DATOS(POST) y ACTUALIZAR NºPREGUNTA (GET)//////

server.post("/nuevaPregunta", (req,res) => {
        firebase.database().ref(`/Preguntas/${numberOfQuestions}`).set(req.body); //En la ultima posicion le metemos la nueva pregunta
        firebase.database().ref("/numberOfQuestions").set(numberOfQuestions + 1); //Actualizamos nuestro contador de preguntas
        res.send({"Mensaje":"Post Send"})
});


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