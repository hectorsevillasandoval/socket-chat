const jwt = require('jsonwebtoken');
const User = require('../models/users.js');

const validateJWT = async (req, res, next) => { 
    const token = req.header('x-token');

    if( !token ) return res.status( 401 ).json({ msg: 'Token is required' });

    try{
        const { uid } = jwt.verify(token, process.env.JWT_SECRET );
        const user = await User.findById(uid);

        if( !user ) return res.status( 401 ).json({ msg: 'User does not exists' });

        if( !user.status ) return res.status( 401 ).json({ msg: 'Token not valid - user status: false' });

        req.user = user;
        next();
    }catch(err){
        console.log(err);
        res.status( 401 ).json({ msg: 'Token not valid' });
    }

    console.log(token);

};

module.exports = validateJWT;