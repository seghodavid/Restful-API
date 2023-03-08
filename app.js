require('dotenv').config()
require('express-async-errors')

const express = require ('express')
const helmet = require('helmet')
const cors = require('cors')
const connectDB = require("./src/config/db/connect");
const notFoundMiddleware = require('./src/middlewares/not-found')
const errorHandlerMiddleware = require('./src/middlewares/error-handler')

const userRouter = require('./src/routes/user')


const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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