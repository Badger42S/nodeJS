const express=require('express');
const path =require('path');

const rootDir=require('../util/path');
const adminData=require('./admin');

const router =express.Router();


router.get('/',(request, response, next)=>{
    const products=adminData.products;
    response.render('shop',{
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports=router;