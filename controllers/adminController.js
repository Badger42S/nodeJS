const Product=require('../models/productModel');

exports.getProductAdd=(request, response, next)=>{
    response.render('admin/edit-product',{
        pageTitle : "Add Product",
        path: '/admin/add-product',
        editing:false
    })
};

exports.postProductAdd=(request, response, next)=>{
       const title=request.body.title;
       const imgUrl=request.body.imgUrl;
       const description=request.body.description;
       const price=request.body.price;
       const prod=new Product(
           null,
           title,
           imgUrl,
           description,
           price);
       prod.save();
       response.redirect('/');
};

exports.getProductEdit=(request, response, next)=>{
    const editMode=request.query.edit;
    const productId=request.params.productId;
    Product.findById(productId, product=>{
        response.render('admin/edit-product',{
            pageTitle : "Edit Product",
            path: '/admin/edit-product',
            editing:editMode,
            product:product
        });
    });
};

exports.postProductEdit=(request, response, next)=>{
    const prodId=request.body.productId;   
    const updatedTitle=request.body.title; 
    const updatedImgUrl=request.body.imgUrl;
    const updatedDescription=request.body.description;
    const updatedPrice=request.body.price;
    const updatedProduct=new Product(
        prodId,
        updatedTitle,
        updatedImgUrl,
        updatedDescription,
        updatedPrice
    );
    updatedProduct.save();
    response.redirect('/admin/products');
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

exports.postProductDelete=(request, response, next)=>{
    const prodId=request.body.productId;   
    Product.deleteById(prodId);
    response.redirect('/admin/products');
};