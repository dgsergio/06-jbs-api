const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createToken(user._id, user.name);
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide email and password' });

  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Invalid user name' });

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Invalid Credentials' });

  const token = user.createToken(user._id, user.name);
  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
