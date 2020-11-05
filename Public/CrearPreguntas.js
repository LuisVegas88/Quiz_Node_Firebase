
////////////////////////COGEMOS EL VALOR DE LAS NUEVAS PREGUNTAS/RESPUESTAS//////////////////
    
document.getElementById("sendBtn").addEventListener("click" , (crearPregunta) =>{
    crearPregunta.preventDefault();

    const textoPregunta = document.getElementById("Question").value;
        
    const respuestas = [];

    respuestas.push(document.getElementById("A0").value);
    respuestas.push(document.getElementById("A1").value);
    respuestas.push(document.getElementById("A2").value);
    respuestas.push(document.getElementById("A3").value);

    const Correcta = document.getElementById("Correct").value;
        
        const newQuestion = {};
        
        fetch('http://localhost:8888/nuevaPregunta', {
            method: 'POST', 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //metemos los valores en un nuevo objeto 
            
                "Q" : textoPregunta,
                "A" : respuestas, 
                "Correct" : Correcta
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
// });
