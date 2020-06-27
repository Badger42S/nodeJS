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
       const product =new Product(title, price, description, imgUrl, null, request.user._id);
        product.save()
            .then((result)=>{
                console.log(result);
                response.redirect('/')})
            .catch();
};

exports.getProductEdit=(request, response, next)=>{
    const editMode=request.query.edit;
    const productId=request.params.productId;
    Product.findById(productId)
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
    const product =new Product(
        updatedTitle, 
        updatedPrice, 
        updatedDescription, 
        updatedImgUrl, 
        prodId);
    product.save()
        .then(()=>response.redirect('/admin/products'))
        .catch();
};

exports.getProduct=(request, response, next)=>{
    Product.fetchAll()
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
    Product.deleteById(prodId)
        .then(()=>response.redirect('/admin/products'))
        .catch(err=>console.log(err));
};