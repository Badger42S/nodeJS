const mongoose =require('mongoose');

const Schema=mongoose.Schema;


const CartModel = sequelize.define('cart', {
    id:{
        type : Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    }
});

module.exports= CartModel;