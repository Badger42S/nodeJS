const Product=require('../models/productModel');

exports.getProductAdd=(request, response, next)=>{
    response.render('add-product',{
        pageTitle : "Add Product",
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })};

exports.postProductAdd=(request, response, next)=>{
       const prod=new Product(request.body.title);
       prod.save();
       response.redirect('/');
};

exports.getProducts =(request, response, next)=>{
    const products =Product.fetchAll((products)=>{
        response.render('shop',{
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        })
    });
};