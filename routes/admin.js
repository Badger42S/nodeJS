const express=require('express');

const adminController=require('../controllers/adminController');
const router =express.Router();

router.get('/add-product',adminController.getProductAdd);

router.get('/products', adminController.getProduct);

router.post('/add-product',adminController.postProductAdd);

module.exports = router;