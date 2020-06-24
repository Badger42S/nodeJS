const Sequelize =require('sequelize');

const sequelize =require('../util/database');

const CartItemModel = sequelize.define('cartItem', {
    id:{
        type : Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    qty:Sequelize.INTEGER
});

module.exports= CartItemModel;