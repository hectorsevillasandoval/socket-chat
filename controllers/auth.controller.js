const bcrypt = require('bcryptjs');
const User = require('../models/users');
const authUtils = require('../helpers/generate.jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res ) => {
    const errorMessage = 'User/Password not valid';
    const { email, password } = req.body;

    try{

    const user = await User.findOne( { email } );

    if( !user ) return res.status( 400 ).json( { msg: `${errorMessage} - email` } );

    if( !user.status ) return res.status( 400 ).json( { msg: `${errorMessage} - status:false` } );

    const validPassword = bcrypt.compareSync( password, user.password );

    if(!validPassword ) return res.status( 400 ).json( { msg: `${errorMessage} - password:incorrect password` } );

    const token = await authUtils.generateJWT( user.id );

        res.json({
            msg: 'login ok',
            token
        });

    }catch( err ){
        console.log( err );
        res.status( 500 ).send( { success: false, message: err.message } );
        return;
    }

}


const googleSignIn = async ( req, res ) => {
    const { id_token } = req.body;

    try{
        const googleUser = await googleVerify( id_token );

        if( !googleUser ) return res.status( 400 ).json( { msg: 'Error verifying token' } );

        let user = await User.findOne( { email: googleUser.email } );

        if( !user ) { // user does not exist
            const data = {
                name,
                email,
                password: '',
                image: googleUser.image,
                google: true,
            };

            user = new User( data );

            await user.save();
        }

        if( !user.status ) return res.status( 401 ).json( { msg: 'Not allowed' } );

        const token = await authUtils.generateJWT( user.id );

        res.json({
            msg: 'Verified token',
            googleUser,
            token,
        });

    } catch(error){
        console.log( error );
        res.status(401).json({
            msg: 'Invalid token',
        });
    }
    
};
module.exports = { login, googleSignIn };