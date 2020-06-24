const Sequelize =require('sequelize');

const sequelize =require('../util/database');
const OrderModel = require('./orderModel');

const OrderItemModel = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    qty:Sequelize.INTEGER
});

module.exports=OrderItemModel;