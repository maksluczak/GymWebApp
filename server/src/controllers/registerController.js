const User = require('../models/User');
const bcrypt = require('bcrypt');

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

module.exports = { handleNewUser };
