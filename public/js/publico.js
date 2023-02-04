const lblTicket1        = document.querySelector('#lblTicket1');
const lblEscritorio1    = document.querySelector('#lblEscritorio1');

const lblTicket2        = document.querySelector('#lblTicket2');
const lblEscritorio2    = document.querySelector('#lblEscritorio2');

const lblTicket3        = document.querySelector('#lblTicket3');
const lblEscritorio3    = document.querySelector('#lblEscritorio3');

const lblTicket4        = document.querySelector('#lblTicket4');
const lblEscritorio4    = document.querySelector('#lblEscritorio4');



const socket = io();

socket.on( 'current-status', ( [ ticket1, ticket2, ticket3, ticket4 ] ) => {

    if(ticket1){
        lblTicket1.innerText = `Ticket ${ticket1.no}`;
        lblEscritorio1.innerText = ticket1.desk;

    }

    if(ticket2){
        lblTicket2.innerText = `Ticket ${ticket2.no}`;
        lblEscritorio2.innerText = ticket2.desk;

    }

    if(ticket3){
        lblTicket3.innerText = `Ticket ${ticket3.no}`;
        lblEscritorio3.innerText = ticket3.desk;

    }

    if(ticket4){
        lblTicket4.innerText = `Ticket ${ticket4.no}`;
        lblEscritorio4.innerText = ticket4.desk;

    }
} );