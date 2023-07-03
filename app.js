const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: ' success',
    requstedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

app.get('/api/v1/tours', getAllTours);

const getTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find(({ id }) => req.params.id === id.toString());

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

app.get('/api/v1/tours/:id', getTour);

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'succcess',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// app.post('/api/v1/tours', createTour);

// app.delete('/api/v1/tours/:id', (req, res) => {
//   //My own implementation
//   const filteredTours = tours.filter(
//     (item) => item.id.toString() !== req.params.id.toString()
//   );

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(filteredTours),
//     (err) =>
//       res.status(200).json({
//         status: 'success',
//         data: {
//           tours: filteredTours,
//         },
//       })
//   );
// });

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.delete('/api/v1/tours/:id', deleteTour);

app.patch('/api/v1/tours/:id', (res, req) => {
  console.log('P__A__T__C__H');
});

app.route('/api/v1/tours').get(getAllTours).post(createTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
