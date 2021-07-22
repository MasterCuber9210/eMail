// Variables 
const btnEnviar  = document.querySelector('#enviar');
const btnReset   = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email     = document.querySelector('#email');
const asunto    = document.querySelector('#asunto');
const mensaje   = document.querySelector('#mensaje');

// Expresion regular para la validacion del email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners() {
    // inicializacion de la APP
    document.addEventListener( 'DOMContentLoaded', iniciarApp );

    // Campos del formulario
    email.addEventListener( 'blur', validarFormulario )
    asunto.addEventListener( 'blur', validarFormulario )
    mensaje.addEventListener( 'blur', validarFormulario )

    // Enviar formulario
    btnEnviar.addEventListener( 'submit', enviarEmail );

    // Resetear formulario
    btnReset.addEventListener( 'submit', resetForm );
}

// Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
    if (e.target.value.length > 0) {

        // eliminar mensajes de error
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {

        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no es valido');
        }
        
    }

    if (er.test( email.value ) && asunto.value != '' && mensaje.value != '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
    
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

// Envia el email
function enviarEmail(e) {
    e.preventDefault();

    // mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        // mensaje de se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje enviado';
        parrafo.classList.add('border', 'background-green-100', 'text-green-500', 'p-3', 'my-10', 'text-center');
        
        // inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        // eliminar el mensaje de enviado
        setTimeout(() => {
            parrafo.remove();
            resetForm();
            iniciarApp();
        }, 5000);
        
    }, 2000);
}

// reiniciar el formulario
function resetForm() {
    formulario.reset();
    iniciarApp();
}