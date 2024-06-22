const User = require('../models/usersModel');
const Astrologer = require('../models/astrologersModel');

const getUsers = async (req, res) => {
  try {
    const users = (await User.find({role:"user"}).select("-password").populate('astrologerId'));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignAstrologer = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const enabledAstrologers = await Astrologer.find({ isEnabled: true });
  
      if (enabledAstrologers.length === 0) {
        return res.status(500).json({ message: "No astrologers available" });
      }
  
      let totalWeight = enabledAstrologers.reduce((total, ast) => total + ast.flowFactor, 0);
      let random = Math.random() * totalWeight;
      let selectedAstrologer = enabledAstrologers[0];
  
      for (let astrologer of enabledAstrologers) {
        if (random < astrologer.flowFactor) {
          selectedAstrologer = astrologer;
          break;
        }
        random -= astrologer.flowFactor;
      }
  
      user.astrologerId = selectedAstrologer._id;
      selectedAstrologer.connectionCount += 1;
  
      await user.save();
      await selectedAstrologer.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  getUsers,
  assignAstrologer
};
