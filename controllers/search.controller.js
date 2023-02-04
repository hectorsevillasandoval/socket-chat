
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const allowedCollections = [ 'users', 'categories', 'products', 'roles' ];

const search = ( req, res ) => {
    const { collection, term } = req.params;

    if ( ! allowedCollections.includes( collection ) ) return res.status(400).json({ msg: `Collection ${collection} is not allowed` });

    switch ( collection ) {
        case 'users':
            searchUsers( term, res );
            break;
        case 'categories':
            searchCategories( term, res );
            break;
        case 'products':
            searchProducts( term, res );
            break;
        default:
            return res.status(500).json({
                msg: 'I forgot to add this collection'
            });
    }

};

/**
 * Search for Users in Database
 */

const searchUsers = async ( term = '', res ) => {
    const isMongoID = ObjectId.isValid( term );

    if( isMongoID ) {
        const user = await User.findById( term );

        return res.json({
            results: ! user ? [] : [ user ]
        });
    }

    const regex = new RegExp( term, 'i' );
    const users = await User.find( {
        $or: [ { name: regex }, { email: regex } ],
        $and: [{ status: true }],
     } );

    return res.json({
        results: users
    });
};

/**
 * Search for Categories in Database
 */

const searchCategories = async ( term = '', res ) => {
    const isMongoID = ObjectId.isValid( term );

    if( isMongoID ) {
        const category = await Category.findById( term );

        return res.json({
            results: ! category ? [] : [ category ]
        });
    }

    const regex = new RegExp( term, 'i' );
    const category = await Category.find({ name: regex });

    return res.json({
        results: category
    });
};

/**
 * Search for Products in Database
 */

const searchProducts = async ( term = '', res ) => {
    const isMongoID = ObjectId.isValid( term );

    if( isMongoID ) {
        const products = await Product.findById( term );

        return res.json({
            results: ! products ? [] : [ products ]
        });
    }

    const regex = new RegExp( term, 'i' );
    const products = await Product.find({
        $or: [ { name: regex }, { description: regex } ],
        $and: [{ status: true }],
    });

    return res.json({
        results: products
    });
};

module.exports = { search };