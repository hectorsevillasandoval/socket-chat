const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
    img:{
        type: String
    },
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...userInfo } = this.toObject();
    userInfo.uid = _id;
    return userInfo;
};

module.exports = model( 'User', UserSchema );