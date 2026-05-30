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
    date: {
      type: Date,
      required: true,
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