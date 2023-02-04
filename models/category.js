const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
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
});

CategorySchema.methods.toJSON = function(){
    const { _id, __v, status, ...categoryInfo } = this.toObject();
    categoryInfo.uid = _id;
    return categoryInfo;
};

module.exports = model( 'Category', CategorySchema );