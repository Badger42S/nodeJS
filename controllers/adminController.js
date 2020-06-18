const Product=require('../models/productModel');

exports.getProductAdd=(request, response, next)=>{
    response.render('admin/add-product',{
        pageTitle : "Add Product",
        path: '/admin/add-product',
    })};

exports.postProductAdd=(request, response, next)=>{
       const title=request.body.title;
       const imgUrl=request.body.imgUrl;
       const description=request.body.description;
       const price=request.body.price;
       const prod=new Product(
           title,
           imgUrl,
           description,
           price);
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