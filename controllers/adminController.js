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
       request.user.createProduct({
            title:title,
            imgUrl:imgUrl,
            price:price,
            description:description
        })
        .then(()=>response.redirect('/'))
        .catch();
};

exports.getProductEdit=(request, response, next)=>{
    const editMode=request.query.edit;
    const productId=request.params.productId;
    Product.findByPk(productId)
        .then(product=>{
            response.render('admin/edit-product',{
                pageTitle : "Edit Product",
                path: '/admin/edit-product',
                editing:editMode,
                product:product
            });
        })
        .catch();
}

exports.postProductEdit=(request, response, next)=>{
    const prodId=request.body.productId;   
    const updatedTitle=request.body.title; 
    const updatedImgUrl=request.body.imgUrl;
    const updatedDescription=request.body.description;
    const updatedPrice=request.body.price;
    Product.findByPk(prodId)
        .then(product=>{
            product.title=updatedTitle;
            product.imgUrl=updatedImgUrl;
            product.description=updatedDescription;
            product.price=updatedPrice;
            return product.save();
        })
        .then(()=>response.redirect('/admin/products'))
        .catch();
};

exports.getProduct=(request, response, next)=>{
    request.user.getProducts()
    //Product.findAll()
    .then(products=>{
        response.render('admin/products',{
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        })
    })
    .catch();
};

exports.postProductDelete=(request, response, next)=>{
    const prodId=request.body.productId;   
    Product.findByPk(prodId)
        .then(product=>{
            return product.destroy();
        })
        .then(()=>response.redirect('/admin/products'))
        .catch();
};