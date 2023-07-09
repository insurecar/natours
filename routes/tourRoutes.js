const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: ' success',
    requstedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const id = +tours.at(-1).id + 1;
  const newTour = { ...req.body, id };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  const updatedWithDeleteTours = tours.filter(
    (tour) => req.params.id.toString() !== tour.id.toString()
  );

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedWithDeleteTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tours: updatedWithDeleteTours,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  console.log(req.params);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      message: 'Fatal error',
    });
  }
  const tourForUpdate = tours.map((tour) =>
    +tour.id === +req.params.id ? { ...req.body, id: tour.id } : tour
  );
  console.log(tourForUpdate);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tourForUpdate),
    (err) => {
      return res.status(200).json({
        status: 'completed',
        tours: tourForUpdate,
      });
    }
  );
};

const getTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  return res.status(200).json({
    tour: tours.filter(
      (tour) => tour.id.toString() === req.params.id.toString()
    ),
  });
};

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
