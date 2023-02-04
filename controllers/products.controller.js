const { Product } = require('../models');

const createProduct = async (req, res) => {
    const { name, price, category, description } = req.body;

    const productDB = await Product.findOne({ name } );

    if( productDB ) return res.status(400).json({ msg: 'Product already exist' });

    const data = {
        name: name.toUpperCase(),
        user: req.user._id,
        price,
        description,
        category,
    };

    const product = new Product( data );

    await product.save();

    res.status(201).json({
        product
    });
};

// TODO: Add pagination - Total - Populate information from user model
const getProducts = async (req, res) => {
    const { from, limit } = req.params;
    const query = { status: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
            .populate( 'user', ['email'] )
            .populate( 'category', 'name' )
        ]);

    res.json({
        total,
        products,
    });
};

// TODO: Populate information from user model
const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate( 'user', ['email'] );

    return res.json( {product} );
};

// TODO: update category information
const updateProduct = async (req, res) => {
    const { id } = req.params;

    const { name, price, description, category } = req.body;

    const dataToUpdate = {
        name: name.toUpperCase(),
        price,
        description,
        category,
    };

    const product = await Product.findByIdAndUpdate( id, dataToUpdate, {
        returnDocument: 'after'
    } ).populate( 'user', ['email'] );

    return res.status(200).json(product);
};

// TODO: Delete or Disable category
const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, { status: false }, {
        returnDocument: 'after'
    } );

    return res.status(200).json({
        msg: 'Product deleted',
        product
    });
};

module.exports = {
    createProduct,
    deleteProduct,
    getProducts,
    getProduct,
    updateProduct
}