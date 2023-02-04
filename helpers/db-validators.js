const {
    Category,
    Role,
    User,
    Product,
} = require( '../models' );

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });

    if( ! roleExists ) throw new Error('The role does not exists');
};

const emailExists = async ( email = '' ) => {
    // check if email already exists
    const userExists = await User.findOne( { email } );

    if( userExists ) throw new Error('User already exists');

};


const idExists = async ( id ) => {
    /**
     * id : {
     *  bla bla bla
     * }
     */
    const idExists = await User.findById( id );
    if( !idExists ) throw new Error('User ID does not exists');
};

const categoryIdExists = async ( id ) => {
    if( ! await Category.findById( id ) ) throw new Error( 'Category does not exists' );
};

const productIdExists = async ( id ) => {
    if( ! await Product.findById( id ) ) throw new Error( 'Product does not exists' );
};

const productExists = async ( name ) => {
    if( await Product.findOne( { name: name.toUpperCase() } ) ) throw new Error( 'Product already exists' );
};

const allowedCollections = ( collection = '', collections = [] ) => {
    
    if( !collections.includes( collection ) ) throw new Error( `Collection ${collection} not allowed` );

    return true;
};

module.exports = {
    isRoleValid,
    emailExists,
    idExists,
    categoryIdExists,
    productExists,
    productIdExists,
    allowedCollections,
};