const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user.controller');
const validateFields = require('../middlewares/field-validator.middleware');
const validateJWT = require('../middlewares/validate-jwt.middleware');
const validateRole = require('../middlewares/validate-role.middleware');

const helpers = require('../helpers/db-validators');

const router = express.Router();

router
    .get('/', userController.getUser)
    .post('/', 
        check('name', 'Name is required').notEmpty(),
        check('password', 'Password must be above minimum required characters (5)').isLength( { min: 6 } ),
        check('email', 'Email is not valid').isEmail(),
        check('email').custom( helpers.emailExists ),
        check('role').custom( helpers.isRoleValid ),
        validateFields,
        userController.postUser)

    .put('/:id', 
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check('id').custom( helpers.idExists ),
        check('status', 'Type is not valid').isBoolean(),
        check('role').custom( helpers.isRoleValid ),
        validateFields,
        userController.updateUser)
    
    .delete('/:id',
        validateJWT,
        validateRole('USER_ROLE'),
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check('id').custom( helpers.idExists ),
        validateFields,
        userController.deleteUser)

module.exports = router;