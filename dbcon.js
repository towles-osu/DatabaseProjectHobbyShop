//sql database connection setup

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'classmysql.engr.oregonstate.edu',
    user : 'cs340_towles',
    password : '8494',
    database : 'cs340_towles'
});

module.exports.pool = pool;
