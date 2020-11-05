//VARIABLE GENERALES

let number = 0;
let Aciertos = 0;
let Preguntas;

////COGER PREGUNTAS DEL SERVIDOR////////
function getQuestions(){

    return new Promise(resolve => {

        fetch('http://localhost:8888/getQuestions ')
            .then(response => response.json())
            .then((data)=>{

                console.log(data)

                Preguntas=data;
                
                
                showNextQuestion();
            }).catch(e=>console.log(e));
        });
}

//Obtenemos el body para meterle los elementos 

let bodySelector = document.querySelector("body");

//CONTADOR DE PREGUNTAS

function createQuestionCounter(){

    let containerNumberQuestion = document.createElement("div");
    containerNumberQuestion.className = "containerNumberQuestion";

    let numberQuestion = document.createElement("h1");
    numberQuestion.className = "numberQuestion";

    
    bodySelector.appendChild(containerNumberQuestion);
    containerNumberQuestion.appendChild(numberQuestion);
}

//FUNCIÓN PARA CREAR LAS PREGUNTAS


function BuildAQ(Preguntas){
    document.querySelector("h1").innerText= `Pregunta ${number + 1}`; 
    let formulario = document.querySelector(".formulario");

        //Creamos Legend con nuestra pregunta del array
        let legend = document.createElement("legend");
        legend.className = "legend";
        legend.innerText = Preguntas[number].Q;

        formulario.appendChild(legend);
    

    //Respuestas

        for (let i = 0; i < Preguntas[number].A.length; i++) {

        //Contenedor de Preguntas

        let AnswersContainer = document.createElement("div");
        AnswersContainer.className = "AnswersContainer";

        //Botones con las opciones

        let inputs = document.createElement("button");
        inputs.className = "buttonA"

        //texto de las preguntas 

        inputs.innerText = Preguntas[number].A[i];

        //atributos botones 

        inputs.id = i;
        inputs.type = "button";
        inputs.name = "respuesta";
        inputs.value = Preguntas[number].A[i];
        // console.log(i)
        //Se añade al contenedor

        AnswersContainer.appendChild(inputs);
        formulario.appendChild(AnswersContainer);
       
       }
     
    //PINTAR CORRECTAS Y FALLIDAS///
    let cNumber = number;
    clickEvent = document.querySelectorAll(".AnswersContainer").forEach(el => el.addEventListener("click", (e)=>{
        // console.log("Llamada")
        // console.log(el.id);
        // console.log(el.firstChild)
        // console.log(el.className);
            if(el.firstChild.id==Preguntas[number].Correct){
                el.firstChild.className="green";
                Aciertos++;
                setTimeout(()=>{showNextQuestion()},500);
                
            }
            if(el.firstChild.id!=Preguntas[number].Correct){
                el.firstChild.className="red";
                setTimeout(()=>{showNextQuestion()},500);
        
            }
        
            number = cNumber + 1;
        // }
    }));
        
}

function createQuestionForm()
{
  //Creacion del formulario para la pregunta
  let formulario = document.querySelector("form");
  formulario.className= "formulario";

  bodySelector.appendChild(formulario);

}

async function showNextQuestion(){
        
        if(number < Preguntas.length){
            console.log(number)
            let questionText = document.querySelector("legend");
            if (questionText){
                questionText.remove();
                
                let options = document.querySelectorAll(".AnswersContainer");
                options.forEach((option) => {option.remove()});
            }
            
            BuildAQ(Preguntas)
        }
        else {

            localStorage.setItem("Aciertos", Aciertos);
            localStorage.setItem("numeroPreguntas", number)
            
            
            return window.location="end.html";
            
        }

}





// //Llamamos a las funciones

getQuestions();
createQuestionCounter();
createQuestionForm();







