const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userID, name } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { userID, name };
  next();
};

module.exports = authorization;
