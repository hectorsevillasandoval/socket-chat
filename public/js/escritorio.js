

const searchParams = new URLSearchParams( window.location.search );

const currentTicket = document.querySelector('small');
const btnAttend = document.querySelector('button');
const alertBox = document.querySelector('.alert');
const queue = document.querySelector('#lblPendientes');

if( !searchParams.has('escritorio') ) window.location.replace('index.html');

const desk = searchParams.get('escritorio');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAttend.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAttend.disabled = !false;
});

socket.emit('last-ticket', null, ( ticket ) => {
    //lblNuevoTicket.innerText = ticket;
});

socket.on( 'calculate-queue', ( total ) => {
    queue.innerText = total;
} );


btnAttend.addEventListener( 'click',() => {
    socket.emit( 'attend-ticket', { desk }, ( { status, msg, ticket } ) => {
        
        if( !status ){
            currentTicket.innerText = 'No one';
            alertBox.classList.remove('d-none');
            alertBox.innerText = msg;
            return;
        }
        currentTicket.innerText = `Ticket ${ ticket.no }`;
    });

});