const fs=require('fs');
const path=require('path');
const rootDir =require('../util/path');
const Cart =require('./cartModel');

module.exports=class Product{
    constructor(id, title, imgUrl, description, price){
        this.id=id;
        this.title=title;
        this.imgUrl=imgUrl;
        this.description=description;
        this.price=price;
    }
    save(){
        const locPath=path.join(rootDir,'data','products.json');
        fs.readFile(locPath, (err, fileData)=>{
            let products=[];
            if(!err && fileData.length>0){
                products =JSON.parse(fileData);
            }
            if(this.id){
                const productIIndex =products.findIndex(p=>p.id===this.id);
                const updateProducts=[...products];
                updateProducts[productIIndex]=this;
                products=updateProducts;
            }else{
                this.id=Math.random().toString();
                products.push(this);
            }
            fs.writeFile(locPath,JSON.stringify(products), (err)=>{
                console.log(err);
            });
        });
    }
    static fetchAll(callBack){
        const locPath=path.join(rootDir,'data','products.json');
        fs.readFile(locPath, (err, fileData)=>{
            if(err){
                console.log(err);
                return callBack([]);
            }
            return callBack(JSON.parse(fileData));
        });
    }
    static findById(id, callBack){
        const locPath=path.join(rootDir,'data','products.json');
        fs.readFile(locPath, (err, fileData)=>{
            let products=[];
            if(err){console.log(err)};
            products= JSON.parse(fileData);
            const product=products.find(p=>p.id===id);
            return callBack(product);  
        });     
    }
    static deleteById(id){
        const locPath=path.join(rootDir,'data','products.json');
        fs.readFile(locPath, (err, fileData)=>{
            let products=[];
            if(!err){
                products =JSON.parse(fileData);
            }
            const product =products.find(p=>p.id === id);
            const updateProducts=products.filter(p=>p.id !== id);
            fs.writeFile(locPath,JSON.stringify(updateProducts), err=>{
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
}