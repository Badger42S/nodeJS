const Product=require('../models/productModel');
const Orders=require('../models/orderModel');

const ITEMS_PER_PAGE=2;

exports.getProducts =(request, response, next)=>{
    const paramPage=request.query.page;
    const page = paramPage? +paramPage :1;
    let totalItems;

    Product.countDocuments()
        .then(productQty=>{
            totalItems=productQty;
            return Product.find()
                .skip((page-1)*ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products=>{
            response.render('shop/product-list',{
                prods: products,
                pageTitle: 'All products',
                path: '/products',
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE*page<totalItems,
                hasPreviousPage:page>1,
                nextPage: page+1,
                prevPage: page-1,
                lastPage: Math.ceil(totalItems/ITEMS_PER_PAGE)
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
            });
        })
        .catch(err=>console.log(err));
};

exports.getIndex=(request, response, next)=>{
    const paramPage=request.query.page;
    const page = paramPage? +paramPage :1;
    let totalItems;

    Product.countDocuments()
        .then(productQty=>{
            totalItems=productQty;
            return Product.find()
                .skip((page-1)*ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products=>{
            response.render('shop/index',{
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE*page<totalItems,
                hasPreviousPage:page>1,
                nextPage: page+1,
                prevPage: page-1,
                lastPage: Math.ceil(totalItems/ITEMS_PER_PAGE)
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
    request.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products=user.cart.items.map(itm=>{
                return {qty:itm.qty, productData: {...itm.productId._doc}};
            });
            const order=new Orders({
                user:{
                    name:request.user.email,
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