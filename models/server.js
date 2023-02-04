const express = require('express');
const cors = require('cors');
const { databaseConnection } = require('../database/config');
const userRouter = require('../routes/users.router');
const userAuth = require('../routes/auth.router');
const categoriesRouter = require('../routes/categories.router');
const productsRouter = require('../routes/products.router');
const searchRouter = require('../routes/search.router');
const uploadsRouter = require('../routes/uploads.router');
const fileUpload = require('express-fileupload');

class Server{

    paths = {
        auth: '/api/v1/auth/',
        categories: '/api/v1/categories',
        products: '/api/v1/products',
        search: '/api/v1/search',
        uploads: '/api/v1/uploads',
        user: '/api/v1/users',
    };

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 9000;

        // DB
        this.database();

        // middleware
        this.middlewares();

        this.routes();
    }

    // Connect to DB_DATABASE
    async database(){
        await databaseConnection();
    }

    // Routes
    routes(){
        this.app.use( this.paths.user , userRouter );
        this.app.use( this.paths.auth , userAuth );
        this.app.use( this.paths.categories , categoriesRouter );
        this.app.use( this.paths.products , productsRouter );
        this.app.use( this.paths.search , searchRouter );
        this.app.use( this.paths.uploads , uploadsRouter );
    }

    // Middlewares
    middlewares(){
        // Using CORS middleware
        this.app.use( cors() );

        // JSON Parsing
        this.app.use( express.json() );

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));

        this.app.use( express.static( 'public' ) );
    }

    // listen
    listen() {
        this.app.listen( this.PORT, () => {
            console.log('listening on port ' + this.PORT );
        } );
    }
}

module.exports = Server;