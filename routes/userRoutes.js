const express = require('express');
const {
  getAllUsers,
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUsers);
router.route('/:id').get(getUsers).patch(updateUser).delete(deleteUser);

module.exports = router;
