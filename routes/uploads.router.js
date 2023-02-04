const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/field-validator.middleware');
const { validateFile } = require('../middlewares/validate-file.middleware');
const { dbValidators } = require('../helpers');

const uploadsController = require('../controllers/uploads.controller');


const router = Router();

router
    .post('/', validateFile,uploadsController.uploadFileFn)
    .put('/:collection/:id', [
        validateFile,
        check('id').isMongoId(),
        check('collection').custom( c => dbValidators.allowedCollections( c, ['users', 'products'] ) ),
        validateFields,
    ],uploadsController.updateImageCloudinary)


    .get('/:collection/:id', [
        check('id').isMongoId(),
        check('collection').custom( c => dbValidators.allowedCollections( c, ['users', 'products'] ) ),
        validateFields,
    ], uploadsController.showImage)


module.exports = router;