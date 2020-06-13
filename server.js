const http =require('http');

const express=require('express');
const { response } = require('express');

const app=express();

app.use((request, response, next)=>{
    console.log('middleware');
    next();
});
app.use((request, response, next)=>{
    response.send('Tada');
});

const server=http.createServer(app );

server.listen(3000);