require("dotenv").config();
require("express-async-errors");

const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const userRouter = require("./src/routes/user");
require("./src/config/passportjs/passportConfig")(passport);

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

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to my Restful-API</h1>");
});

//routes
app.use("/api/v1/auth", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(3000 || process.env.PORT, () =>
      console.log("Server is listening on port")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
