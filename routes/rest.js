const express =require('express');
const restController=require('../controllers/restController');

const router = express.Router();

router.get('/products', restController.getProducts);

router.get('/products/:productId', restController.getProduct);

router.post('/test', restController.postTest);

module.exports=router;