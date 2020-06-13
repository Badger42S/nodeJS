const http =require('http');

const express=require('express');
const bodyParser=require('body-parser');
const path =require('path');
//create server
const app=express();

const adminRoute=require('./routes/admin');
const shopRoute=require('./routes/shop');

//useing middlewware
app.use(bodyParser.urlencoded({extended:false}));
//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoute);
app.use(shopRoute);
app.use((req,resp)=>{
    resp.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);