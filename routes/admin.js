const express=require('express');

const productController=require('../controllers/productsController');
const router =express.Router();



router.get('/add-product',productController.getProductAdd);

router.post('/add-product',productController.postProductAdd);

module.exports = router;