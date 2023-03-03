const mysql = require("mysql2");

const connectDB = 
 mysql.createConnection(
    {
      host: process.env.DATABASE_HOST,
      port: 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    },
 )



module.exports = connectDB;
