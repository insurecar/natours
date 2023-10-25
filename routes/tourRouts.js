const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
  aliasTopTours,
  getToursStats,
} = require("../controllers/tourController");
const router = express.Router();

// router.param("id", checkID);
router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getToursStats);

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
