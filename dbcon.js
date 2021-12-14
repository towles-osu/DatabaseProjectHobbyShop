//sql database connection setup
//NEEDS TO BE REDONE WHEN SETTING UP NEW DATABSE

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'classmysql.engr.oregonstate.edu',
    user : 'cs340_towles',
    password : '',//LEFT BLANK FOR SECURITY REASONS
    database : 'cs340_towles'
});

module.exports.pool = pool;
