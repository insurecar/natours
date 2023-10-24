const express = require("express");
const {
  getAllMyUser,
  getMyUser,
  checkIDMyUser,
} = require("../controllers/myUserController");

const router = express.Router();

router.param("id", checkIDMyUser);

router.route("/").get(getAllMyUser);

router.route("/:id").get(getMyUser);

module.exports = router;
