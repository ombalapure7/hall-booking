const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  getABooking,
  createBooking,
} = require("../controllers/bookings");

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getABooking);

module.exports = router;
