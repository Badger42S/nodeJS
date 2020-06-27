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
const mongoConnect=require('./util/database').mongoConnect;

const User=require('./models/userModel');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findById("5ef557fcb90b7026dcfdd50a")
        .then(user=>{
            req.user=new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err=>console.log(err));
})

app.use('/admin',adminRouter);
app.use(shopRoute);
app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
});