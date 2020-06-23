const Sequelize =require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'nodejs', 
    {dialect: 'mysql', host:'localhost'});

module.exports=sequelize;