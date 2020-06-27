const mongodb = require('mongodb');

const getDb =require('../util/database').getDb;

class User{
    constructor(name, email, cart, id){
        this.name=name;
        this.email=email;
        this.cart=cart;
        this._id=id;
    }

    save(){
        const db=getDb();
        return db.collection('users')
            .insertOne(this)
            .catch(err=>console.log(err));
    }

    static findById(userId){
        const db=getDb();
        return db.collection('users')
                .findOne({_id: new mongodb.ObjectID(userId)})
                .then(user=>{
                    return user})
                .catch(err=>console.log(err));
    }

    addToCart(product){
        const cartProductIndex=this.cart.items.findIndex(cp=>{
            return cp.productId.toString() === product._id.toString();
        });
        const updateCartItems = [...this.cart.items];
        let newQty=1;

        if(cartProductIndex>=0){
            newQty=this.cart.items[cartProductIndex].qty+1;
            updateCartItems[cartProductIndex].qty=newQty;
        } else {
            updateCartItems.push({productId: product._id, qty: newQty});
        }
        const updateCart= {
            items: updateCartItems
        };
        const db=getDb();
        return db.collection('users')
            .updateOne(
                {_id: new mongodb.ObjectID(this._id)}, 
                {$set: {cart:updateCart}
            })
            .catch(err=>console.log(err));
    }

    getCart(){
        const productIds = this.cart.items.map(itm=>{
            return itm.productId});
        const db = getDb();
        return db.collection('products')
            .find({_id:{
                $in:productIds
            }})
            .toArray()
            .then(products=>{
                return products.map(product=>{
                    return {...product, qty: this.cart.items.find(it=>{
                        return it.productId.toString()===product._id.toString()
                    }).qty}
                })
            })
    }
    deleteItemFromCart(productId){
        const updateCartItems=this.cart.items.filter(item=> {
            return item.productId.toString()!==productId.toString()
        });
        const db=getDb();
        return db.collection('users')
            .updateOne(
                {_id: new mongodb.ObjectID(this._id)}, 
                {$set: {cart:{items: updateCartItems}}
            })
            .catch(err=>console.log(err));
    }

    addOrder(){
        const db=getDb();
        return this.getCart()
            .then(products=>{
                const order={
                    items:products,
                    user: {
                        _id: new mongodb.ObjectID(this._id),
                        name: this.name
                    }
                };
                return db.collection('orders')
                    .insertOne(
                        order
                    )
            })
            .then(res=>{
                this.cart={items:[]};
                return db.collection('users')
                .updateOne(
                    {_id: new mongodb.ObjectID(this._id)}, 
                    {$set: {cart:{items: []}}
                })
                .catch(err=>console.log(err));
            })
    }

    getOrder(){
        const db=getDb();
        return db.collection('orders')
            .find({
                'user._id':new mongodb.ObjectID(this._id)
            })
            .toArray()
    }
}

module.exports=User;