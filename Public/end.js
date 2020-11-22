
let bodySelector = document.querySelector("body");

function Resultado(){

    
    document.getElementById("Resultado").innerText=`¡ Your score is: ${localStorage.getItem("Aciertos")} / ${localStorage.getItem("numeroPreguntas")} !`
    
}

function ImagenResultado(){

    if(localStorage.getItem("Aciertos") < 7 ){

    document.getElementById("ImagenResultado").innerHTML='<img src="imagenes/YouKnowNothing.gif" />'
    
    }
    else{
        document.getElementById("ImagenResultado").innerHTML='<img src="imagenes/apluse.gif" />'
    }
}

// function RegistroResultado(){
//     let RegistroResultado = document.getElementById("RegistroResultado")
//     let nickNameBox = document.createElement("input")
//     let sendUser = document.createElement("button")

//     nickNameBox.setAttribute("id", "nickNameBox");
//     nickNameBox.setAttribute("type","text");
//     nickNameBox.setAttribute("placeholder", "Usuario");

//     sendUser.setAttribute("id", "sendUser");
//     sendUser.setAttribute("id", "buttonResult");

//     sendUser.innerText = "Enviar Resultado"

//     RegistroResultado.appendChild(nickNameBox);
//     RegistroResultado.appendChild(sendUser);
// }

Resultado()
ImagenResultado()
// RegistroResultado()
