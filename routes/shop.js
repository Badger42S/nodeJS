const express=require('express');

const shopController=require('../controllers/shopController');
const checkAuth=require('../middleweare/check-auth');

const router =express.Router();


router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart', checkAuth, shopController.getCart);

router.post('/cart', checkAuth, shopController.postCart);

router.get('/orders', checkAuth, shopController.getOrder); 

// // router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item', checkAuth, shopController.postCartDeleteProd)

router.post('/create-order', checkAuth, shopController.postOrder)

module.exports=router;