const { Category } = require('../models');

const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name } );

    if( categoryDB ) return res.status(400).json({ msg: 'Category already exist' });

    const data = {
        name,
        user: req.user._id
    };

    const category = new Category( data );

    await category.save();

    res.status(201).json({
        category
    });
};

// TODO: Add pagination - Total - Populate information from user model
const getCategories = async (req, res) => {
    const { from, limit } = req.params;
    const query = { status: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
            .populate( 'user', ['name', 'email'] ),
        ]);

    res.json({
        total,
        categories,
    });
};

// TODO: Populate information from user model
const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate( 'user', ['name'] );

    return res.json( {category} );
};

// TODO: update category information
const updateCategory = async (req, res) => {
    const { id } = req.params;

    const { name } = req.body;

    const category = await Category.findByIdAndUpdate( id, { name: name.toUpperCase(), user: req.user._id }, {
        returnDocument: 'after'
    } ).populate( 'user', ['name'] );

    return res.status(200).json(category);
};

// TODO: Delete or Disable category
const deleteCategory = async (req, res) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate( id, { status: false }, {
        returnDocument: 'after'
    } );

    return res.status(200).json({
        msg: 'Category deleted',
        category
    });
};

module.exports = {
    deleteCategory,
    createCategory,
    getCategories,
    getCategory,
    updateCategory
}