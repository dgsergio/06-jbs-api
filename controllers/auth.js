const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;
  if (!password || password.length > 5) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  const user = await User.create({ name, email, password });
  const token = jwt.sign(
    { userID: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const login = (req, res) => {
  res.send('LOG IN DEMO');
};

module.exports = { login, register };
