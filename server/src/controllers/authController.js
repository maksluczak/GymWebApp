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
      const { password, ...userWithoutPassword } = foundUser.toObject();

      return res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const handleNewUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required."
    });
  }

  try {
    const duplicateEmail = await User.findOne({ email }).exec();

    if (duplicateEmail) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPwd
    });

    console.log(newUser);
    res.status(201).json({ message: `New user ${firstname} ${lastname} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

module.exports = { 
  handleLogin,
  handleNewUser
};