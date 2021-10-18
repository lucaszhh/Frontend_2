 window.addEventListener('load', function () {

     const formulario = document.querySelector('form');
     const botonSubmit = document.querySelector('form button');
     //  const formulario = ​document.forms[0];
     const inputNombre = document.querySelector('#nombre');
     const inputContrasenia = document.querySelector('#pass');
     const inputTelefono = document.querySelector('#tel');
     const cheboxHobbies = document.getElementsByName('hobbies');
     const radioButtons = document.querySelectorAll('[name=nacionalidad]');
     const mensajeNombre = document.querySelector('#mensajeNombre');
     const mensajeTelefono = document.querySelector('#mensajeTelefono');
     const marcoHobbies = this.document.querySelector('#marcoHobbies');

     const datosUsuario = {
         nombre: "",
         contrasenia: "",
         telefono: "",
         hobbies: [],
         nacionalidad: ""
     };

     inputTelefono.addEventListener('blur', function () {
         datosUsuario.telefono = inputTelefono.value;

         if (!validarTelefono(datosUsuario.telefono)) {
             // mostrar el error al usuario
             inputTelefono.classList.add('error');
             mensajeTelefono.classList.remove('oculto');
         } else {
             inputTelefono.classList.remove('error');
             mensajeTelefono.classList.add('oculto');
         };
     });

     inputNombre.addEventListener('blur', function () {
         datosUsuario.nombre = inputNombre.value;
         //validacion
         if (!validarNombre(datosUsuario.nombre)) {
             // mostrar el error al usuario
             inputNombre.classList.add('error');
             mensajeNombre.classList.remove('oculto');
         } else {
             inputNombre.classList.remove('error');
             mensajeNombre.classList.add('oculto');
         };

     });

     //  escuchamos cualquier cambio en el formulario
     //  para evaluar si habilitamos o no el boton
     formulario.addEventListener('change', function (e) {
         console.log(datosUsuario);

        //nos encargamos de validar que solo los chequeados no superen la cantidad de 4 hobbies
         let arrayBasadoEnNodos = Array.from(cheboxHobbies);
         let hobbiesChequeados = arrayBasadoEnNodos.filter(nodo => nodo.checked == true);
         datosUsuario.hobbies = hobbiesChequeados;

         if (validarHobbies(datosUsuario.hobbies)) {
             marcoHobbies.classList.remove('borde-rojo');
         } else {
             marcoHobbies.classList.add('borde-rojo');
         }


         if (validarNombre(datosUsuario.nombre) && validarTelefono(datosUsuario.telefono) && validarHobbies(datosUsuario.hobbies)) {
             botonSubmit.removeAttribute('disabled');
         } else {
             botonSubmit.setAttribute('disabled', '');
         }

     });


     formulario.addEventListener('submit', function (evento) {
         // frenamos el envío por defecto
         evento.preventDefault();
         console.log("SUBMIT");

         let listadoHobbies = [];
         cheboxHobbies.forEach(box => {
             if (box.checked) {
                 listadoHobbies.push(box.id)
             };
         })

         let pais = "";
         radioButtons.forEach(button => {
             if (button.checked) {
                 pais = button.id;
             }
         });




         //normalizacion
         console.log(normalizar(inputNombre.value, inputContrasenia.value, inputTelefono.value, listadoHobbies, pais));




     });

 });

 function validarNombre(nombre) {
     let resultado = true;

     // - no contenga caracteres especiales o numeros
     if (!validarString(nombre)) {
         resultado = false;
     }

     // - minimo 3 y maximo de 20 caracteres
     if (nombre.length < 3 || nombre.length > 20) {
         resultado = false;
     }

     return resultado;
 };


 function normalizar(nom, pass, tel, lista, pais) {
     const datos = {
         name: nom.toUpperCase(),
         password: pass,
         phone: parseInt(tel),
         hobbies: lista,
         country: pais
     };

     return datos;
 }

 function validarString(string) {
     let resultado = true;

     let caracteresValidos = [" ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

     for (const i of string) {
         if (caracteresValidos.indexOf(i) == -1) {
             resultado = false;
         }
     }

     return resultado;
 }

 function validarTelefono(telefono) {
     let resultado = true;

     for (caracter of telefono) {
         if (isNaN(caracter)) {
             resultado = false;
         }
     }

     return resultado;
 }

 function validarHobbies(listado) {
     let resultado = true;

     if (listado.length > 4) {
         resultado = false;
     }

     return resultado;
 }