const Sequelize =require('sequelize');


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