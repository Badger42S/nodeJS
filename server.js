const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const session=require('express-session');
const MongoSession=require('connect-mongodb-session')(session);

const path =require('path');
const User=require('./models/userModel');

const MONGO_URI='mongodb+srv://nodeJsUser:040702615@nodejs-appng.mongodb.net/shopgoose'; //?retryWrites=true&w=majority
//create server
const app=express();
//create storre for seesion
const sessionStore =new MongoSession({
    uri:MONGO_URI,
    collection:'session',
});
//set template engine
app.set('view engine', 'ejs');
//share place of templates
app.set('views', 'views');

const adminRouter=require('./routes/admin');
const shopRoute=require('./routes/shop');
const authRoute=require('./routes/auth');

const errorController=require('./controllers/error');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));
//session
app.use(session({
    secret:'fnl;sfpijq',
    resave:false,
    saveUninitialized:false,
    store: sessionStore
}));

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
app.use(authRoute);
app.use(errorController.get404);

mongoose.connect(MONGO_URI)
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