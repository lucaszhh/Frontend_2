window.addEventListener('load', function () {
    //logica de la aplicacion

    // setTimeout(function(){
    //     document.body.style.background="red";
    //     alert("alsdaskj")
    // }, 3000);

    /* -------------------------------- variables ------------------------------- */
    let contador = 0;
    let cronometro;
    let tiempo = 1000;
    const valor = document.querySelector('#valor');
    const btnIniciar = document.querySelector('#iniciar');
    const btnStop = document.querySelector('#stop');
    const btnPausa = document.querySelector('#pausa');
    const times = document.querySelector('#times');
    const btnAcelerar = document.querySelector("#acelerar");

    /* -------------------------------- LISTENERS ------------------------------- */
    btnIniciar.addEventListener('click', function (e) {
        console.log("click");
        play();
    });
    btnStop.addEventListener('click', reiniciar);
    btnPausa.addEventListener('click', pausar);
    btnAcelerar.addEventListener("click", acelerar);


    /* -------------------------------------------------------------------------- */
    /*                                  FUNCIONES                                 */
    /* -------------------------------------------------------------------------- */
    //definimos la funcionalidad de iniciar el cronometro
    function play() {
        cronometro = setInterval(function () {
            contador++;
            console.log(contador);
            renderizar();
        }, tiempo);
    };

    // difinimos la responsabilidad de la funcion renderizar
    function renderizar() {
        valor.innerText = contador;
    }

    // definimos la funcion de pausar
    function pausar() {
        clearInterval(cronometro);
    }

    // definimos la funcionalidad del boton stop
    function reiniciar() {
        clearInterval(cronometro);
        times.innerHTML += `<small>Tiempo: ${contador}</small>`
        contador = 0;
        renderizar();
    }

    // definimos la funcionalidad de acelerar
    // - duplicar la velocidad del cronometro
    // - que se puede seguir multiplicando(duplicando la velocidad)
    // - impacata en el numero del boton
    
    function acelerar() {
        cronometro = setInterval(function () {
            contador++;
            console.log(contador);
            renderizar();
        }, tiempo/2);
    }


});