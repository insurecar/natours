const fs = require("fs");

const allUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkIDMyUser = (req, res, next, value) => {
  const invalidID = allUsers[req.params.id];
  if (!invalidID) {
    return res.status(404).json({
      status: "Not found",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getAllMyUser = (req, res) => {
  res.status(200).json({
    status: "ok",
    requestedAt: req.requestTime,
    data: {
      users: allUsers,
    },
  });
};

exports.getMyUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: allUsers[req.params.id],
    },
  });
};
