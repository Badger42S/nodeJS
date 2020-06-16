const http =require('http');

const express=require('express');
const bodyParser=require('body-parser');
const path =require('path');
//create server
const app=express();
//set template engine
app.set('view engine', 'ejs');
//share place of templates
app.set('views', 'views');

const adminData=require('./routes/admin');
const shopRoute=require('./routes/shop');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute);
app.use((req,resp)=>{
    resp.status(404).render('404',{
        pageTitle : "Page not found",
        path: '/404'
    });
});

app.listen(3000);