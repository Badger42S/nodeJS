const express=require('express');

const shopController=require('../controllers/shopController');

const router =express.Router();


router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrder); 

// // router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item', shopController.postCartDeleteProd)

router.post('/create-order', shopController.postOrder)

module.exports=router;