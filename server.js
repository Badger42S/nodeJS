const express=require('express');
const bodyParser=require('body-parser');
const path =require('path');
//create server
const app=express();
//set template engine
app.set('view engine', 'ejs');
//share place of templates
app.set('views', 'views');

const adminRouter=require('./routes/admin');
const shopRoute=require('./routes/shop');
const errorController=require('./controllers/error');
//SQL db links
const sequelize=require('./util/database');
const Product =require('./models/productModel');
const User =require('./models/userModel');
const Cart =require('./models/cartModel');
const CartItem=require('./models/cartItemModel');
const Order = require('./models/orderModel');
const OrderItem = require('./models/orderItemsModel');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use((req,resp, next)=>{
    User.findByPk(1)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch();
});

app.use('/admin',adminRouter);
app.use(shopRoute);
app.use(errorController.get404);

//relationships
Product.belongsTo(User,{constrains:true, onDelete:'CASCADE'});
User.hasMany(Product);
//----
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
//----
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

//create tables
sequelize.sync()
    .then(result=>{
       return User.findByPk(1)})
    .then(user=>{
        if(!user){
            return User.create({
                name:'Silmaryl',
                email:'fff@kkk'
            })
        }
        return user;
    })
    .then(user=>{
        return user.getCart();
    })
    .then(user=>{
        //console.log(user);
        app.listen(3000)
    })
    .catch(err=>{console.log(err)});