const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { socketController } = require('../sockets/sockets.controller');

class Server{

    paths = {
    };

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 9000;
        this.server = http.createServer(this.app);
        this.io = socketIo( this.server );

        // middleware
        this.middlewares();

        this.sockets();
    }

    sockets(){
        this.io.on( 'connection', socketController ); 
    }

    // Middlewares
    middlewares(){
        // Using CORS middleware
        this.app.use( cors() );

        this.app.use( express.static( 'public' ) );
    }

    // listen
    listen() {
        this.server.listen( this.PORT, () => {
            console.log('listening on port ' + this.PORT ); 
        } );
    }
}

module.exports = Server;