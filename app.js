require('dotenv').config()

const express = require ('express')
const connectDB = require("./src/config/db/connect");


const app = express()


app.get('/', (req,res,next) => {
    res.send('<h1>Welcome to my Restful-API</h1>')
})


const start = async () => {
    try {
        await connectDB.connect(() => {
          console.log("Connected to database...");
        });
        app.listen(3000 || process.env.PORT, () => console.log("Server is listening on port"))
    } catch (error) {
        console.log(error)
    }
}

start()