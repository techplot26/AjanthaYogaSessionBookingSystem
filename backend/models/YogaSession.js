const mongoose = require("mongoose");

const yogaSessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      default: "",
    },
    endTime: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "Ajantha Yoga Studio",
    },
    duration: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YogaSession", yogaSessionSchema);