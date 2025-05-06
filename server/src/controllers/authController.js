const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "User does not exist." });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const result = await foundUser.save();
      return res.json({ result });
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { handleLogin };
