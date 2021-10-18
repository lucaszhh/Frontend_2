/* -------------------------------------------------------------------------- */
/*                            Variables necesarias                            */
/* -------------------------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const arrNac = [];
const arrInter = [];

/* ------------ Separando las noticias según son o no nacionales ------------ */
const separarNoticiasPorCategoria = () => {
  noticias.forEach((noticia) => {
    if (noticia.tipoNacional) arrNac.push(noticia);
    else arrInter.push(noticia);
  });
};

/* ------ Agregando el HTML de cada card en el container que le pasemos ----- */
const escribirNoticiasEnContainer = (nombreContainer) => {
    let arr = noticias;
    if (nombreContainer === "nacional") arr = arrNac;
    else if (nombreContainer === "internacional") arr = arrInter;
    arr.forEach((noticia) => {
        const { titulo, descripcion, imgUrl, fecha } = noticia;
        const card = `
        <div class="news-card">
        <img src=${imgUrl} alt=${titulo}>
        <h4>${titulo}</h4>
        <p>${fecha}</p>
        <p>${descripcion}</p>
        <i class="fas fa-plus"></i>
        </div>
        `;
        $(nombreContainer).insertAdjacentHTML("beforeend", card);
    });
};

/* ------- Imprimir todas las noticias en sus respectivos contenedores ------ */
const imprimirTodasNoticias = () =>{
    separarNoticiasPorCategoria();
    escribirNoticiasEnContainer('principales');
    escribirNoticiasEnContainer('nacional');
    escribirNoticiasEnContainer('internacional');
}

/* -------------------------------------------------------------------------- */
/*                                  Ejecución                                 */
/* -------------------------------------------------------------------------- */
imprimirTodasNoticias()