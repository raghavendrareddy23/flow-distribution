const Astrologer = require("../models/astrologersModel");

exports.getAstrologers = async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    res.json(astrologers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAstrologer = async (req, res) => {
  const { name, flowFactor } = req.body;
  const astrologer = new Astrologer({ name, flowFactor });

  try {
    await astrologer.save();
    res.status(201).json(astrologer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleAstrologer = async (req, res) => {
  const { id } = req.params;
  try {
    const astrologer = await Astrologer.findById(id);
    if (!astrologer) {
      return res.status(404).json({ message: "Astrologer not found" });
    }
    astrologer.isEnabled = !astrologer.isEnabled;
    await astrologer.save();
    res.json(astrologer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAstrologer = async (req, res) => {
  const { id } = req.params;
  try {
    const astrologer = await Astrologer.findById(id);
    if (!astrologer) {
      return res.status(404).json({ message: "Astrologer not found" });
    }
    await Astrologer.findByIdAndDelete(id);
    res.json({ message: "Astrologer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
