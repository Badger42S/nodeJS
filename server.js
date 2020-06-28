const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');

const path =require('path');
const User=require('./models/userModel');
//create server
const app=express();
//set template engine
app.set('view engine', 'ejs');
//share place of templates
app.set('views', 'views');

const adminRouter=require('./routes/admin');
const shopRoute=require('./routes/shop');

const errorController=require('./controllers/error');

// const User=require('./models/userModel');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findById("5ef89ecca7f9fa2ed8261176")
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>console.log(err));
})

app.use('/admin',adminRouter);
app.use(shopRoute);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://nodeJsUser:040702615@nodejs-appng.mongodb.net/shopgoose?retryWrites=true&w=majority')
    .then(()=>{
        // const user=new User({
        //     name:'Totoro',
        //     email:'forest@pole.com',
        //     cart:{
        //         items:[]
        //     }
        // });
        // user.save();
        app.listen(3000);
    });