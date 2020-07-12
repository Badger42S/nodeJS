const Product=require('../models/productModel');

exports.getProducts=(request, response, next)=>{
    Product
    .find()
    .then(products=>{
        response.status(200).json(
            products.map(prod=>{
                return {
                    id: prod._id,
                    title: prod.title,
                    price: prod.price
                }
            })
            );
    })
    .catch(err=>console.log(err));
};

exports.getProduct=(request, response,next)=>{
    const prodId=request.params.productId;
    Product.findById(prodId)
        .then(product=>{
            response.status(200).json(product);
        })
};

exports.postTest=(request, response, next)=>{
    const text = request.body.text;

    response.status(200).json({
        returnText: text,
        randomNumber: Math.random()
    });
};