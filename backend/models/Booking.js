const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "YogaSession",
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    selectedTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);