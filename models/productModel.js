const mongodb = require('mongodb');

const getDb =require('../util/database').getDb;

class Product  {
    constructor(title, price, description, imgUrl, id, userId){
        this.title=title,
        this.price=price,
        this.description=description,
        this.imgUrl=imgUrl,
        this._id= id ? new mongodb.ObjectID(id) : null;
        this.uaerId=userId;
    }

    save(){
        const db=getDb();
        let dbCommand;
        if(this._id){
            dbCommand=db.collection('products')
            .updateOne({_id: this._id}, {$set:this});
        }else{
            dbCommand=db.collection('products')
            .insertOne(this);
        }
        return dbCommand
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
    }

    static findById(id){
        const db=getDb();
        return db.collection('products')
            .find({_id: new mongodb.ObjectID(id)})
            .next()
            .then(product=>{
                console.log(product);
                return product;
            })
            .catch(err=>console.log(err));
    }

    static fetchAll(){
        const db=getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products=>{
               // console.log(products);
                return products;
            });
    }

    static deleteById(prodId){
        const db=getDb();
        return db.collection('products')
            .deleteOne({_id:new mongodb.ObjectID(prodId)})
            .then(result=>console.log(result))
            .catch(err=>console.log(err));
    }
}

module.exports=Product;