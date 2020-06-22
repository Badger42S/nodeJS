const mysql =require('mysql2');

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs',
    password:'nodejs'
});

module.exports = pool.promise();