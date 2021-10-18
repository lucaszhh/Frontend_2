/*
REQUERIMIENTOS
- utilizar el formulario para captar el texto ingresado

- implementar el evento "submit", utilizarlo para guardar el comentario en un array

- cada vez que se agrega un nuevo comentario renderizarlo en una etiqueta "p"(sacar del html los hardcodeados y hacerlo dinamico)

- constantemente guardar la informacion en localStorage, si se recarga la pagina deberian mantenerse los comentarios
*/

const formulario = document.forms[0];
const inputComentario =  document.querySelector('#comentario');
const cajaComentarios = document.querySelector('.comentarios');
const verMas = document.querySelector('#verMas')

let listadoComentarios = [];

//chequear si existe algo previamente guardado en storage
const comentariosPrevios = JSON.parse(localStorage.getItem('comentariosAlmacenados'));
if(comentariosPrevios != null){
    listadoComentarios = comentariosPrevios;
    renderizarComentarios(listadoComentarios);
}

formulario.addEventListener('submit', function(evento){
    evento.preventDefault();

    guardarComentario(inputComentario.value);
    console.log(listadoComentarios);
    renderizarComentarios(listadoComentarios);

    formulario.reset();
});

/* ------------------------ funcionalidad de guardar ------------------------ */
function guardarComentario(comentario) {
    listadoComentarios.unshift(comentario);
    localStorage.setItem('comentariosAlmacenados', JSON.stringify(listadoComentarios));
}

/* ----------------------- funcionalidad de renderizar ---------------------- */
function renderizarComentarios(listado) {
    cajaComentarios.innerHTML = "";

    // listado.forEach( item => {
    //     cajaComentarios.innerHTML += `<p>${item}</p>`;

    //     // const texto =  document.createTextNode(item);
    //     // const parrafo = document.createElement('p');
    //     // parrafo.appendChild(texto);
    //     // cajaComentarios.appendChild(parrafo);
    // });
    let cantidadComentarios = 5;

    // chequeo que el array no sea menor a mi maximo de comentarios
    if(listadoComentarios.length < cantidadComentarios){
        cantidadComentarios = listadoComentarios.length;
    } 
    if(listadoComentarios.length > 5){
            verMas.classList.remove('oculto');
    }


    for(let i=0; i<cantidadComentarios; i++){
        cajaComentarios.innerHTML += `<p>${listadoComentarios[i]}</p>`;
    }
};