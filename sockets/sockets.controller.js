const TicketControl = require('../models/ticket-control');


const ticketControl = new TicketControl();

const socketController = (socket) => {

    //socket.on('disconnect', () => console.log('Client disconnected') );

    socket.emit( 'current-status', ticketControl.lastFour );
    socket.emit( 'calculate-queue', ticketControl.tickets.length );

    socket.on( 'last-ticket', ( payload, callback ) => {
        callback( `Ticket ${ticketControl.last}` );
    } );

    socket.on( 'next-ticket', ( payload, callback ) => {
        const next = ticketControl.next();

        callback(next);
        
    } );

    socket.on( 'attend-ticket', ( { desk } , callback) => {

        if( !desk ){
            callback( {
                status: false,
                msg: 'Desk is required',
            } );
            throw new Error('Desk is required');
        }

        const ticket = ticketControl.attend( desk );

        if( !ticket ) {
            callback( {
                status: false,
                msg: 'There is not more tickets to assign',
            } );
        }

        callback({
            status: true,
            ticket,
        });
    } );

    socket.broadcast.emit( 'current-status', ticketControl.lastFour );

    socket.broadcast.emit( 'calculate-queue', ticketControl.tickets.length );

};


module.exports = {
    socketController,
}