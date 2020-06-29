const express=require('express');

const adminController=require('../controllers/adminController');
const checkAuth=require('../middleweare/check-auth');

const router =express.Router();

router.get('/add-product', checkAuth, adminController.getProductAdd);

router.get('/products', checkAuth, adminController.getProducts);

router.get('/edit-product/:productId', checkAuth,adminController.getProductEdit);

router.post('/add-product', checkAuth,adminController.postProductAdd);

router.post('/edit-product', checkAuth,adminController.postProductEdit);

router.post('/delete-product', checkAuth, adminController.postProductDelete);

module.exports = router;