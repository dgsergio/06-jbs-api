const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  let respondErrors = {
    msg: 'Something went wrong.',
    code: StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors);
    const errorsMessages = errors.map((item) => item.message).join(', ');
    respondErrors.code = StatusCodes.BAD_REQUEST;
    respondErrors.msg = `${respondErrors.msg} ${errorsMessages}.`;
  }

  if (err.name === 'CastError') {
    respondErrors.code = StatusCodes.NOT_FOUND;
    respondErrors.msg = `${respondErrors.msg} No item found with id: ${err.value}.`;
  }

  if (err.code && err.code === 11000) {
    respondErrors.code = StatusCodes.BAD_REQUEST;
    respondErrors.msg = `${respondErrors.msg} ${err.keyValue.email} alredy exist in the DB. Do you want to login insted?`;
  }

  return res.status(respondErrors.code).json({ msg: respondErrors.msg });
};

module.exports = errorHandler;
