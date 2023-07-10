const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const gridRouter = require('./routes/gridRoutes');

const app = express();

// 1. Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // let show in browser route to folder publick but just files, not folders

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/grids', gridRouter);

// 4) Start SERVER
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App is running on port ${port}...`);
// });

module.exports = app;
