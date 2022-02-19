const express = require('express');

const productController = require('../controller/product');

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

router.post('/edit-product/', productController.postEditProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/delete-product', productController.postDeleteProduct);

module.exports = router;
