const Sequelize =require('sequelize');

const sequelize =require('../util/database');

const CartModel = sequelize.define('cart', {
    id:{
        type : Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    }
});

module.exports= CartModel;