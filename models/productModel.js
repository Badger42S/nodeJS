const db =require('../util/database');
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
        return db.execute('INSERT INTO products (title, price, description, imgUrl) VALUES (?, ?, ?, ?)', 
        [this.title, this.price, this.description, this.imgUrl]);
    }
    static fetchAll(){
        return db.execute('SELECT * FROM products');
    }
    static findById(id){
        return db.execute('SELECT *  FROM products WHERE products.id=?', [id]);
    }
    static deleteById(id){

    };
}