// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

const obtenerCambiosLocalStorage = () => {
    const cambios = localStorage.getItem('cambios');
    return cambios;
};

const guardarCambiosLocalStorage = (cambios) => {
    localStorage.setItem('cambios',cambios);
};

const obtenerMovimientosLocalStorage = () => {
    const movimientos = localStorage.getItem('Movimientos');
    return movimientos;
};

const guardarMovimientosLocalStorage = (Movimientos) => {
    localStorage.setItem('Movimientos', Movimientos);
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const estado = prompt("Ingrese el estado del jugador:");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ nombre, edad, posicion, estado });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};


// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    let jugadores = obtenerJugadoresLocalStorage()
    let html = "<ul>";

    jugadores.forEach(function(elemento) {
        html += `<li>  nombre : ${elemento.nombre}, edad: ${elemento.edad}, posicion: ${elemento.posicion}, estado: ${elemento.estado}</li>`
    });
    html += "</ul>";
    document.getElementById("lista").innerHTML = html;
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (nombreJugador, nuevaPosicion) => {
    try {
        const nombreJugador = prompt("Ingrese el nombre del jugador:");
        const nuevaPosicion = prompt("Ingrese el nueva posicion del jugador:");

        let jugadores = obtenerJugadoresLocalStorage();

        const jugadorExistente = jugadores.find(jugador => jugador.nombre == nombreJugador);
        console.log(jugadorExistente)
        if (!(jugadorExistente)) {
            throw new Error('El jugador no está en el equipo.');
        }

        const posicionesValidas = ["delantero", "centrocampista", "defensa", "portero"];

        if (!posicionesValidas.includes(nuevaPosicion)) {
            throw new Error('La posicion ingresada no existe.');
        } 

        jugadorExistente.posicion = nuevaPosicion;

        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('nueva posicion cambiada correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    try {
        camMax = 5;
        const jugadorSaliente = prompt("Ingrese el nombre del jugador a cambiar:");
        const jugadorEntrante = prompt("Ingrese el nombre del suplente:");
        const tiempoPartido = prompt("Ingrese el tiempo del partido:");

        let Movimientos = obtenerMovimientosLocalStorage()
        let cambios = obtenerCambiosLocalStorage()
        let jugadores = obtenerJugadoresLocalStorage();

        console.log(Movimientos)
        console.log("cambios",cambios)
        

        if (cambios == null){
            cambios = 0;    
        }

        if (Movimientos == null){
            Movimientos = 0;
        }

        const jugadorACambiar = jugadores.find(jugador => jugador.nombre == jugadorSaliente);
        const jugadorSuplente = jugadores.find(jugador => jugador.nombre == jugadorEntrante);

        if (!(jugadorACambiar)) {
            throw new Error('El jugador no está en el equipo.');
        }
        
        if (!(jugadorSuplente)) {
            throw new Error('El jugador no está en el equipo.');
        }

        if (!(tiempoPartido == "entretiempo") || !(Movimientos < 3) || !(cambios <= camMax)){
            throw new Error('No se pueden cambiar los jugadores en este momento.');
        }

        jugadorACambiar.estado = "suplente";

        jugadorSuplente.estado = "titular";

        Movimientos ++;
        cambios ++;

        guardarCambiosLocalStorage(cambios);
        guardarMovimientosLocalStorage(Movimientos);
        guardarJugadoresLocalStorage(jugadores);

        // simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('cambio hecho correctamente.');
        
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
