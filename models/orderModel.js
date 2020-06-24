const Sequelize =require('sequelize');

const sequelize =require('../util/database');

const OrderModel = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    }
});

module.exports=OrderModel;