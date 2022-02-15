const path = require('path');

const express = require('express');
const validator = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// shared validation
const productValidation = [
    validator
        .check('title', 'Title must be at least 3 characters long.')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    validator
        .check('imageUrl', 'Please enter a valid image url.')
        .isLength({ min: 3 })
        .isURL(),
    validator
        .check('price', 'Please enter a valid price.')
        .isLength({ min: 1 })
        .isFloat(),
    validator
        .check('description', 'Please enter a valid description of at least 10 characters.')
        .isLength({ min: 10 })
        .trim()
]

// admin routes

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', productValidation, isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', productValidation, isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
