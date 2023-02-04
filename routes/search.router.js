const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/field-validator.middleware');
const searchController = require('../controllers/search.controller');



const router = Router();

router
    .get('/:collection/:term', searchController.search)


module.exports = router;