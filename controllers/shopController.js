const Product=require('../models/productModel');

exports.getProducts =(request, response, next)=>{
    Product.fetchAll()
    .then(products=>{
        response.render('shop/product-list',{
            prods: products,
            pageTitle: 'All products',
            path: '/products',
        });
    })
    .catch();
};

exports.getProduct =(request, response, next)=>{
    const productId=request.params.productId;
    Product.findById(productId)
        .then(product=>{
            response.render('shop/product-detail',
            {product: product,
            pageTitle: 'Detail',
            path: '/products',
            });
        })
        .catch();
};

exports.getIndex=(request, response, next)=>{
    Product.fetchAll()
    .then(products=>{
        response.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    })
    .catch();
};

exports.getCart=(request, response, next)=>{
    request.user
        .getCart()
        .then(products=>{
            response.render('shop/cart',{
                cartProducts: products,
                pageTitle: 'Cart',
                path: '/cart',
            });
        })
        .catch(err=>console.log(err))
};

exports.postCart=(request, response, next)=>{
    const prodId=request.body.productId;
    Product.findById(prodId)
        .then(product=>{
            return request.user.addToCart(product);
        })
        .then(()=>response.redirect('/cart'))
        .catch(err=>console.log(err));
};

exports.getOrder=(request, response, next)=>{
    request.user.getOrder()
        .then(orders=>{
            response.render('shop/orders',{
                orders: orders,
                pageTitle: 'Orders',
                path: '/orders',
            })
        })
        .catch(err=>console.log(err));
};

exports.getCheckout=(request, response, next)=>{
    response.render('shop/checkout',{
        prods: products,
        pageTitle: 'Checkout',
        path: '/checkout',
    })
};

exports.postCartDeleteProd=(request, response, next)=>{
    const prodId=request.body.productId;
    request.user.deleteItemFromCart(prodId)
        .then(result=>response.redirect('/cart'))
        .catch(err=>console.log(err));
};

exports.postOrder=(request, response, next)=>{
    request.user.addOrder()
        .then(result=>{
            response.redirect('/orders')
        })
        .catch(err=>console.log(err));
};