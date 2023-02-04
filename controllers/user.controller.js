const User = require('../models/users');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
    const { limit = 5, from = 0 } = req.params;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find(query)
            .skip( Number(from) )
            .limit( Number(limit) ),
        ]);

    res.json({
        total,
        users,
    });
};

const postUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        const user = new User( {
            name, 
            email, 
            password, 
            role
        } );

        // encrypt pw
        const salt = bcrypt.genSaltSync(); // default 10
        user.password = bcrypt.hashSync( password, salt );
    
        await user.save(); // Save the information to the DB
        res.json({
            user
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            "Error": error.message
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    console.log('Updating User...');

    const { _id, password, google, email, ...data } = req.body;

    if ( password ) {
        // Encrypt Password
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, data, {
        returnDocument: 'after'
    } );

    res.json(user);
};


const deleteUser = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { status: false } );

    res.status(200).json({
        msg: `The user ${user.id} has been removed`,
        user: req.user
    });
};

module.exports = {
    getUser,
    postUser,
    updateUser,
    deleteUser
};