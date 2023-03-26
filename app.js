require('dotenv').config()
// Import dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport")
const session = require("express-session");
require("./src/config/passportjs/passportConfig")(passport);

// Import routers and middlewares
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const quoteRouter = require("./src/routes/quotes");
const { isAuth } = require("./src/middlewares/auth");
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");

// Initialize app and configure middleware
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(
session({
secret: process.env.SESSION_SECRETKEY,
resave: false,
saveUninitialized: false,
})
);

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get("/", (req, res, next) => {
res.send("<h1>Welcome to my Restful-API</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", isAuth, userRouter);
app.use("/api/v1/quote", isAuth, quoteRouter);

// Error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`);
});