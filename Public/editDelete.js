///////VARIABLES GENERALES/////////

let Preguntas;

////COGER PREGUNTAS DEL SERVIDOR////////
function getQuestions(){

    const prom = new Promise((resolve, reject) => {
        fetch('http://localhost:8888/getQuestions')
        .then(response => response.json())
        .then((data)=>{
            console.log(data);

            Preguntas = data;
            PintarPreguntas();
        }).catch(e=>console.log(e));
    });
}

///////////PINTAR PREGUNTAS///////////////////
let ContenedorGlobal = document.getElementById("ContenedorEditDelete");

function PintarPreguntas(){
    Preguntas.map(el => {

        const Contenedor = document.createElement("div");
        const PreguntaDiv = document.createElement("div");
            PreguntaDiv.id = "PreguntaEdit";
        const NumeroPregunta = document.createElement("p");
            NumeroPregunta.innerText = `Pregunta ${el.id}`;
            
        const Pregunta = document.createElement("p");
            Pregunta.innerText = el.Q;
        const Botonera = document.createElement("div");
            Botonera.id = "Botonera"
        const BtnEdit = document.createElement ("i");
            BtnEdit.dataset.id= el.id ///Igualamos el ID de la pregunta al ID del Boton 

            BtnEdit.setAttribute("class","fas fa-edit fa-lg");

            ///EDITAR PREGUNTA////

            BtnEdit.addEventListener("click" , (e) =>{
                // console.log("id = ", e.target.dataset.id);
                sessionStorage.setItem('PreguntaId', e.target.dataset.id ); ///guardamos el id de la pregunta clikada
                sessionStorage.setItem('Pregunta',JSON.stringify(Preguntas[e.target.dataset.id])); ///guardadmos la pregunta con el id correspondiente a la clikada
                return window.location="SendQuestions.html";


            });

        const BtnDelete = document.createElement ("i");
            BtnDelete.dataset.id= el.id
            
            BtnDelete.setAttribute("class","fas fa-trash-alt fa-lg");
            
            ///BORRAR PREGUNTAS///

            BtnDelete.addEventListener("click" , (e) =>{
             id=e.target.dataset.id;
                fetch('http://localhost:8888/DeleteQuestion', {
                    method: 'DELETE', 
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json'
                    }, 
                        body:JSON.stringify({id: e.target.dataset.id})
                })
                .then(response => response.text())
                .then(data => console.log(data))
               
                .then(window.location="editDelete.html") //para que se recarge la pagina
            });
           
        Botonera.appendChild(BtnEdit);
        Botonera.appendChild(BtnDelete);

        PreguntaDiv.appendChild(NumeroPregunta);

        Contenedor.appendChild(PreguntaDiv);
        Contenedor.appendChild(Pregunta);
        Contenedor.appendChild(Botonera);

        

        ContenedorGlobal.appendChild(Contenedor);
    
    });
}
getQuestions()









