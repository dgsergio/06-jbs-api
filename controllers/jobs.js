const { StatusCodes } = require('http-status-codes');
const Jobs = require('../models/Jobs');
const { NotFoundError } = require('../errors');

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const getJob = async (req, res) => {
  const job = await Jobs.findOne({
    _id: req.params.id,
    createdBy: req.user.userID,
  });
  if (!job)
    throw new NotFoundError(`No job with id ${req.params.id} match this user`);

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const job = await Jobs.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.userID,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job)
    throw new NotFoundError(`No job with id ${req.params.id} match this user`);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const job = await Jobs.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userID,
  });
  if (!job)
    throw new NotFoundError(`No job with id ${req.params.id} match this user`);
  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
