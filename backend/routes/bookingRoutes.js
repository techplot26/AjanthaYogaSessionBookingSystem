const express = require("express");
const router = express.Router();

const {
  bookSession,
  getBookings,
  cancelBooking,
} = require("../controllers/bookingController");

// Book a yoga session
router.post("/", bookSession);

// Admin/user can view bookings
router.get("/", getBookings);

// Cancel booking
router.put("/:id/cancel", cancelBooking);

module.exports = router;