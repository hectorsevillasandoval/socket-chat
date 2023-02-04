const { Router } = require('express');
const { check } = require('express-validator');

const productController = require('../controllers/products.controller');
const validateFields = require('../middlewares/field-validator.middleware');
const validateJWT = require('../middlewares/validate-jwt.middleware');
const validateRole = require('../middlewares/validate-role.middleware');

const helpers = require('../helpers/db-validators');

const router = Router();

router
    .get('/', productController.getProducts)
    .get('/:id', [
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check( 'id' ).custom( helpers.productIdExists ),
        validateFields,
    ] , productController.getProduct)
    .post('/', [
        validateJWT,
        check('name', 'Name is required').notEmpty(),
        check( 'name' ).custom( helpers.productExists ),
        check('category', 'Category is required').notEmpty(),
        check( 'category' ).custom( helpers.categoryIdExists ),
        validateFields,
    ], productController.createProduct)
    .put('/:id', [
        validateJWT,
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check( 'id' ).custom( helpers.productIdExists ),
        check('category', 'Category is required').notEmpty(),
        check( 'category' ).custom( helpers.categoryIdExists ),
        check('name', 'Name is required').notEmpty(),
        validateFields,
    ], productController.updateProduct)
    .delete('/:id', [
        validateJWT,
        check('id', 'The Id is not a valid DB Id').isMongoId(),
        check( 'id' ).custom( helpers.productIdExists ),
        validateFields,
    ], productController.deleteProduct)


module.exports = router;