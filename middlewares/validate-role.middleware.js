const validateRole = ( ...roles ) => {
    return (req, res, next) => {
        if( !req.user ) return res.status( 500 ).json({ msg: 'Validate token first' });
    
        const { role, name } = req.user;

        console.log(roles);
    
        if( !roles.includes( role ) ) {
            return res.status( 401 ).json({ msg: `User '${name}' is not allowed to perform this action` });
        }
    
        next();
    };

} 

module.exports = validateRole;