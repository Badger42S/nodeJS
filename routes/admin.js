const express=require('express');

const adminController=require('../controllers/adminController');

const router =express.Router();

router.get('/add-product',adminController.getProductAdd);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId',adminController.getProductEdit);

router.post('/add-product',adminController.postProductAdd);

router.post('/edit-product',adminController.postProductEdit);

router.post('/delete-product', adminController.postProductDelete);

module.exports = router;