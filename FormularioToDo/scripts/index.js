window.addEventListener("load", function(){

    /* Variables */
    const formulario = document.forms[0];
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const apiUrl = "https://ctd-todo-api.herokuapp.com/v1/users/login"
    /* Funciones */

    formulario.addEventListener("submit", function(e){
        e.preventDefault();
        const resultadoValidaciones = validacionNoVacio(inputEmail.value) && validacionNoVacio(inputPassword.value);
        if (resultadoValidaciones) {
            console.log(normalizacionSigUp(inputEmail.value, inputPassword.value));
            fetchApiLogIn(apiUrl, normalizacionSigUp(inputEmail.value,inputPassword.value));
        }else{
            alert("Tienes que completar ambos campos");
        }
    });

})

/* Funcionalidades */

function validacionNoVacio(campo) {
    let resultado = true;
    /* Casos que no cumplan */
    if(campo===""){
        resultado=false;
    }
    return resultado; 
}

function normalizacionSigUp(email,password) {
    const usuario = {
        email: email.toLowerCase().trim(),
        password: password.trim()
    }
    return usuario;
}

function fetchApiLogIn(url,payload) {

    const settings = {
        method: "POST",
        headers: {
            "Content-Type":"applicaton/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(url, settings)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        /* Chequeo si vien un token */
        if(data.jwt){
            localStorage.setItem("token", data.jwt);
            /* redirijo a la vista */
            location.href = "/mis-tareas.html";
        }
    })

}
