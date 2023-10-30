const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRouts");
const userRouter = require("./routes/userRoutes");
const myUserRoute = require("./routes/myUserRoute");

const app = express();

//1) MiddleWare
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log(
    "%c Hello from the middleware",
    "background: orange; color: white; padding: 30px; border-radius: 20px; font-size: 20px"
  );
  next();
});

//2) ROUTE HANDLERS

// 3)Routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/my-users", myUserRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

//4) Start a server

module.exports = app;
