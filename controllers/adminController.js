const Product=require('../models/productModel');

exports.getProductAdd=(request, response, next)=>{
    response.render('admin/add-product',{
        pageTitle : "Add Product",
        path: '/admin/add-product',
    })};

exports.postProductAdd=(request, response, next)=>{
       const prod=new Product(request.body.title);
       prod.save();
       response.redirect('/');
};

exports.getProduct=(request, response, next)=>{
    Product.fetchAll((products)=>{
        response.render('admin/products',{
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        })
    });
};