const Booking = require("../models/Booking");
const YogaSession = require("../models/YogaSession");

// Book a yoga session
exports.bookSession = async (req, res) => {
  try {
    const { sessionId, userId, selectedDate, selectedTime } = req.body;

    if (!sessionId || !userId || !selectedDate || !selectedTime) {
      return res.status(400).json({
        message: "User, session, selected date and selected time are required",
      });
    }

    const session = await YogaSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Yoga session not found" });
    }

    const existingBooking = await Booking.findOne({
      user: userId,
      session: sessionId,
      selectedDate,
      selectedTime,
      status: "booked",
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already booked this session for the selected date and time",
      });
    }

    const booking = await Booking.create({
      user: userId,
      session: sessionId,
      selectedDate,
      selectedTime,
    });

    res.status(201).json({
      message: "Session booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate(
        "session",
        "title instructor image date startTime endTime location duration capacity description"
      );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cancel booking failed",
      error: error.message,
    });
  }
};