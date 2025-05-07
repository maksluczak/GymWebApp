const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'no users found' });
    return res.json(users);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ 'message': 'ID is required' });
    }
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res.status(204).json({ 'message': 'no user matches id' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.email || !req?.body?.password) {
    return res.status(400).json({ 'message': 'firstname, lastname, email and password are required' });
  }
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPwd
    });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ 'message': 'ID is required' });
    }
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
      return res.status(204).json({ 'message': 'no user matches id' });
    }
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
    }
    const result = await user.save();
    return res.json(result);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ 'message': 'ID is required' });
    }
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
      return res.status(204).json({ 'message': 'no user matches id' });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    return res.json(result);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
