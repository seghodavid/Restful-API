require('dotenv').config()

const express = require ('express')
const connectDB = require("./src/config/db/connect");

const userRouter = require('./src/routes/user')


const app = express()

app.use(express.json())


app.get('/', (req,res,next) => {
    res.send('<h1>Welcome to my Restful-API</h1>')
})

//routes
app.use('/api/v1/auth', userRouter)

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