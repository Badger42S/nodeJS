const fs=require('fs');
const path=require('path');
const rootDir =require('../util/path');

const locPath=path.join(rootDir,'data','cart.json');

module.exports= class Cart{
    constructor(){
        this.products=[];
        this.totalPrice=0;
    }

    static addProduct(id, prodPrice){
        fs.readFile(locPath, (err, fileData)=>{
            let cart={
                products:[],
                totalPrice:0
            };
            if(!err){
                cart=JSON.parse(fileData);
            }
            const checkProductIIndex =cart.products.findIndex(p=>p.id===id);
            const checkProduct=cart.products[checkProductIIndex];
            let updateProduct;
            if(checkProduct){
                updateProduct={...checkProduct};
                updateProduct.qty+=1;
                cart.products = [... cart.products];
                cart.products[checkProductIIndex]=updateProduct;
            } else{
                updateProduct={id:id, qty:1};
                cart.products=[...cart.products, updateProduct];
            }
            cart.totalPrice+=+prodPrice;
            fs.writeFile(locPath, JSON.stringify(cart), err=>console.log(err));
        });
    }
    static deleteProduct(id, productPrice){
        fs.readFile(locPath, (err, fileData)=>{
            if(err){
                return;
            }
            const cart=JSON.parse(fileData);
            const updatedCart={...cart};
            const product =updatedCart.products.find(prod=>prod.id === id);
            if(!product){
                return;
            }
            const productQty =product.qty;
            updatedCart.products = updatedCart.products.filter(prod=>prod.id !== id);
            updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
            fs.writeFile(locPath, JSON.stringify(updatedCart), err=>console.log(err));
        });
    }
    static getCart(callBack){
        fs.readFile(locPath, (err, fileData)=>{
            if(err){
                return callBack(null);
            }
            const cart=JSON.parse(fileData);
            return callBack(cart);
        });
    }
}