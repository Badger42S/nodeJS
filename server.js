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
const sequelize=require('./util/database');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRouter);
app.use(shopRoute);
app.use(errorController.get404);
//create table
sequelize.sync()
    .then()
    .catch(err=>{console.log(err)});

app.listen(3000);