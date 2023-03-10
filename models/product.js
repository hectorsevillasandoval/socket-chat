const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    },
});

ProductSchema.methods.toJSON = function(){
    const { _id, __v, status, ...productInfo } = this.toObject();
    productInfo.uid = _id;
    return productInfo;
};

module.exports = model( 'Product', ProductSchema );