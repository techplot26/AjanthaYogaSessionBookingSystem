const YogaSession = require("../models/YogaSession");

// Create session
exports.createSession = async (req, res) => {
  try {
    const session = await YogaSession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sessions
exports.getSessions = async (req, res) => {
  try {
    const sessions = await YogaSession.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update session
exports.updateSession = async (req, res) => {
  try {
    const session = await YogaSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete session
exports.deleteSession = async (req, res) => {
  try {
    await YogaSession.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};