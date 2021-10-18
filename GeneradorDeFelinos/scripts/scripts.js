const boton = document.querySelector('.theme button');

function cambiarTema() {
  const tema = document.body.classList.toggle('dark');

  if(tema){
    boton.innerHTML = 'Cambiar tema <i class="fas fa-sun"></i>'
  } else{
    boton.innerHTML = 'Cambiar tema <i class="fas fa-moon"></i>'  
  }
};
const contenedorCards = document.querySelector(".contenedor");
const renderizarFelinos = () => {
  listadoFelinos.forEach((obj) => {
    const cardHTML = `
        <div class="item">
            <img src=${obj.imgUrl} />
            <h2>${obj.title}</h2>
            <p>
                ${obj.description}
            </p>
        </div>`;
    contenedorCards.innerHTML += cardHTML;
  });
};
renderizarFelinos(); 


/*-----------------------Otra forma de resolverlo-----------------------*/

// plantilla de la tarjeta
/* <div class="item">
      <img src="./imagenes/tiger.jpg">
      <h2>El tigre</h2>
      <p>
        El tigre (Panthera tigris) es una de las especies​ de la subfamilia de los panterinos (familia Felidae)
        pertenecientes al género Panthera. Se encuentra solamente en el continente asiático; es un predador carnívoro y
        es
        la especie de félido más grande del mundo junto con el león pudiendo alcanzar ambos un tamaño comparable al de
        los
        fósiles de félidos de mayor tamaño.
      </p>
</div> */

/* let divContenedor = document.querySelector(".contenedor");

function renderizarItems() { 
  let divHijo = document.createElement("div");
  divHijo.classList.add("item");
  for (let i = 0; i < listadoFelinos.length; i++) {
  // imagen
    let imagen = document.createElement("img");
    imagen.setAttribute("src",listadoFelinos[i].imgUrl);
  // titulo
    let titulo = document.createElement("h2");
    titulo.innerText = listadoFelinos[i].title;
  // parrafo
    let parrafo = document.createElement("p");
    parrafo.innerText = listadoFelinos[i].description;
  //agrego item a la card
    divHijo.appendChild(imagen);
    divHijo.appendChild(titulo);
    divHijo.appendChild(parrafo);
  }
  //agrego items a la card
  divContenedor.appendChild(divHijo);
}
renderizarItems(); */


