const mysql = require("mysql");

const connectDB = () => {
  return mysql.createConnection(
    {
      host: process.env.DATABASE_HOST,
      port: 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    },
    console.log("Connected to database...")
  );
};


module.exports = connectDB;
