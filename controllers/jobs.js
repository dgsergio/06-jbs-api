const { StatusCodes } = require('http-status-codes');
const Jobs = require('../models/Jobs');
const jwt = require('jsonwebtoken');

const createJob = async (req, res) => {
  //move to a middleware authorization
  const token = req.headers.authorization.split(' ')[1];
  const { userID } = jwt.verify(token, process.env.JWT_SECRET);
  req.body.createdBy = userID;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = (req, res) => {};
const getJob = (req, res) => {};
const updateJob = (req, res) => {};
const deleteJob = (req, res) => {};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
