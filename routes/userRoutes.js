const express = require('express');

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

const router = express.Router();

router.route('/').get(getAllUsers).post(createUsers);
router.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

module.exports = router;
