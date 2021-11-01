window.addEventListener("load", function(){

    /* Variables */
    /* form */
    const formulario = document.forms[0];
    /* campos form */
    const inputNombre = document.querySelector(".nombre");
    const inputApellido = document.querySelector(".apellido");
    const inputEmail = document.querySelector(".email");
    const inputContrasenia = document.querySelector(".contraseña");
    const inputRepetirContrasenia = document.querySelector(".repetirContraseña");
    const btnCrearCuenta = document.querySelector(".btnCrearCuenta");
    /* url API */
    const apiUrl = "https://ctd-todo-api.herokuapp.com/v1/users";
    
    /* Creando un Usuario */

    formulario.addEventListener("submit", function(e){

        const errores = {
            contraseniasIguales:"Las contraseñas deben ser las mismas",
            camposVacios: "Los campos no pueden estar vacios"
        }

        e.preventDefault();
        const resultadoValidaciones = validacionNoVacio(inputNombre.value) && validacionNoVacio(inputApellido.value) && validacionNoVacio(inputEmail.value) && validacionNoVacio(inputContrasenia.value) && validacionNoVacio(inputRepetirContrasenia.value);

        const resultadoContrasenia = validarRepetirContraseña(inputContrasenia,inputRepetirContrasenia);

        if(resultadoValidaciones && resultadoContrasenia){
            const usuarioNormalizado = normalizacionSigUp(inputNombre.value, inputApellido.value, inputEmail.value, inputContrasenia.value);
            console.log(usuarioNormalizado);
            fetchSigUp(apiUrl, usuarioNormalizado);
        } else{
            if(!resultadoValidaciones){
                alert(errores.camposVacios);
            } else if(!resultadoContrasenia) {
                alert(errores.contraseniasIguales);
            } 
        }      
        
    })

})

/* validar */
/* repetir contraseña deben coincidir con contraseña (register) */
function validarRepetirContraseña(campo1,campo2) {
    let resultado = true;
    if (campo1.value!==campo2.value) {
        resultado = false;
    }
    return resultado;
}

/* ningún campo vacío (register y login) */
function validacionNoVacio(campo) {
    let resultado = true;
    /* Casos que no cumplan */
    if(campo===""){
        resultado=false;
    }
    return resultado; 
}

/* Normalización */
/* deben finalmente preparar el objeto normalizado en ambos casos.
Ejemplo para register:
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string"
} */
function normalizacionSigUp(nombre,apellido,email,password) {
    const usuario = {
        firstName: nombre.toLowerCase().trim(),
        lastName: apellido.trim().toLowerCase(),
        email: email.toLowerCase().trim(),
        password: password.trim()
    }
    return JSON.stringify(usuario);
}

/* crear usuario en API */
function fetchSigUp(url, payload) {

    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    }

    fetch(url, settings)
    .then (response => response.json())
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