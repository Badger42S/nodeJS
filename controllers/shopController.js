const Product=require('../models/productModel');
const Orders=require('../models/orderModel');

exports.getProducts =(request, response, next)=>{
    Product
    .find()
    .then(products=>{
        response.render('shop/product-list',{
            prods: products,
            pageTitle: 'All products',
            path: '/products',
            isAuthenticated: request.session.isLoggedIn
        });
    })
    .catch(err=>console.log(err));
};

exports.getProduct =(request, response, next)=>{
    const prodId=request.params.productId;
    Product.findById(prodId)
        .then(product=>{
            response.render('shop/product-detail', {
            product: product,
            pageTitle: 'Detail',
            path: '/products',
            isAuthenticated: request.session.isLoggedIn
            });
        })
        .catch(err=>console.log(err));
};

exports.getIndex=(request, response, next)=>{
    Product
    .find()
    .then(products=>{
        response.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated: request.session.isLoggedIn
        });
    })
    .catch(err=>console.log(err));
};

exports.getCart=(request, response, next)=>{
    request.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products=user.cart.items;
            response.render('shop/cart',{
                cartProducts: products,
                pageTitle: 'Cart',
                path: '/cart',
                isAuthenticated: request.session.isLoggedIn
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
    Orders
        .find({'user.userId':request.user._id})
        .then(orders=>{
            response.render('shop/orders',{
                orders: orders,
                pageTitle: 'Orders',
                path: '/orders',
                isAuthenticated: request.session.isLoggedIn
            })
        })
        .catch(err=>console.log(err));
};

exports.getCheckout=(request, response, next)=>{
    response.render('shop/checkout',{
        prods: products,
        pageTitle: 'Checkout',
        path: '/checkout',
        isAuthenticated: request.session.isLoggedIn
    })
};

exports.postCartDeleteProd=(request, response, next)=>{
    const prodId=request.body.productId;
    request.user.deleteItemFromCart(prodId)
        .then(result=>response.redirect('/cart'))
        .catch(err=>console.log(err));
};

exports.postOrder=(request, response, next)=>{
    request.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products=user.cart.items.map(itm=>{
                return {qty:itm.qty, productData: {...itm.productId._doc}};
            });
            const order=new Orders({
                user:{
                    name:request.user.name,
                    userId:request.user._id
                },
                products:products
            });
            return order.save();
        })
        .then(()=>{
            return request.user.clearCart()
        })
        .then(result=>{
            response.redirect('/orders')
        })
        .catch(err=>console.log(err));
};