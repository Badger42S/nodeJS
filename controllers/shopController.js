const Product=require('../models/productModel');

exports.getProducts =(request, response, next)=>{
    Product.findAll()
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
    Product.findByPk(productId)
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
    Product.findAll()
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
        .then(cart=>{
            return cart.getProducts()
        })
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
    let fetchCart;
    let newQty=1;
    request.user
        .getCart()
        .then(cart=>{
            fetchCart=cart;
            return cart.getProducts({where: {id: prodId}});
        })
        .then(products=>{
            let product;
            if(products.length>0){
                product=products[0];
            }
            if(product){
                const oldQty=product.cartItem.qty;
                newQty =oldQty+1;
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product=>{
            return fetchCart.addProduct(product, {
                through: {qty:newQty}})
        })
        .then(()=>response.redirect('/cart'))
        .catch(err=>console.log(err));
};

exports.getOrders=(request, response, next)=>{
    request.user.getOrders({include:['products']})
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
    request.user.getCart()
        .then(cart=>{
            return cart.getProducts({where: {id: prodId}})
        })
        .then(products=>{
            const product =products[0];
            return product.cartItem.destroy()
        })
        .then(result=>response.redirect('/cart'))
        .catch(err=>console.log(err));
};

exports.postOrder=(request, response, next)=>{
    let fetchCart;
    request.user.getCart()
        .then(cart=>{
            fetchCart=cart;
            return cart.getProducts()
        })
        .then(products=>{
            return request.user.createOrder()
                    .then(order=>{
                        order.addProducts(products.map(prod=>{
                            prod.orderItem ={qty: prod.cartItem.qty};
                            return prod;
                        }))
                    })
                    .catch(err=>console.log(err));
        })
        .then(result=>{
            return fetchCart.setProducts(null);
        })
        .then(result=>{
            response.redirect('/orders')
        })
        .catch(err=>console.log(err));
};