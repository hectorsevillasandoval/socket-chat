const { Router } = require('express');
const { check } = require('express-validator');
const { deleteCategory, createCategory, getCategories, getCategory, updateCategory } = require('../controllers/categories.controller');
const validateJWT = require('../middlewares/validate-jwt.middleware');
const validateFields = require('../middlewares/field-validator.middleware');
const helpers = require('../helpers/db-validators');

const router = Router();

router
    .get('/', getCategories)
    .get('/:id', [
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check( 'id' ).custom( helpers.categoryIdExists ),
        validateFields,
    ] , getCategory)
    .post('/', [
        validateJWT,
        check('name', 'Name is required').notEmpty(),
        validateFields,
    ], createCategory)
    .put('/:id', [
        validateJWT,
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check( 'id' ).custom( helpers.categoryIdExists ),
        check('name', 'Name is required').notEmpty(),
        validateFields,
    ], updateCategory)
    .delete('/:id', [
        validateJWT,
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check( 'id' ).custom( helpers.categoryIdExists ),
        validateFields,
    ], deleteCategory)

module.exports = router;