const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');

const app = express();

// 1. Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTE HANDLERS

//3) ROUTS

////U___S___E___R___S
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

const createUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

userRouter.route('/').get(getAllUsers).post(createUsers);

userRouter.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

// 4) Start SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
