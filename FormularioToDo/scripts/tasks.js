window.addEventListener("load", function(){
    /* Variables */
    const token = localStorage.getItem("token");
    const apiUrlUsuario = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
    const apiUrlTarea = "https://ctd-todo-api.herokuapp.com/v1/tasks";
    /* const apiUrlUnaTarea = "https://ctd-todo-api.herokuapp.com/v1/tasks/{2457}" */
    const divNombre = document.querySelector(".nombreUsuario");
    const formularioNuevaTarea = document.forms[0];
    const inputNuevaTarea = document.querySelector("#nuevaTarea");
    const btnCerrarSesion = document.querySelector('#closeApp');
    
    /* Funcionalidad */
    /* Agregar Usuario */
    fetchGetName(apiUrlUsuario);
    /* Obtener una tarea */

    obtenerTarea(apiUrlTarea);
    /* Crear una tarea */
    /* const infoTarea = normalizacionTarea("Aprender Javascript", true);
    crearTarea(apiUrlTarea, infoTarea); */
    /* Reformateo de tareas */
    /* renderizarTareas(tarea); */
    
    btnCerrarSesion.addEventListener('click', function () {
        const confirmacion = confirm("¿Desea cerrar sesion?")
        if (confirmacion) {
          //vacio localStorage y redirecciono
          localStorage.clear();
          location.replace('/index.html');
        }
    })

    formularioNuevaTarea.addEventListener("submit", function(e){
        e.preventDefault();
        console.log(inputNuevaTarea.value);
        crearTarea(apiUrlTarea, normalizacionTarea(inputNuevaTarea.value, false));
        formularioNuevaTarea.reset();
        
    })

    function fetchGetName(url) {
        const setting = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization : localStorage.getItem("token")
            }
        }
        fetch(url,setting)
        .then( response => {
            console.log(response);
            return response.json()
        })
        .then( usuario => {
            console.log(usuario);
            console.log(usuario.firstName+" "+usuario.lastName);
            const nombreUsuario = usuario.firstName+" "+usuario.lastName;
            divNombre.innerHTML = nombreUsuario;
        });
        
    }

    function obtenerTarea(url) {
        const setting = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization : localStorage.getItem("token")
            }
        }

        fetch(url, setting)
        .then (response => {
            console.log(response);
            return response.json()
        })
        .then ( tarea => {
            console.log(tarea);
            renderizarTareas(tarea);
        })
        
    }
    
    function crearTarea(url, payload) {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization : localStorage.getItem("token")
            },
            body: payload
        }

        fetch(url, settings)
        .then (response => {
            console.log(response);
            return response.json()
        })
        .then(data => {
            console.log(data);
            obtenerTarea(apiUrlTarea);
        })
    }
    function normalizacionTarea(descripcion,estado) {
        const tarea = {
            description: descripcion,
            completed: estado
        }
        return JSON.stringify(tarea);
    }
    
    function renderizarTareas(listado) {
    
        const tareasPendientes = document.querySelector('.tareas-pendientes');
        tareasPendientes.innerHTML = "";
        const tareasTerminadas = document.querySelector('.tareas-terminadas');
        tareasTerminadas.innerHTML = "";
    
    
        
        listado.forEach( tarea => {
                
          if (tarea.completed) {
            //lo mandamos al listado de tareas incompletas
            
            tareasTerminadas.innerHTML += `
                <li class="tarea">
                    <div class="done"></div>
                        <div class="descripcion">
                            <p class="nombre">${tarea.description}</p>
                        <div>
                            <button><i id="${tarea.id}" class="fasfa-undo-alt change"></i></button>
                            <button><i id="${tarea.id}" class="farfa-trash-alt"></i></button>
                        </div>
                    </div>
                </li>`
          } else {
            //lo mandamos al listado de tareas terminadas
            tareasPendientes.innerHTML += `
            <li class="tarea">
                <div class="not-done change" id="${tarea.id}"></div>
                <div class="descripcion">
                    <p class="nombre">${tarea.description}</p>
                    <p class="timestamp"><i class="farfa-calendar-alt"></i> ${tarea.createdAt}</p>
                </div>
            </li>`
          }
        })
      }
})




