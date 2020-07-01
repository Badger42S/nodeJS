const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const session=require('express-session');
const MongoSession=require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash=require('connect-flash');

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
//protection token
const protectToken=csrf();

app.use(flash());
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

app.use(protectToken);

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>console.log(err));
})

app.use((req,res,next)=>{
    res.locals.isAuthenticated= req.session.isLoggedIn;
    res.locals.csrfToken=req.csrfToken();
    next();
});

app.use('/admin',adminRouter);
app.use(shopRoute);
app.use(authRoute);
app.use(errorController.get404);

mongoose
    .connect(MONGO_URI)
    .then(()=>{
        app.listen(3000);
    });