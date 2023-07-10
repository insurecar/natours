const fs = require('fs');

const grid = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/employees.json`)
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

exports.getAllGrids = (req, res) => {
  res.status(200).json({
    count: grid.length,
    workers: grid,
  });
};

exports.getOneGrid = (req, res) => {
  const oneGrid = grid.find(
    (user) => user?.email?.split('@')[0] === req.params.id
  );

  console.log(oneGrid);

  if (!oneGrid) {
    return res.status(400).json({
      status: 'Failed',
      code: 400,
    });
  }

  res.status(200).json({
    message: 'cool',
    date: new Date().toISOString(),
    users: oneGrid,
  });
};
