// Selecciona el elemento <html> del documento
const html = document.querySelector('html')

// Selecciona el botón con la clase .app__card-button--corto
const botonCorto = document.querySelector('.app__card-button--corto')

// Selecciona el botón con la clase .app__card-button--largo
const botonLargo = document.querySelector('.app__card-button--largo')

// Selecciona el botón con la clase .app__card-button--enfoque
const botonEnfoque = document.querySelector('.app__card-button--enfoque')

// Selecciona el elemento de imagen con la clase .app__image
const banner = document.querySelector('.app__image')

// Selecciona el elemento con la clase .app__title
const titulo = document.querySelector('.app__title')

// Selecciona todos los botones con la clase .app__card-button
const botones = document.querySelectorAll('.app__card-button')

// Selecciona el input con el id #alternar-musica
const imputEnfoqueMusica = document.querySelector('#alternar-musica')

// Carga un archivo de audio
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')

// Selecciona el botón con el id #start-pause
const botonIniciarPausar = document.querySelector('#start-pause')

// Carga varios archivos de sonido
const audioPlay = new Audio('./sonidos/play.wav')
const audioPausa = new Audio('./sonidos/pause.mp3')
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')

// Selecciona el span dentro del botón de iniciar/pausar
const textoInciciarPausar = document.querySelector('#start-pause span')

// Selecciona el icono dentro del botón de iniciar/pausar
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')

// Selecciona el elemento con el id #timer para mostrar el tiempo
const tiempoEnPantalla = document.querySelector('#timer')

// Define el tiempo inicial en segundos (25 minutos)
let tiempoTranscurridoEnSegundos = 1500

// Variable para almacenar el ID del intervalo
let idIntervalo = null

// Hace que la música se repita continuamente
musica.loop = true

// Añade un evento al input para alternar la reproducción de música
imputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

// Añade un evento al botón para iniciar un descanso corto
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

// Añade un evento al botón para iniciar un enfoque
botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

// Añade un evento al botón para iniciar un descanso largo
botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

// Cambia el contexto de la aplicación
function cambiarContexto(contexto) {
    mostrarTiempo()
    // Quita la clase 'active' de todos los botones
    botones.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    // Establece el atributo 'data-contexto' en el elemento <html>
    html.setAttribute('data-contexto', contexto)
    // Cambia la imagen del banner según el contexto
    banner.setAttribute('src', `./imagenes/${contexto}.png`)     

    // Cambia el texto del título según el contexto
    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">
                sumérgete en lo que importa.
                </strong>`
            break
        case 'descanso-corto':
            titulo.innerHTML = `¿Que tal tomar un respiro?
                <strong class="app__title-strong">
                ¡Haz una pausa corta!
                </strong>`
            break
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie
                <strong class="app__title-strong">
                Haz una pausa larga.
                </strong>`
            break
        default:
            break
    }
}

// Función para contar regresivamente el tiempo
const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0) {
        audioTiempoFinalizado.play()
        alert('Tiempo final ')
        reiniciar()
        return
    }
    textoInciciarPausar.textContent = 'Pausar'
    iconoIniciarPausar.setAttribute('src', `/Proyecto Base Fokus/imagenes/pause.png`)  
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()        
}

// Añade un evento al botón de iniciar/pausar para alternar el estado
botonIniciarPausar.addEventListener('click', iniciarPausar)

// Función para iniciar o pausar la cuenta regresiva
function iniciarPausar() {
    if (idIntervalo) {
        audioPausa.play()
        reiniciar()
        return
    }
    audioPlay.play()
    idIntervalo = setInterval(cuentaRegresiva, 1000)
}

// Función para reiniciar la cuenta regresiva
function reiniciar() {
    clearInterval(idIntervalo)
    textoInciciarPausar.textContent = 'Comenzar'
    iconoIniciarPausar.setAttribute('src', `/Proyecto Base Fokus/imagenes/play_arrow.png`)
    idIntervalo = null
}

// Función para mostrar el tiempo en la pantalla
function mostrarTiempo() {
    // Convierte el tiempo en segundos a un objeto Date
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    // Formatea el tiempo en minutos y segundos
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', { minute: '2-digit', second: '2-digit' })
    // Muestra el tiempo formateado en el elemento #timer
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

// Muestra el tiempo inicial en la pantalla
mostrarTiempo()
