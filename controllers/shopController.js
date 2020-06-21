const Product=require('../models/productModel');
const Cart =require('../models/cartModel');

exports.getProducts =(request, response, next)=>{
    Product.fetchAll((products)=>{
        response.render('shop/product-list',{
            prods: products,
            pageTitle: 'All products',
            path: '/products',
        })
    });
};

exports.getProduct =(request, response, next)=>{
    const productId=request.params.productId;
    Product.findById(productId, (product)=>{
        response.render('shop/product-detail',
        {product: product,
        pageTitle: 'Detail',
        path: '/products',
        });
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
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts=[];
            for (product of products){
                const cartProductData=cart.products.find(prod=> prod.id===product.id);
                if(cartProductData){
                    cartProducts.push({prodData: product, qty: cartProductData.qty});
                }
            }
            response.render('shop/cart',{
                cartProducts: cartProducts,
                pageTitle: 'Cart',
                path: '/cart',
            });
        });
    });
};

exports.postCart=(request, response, next)=>{
    const prodId=request.body.productId;
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price);
    });
    response.redirect('/cart');
};

exports.getOrders=(request, response, next)=>{
    response.render('shop/orders',{
        //prods: products,
        pageTitle: 'Orders',
        path: '/orders',
    })
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
    Product.findById(prodId, product=>{
        Cart.deleteProduct(prodId, product.price);
        response.redirect('/cart');
    });
};