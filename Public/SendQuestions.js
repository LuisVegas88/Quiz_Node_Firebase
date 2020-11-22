///Creamos Boton de Enviar Nueva o Edita///
let formEditor = document.getElementById("Editor")
const BtnSendEdit = document.createElement("button");
BtnSendEdit.id = "BtnSendEdit";
formEditor.appendChild(BtnSendEdit);

///Detectamos la pregunta en la cual hacemos click y le metemos sus valores///
function    detectEdit()
{
    let id = sessionStorage.getItem("PreguntaId");
    if (id)
    {
         let Pregunta = JSON.parse(sessionStorage.getItem("Pregunta"));
        
            document.getElementById("Question").value = Pregunta.Q;

            document.getElementById("A0").value = Pregunta.A[0];       
            document.getElementById("A1").value = Pregunta.A[1];
            document.getElementById("A2").value = Pregunta.A[2];
            document.getElementById("A3").value = Pregunta.A[3];
                
            document.getElementById("Correct").value = Pregunta.Correct;
            document.getElementById("id").value = Pregunta.id;
        
            ///Cambio id y texto de boton a Editar
            BtnSendEdit.innerText = "Send Edited";       
    }
    else {
        ///Cambio id y texto de boton a Enviar Nueva
        BtnSendEdit.id= "BtnSendNew";
        // console.log(BtnSendEdit.id)
        BtnSendEdit.innerText = "Send New";  
    }
}
    
detectEdit();
    
///ENVIAMOS LA PREGUNTA EDITADA AL SERVIDOR///   
document.querySelector("button").addEventListener("click" , (editQuestion) =>{
    editQuestion.preventDefault();

    const textoPregunta = document.getElementById("Question").value;
        
    const respuestas = [];

    respuestas.push(document.getElementById("A0").value);
    respuestas.push(document.getElementById("A1").value);
    respuestas.push(document.getElementById("A2").value);
    respuestas.push(document.getElementById("A3").value);
    
    const Correcta = document.getElementById("Correct").value;
    const ID = document.getElementById("id").value;
    
    const editedQuestion = {};
    
    fetch('http://localhost:8888/EditQuestion', {
        method: 'PUT', 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ //metemos los valores en un nuevo objeto 
                
                "Q" : textoPregunta,
                "A" : respuestas, 
                "Correct" : Correcta,
                "id": ID
            })
        })
        .then(response => response.text())
        .then(data => console.log(data));  
        
    });


////////////////////////COGEMOS EL VALOR DE LAS NUEVAS PREGUNTAS/RESPUESTAS y Enviamos al Servidor//////////////////
    
document.getElementById("BtnSendNew").addEventListener("click" , (crearPregunta) =>{
    crearPregunta.preventDefault();

    const textoPregunta = document.getElementById("Question").value;
        
    const respuestas = [];

    respuestas.push(document.getElementById("A0").value);
    respuestas.push(document.getElementById("A1").value);
    respuestas.push(document.getElementById("A2").value);
    respuestas.push(document.getElementById("A3").value);
    
    const Correcta = document.getElementById("Correct").value;
    const ID = document.getElementById("id").value;
    
    const newQuestion = {};
    
    fetch('http://localhost:8888/newQuestion', {
        method: 'POST', 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ //metemos los valores en un nuevo objeto 
                
                "Q" : textoPregunta,
                "A" : respuestas, 
                "Correct" : Correcta,
                "id": ID
            })
        })
        .then(response => response.text())
        .then(data => console.log(data));  
        
    });



    












// initDataBase()









///CON FIREBASE SIN PASAR POR SERVIDOR

// //Numero de preguntas existentes 
// firebase.database().ref("numberOfQuestions").once("value").then((snapshot) => {
//     let questionNumber = snapshot.val();
//     ++questionNumber;
//     let key = questionNumber - 1; //Actualizamos el numero de preguntas del contador de preguntas y le restamos 1 para que coincida con la posición de array.

//     const question = {};

//     question[key] = {
//         "Q" : textoPregunta,
//         "A" : respuestas, 
//         "Correct" : Correcta
//     }

//     //insertamos la nueva pregunta y actualizamos el contador
    
    
    
//     firebase.database().ref('Preguntas/').update(question);
//     firebase.database().ref('numberOfQuestions').set(questionNumber);
// })
