
/////COMPROBAR existencia en la Database  de EMAIL Y CONTRASEÑA Y MANDAR AL HTML EDITAR//////
document.getElementById("btnEdit").addEventListener("click", function(event){ 
     event.preventDefault();
    //Get password input
    const pass = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    // console.log(pass);
    // console.log(email);
        if (email === '')
        {
            alert("Introduce email");
        }
        else{/////VALIDACION EMAIL////
            const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(regex.test(email)){
            console.log('email valido')
        }
        else{
            alert('email NO valido')
        }   
        }
        if (pass === '')
        {
            alert("Introduce contraseña");
        }
        else {///VALIDACION CONTRASEÑA///
            const regex2 = new RegExp(/^[0-9]*$/);
            if( regex2.test(pass)){
                
                const User= {
                    "email" : email,
                    "pass" : pass
                };

                fetch("http://localhost:8888/loginAdmin", {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Headers' : '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(User),
                    }
                )
                .then(res => {
                    if (res.redirected) ///si la respuesta me redirecciona le doy la url que le di en Front
                        window.location.href = res.url;
                });
            
            }else{
                alert('Contraseña NO válida (la contraseña debe ser númerica')
            }
        }
})

////LOGIN JUGADORES (Dando al boton start)/////
document.getElementById('btnPlay').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});


////LOGIN JUGADORES y Comprobar si el Usuario YA existe////
document.getElementById("btnSubmit").addEventListener("click", function(event){ 
    event.preventDefault();
    const emailU = document.getElementById("emailU").value;
    const passwordU = document.getElementById("passwordU").value;
    const date = document.getElementById("date").value;

        if ((emailU==='')||(passwordU==='')||(date==='')){
            alert("Rellene todos los campos");
        }
        else{//VALIDACIÓN EMAIL//
            const regex3 = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(!regex3.test(emailU)){
                alert('Email NO válido');
            }
            else{//VALIDACIÓN CONTRASEÑA//
                const regex2 = new RegExp(/^[A-Za-z0-9]+$/g);
                if( regex2.test(passwordU)){
                    
                    const Player= {
                        "email" : emailU,
                        "pass" : passwordU,
                        "birthdate": date
                    };
                    fetch("http://localhost:8888/loginPlayers", {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Origin' : '*',
                            'Access-Control-Allow-Headers' : '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Player),
                        }
                    )
                        .then(response => response.text())
                        // .then(data => console.log(data))
                        .then(data =>
                            fetch ("http://localhost:8888/login",{
                                method: 'POST',
                                headers: {
                                    'Access-Control-Allow-Origin' : '*',
                                    'Access-Control-Allow-Headers' : '*',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                                }
                            ))
                        .then(console.log("Usuario Registrado,vamos allá¡"))
                        .then(window.location = "quiz.html")
                        
                }else{
                    alert('Contraseña No válida')
                }  
            }
        }
    });



