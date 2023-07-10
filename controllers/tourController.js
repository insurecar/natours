const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: ' success',
    requstedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.getTour = (req, res) => {
  return res.status(200).json({
    tour: tours.filter(
      (tour) => tour.id.toString() === req.params.id.toString()
    ),
  });
};
