const Product=require('../models/productModel');

exports.getProducts =(request, response, next)=>{
    Product.fetchAll((products)=>{
        response.render('shop/product-list',{
            prods: products,
            pageTitle: 'All products',
            path: '/products',
        })
    });
};

exports.getIndex=(request, response, next)=>{
    Product.fetchAll((products)=>{
        response.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        })
    });
};

exports.getCart=(request, response, next)=>{
    response.render('shop/cart',{
        //prods: products,
        pageTitle: 'Cart',
        path: '/cart',
    })
};

exports.getCheckout=(request, response, next)=>{
    response.render('shop/checkout',{
        prods: products,
        pageTitle: 'Checkout',
        path: '/checkout',
    })
};