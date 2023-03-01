const mysql = require("mysql");

const connectDB = () => {
  return mysql.createConnection(
    {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "Television19",
      database: "restful-api",
    },
    console.log("Connected to database...")
  );
};


module.exports = connectDB;
