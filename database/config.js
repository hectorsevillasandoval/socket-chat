const mongoose = require('mongoose');

const databaseConnection = async () => {
    try{

        await mongoose.connect( process.env.MONGO_DB_CONNECTION_STRING, {} );

        console.log('Connected to Database');

    }catch(error){
        console.log(error);
        throw new Error('Error connecting to database');
    }
};

module.exports = { 
    databaseConnection 
};